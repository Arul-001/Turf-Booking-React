import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
 import Home from "./components/Home";
import Login from "./components/Login";
import Products from "./components/Products";
import Dashboard from "./components/Dashboard";
import BookSlot from "./components/BookSlot";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import "./App.css";
import './index.css';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
           <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-slot" element={<BookSlot />} /> 
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} /> 
          
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
