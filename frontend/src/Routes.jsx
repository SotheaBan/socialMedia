// src/Routes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/home/homePage'
import PostPage from './pages/Post/postPage'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'

const AppRoutes = () => {
  return (
    <Routes>
 
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/>
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
