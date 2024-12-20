from django.contrib import admin
from .models import Comment

# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display = ('post','author','content')


admin.site.register(Comment, PostAdmin)