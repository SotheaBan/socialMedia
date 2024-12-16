from rest_framework import serializers
from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "profile_picture", "bio"]

    def update(self, instance, validated_data):
        # Check if the new username is already taken
        username = validated_data.get("username", instance.username)
        if (
            username != instance.username
            and User.objects.filter(username=username).exists()
        ):
            raise serializers.ValidationError(
                {"username": "This username is already taken."}
            )

        # Check if the new email is already taken
        email = validated_data.get("email", instance.email)
        if email != instance.email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {"email": "This email is already registered."}
            )

        # Update fields
        instance.username = username
        instance.email = email
        instance.bio = validated_data.get("bio", instance.bio)
        instance.profile_picture = validated_data.get(
            "profile_picture", instance.profile_picture
        )

        # Save the updated instance
        instance.save()
        return instance
