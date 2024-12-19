import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import UserList from "./pages/UserList";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Navbar</h1>

        <Routes>
          <Route
            path="/profile/:userId" // This is the route where user profiles are displayed
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
