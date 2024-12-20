// body.jsx
import React from 'react';

export const NotificationHeader = ({ filterUnread, setFilterUnread }) => (
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

export const NotificationItem = ({ notification }) => (
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

export const EmptyState = () => (
  <div className="text-center text-gray-500 py-10">
    <p>No notifications to show.</p>
  </div>
);

export const NotificationFooter = ({ totalNotifications }) => (
  <div className="mt-6 text-center text-gray-500">
    {totalNotifications} Notifications
  </div>
);