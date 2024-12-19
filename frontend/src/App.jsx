
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes'; // Import your routing setup
import Gallery from './pages/home/components/Gallery';
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
