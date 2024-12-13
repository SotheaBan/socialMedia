from django.db import models
from user.models import User
from Post.models import Post
# Create your models here.
class Reaction(models.Model): 
    Choice = {
        "like" : "Like",
        "love" : "Love",
        "Laugh" : "laugh",
    }
    
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    reaction_type = models.CharField(choices=Choice , default='like' , max_length=5)
    def __str__(self):

        return  self.post