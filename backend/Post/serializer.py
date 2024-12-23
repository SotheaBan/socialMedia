from rest_framework import serializers
from .models import Post


class ListSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Post
        fields = [
            "id",
            "content",
            "image",
            "created_at",
            "updated_at",
            "likes",
            "author",
        ]


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = [
            "id",
            "content",
            "image",
            "created_at",
            "updated_at",
            "likes",
            "author",
        ]


# this is using for edit update and delete content
class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["content"]


class SearchUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
