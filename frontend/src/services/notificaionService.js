// src/services/notificationService.js

import { messaging } from "../firebase/config";
import { onMessage } from "@firebase/messaging";

export const initializeNotifications = async (userId, onNewNotification) => {
    try {
        const token = await requestNotificationPermission();
        if (token) {
            await registerDeviceToken(userId, token);
        }
        
        // Set up real-time listener
        return onMessage(messaging, (payload) => {
            console.log('New notification received:', payload);
            
            // Create notification object from payload
            const notification = {
                id: payload.data.notificationId,
                message: payload.notification.body,
                is_read: false,
                created_at: new Date().toISOString(),
                notification_type: payload.data.type,
                profile_picture: payload.data.profile_picture || null
            };

            // Call callback with new notification
            onNewNotification(notification);
            
            // Show browser notification
            showNotification(payload.notification);
        });
    } catch (error) {
        console.error('Error initializing notifications:', error);
    }
};