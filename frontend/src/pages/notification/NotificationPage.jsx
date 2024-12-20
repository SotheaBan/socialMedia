import React, { useState } from 'react';

const NotificationHeader = ({ filterUnread, setFilterUnread }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">Notifications</h2>
    <div className="flex space-x-2">
      <button
        onClick={() => setFilterUnread(false)}
        className={`px-4 py-2 rounded-lg ${filterUnread ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
      >
        All
      </button>
      <button
        onClick={() => setFilterUnread(true)}
        className={`px-4 py-2 rounded-lg ${filterUnread ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
      >
        Unread
      </button>
    </div>
  </div>
);

const NotificationItem = ({ notification }) => (
  <div
    key={notification.id}
    className={`flex items-center justify-between bg-white shadow-md rounded-lg p-4 ${notification.is_read ? '' : 'border-l-4 border-blue-500'}`}
  >
    <img
      src={notification.profile_picture}
      alt="Profile"
      className="w-10 h-10 rounded-full"
    />
    <div className="flex-grow mx-4">
      <h3 className="text-lg font-medium">{notification.message}</h3>
      <p className="text-gray-600 text-sm">{new Date(notification.created_at).toLocaleString()}</p>
    </div>
    <div className="text-gray-500 text-sm">{notification.is_read ? 'Read' : 'Unread'}</div>
  </div>
);

const EmptyState = () => (
  <div className="text-center text-gray-500 py-10">
    <p>No notifications to show.</p>
  </div>
);

const NotificationFooter = ({ totalNotifications }) => (
  <div className="mt-6 text-center text-gray-500">
    {totalNotifications} Notifications
  </div>
);

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
