import React, { useState } from "react";

const Booking = ({ selectedTurf, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    players: "",
    hours: "",
  });

  if (!selectedTurf) return null;

  const maxHours = parseInt(selectedTurf.time.split("-")[1]) - parseInt(selectedTurf.time.split("-")[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "hours" && value > maxHours) {
      alert(`You cannot book for more than ${maxHours} hours`);
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log({
      Turf: selectedTurf.name,
      Sport: selectedTurf.sports,
      Type: selectedTurf.category,
      Price: selectedTurf.price,
      Date: formData.date,
      Time: formData.time,
      Players: formData.players,
      Hours: formData.hours,
      TotalAmount: formData.hours * selectedTurf.price,
    });

    alert("Booking Confirmed!");
    setShowForm(false);
    setFormData({ date: "", time: "", players: "", hours: "" });
  };

  return (
    <>
      <div className="booking-details">
        <div className="image-container">
          <img src={selectedTurf.image} alt={selectedTurf.name} className="turf-image" />
        </div>
        <div className="details-container">
          <h2>{selectedTurf.name}</h2>
          <div className="field-row">
            <p><strong>City:</strong> {selectedTurf.city}</p>
            <p><strong>Sport:</strong> {selectedTurf.sports}</p>
            <p><strong>Type:</strong> {selectedTurf.category}</p>
            <p><strong>Surface Type:</strong> {selectedTurf.surface}</p>
            <p><strong>Turf Size:</strong> {selectedTurf.size}</p>
            <p><strong>Time:</strong> {selectedTurf.time}</p>
            <p><strong>Price:</strong> ₹{selectedTurf.price}/hour</p>
          </div>
          <div className="button-container">
            <button className="book-btn" onClick={() => setShowForm(true)}>Book It</button>
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="popup">
            <h3>Book Your Slot</h3>
            <label>Turf Name: <input type="text" value={selectedTurf.name} disabled /></label>
            <label>Sport: <input type="text" value={selectedTurf.sports} disabled /></label>
            <label>Type: <input type="text" value={selectedTurf.category} disabled /></label>
            <label>Price per hour: <input type="text" value={`₹${selectedTurf.price}`} disabled /></label>
            
            <label>Date: <input type="date" name="date" value={formData.date} onChange={handleChange} required /></label>
            <label>Time: <input type="time" name="time" value={formData.time} onChange={handleChange} required /></label>
            <label>No. of Players: <input type="number" name="players" value={formData.players} onChange={handleChange} required /></label>
            <label>No. of Hours: <input type="number" name="hours" value={formData.hours} onChange={handleChange} required /></label>
            <p>Total Amount: ₹{formData.hours * selectedTurf.price || 0}</p>
            
            <div className="button-container">
              <button className="book-slot-btn" onClick={handleSubmit}>Book Slot</button>
              <button className="close-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
