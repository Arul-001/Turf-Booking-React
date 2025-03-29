import React from "react";

const Booking = ({ selectedTurf, onClose}) => {
  if (!selectedTurf) return null;

  return (
    <div className="booking-details">
      <h2>{selectedTurf.name}</h2>
      <p><strong>City:</strong> {selectedTurf.city}</p>
      <p><strong>Sport:</strong> {selectedTurf.sports}</p>
      <p><strong>Type:</strong> {selectedTurf.category}</p>
      <p><strong>Surface Type:</strong> {selectedTurf.surface}</p>
      <p><strong>Turf Size:</strong> {selectedTurf.size}</p>
      <p><strong>Time:</strong> {selectedTurf.time}</p>
      <p><strong>Price:</strong> ₹{selectedTurf.price}/hour</p>
      <button className="book-btn">Book It</button>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
};

export default Booking;