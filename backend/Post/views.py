from django.shortcuts import render
from .models import Post 
from rest_framework.generics import ListCreateAPIView , RetrieveUpdateDestroyAPIView
from .serializer import PostSerializer,UserPostSerializer
# Create your views here.

class PostListCreateView(ListCreateAPIView): 
    queryset = Post.objects.all() 
    serializer_class = PostSerializer


class PostDeleteUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserPostSerializer
    queryset = Post.objects.all() 
    lookup_field = 'id'








