from django.shortcuts import render
from .models import Post 
from rest_framework.generics import ListCreateAPIView , RetrieveUpdateDestroyAPIView,ListAPIView,RetrieveAPIView,CreateAPIView
from .serializer import PostSerializer,UserPostSerializer, ListSerializer
from rest_framework import filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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
        
@api_view(['POST'])
def Createpost(request):
        serializer = PostSerializer(data = request.data) 
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data,status= status.HTTP_201_CREATED)
        return Response ( serializer.errors, status= status.HTTP_400_BAD_REQUEST )
        





