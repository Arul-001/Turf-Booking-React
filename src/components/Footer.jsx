import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaMedium, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
       <div className="footer-left">
        <h2>Want our help with something?</h2>
        <button className="reach-out">
          Reach Out <span className="email-icon">✉️</span>
        </button>
      </div>

      {/* Pages Section (Now before Contact) */}
      <div className="footer-pages">
        <h5>PAGES</h5>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/book-slot">Turf/Play Area Booking</Link></li>
          {/* <li><Link to="/products">Shop for Sports Equipment</Link></li> */}
          <li><Link to="/dashboard">User Dashboard</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>
      </div>

      {/* Contact Section (Now after Pages) */}
      <div className="footer-contact">
        <h5>CONTACT</h5>
        <p>support@booknplay.com</p>
        <p>+91 637 939 0128</p>

        <div className="footer-icons">
        <a href="#"><FaLinkedin /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaMedium /></a>
      </div>
      </div>
      
      <div className="footer-bottom">
        <span>© 2025 Book N Play, All rights reserved. <a href="#">Glossary</a></span>
      </div>
    </footer>
  );
};

export default Footer;

