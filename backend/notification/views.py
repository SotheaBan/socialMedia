from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializer import NotificationSerializer
# Create your views here.

class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(user=request.user).order_by('-created_at')
        serializers = NotificationSerializer(notifications, many=True)
        fields = ['id', 'message', 'notification_type', 'created_at', 'is_read']

class MarkNotificationAsReadView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, id):
        notification = get_object_or_404
        if notification.is_read:
            return Response({"message": "Already marked as Read"})
        
        notification.is_read = True
        notification.save()
        return Response({"message": "Marked as Read"})
