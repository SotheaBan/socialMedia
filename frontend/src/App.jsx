
import './App.css';
import './index.css';
import Homepage from './components/home/homePage'
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

export default App
