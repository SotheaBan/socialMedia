from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Comment 
from .serializers import CommentSerializer
# Create your views here.

class CommentListCreate(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer