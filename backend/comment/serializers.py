from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta :
        model = Comment
        fields = ['post','author', 'content','created_at','updated_at']
