import React, { useState } from 'react'; 

import './Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 
  const handleSubmit = (e) => {
    e.preventDefault(); 

    
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);

    setError(''); 
  };

  return (
   
    <div className="login-container">
      
     
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <span>Forgot Password?</span>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
