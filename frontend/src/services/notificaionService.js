import { messaging } from "../firebase/config";
import { onMessage } from "@firebase/messaging";

export const initializeNotifications = async (userId) => {
    try {
        const token = await requestNotificationPermission();
        if (token) {
            // send FCM token to the backend
            await registerDeviceToken(userId, token);
        }
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            showNotification(payload.notification);
        });
    } catch (error) {
        console.log('An error occurred while initializing notifications:', error);
    }
};

const registerDeviceToken = async (userId, token) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/notifications/register-device/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                user_id: userId,
                fcm_token: token
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error registering device token:', error);
    }
}

const showNotification = (notification) => {
    if ('Notification' in window) {
            new Notification(notification.title, {
                body: notification.body,
                icon: notification.icon
            });
    }
}