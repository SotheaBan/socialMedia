// src/pages/notification/NotificationPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { getUserId } from '../../utils/authHelper';
import Navbar from '../home/components/navbar';
import Sidebar from '../home/components/side_bar';
import { initializeNotifications } from '../../services/notificaionService';
import {
  NotificationHeader,
  NotificationItem,
  EmptyState,
  NotificationFooter,
} from './components/body';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filterUnread, setFilterUnread] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNewNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notification');
        if (response.data) {
          setNotifications(response.data);
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    const setupNotifications = async () => {
      try {
        const userId = getUserId();
        const unsubscribe = await initializeNotifications(userId, handleNewNotification);
        await fetchNotifications();
        return () => {
          if (unsubscribe) unsubscribe();
        };
      } catch (err) {
        console.error('Error setting up notifications:', err);
        setError('Failed to initialize notifications');
        setLoading(false);
      }
    };

    setupNotifications();
  }, [handleNewNotification]);

  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications
          .filter(n => !n.is_read)
          .map(notification =>
            axiosInstance.post(`/notifications/${notification.id}/read/`)
          )
      );

      setNotifications(prev =>
        prev.map(notification => ({ ...notification, is_read: true }))
      );
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axiosInstance.post(`/notifications/${notificationId}/read/`);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const filteredNotifications = filterUnread
    ? notifications.filter(n => !n.is_read)
    : notifications;

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="bg-[#ffffff] md">
      <Navbar />
      <div className="grid grid-cols-7 h-screen overflow-hidden">
        <div className="md:bg-[#490057] h-full overflow-hidden">
          <Sidebar />
        </div>
        <div className="col-span-7 md:col-span-5 overflow-hidden">
          <div className="p-6 bg-white-100 min-h-screen">
            <NotificationHeader
              filterUnread={filterUnread}
              setFilterUnread={setFilterUnread}
            />
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <div onClick={() => markAsRead(notification.id)} key={notification.id}>
                  <NotificationItem notification={notification} />
                </div>
              ))
            ) : (
              <EmptyState />
            )}
            {notifications.some(n => !n.is_read) && (
              <button
                onClick={markAllAsRead}
                className="mt-6 px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-600"
              >
                Mark All as Read
              </button>
            )}
            <NotificationFooter totalNotifications={notifications.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;