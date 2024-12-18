from django.urls import path
from .views import SearchView

urlpatterns = [
    path('searchh/', SearchView.as_view(), name='search')
]
