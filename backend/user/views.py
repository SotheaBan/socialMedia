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
from .serializers import UserRegisterSerializer
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime
from .utils.responses import generate_response
import pytz


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

            # Convert the expiration time from UTC to Cambodia timezone (UTC+7)
            utc_exp_time = datetime.utcfromtimestamp(exp_timestamp).replace(
                tzinfo=pytz.utc
            )
            cambodia_tz = pytz.timezone("Asia/Phnom_Penh")
            local_exp_time = utc_exp_time.astimezone(cambodia_tz)

            # Convert to string format for response
            exp_time = local_exp_time.strftime("%Y-%m-%d %H:%M:%S")

            # Calculate time remaining (in minutes)
            now = timezone.now()
            time_remaining = (local_exp_time - now).total_seconds() / 60.0  # in minutes
        except TokenError:
            exp_time = None
            time_remaining = None

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
