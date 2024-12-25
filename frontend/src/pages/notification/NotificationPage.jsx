// notificationPage.jsx
import React, { useState } from 'react';
import Navbar from '../home/components/navbar';
import Sidebar from '../home/components/side_bar';
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
    // ... other notifications
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
    <div className="bg-[#ffffff] md">
        <Navbar />
      <div className="grid grid-cols-7 h-screen overflow-hidden">
        <div className="md:bg-[#490057] h-full overflow-hidden">
          <Sidebar />
        </div>
        <div className="col-span-7 md:col-span-5 overflow-hidden">
          <div className="p-6 bg-white-100 min-h-screen">
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
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;