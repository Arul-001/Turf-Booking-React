import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <main className="container">
      {/* Banner Section */}
      <section className="index-head">
        <div className="banner">
          <h1>Welcome to Book N Play</h1>
          <p>Your one-stop solution for booking sports turfs and buying sports equipment!</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="service">
        <h1>Our Services</h1>
        <p>
          Book a Turf or Play Area: Find the perfect venue for your next game.
          Choose from a variety of indoor and outdoor turfs based on your
          location, sport type, and availability.
        </p>
        <p>
          Shop Sports Equipment: Browse our categories for a wide range of
          quality sports gear at competitive prices.
        </p>
      </section>

      {/* Turfs & Offers Section */}
      <section className="turfs-offers">
        <div className="turfs">
          <h2>Featured Turfs</h2>
          <div className="rows">
            <div className="turfs-col">
              <h3>Football Turf (Outdoor)</h3>
              <p>Location: Salem</p>
              <p>Price: Starting from 500/hour</p>
            </div>
            <div className="turfs-col">
              <h3>Indoor Badminton Court</h3>
              <p>Location: Coimbatore</p>
              <p>Price: Starting from 700/hour</p>
            </div>
            <div className="turfs-col">
              <h3>Tennis Court (Outdoor)</h3>
              <p>Location: Trichy</p>
              <p>Price: Starting from 400/hour</p>
            </div>
            <Link to="/book-slot" className="button">View More Turfs</Link>
          </div>
        </div>

        <div className="offers">
          <h2>Special Offers on Sports Equipment</h2>
          <div className="rows">
            <div className="offers-col">
              <h3>Football Starter Kit <br />20% Off</h3>
              <p>
                Includes a football, shin guards, and training cones. Perfect
                for beginners!
              </p>
            </div>
            <div className="offers-col">
              <h3>Cricket Bat Combo Deal <br />Buy 1, Get 1 Free</h3>
              <p>Available for a limited time only!</p>
            </div>
            <div className="offers-col">
              <h3>Tennis Gear Bundle <br />15% Off</h3>
              <p>Includes rackets, balls, and grip tapes from top brands.</p>
            </div>
            <Link to="/products" className="button">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Reviews Section */}
      <section className="choose-customes">
        <div className="choose-customes-col">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Easy Booking Process: Find and book your turf with just a few clicks.</li>
            <li>Top-Quality Equipment: Premium gear at unbeatable prices.</li>
            <li>Wide Range of Venues: Various indoor and outdoor venues.</li>
            <li>Secure Payments: Safe and reliable payment process.</li>
          </ul>
        </div>
        
        <div className="choose-customes-col">
          <h2>Customer Reviews</h2>
          <p>Arun: "Good"</p>
          <p>Bala: "It's very helpful and easy to book"</p>
          <Link to="/reviews" className="button">Read More Reviews</Link>
        </div>
      </section>
    </main>
  );
};

export default Home;