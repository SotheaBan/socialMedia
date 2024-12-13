from django.contrib.auth.models import AbstractUser
from django.db import models


# Custom User Model
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
