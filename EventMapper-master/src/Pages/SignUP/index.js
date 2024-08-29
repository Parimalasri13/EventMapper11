
import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast

import { useAuth } from '../../AuthContext';

const Signin = () => {
  const { login } = useAuth();
  const Navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState(''); // Added state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await axios.post('https://eventmapper11.onrender.com/login', { email, password });
      console.log('Response:', response.data);
      toast.success('Login successful!.');
      login();
      Navigate('/');
      setMessage('Login successful!');

      setError('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      setMessage('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://eventmapper11.onrender.com/register', { username, email, password,confirmPassword });
      console.log('Response:', response.data);
      toast.success('Registration successful! You can now log in.');
      setMessage('Registration successful! You can now log in.');
      setError('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      setMessage('');
    }
  };

  return (
    <div>
      <div className="container-unique">
        <div className={`slider-unique ${isSignup ? 'moveslider-unique' : ''}`}></div>
        <div className="btn-unique">
          <button className="login-unique" onClick={() => setIsSignup(false)}>Login</button>
          <button className="signup-unique" onClick={() => setIsSignup(true)}>Signup</button>
        </div>
        <div className={`form-section-unique ${isSignup ? 'form-section-move-unique' : ''}`}>
          <div className={`login-box-unique ${isSignup ? 'hide' : ''}`}>
            <input
              type="email"
              className="email-unique ele-unique"
              placeholder="youremail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="password-unique ele-unique"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="clkbtn-unique" onClick={handleLogin}>Login</button>
          </div>
          <div className={`signup-box-unique ${isSignup ? '' : 'hide'}`}>
            <input
              type="text" // Changed from "username" to "text"
              className="name-unique ele-unique"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Added handler
            />
            <input
              type="email"
              className="email-unique ele-unique"
              placeholder="youremail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="password-unique ele-unique"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="confirm-password-unique ele-unique"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="clkbtn-unique" onClick={handleRegister}>Signup</button>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default Signin;
