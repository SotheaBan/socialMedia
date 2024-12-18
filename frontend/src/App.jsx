
import './App.css';
import './index.css';
import Homepage from './components/home/homePage'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes'; // Import your routing setup
import Register from './components/user/Register';
import Profile from './components/user/Profile';
function App() {


  return (
    <>
      <Router>
          {/* <AppRoutes /> */}
          <Profile/>
      </Router>
    </>
  )
}

export default App
