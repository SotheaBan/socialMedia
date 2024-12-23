from channels.generic.websocket import AsyncWebsocketConsumer
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
import json
import logging

logger = logging.getLogger(__name__)

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.notification_group_name = 'notifications'
        await self.accept()
        await self.channel_layer.group_add(
            self.notification_group_name,
            self.channel_name
        )
        logger.debug(f"WebSocket connected: {self.channel_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.notification_group_name,
            self.channel_name
        )
        logger.debug(f"WebSocket disconnected: {self.channel_name}")

    async def notification_message(self, event):
        logger.debug(f"Notification received: {event}")
        await self.send(text_data=json.dumps({
            'type': 'notification',
            'message': event['message'],
            'notification_type': event['notification_type']
        }))
