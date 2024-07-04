import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in:', formData);

    // Simulate a successful login and redirect to home
    // You should replace this with actual login logic
    setTimeout(() => {
      alert('Login successful!');
      navigate('/home'); // Redirect to home page
    }, 500); // Simulate a short delay
  };

  const handleSignUpClick = () => {
    navigate('/register'); // Redirect to register page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <button
          type="button"
          className="sign-up-button"
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
