// notificationPage.jsx
import React, { useState } from 'react';
import {
  NotificationHeader,
  NotificationItem,
  EmptyState,
  NotificationFooter,
} from './components/body';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'liked your post',
      notification_type: 'like',
      created_at: '2024-12-20T01:40:46.371132Z',
      is_read: false,
      profile_picture: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      message: 'commented on your photo',
      notification_type: 'comment',
      created_at: '2024-12-19T18:25:30.371132Z',
      is_read: true,
      profile_picture: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      message: 'sent you a message',
      notification_type: 'message',
      created_at: '2024-12-18T14:10:15.371132Z',
      is_read: false,
      profile_picture: 'https://via.placeholder.com/40',
    },
  ]);

  const [filterUnread, setFilterUnread] = useState(false);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, is_read: true }))
    );
  };

  const filteredNotifications = filterUnread
    ? notifications.filter((n) => !n.is_read)
    : notifications;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <NotificationHeader filterUnread={filterUnread} setFilterUnread={setFilterUnread} />
      {filteredNotifications.length > 0 ? (
        filteredNotifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      ) : (
        <EmptyState />
      )}
      <button
        onClick={markAllAsRead}
        className="mt-6 px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-600"
      >
        Mark All as Read
      </button>
      <NotificationFooter totalNotifications={notifications.length} />
    </div>
  );
};

export default NotificationPage;