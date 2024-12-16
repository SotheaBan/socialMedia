from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification
from .models import User
from .serializer import NotificationSerializer


class NotificationListView(APIView):
    # permission_classes = [IsAuthenticated]  # Temporarily removed for testing

    def get(self, request):
        # Temporarily fetching notifications for all users for testing purposes
        notifications = Notification.objects.all().order_by('-created_at')  # For testing only
        serializers = NotificationSerializer(notifications, many=True)
        return Response(serializers.data, status=200)


class MarkNotificationAsReadView(APIView):
    # permission_classes = [IsAuthenticated]  # Temporarily removed for testing
    
    def post(self, request, id):
        notification = get_object_or_404(Notification, id=id)  # Temporarily not checking user
        if notification.is_read:
            return Response({"message": "Already marked as Read"}, status=400)
        
        notification.is_read = True
        notification.save()
        return Response({"message": "Marked as Read"}, status=200)
    
class CreateNotificationView(APIView):

    def post(self, request):
        user_id = request.data.get('user_id')
        message = request.data.get('message')
        notification_type = request.data.get('notification_type')

        if not user_id or not message or not notification_type:
            return Response({"error": "All Fields are required"})
        
        user = User.objects.filter(id=user_id).first()
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        notification = Notification.objects.create(
            user=user,
            message=message,
            notification_type=notification_type
        )
        
        serializer = NotificationSerializer(notification)
        return Response(serializer.data, status=201)

