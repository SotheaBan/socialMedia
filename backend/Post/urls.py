from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    
    # this is where user are able to working on listing and posting 
    path('post/' , views.PostListCreateView.as_view()), 
    #this we using for updated with speicifies id 
    path('post/<int:id>/', views.PostDeleteUpdateView.as_view()),
    path('search/',views.SearchUser.as_view())
]