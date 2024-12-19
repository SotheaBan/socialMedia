
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
