import React,{useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./context/UserContext";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import Dashboard from "./components/Dashboard";
import BookSlot from "./components/BookSlot";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import TurfList from "./components/TurfList";
import "./App.css";
import './index.css';

const App = () => {
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Save user on any change
    } else {
      localStorage.removeItem("user"); // Optional: clean up on logout
    }
  }, [user]);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-slot" element={<BookSlot />} />
          <Route path="/turflist" element={<TurfList />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
    </div>
    </UserContext.Provider>
  );
};

export default App;
