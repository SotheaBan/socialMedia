import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import UserList from "./pages/UserList";
import EditProfile from "./pages/EditProfile";
import Following from "./pages/Following";
import Followers from "./pages/Followers";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Navbar</h1>

        <Routes>
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
                <EditProfile />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/profile/:userId/followers" element={<Followers />} />
          <Route path="/profile/:userId/following" element={<Following />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
