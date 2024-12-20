from django.urls import path
from .views import SearchView

urlpatterns = [
    # if  i put search/ it will not work because it overlap with urls.py in Post app
    path('searchh/', SearchView.as_view(), name='search')
]
