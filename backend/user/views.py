# Create your views here.
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import AllowAny
from .serializers import (
    UserRegisterSerializer,
    UserListSerializer,
    UserProfileSerializer,
)
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime
from .utils.responses import generate_response
from rest_framework.pagination import PageNumberPagination
import pytz
from .models import User


class CustomTokenObtainPairView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Get email and password from request data
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return generate_response(
                status="error", code=400, message="Email and password are required."
            )

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return generate_response(
                status="error", code=400, message="Invalid email or password."
            )

        if not user.check_password(password):
            return generate_response(
                status="error", code=400, message="Invalid email or password."
            )

        # Generate the tokens manually if user is valid
        from rest_framework_simplejwt.tokens import RefreshToken

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Get expiration time from JWT token
        exp_time = None
        try:
            access_token_obj = AccessToken(access_token)
            exp_timestamp = access_token_obj.payload.get("exp")

            # Calculate time remaining (in minutes)
            now = timezone.now()
            # Convert exp_timestamp to a datetime object and calculate remaining time
            exp_time = datetime.utcfromtimestamp(exp_timestamp).replace(
                tzinfo=timezone.utc
            )
            time_remaining = (exp_time - now).total_seconds() / 60.0  # in minutes
        except TokenError:
            pass  # If there's an error in decoding the token, we just return None for exp_time

        custom_response_data = {
            "access_token": access_token,
            "refresh_token": str(refresh),
            "token_expiration": exp_time,
            "time_remaining_minutes": time_remaining,
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }

        return generate_response(
            status="success",
            code=200,
            message="Tokens generated successfully.",
            data=custom_response_data,
        )


class RegisterUser(APIView):
    authentication_classes = []  # Disable authentication for this view
    permission_classes = [AllowAny]  # Allow any user to access this view

    def post(self, request):
        User = get_user_model()

        if User.objects.filter(username=request.data.get("username")).exists():
            return generate_response(
                status="error",
                code=status.HTTP_400_BAD_REQUEST,
                message="Username already taken.",
            )

        if User.objects.filter(email=request.data.get("email")).exists():
            return generate_response(
                status="error",
                code=status.HTTP_400_BAD_REQUEST,
                message="Email is already registered.",
            )
        # If the username and email are not taken, proceed with registration
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return generate_response(
                status="success",
                code=status.HTTP_201_CREATED,
                message="User registered successfully.",
                data={
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
            )

        # If serializer is invalid, return errors
        return generate_response(
            status="error",
            code=status.HTTP_400_BAD_REQUEST,
            message="Invalid data.",
            data=serializer.errors,
        )


class Home(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id=None):
        # If user_id is provided in the URL, fetch user by UUID
        if user_id:
            try:
                user = get_object_or_404(get_user_model(), id=user_id)
            except ValueError:
                return Response(
                    {"detail": "Invalid UUID format."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            # If no user_id is passed, use the logged-in user
            user = request.user

        content = {"message": f"Hello {user.username}!"}
        return Response(content)


class UserListView(APIView):
    authentication_classes = [JWTAuthentication]  # Require authentication
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        # Get all users
        users = get_user_model().objects.all()

        # Pagination
        paginator = PageNumberPagination()
        paginator.page_size = 10  # You can adjust the page size
        paginated_users = paginator.paginate_queryset(users, request)

        # Serialize the data
        serializer = UserListSerializer(paginated_users, many=True)

        # Return paginated response
        return paginator.get_paginated_response(serializer.data)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request, id=None):

        # Get the user object based on the provided UUID ID
        user = get_object_or_404(User, id=id)

        # Check if the requesting user is authorized to view the profile
        if request.user.id != user.id:
            return Response(
                {"status": "error", "message": "You can only view your own profile."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Serialize the user profile
        serializer = UserProfileSerializer(user)

        return Response(
            {
                "status": "success",
                "message": "User profile retrieved successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    def put(self, request, id=None):
        # Get the user object based on the provided UUID ID
        user = get_object_or_404(User, id=id)

        # Check if the user is updating their own profile
        if request.user.id != user.id:
            return Response(
                {"status": "error", "message": "You can only update your own profile."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Validate and update the user profile using the serializer
        serializer = UserProfileSerializer(
            user, data=request.data, partial=True
        )  # partial=True allows partial updates

        if serializer.is_valid():
            updated_user = serializer.save()  # Save the updated user profile
            return Response(
                {
                    "status": "success",
                    "code": status.HTTP_200_OK,
                    "message": "User profile updated successfully.",
                    "data": {
                        "id": updated_user.id,
                        "username": updated_user.username,
                        "email": updated_user.email,
                        "profile_picture": (
                            updated_user.profile_picture.url
                            if updated_user.profile_picture
                            else None
                        ),
                        "bio": updated_user.bio,
                    },
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"status": "error", "message": "Invalid data.", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # DELETE method to delete the profile
    def delete(self, request, id=None):
        user = get_object_or_404(User, id=id)

        # Ensure the user can only delete their own profile
        if request.user.id != user.id:
            return Response(
                {"status": "error", "message": "You can only delete your own profile."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Deleting the user profile
        user.delete()

        return Response(
            {"status": "success", "message": "User profile deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )


class FollowUnfollowView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id=None):
        user_to_follow = get_object_or_404(User, id=id)
        user = request.user

        if user.id == user_to_follow.id:
            return Response(
                {"status": "error", "message": "You cannot follow yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.is_following(user_to_follow):
            return Response(
                {
                    "status": "error",
                    "message": f"You are already following {user_to_follow.username}.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Follow the user
        user.follow(user_to_follow)

        return Response(
            {
                "status": "success",
                "message": f"You are now following {user_to_follow.username}.",
            },
            status=status.HTTP_200_OK,
        )

    def delete(self, request, id=None):
        user_to_unfollow = get_object_or_404(User, id=id)
        user = request.user

        if user.id == user_to_unfollow.id:
            return Response(
                {"status": "error", "message": "You cannot unfollow yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.is_following(user_to_unfollow):
            return Response(
                {
                    "status": "error",
                    "message": f"You are not following {user_to_unfollow.username}.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Unfollow the user
        user.unfollow(user_to_unfollow)

        return Response(
            {
                "status": "success",
                "message": f"You have unfollowed {user_to_unfollow.username}.",
            },
            status=status.HTTP_200_OK,
        )
