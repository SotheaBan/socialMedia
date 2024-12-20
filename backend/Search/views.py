from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializer import UserSerializer, PostSerializer
from user.models import User
from Post.models import Post
from rest_framework.permissions import AllowAny
# Create your views here.

class SearchView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        query = request.query_params.get("q", "")
        if not query:
            return Response({"error": "you need a search query"}, status=status.HTTP_400_BAD_REQUEST)
        
        users = User.objects.filter(
            Q(username__icontains=query) | Q(bio__icontains=query)
        )

        posts = Post.objects.filter(
            Q(content__icontains=query) | 
            Q(author__username__icontains=query)  
        ).select_related('author')  

        user_serializer = UserSerializer(users, many=True)
        post_serializer = PostSerializer(posts, many=True)

        return Response({
            "users": user_serializer.data,  
            "posts": post_serializer.data
        }, status=status.HTTP_200_OK)

