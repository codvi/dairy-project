import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header id="header" className="d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">

      <div className="logo">
  <Link to="/" className="italic-bold">
    <img src='/logo1.png' alt="Nature Milk Food" className="img-fluid logo-img" /> Nature Milk Food
  </Link>
</div>


        <nav id="navbar" className="navbar">
          <ul>
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/products">Products</Link></li>
            <li><Link className="nav-link" to="/about">About</Link></li>
            <li><Link className="nav-link" to="/contact">Contact Us</Link></li>
            <li><Link className="nav-link" to="/login">Login</Link></li>
            <li><Link className="nav-link" to="/cart"><i className="bi bi-cart"></i> Cart</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>

      </div>
    </header>
  );
}
