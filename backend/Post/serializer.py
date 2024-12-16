from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer): 
    class Meta:
        model= Post
        fields = '__all__'


#this is using for edit update and delete content 
class UserPostSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Post
        fields = ['content']

class SearchUserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Post
        fields = '__all__'