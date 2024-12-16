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

    def update(self, instance, validated_data):
        instance.bio = validated_data.get("bio", instance.bio)
        if "profile_picture" in validated_data:
            instance.profile_picture = validated_data.get(
                "profile_picture", instance.profile_picture
            )
        instance.save()
        return instance
