
from django.urls import path
from . import views

urlpatterns = [
   path('comment/',views.CommentListCreate.as_view()),
   path('<int:pk>/comments/',views.CommentListView.as_view())

]