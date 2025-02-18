import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer>
      <div className="footer-content container">
        <p>&copy; 2024 Book N Play. All Rights Reserved.</p>
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <p>
          <Link to="/contact-us">Contact Us</Link> | 
          <Link to="/about-us">About Us</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;