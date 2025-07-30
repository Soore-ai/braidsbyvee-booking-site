import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Braids by Vee</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/book">Book</Link>
        <Link to="/media-upload" className="admin-login-button">Admin Login</Link> {/* 👈 Clear button */}
      </div>
    </nav>
  );
}

export default Navbar;
