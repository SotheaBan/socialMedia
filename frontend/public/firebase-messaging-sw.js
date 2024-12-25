// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBLhbe0_lRagJdE14PempS0Wy-n-_9ZsrE",
  authDomain: "socialmedia-8b505.firebaseapp.com", 
  projectId: "socialmedia-8b505",
  storageBucket: "socialmedia-8b505.firebasestorage.app",
  messagingSenderId: "92896124070",
  appId: "1:92896124070:web:0bfbe29b7e61c172d36867",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/icon.png',
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});