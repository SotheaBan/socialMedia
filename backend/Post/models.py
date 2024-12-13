from django.db import models

# Create your models here.
class Post(models.Model): 
    #author 
    content = models.TextField(max_length=50 ) 
    image = models.ImageField(uplaod_to='image/')
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    likes = models.IntegerField()

    def __str__(self):
        return  self.content 