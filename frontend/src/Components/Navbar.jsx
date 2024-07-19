import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [farmerName, setFarmerName] = useState(''); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); 
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setFarmerName(decodedToken.farmer.farmerName); 
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false); 
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
    <nav className="bg-green-200 shadow-md">
      <div className="container mx-auto px-5 py-4 grid grid-cols-3 md:flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-lg font-bold italic text-green-800">
            <img src='/logo1.png' alt="Nature Milk Food" className="h-8 w-8 mr-2" /> CowCare Dairy
          </Link>
        </div>
        
        <div className="hidden md:flex justify-center space-x-6 px-3 py-2">
          <Link className="text-green-800 hover:text-green-900 font-semibold" to="/dashboard">
            <i className="fas fa-tractor"></i> Dashboard
          </Link>
          <Link className="text-green-800 hover:text-green-900 font-semibold" to="/product">
            <i className="fas fa-cow"></i> Products
          </Link>
          <Link className="text-green-800 hover:text-green-900 font-semibold" to="/cart">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
        </div>
        
        <div className="flex justify-end items-center">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-green-800 font-semibold">{farmerName}</span>
              <button onClick={handleLogout} className="text-green-800 hover:text-green-900 focus:outline-none font-semibold">
                <i className="fas fa-sign-out-alt"></i> Sign Out
              </button>
            </div>
          ) : (
            <Link className="border px-2 py-1 bg-green-300 rounded-lg text-green-800 hover:text-green-900 font-semibold" to="/login">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          )}
          <button onClick={toggleMenu} className="md:hidden ml-4 text-green-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className={`col-span-3 ${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <ul className="space-y-2">
            <li><Link className="block text-green-800 hover:text-green-900 font-semibold" to="/dashboard">
              <i className="fas fa-tractor"></i> Dashboard
            </Link></li>
            <li><Link className="block text-green-800 hover:text-green-900 font-semibold" to="/product">
              <i className="fas fa-cow"></i> Products
            </Link></li>
            <li><Link className="block text-green-800 hover:text-green-900 font-semibold" to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link></li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="border block text-green-800 hover:text-green-900 focus:outline-none font-semibold">
                  <i className="fas fa-sign-out-alt"></i> Sign Out
                </button>
              ) : (
                <Link className="block text-green-800 hover:text-green-900 font-semibold" to="/login">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
