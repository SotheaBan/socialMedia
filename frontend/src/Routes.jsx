import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/home/homePage";
import PostPage from "./pages/Post/postPage";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import UserList from "./pages/profiles/UserList";
import UserProfile from "./pages/profiles/UserProfile";
import EditProfile from "./pages/profiles/EditProfile";
import Followers from "./pages/profiles/Followers";
import Following from "./pages/profiles/Following";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root URL to /home */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/home" element={<Homepage />} />

      {/* Protected Routes */}
      <Route
        path="/post"
        element={
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile/:userId"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:userId/followers"
        element={
          <ProtectedRoute>
            <Followers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:userId/following"
        element={
          <ProtectedRoute>
            <Following />
          </ProtectedRoute>
        }
      />

      {/* Catch-all for invalid routes */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRoutes;
