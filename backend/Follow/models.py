from django.db import models

from user.models import User

# Create your models here.
class Follow(models.Model):
    follower = models.ForeignKey(User, related_name="follower" , on_delete=models.CASCADE)
    following= models.ForeignKey(User, related_name="following_user" , on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    
  