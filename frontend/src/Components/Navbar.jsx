import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [farmerName, setFarmerName] = useState(''); // State to store farmer name

  useEffect(() => {
    // Check if token exists in localStorage to determine login status
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
      // Decode token to get farmer details (assuming it's in JWT format)
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setFarmerName(decodedToken.farmer.farmerName); // Assuming farmerName is part of your decoded token
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    setFarmerName(''); 
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-5 py-4 grid grid-cols-3 md:flex justify-between">
        <div className="flex items-start p-4">
          <Link to="/" className="flex items-center text-lg font-bold italic">
            <img src='/logo1.png' alt="Nature Milk Food" className="h-8 w-8 mr-2" /> CowCare Dairy
          </Link>
        </div>
        
        <div className="hidden md:flex start justify-center space-x-6 px-3 py-2">
          <Link className="text-gray-700 hover:text-gray-900" to="/dashboard">Dashboard</Link>
          <Link className="text-gray-700 hover:text-gray-900" to="/product">Products</Link>
          <Link className="text-gray-700 hover:text-gray-900" to="/cart"><i className="bi bi-cart"></i> Cart</Link>
        </div>
        
        <div className="flex justify-end items-center">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">{farmerName}</span>
              <button onClick={handleLogout} className="text-gray-700 hover:text-gray-900 focus:outline-none">Sign Out</button>
            </div>
          ) : (
            <Link className="text-gray-700 hover:text-gray-900" to="/login">Login</Link>
          )}
          <button onClick={toggleMenu} className="md:hidden ml-4 text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className={`col-span-3 ${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <ul className="space-y-2">
            <li><Link className="block text-gray-700 hover:text-gray-900" to="/dashboard">Dashboard</Link></li>
            <li><Link className="block text-gray-700 hover:text-gray-900" to="/product">Products</Link></li>
            <li><Link className="block text-gray-700 hover:text-gray-900" to="/cart"><i className="bi bi-cart"></i> Cart</Link></li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="block text-gray-700 hover:text-gray-900 focus:outline-none">Sign Out</button>
              ) : (
                <Link className="block text-gray-700 hover:text-gray-900" to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
