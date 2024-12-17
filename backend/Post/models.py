from django.db import models
from user.models import User
from datetime import datetime 
# Create your models here.
class Post(models.Model): 
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    content = models.TextField(max_length=50 ) 
    image = models.ImageField(upload_to='image/')
    created_at = models.DateTimeField(default=datetime.now())
    updated_at = models.DateTimeField(default=datetime.now())
    likes = models.IntegerField(default=0)
    

   
