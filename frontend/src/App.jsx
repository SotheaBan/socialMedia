import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'; // Keep only this import
import AppRoutes from './Routes'; // Import your routing setup
import './index.css';

function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
