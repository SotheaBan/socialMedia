import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models


# Custom User Model
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile_picture = models.ImageField(
        upload_to="profile_pics/", null=True, blank=True
    )
    bio = models.TextField(max_length=500, null=True, blank=True)

    followers = models.ManyToManyField(
        "self", related_name="following", symmetrical=False, blank=True
    )

    def __str__(self):
        return self.username

    # Follow a user
    def follow(self, user):
        if not self.is_following(user):
            self.following.add(user)

    # Unfollow a user
    def unfollow(self, user):
        if self.is_following(user):
            self.following.remove(user)

    # Check if a user is following another user
    def is_following(self, user):
        return self.following.filter(id=user.id).exists()
