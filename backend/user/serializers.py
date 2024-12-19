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
    followers_count = serializers.IntegerField(source="followers.count", read_only=True)
    following_count = serializers.IntegerField(source="following.count", read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "profile_picture",
            "bio",
            "followers_count",
            "following_count",
        ]

    def update(self, instance, validated_data):
        updated_fields = {}

        # Check and update the username
        username = validated_data.get("username", instance.username)
        if username != instance.username:
            instance.username = username
            updated_fields["username"] = username

        # Check and update the email
        email = validated_data.get("email", instance.email)
        if email != instance.email:
            instance.email = email
            updated_fields["email"] = email

        # Check and update the bio
        bio = validated_data.get("bio", instance.bio)
        if bio != instance.bio:
            instance.bio = bio
            updated_fields["bio"] = bio

        # Check and update the profile picture
        profile_picture = validated_data.get(
            "profile_picture", instance.profile_picture
        )
        if profile_picture != instance.profile_picture:
            instance.profile_picture = profile_picture
            updated_fields["profile_picture"] = profile_picture

        instance.save()

        # Now that the instance is saved, we can access the profile_picture URL
        if instance.profile_picture:
            updated_fields["profile_picture"] = instance.profile_picture.url

        # Return the updated instance (not a tuple)
        return instance