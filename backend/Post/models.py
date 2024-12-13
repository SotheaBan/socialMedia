from django.db import models
from user.models import User
# Create your models here.
class Post(models.Model): 
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    content = models.TextField(max_length=50 ) 
    image = models.ImageField(upload_to='image/')
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    likes = models.IntegerField()

    def __str__(self):
        return self.content
