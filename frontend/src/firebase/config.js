// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLhbe0_lRagJdE14PempS0Wy-n-_9ZsrE",
  authDomain: "socialmedia-8b505.firebaseapp.com", 
  projectId: "socialmedia-8b505",
  storageBucket: "socialmedia-8b505.firebasestorage.app",
  messagingSenderId: "92896124070",
  appId: "1:92896124070:web:0bfbe29b7e61c172d36867",
  measurementId: "G-XRHLXL2Q9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// Request notification permission and get token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BFowW-qyFB8mejkqIiI_-svL5U6ftxUc3jiFJyUbCVx2wlTzjjZ8ZScDRWAYuFakyMJTWHIwDYRTOG3I_sul5TY'
      });
      return token;
    }
  } catch (err) {
    console.log('An error occurred while retrieving token:', err);
  }
};

export { messaging };