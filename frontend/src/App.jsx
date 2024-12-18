import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      {" "}
      <div className="App">
        <h1>Navbar</h1>

        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
