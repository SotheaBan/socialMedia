from django.urls import path
from .views import Home, RegisterUser, UserListView


urlpatterns = [
    path("", Home.as_view()),
    path("register/", RegisterUser.as_view(), name="user_register"),
    path("users/", UserListView.as_view(), name="user-list"),
]
