import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import service_image_1 from "../assets/service-back.png";
import service_image_2 from "../assets/service-back2.png";
import easy_book from "../assets/easy-book.png"
import schedule from "../assets/schedule.png";
import local from "../assets/local.png";
import delivery from "../assets/delivery.png";
import real_time from "../assets/real-time.png";
import selection from "../assets/selection.png";
const Home = () => {
    const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "How do I book a product or turf?", answer: "For products, add them to your cart and complete checkout. For turfs, select your preferred turf, choose a time slot, and confirm your booking." },
    { question: "How long does delivery take?", answer: "Delivery times vary based on location, but most orders arrive within 24-48 hours." },
    { question: "Can I cancel or reschedule my booking?", answer: "Yes, you can reschedule or cancel turf bookings up to 24 hours before your session." },
    { question: "Do I need to bring my own equipment?", answer: "Some turfs provide equipment, but it’s best to check the listing details." },
  ];
  return (
  
    <main className="container">
      <section className="index-head">
        <div className="banner">
          <h1>Welcome to Book N Play</h1>
          <p>Your one-stop solution for booking sports turfs and buying sports equipment!</p>
        </div>
      </section>
      <section className="service">
        <div className="split">
          <img src={service_image_1} alt="Image not available" />
        </div>
        <div className="split hero-content">
        <h1>Book Your Perfect Turf Instantly!</h1>
        <p>Find and reserve the best sports turfs near you with ease. Enjoy a seamless booking experience and exclusive discounts on group reservations.</p>
        <Link to ="/book-slot"><button className="hero-button" >Book Now</button></Link>
      </div>

      </section>
    <section className="features">
      <div className="features-container">
        <div className="feature">
          <img src={easy_book} alt="Easy Booking" className="icon" />
          <h3 className="title">Easy Online Booking </h3>
          <p className="description">
          Book your favorite turf in just a few clicks, anytime, anywhere. No more waiting—check availability and confirm your slot instantly!  
          </p>
        </div>

        <div className="feature">
          <img src={schedule} alt="Schedule" className="icon" />
          <h3 className="title">Flexible Scheduling</h3>
          <p className="description">
          Choose your preferred time slots based on real-time availability. Reschedule or cancel bookings with ease through the platform.</p>
        </div>

        <div className="feature">
          <img src={real_time} alt="Real time Availability" className="icon" />
          <h3 className="title">Real-Time Availability & Discounts</h3>
          <p className="description">
          View real-time slot availability to plan your games in advance. Get exclusive discounts on advance bookings and group reservations.
          </p>
        </div>
      </div>
    </section>
    <section className="service">
      <div className="split hero-content">
        <h1>Shop Local, Get It Fast!</h1>
        <p>Find and buy products from your nearest stores with ease. Enjoy quick delivery, fresh items, and great deals—all while supporting local businesses.</p>
        <Link to="/products"><button className="hero-button">Shop Now</button></Link>
      </div> 
        <div className="split">
          <img src={service_image_2} alt="Image not available" />
        </div>
      </section>
    <section className="features">
      <div className="features-container">
        <div className="feature">
          <img src={selection} alt="Selection of Local Products" className="icon" />
          <h3 className="title">Wide Selection of Local Products</h3>
          <p className="description">
          Discover a diverse range of products from nearby stores, ensuring you always get the freshest and best-quality items available in your area. Shop conveniently from your favorite local shops without leaving your home. 
          </p>
        </div>

        <div className="feature">
          <img src={delivery} alt="Fast Delivery" className="icon" />
          <h3 className="title">Fast and Reliable Delivery</h3>
          <p className="description">
          Get your orders delivered quickly with our efficient local delivery service. We partner with nearby stores to ensure that your products reach you on time, reducing long wait times and unnecessary shipping costs. 
          </p>
        </div>

        <div className="feature">
          <img src={local} alt="Local Business Support" className="icon" />
          <h3 className="title">Support Local Businesses</h3>
          <p className="description">
          Every purchase helps support small and local businesses, strengthening your community. By shopping with us, you contribute to the growth of neighborhood stores while enjoying personalized service and exclusive deals.
          </p>
        </div>
      </div>
    </section>
    <section className="faq-container">
        <h2 className="faq-title">FAQs</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;