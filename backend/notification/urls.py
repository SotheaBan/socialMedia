from django.urls import path
from django.views.generic import TemplateView
from .views import NotificationListView, MarkNotificationAsReadView, CreateNotificationView

urlpatterns = [
    path('test/', TemplateView.as_view(template_name='notification/index.html'), name='notification-home'),
    path('', NotificationListView.as_view(), name='noti-list'),
    path('<int:id>/read/', MarkNotificationAsReadView.as_view(), name='mark-noti-read'),
    path('create/', CreateNotificationView.as_view(), name='create-notification')
]