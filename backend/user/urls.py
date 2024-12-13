from django.urls import path
from .views import Home, RegisterUser


urlpatterns = [
    path("", Home.as_view()),
    path("register/", RegisterUser.as_view(), name="user_register"),
]
