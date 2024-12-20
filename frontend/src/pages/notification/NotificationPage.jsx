import React, { useState } from 'react';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'liked your post',
      notification_type: 'like',
      created_at: '2024-12-20T01:40:46.371132Z',
      is_read: false,
    },
    {
      id: 2,
      message: 'commented on your photo',
      notification_type: 'comment',
      created_at: '2024-12-19T18:25:30.371132Z',
      is_read: true,
    },
    {
      id: 3,
      message: 'sent you a message',
      notification_type: 'message',
      created_at: '2024-12-18T14:10:15.371132Z',
      is_read: false,
    },
  ]);

  const getNotificationColor = (type) => {
    switch (type) {
      case 'like':
        return 'bg-blue-500';
      case 'comment':
        return 'bg-purple-500';
      case 'message':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, is_read: true }))
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">NOTIFICATIONS</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-between bg-white shadow-md rounded-lg p-4 ${notification.is_read ? '' : 'border-l-4 border-blue-500'}`}
          >
            <div className={`px-3 py-1 text-white text-sm font-semibold rounded ${getNotificationColor(notification.notification_type)}`}>
              {capitalizeFirstLetter(notification.notification_type)}
            </div>
            <div className="flex-grow mx-4">
              <h3 className="text-lg font-medium">{notification.message}</h3>
              <p className="text-gray-600 text-sm">{new Date(notification.created_at).toLocaleString()}</p>
            </div>
            <div className="text-gray-500 text-sm">{notification.is_read ? 'Read' : 'Unread'}</div>
          </div>
        ))}
      </div>
      <button
        onClick={markAllAsRead}
        className="mt-6 px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-600"
      >
        Mark All as Read
      </button>
    </div>
  );
};

export default NotificationPage;
