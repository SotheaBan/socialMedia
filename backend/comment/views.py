from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Comment 
from .serializers import CommentSerializer
from rest_framework.permissions import AllowAny
# Create your views here.

class CommentListCreate(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer