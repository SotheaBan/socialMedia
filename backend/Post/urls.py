from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    
    # this is where user are able to working on listing and posting 
    path('postlist/' , views.ListCreateView.as_view()), 
    path('post/' , views.Createpost), 
    #this we using for updated with speicifies id 
    path('post/<int:id>/', views.PostDeleteUpdateView.as_view()),
    path('search/',views.SearchUser.as_view())
]