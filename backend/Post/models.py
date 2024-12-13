from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    profile_picture = models.ImageField(
        upload_to="profile_pics/", null=True, blank=True
    )
    bio = models.TextField(max_length=500, null=True, blank=True)

    followers = models.ManyToManyField(
        "self", related_name="following", symmetrical=False, blank=True
    )

    def __str__(self):
        return self.username


class Post(models.Model):
    # author
    content = models.TextField(max_length=50)
    image = models.ImageField(uplaod_to="image/")
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    likes = models.IntegerField()

    def __str__(self):
        return self.content
