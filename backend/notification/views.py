from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification
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