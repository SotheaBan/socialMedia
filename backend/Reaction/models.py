from django.db import models
from user.models import User
from Post.models import Post


# Create your models here.
class Reaction(models.Model):
    CHOICE_LIKE = "like"
    CHOICE_LOVE = "love"
    CHOICE_LAUGH = "laugh"

    # Define choices as a list of tuples
    REACTION_CHOICES = [
        (CHOICE_LIKE, "Like"),
        (CHOICE_LOVE, "Love"),
        (CHOICE_LAUGH, "Laugh"),
    ]

    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reaction_type = models.CharField(
        choices=REACTION_CHOICES, default="like", max_length=5
    )

    def __str__(self):

        return self.post
