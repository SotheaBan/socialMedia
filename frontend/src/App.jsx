import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ ProtectedRoute";
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes'; // Import your routing setup
function App() {
  return (
    <>
      <Router>
          <AppRoutes />
      </Router>
    </>
  )
}

export default App;
