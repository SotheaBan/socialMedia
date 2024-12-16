from django.shortcuts import render
from .models import Post 
from rest_framework.generics import ListCreateAPIView , RetrieveUpdateDestroyAPIView,ListAPIView,RetrieveAPIView,CreateAPIView
from .serializer import PostSerializer,UserPostSerializer, ListSerializer
from rest_framework import filters
# Create your views here.

class ListCreateView(ListCreateAPIView): 
    queryset = Post.objects.all() 
    serializer_class = ListSerializer

class PostCreateView(CreateAPIView): 
    queryset = Post.objects.all() 
    serializer_class = PostSerializer

class PostDeleteUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserPostSerializer
    queryset = Post.objects.all() 
    lookup_field = 'id'

class SearchUser(ListAPIView): 
    serializer_class = UserPostSerializer
    queryset = Post.objects.all() 
        






