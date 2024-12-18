
from django.urls import path
from . import views

urlpatterns = [
   path('comment/',views.CommentListCreate.as_view())

]