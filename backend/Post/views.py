from django.shortcuts import render
from .models import Post
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
)
from .serializer import PostSerializer, UserPostSerializer, ListSerializer
from rest_framework import filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.


class ListCreateView(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = ListSerializer


class PostDeleteUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserPostSerializer
    queryset = Post.objects.all()
    lookup_field = "id"


class SearchUser(ListAPIView):
    serializer_class = UserPostSerializer
    queryset = Post.objects.all()


@api_view(["POST"])
@permission_classes([AllowAny])
def Createpost(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        user = request.user

        # Check if the user already liked the post
        if user in post.liked_by.all():
            post.liked_by.remove(user)  # Unfollow (remove like)
            post.likes -= 1  # Decrement like count
        else:
            post.liked_by.add(user)  # Add like
            post.likes += 1  # Increment like count

        post.save()  # Save updated post

        return Response({"likes": post.likes}, status=status.HTTP_200_OK)

    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
