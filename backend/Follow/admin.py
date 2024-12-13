from django.contrib import admin

from .models import Follow

# Register your models here.


class FollowAdmin(admin.ModelAdmin):
    list_display = ['follower']

# Register the model with the admin site
admin.site.register(Follow, FollowAdmin)