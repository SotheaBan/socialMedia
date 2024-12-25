from django.urls import path
from .views import NotificationListView, MarkNotificationAsReadView, CreateNotificationView, RegisterDeviceView

urlpatterns = [
    path('', NotificationListView.as_view(), name='noti-list'),
    path('<int:id>/read/', MarkNotificationAsReadView.as_view(), name='mark-noti-read'),
    path('create/', CreateNotificationView.as_view(), name='create-notification'),  # Remove typo: .as_view instead of .as_view()
    path('register-device/', RegisterDeviceView.as_view(), name='register-device'),
]