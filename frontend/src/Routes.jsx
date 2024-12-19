// src/Routes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/home/homePage'
import PostPage from './pages/Post/postPage'
import Gallery from './pages/home/components/Gallery';
import Post from './pages/home/components/Post';

const AppRoutes = () => {
  return (
    <Routes>
 
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/gallery" element={<Gallery/>}/>
      <Route path="/posts" element={<Post/>}></Route>
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
