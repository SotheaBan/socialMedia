from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Notification
from .models import User
from .serializer import NotificationSerializer
from firebase_admin import messaging
from .models import DeviceToken

class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Only fetch notifications for the authenticated user
        notifications = Notification.objects.filter(user=request.user).order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=200)


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

class RegisterDeviceView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        token = request.data.get('fcm_token')
        
        if not token:
            return Response({'error': 'Token is required'}, status=400)
            
        DeviceToken.objects.get_or_create(user=user, token=token)
        return Response({'status': 'success'}, status=201)

def send_push_notification(user_id, notification_type, message):
    try:
        # Get all device tokens for the user
        tokens = DeviceToken.objects.filter(user_id=user_id).values_list('token', flat=True)
        
        if not tokens:
            return
            
        # Construct message
        message = messaging.MulticastMessage(
            tokens=list(tokens),
            notification=messaging.Notification(
                title=f"New {notification_type}",
                body=message
            ),
            data={
                'type': notification_type
            }
        )
        
        # Send message
        response = messaging.send_multicast(message)
        return response
    except Exception as e:
        print(f"Error sending push notification: {e}")