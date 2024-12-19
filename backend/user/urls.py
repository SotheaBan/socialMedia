from django.urls import path
from .views import Home, RegisterUser, UserListView, UserProfileView, FollowUnfollowView


urlpatterns = [
    path("", Home.as_view()),
    path("register/", RegisterUser.as_view(), name="user_register"),
    path("users/", UserListView.as_view(), name="user-list"),
    path("users/<uuid:id>/", UserProfileView.as_view(), name="user-profile"),
    path(
        "users/<uuid:id>/follow/",
        FollowUnfollowView.as_view(),
        name="user-follow-unfollow",
    ),
]
