# Create your views here.
from rest_framework import status
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

# from datetime import timedelta


class CustomTokenObtainPairView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access this view

    def post(self, request, *args, **kwargs):
        # Get email and password from request data
        email = request.data.get("email")
        password = request.data.get("password")

        # Validate input data
        if not email or not password:
            return Response(
                {"detail": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Try to find the user by email (not by username)
        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"detail": "Invalid email or password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the password is correct
        if not user.check_password(password):
            return Response(
                {"detail": "Invalid email or password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Generate the tokens manually if user is valid
        from rest_framework_simplejwt.tokens import RefreshToken

        # Generate the tokens manually if user is valid
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Calculate token expiration time (convert the Unix timestamp to a readable date)
        exp_time = None
        time_remaining = None
        try:
            access_token_obj = AccessToken(access_token)
            exp_timestamp = access_token_obj.payload.get("exp")

            # Convert Unix timestamp to a timezone-aware datetime
            naive_datetime = datetime.utcfromtimestamp(exp_timestamp)  # naive datetime
            aware_datetime = timezone.make_aware(
                naive_datetime, timezone=timezone.utc
            )  # make it timezone-aware
            exp_time = timezone.localtime(aware_datetime).strftime(
                "%Y-%m-%d %H:%M:%S"
            )  # convert to local time

            # Calculate remaining time in minutes
            time_diff = aware_datetime - timezone.now()
            time_remaining = (
                time_diff.total_seconds() // 60
            )  # remaining time in minutes
        except TokenError:
            exp_time = None
            time_remaining = None

        # Prepare the custom response with user data and tokens
        custom_response_data = {
            "access_token": access_token,
            "refresh_token": str(refresh),
            "token_expiration": exp_time,  # Human-readable expiration time
            "time_remaining_minutes": time_remaining,  # Remaining time in minutes
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
        }

        return Response(custom_response_data, status=status.HTTP_200_OK)


class RegisterUser(APIView):
    authentication_classes = []  # Disable authentication for this view
    permission_classes = [AllowAny]  # Allow any user to access this view

    def post(self, request):
        User = get_user_model()
        # Check if the username already exists
        if User.objects.filter(username=request.data.get("username")).exists():
            return Response(
                {"detail": "Username already taken."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the email already exists
        if User.objects.filter(email=request.data.get("email")).exists():
            return Response(
                {"detail": "Email is already registered."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If the username and email are not taken, proceed with registration
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "User registered successfully.",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                },
                status=status.HTTP_201_CREATED,
            )


class Home(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        content = {"message": f"Hello {user.username} user!"}

        return Response(content)
