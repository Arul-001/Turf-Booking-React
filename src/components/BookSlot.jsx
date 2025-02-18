import React, { useState } from "react";

const BookSlot = () => {
  const [formData, setFormData] = useState({
    turfType: "indoor",
    location: "salem",
    sport: "football",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", formData);
    alert("Turf booked successfully!");
  };

  return (
    <section className="booking-head">
      <div className="booking">
        <h1>Book a Turf or Play Area</h1>
        <p>Select the type of turf, location, and availability below to make your booking.</p>

        <form className="filters" onSubmit={handleSubmit}>
          <label htmlFor="turf-type">Turf Type:</label>
          <select id="turf-type" name="turfType" value={formData.turfType} onChange={handleChange}>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>

          <label htmlFor="location">Location:</label>
          <select id="location" name="location" value={formData.location} onChange={handleChange}>
            <option value="salem">Salem</option>
            <option value="coimbatore">Coimbatore</option>
            <option value="trichy">Trichy</option>
          </select>

          <label htmlFor="sport">Sport:</label>
          <select id="sport" name="sport" value={formData.sport} onChange={handleChange}>
            <option value="football">Football</option>
            <option value="cricket">Cricket</option>
            <option value="tennis">Tennis</option>
          </select>

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />

          <button type="submit">Book Now</button>
        </form>
      </div>
    </section>
  );
};

export default BookSlot;
