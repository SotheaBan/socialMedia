import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ ProtectedRoute";
import './App.css';
import './index.css';
import Homepage from './components/home/homePage'
import LoginPage from './components//authentication/login/loginPage'
import Register from './components/authentication/login/components/Register';

function App() {
  return (
    <>
      <Register />
    </>
  )
}

export default App;
