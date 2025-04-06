import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="Image not available" />
      </Link>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/book-slot">Turf/Play Area Booking</Link></li>
          {/* <li><Link to="/products">Shop for Sports Equipment</Link></li> */}
          <li><Link to="/dashboard">User Dashboard</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
      </div>

      {/* Menu Toggle Button */}
      <div id="nav-bar" onClick={toggleNavigation} style={{ cursor: "pointer" }}>
        {isOpen ? "+" : "=="}
      </div>
    </nav>
  );
};

export default Navbar;
