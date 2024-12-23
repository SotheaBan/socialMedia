from rest_framework.generics import ListCreateAPIView, ListAPIView
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.permissions import AllowAny
from Post.models import Post
from rest_framework.exceptions import NotFound

# Create your views here.

class CommentListCreate(ListCreateAPIView):
 
    permission_classes = [AllowAny]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentListView(ListAPIView):
  
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
      
        post_id = self.kwargs['pk']
        try:
            # Ensure that the post exists
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise NotFound(f"Post with id {post_id} not found.")
        
        # Return the comments related to this specific post
        return Comment.objects.filter(post=post)
