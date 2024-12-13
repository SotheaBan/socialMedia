from django.contrib import admin
from .models import Reaction
# Register your models here.c


class ReactionAdmin(admin.ModelAdmin):
    list_display = ('post', 'user')


admin.site.register(Reaction, ReactionAdmin)