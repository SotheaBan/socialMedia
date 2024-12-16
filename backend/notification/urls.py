from django.urls import path
from .views import NotificationListView, MarkNotificationAsReadView

urlpatterns = [
    path('', NotificationListView.as_view(), name='noti-list'),
    path('<int:id>/read/', MarkNotificationAsReadView.as_view(), name='mark-noti-read')
]
