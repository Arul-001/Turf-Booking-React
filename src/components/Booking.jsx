import React, { useState } from "react";

const Booking = ({ selectedTurf, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    players: "",
    hours: "",
  });
  const [errors, setErrors] = useState({});

  if (!selectedTurf) return null;
  const openingTime = parseInt(selectedTurf.time.split("-")[0]);
  const closingTime = parseInt(selectedTurf.time.split("-")[1]);
  const maxHours = closingTime - openingTime;

  const validateForm = () => {
    let newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.players) newErrors.players = "Number of players is required";
    if (!formData.hours) newErrors.hours = "Number of hours is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // const isTimeEarlier = (givenTime) => {
  //   if (!givenTime) return false; // Avoid errors if time is empty

  //   const now = new Date();
  //   const currentHours = now.getHours();
  //   const currentMinutes = now.getMinutes();
  //   const [givenHours, givenMinutes] = givenTime.split(":").map(Number);

  //   return (
  //     currentHours > givenHours ||
  //     (currentHours === givenHours && currentMinutes > givenMinutes)
  //   );
  // };
  const isDateEarlier = (givenDate) => {
    if (!givenDate) return false; 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const given = new Date(givenDate);
    if (isNaN(given.getTime())) return false;
    given.setHours(0, 0, 0, 0); 
    if (given.getTime() === today.getTime()) {
      setCurrentDate(today);
    console.log(currentDate);
    }
    return given <= today; 
};
  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let newErrors = { ...errors };
    // const todayString = new Date().toISOString().split("T")[0]; 
    if (name === "date" && !value) {
      newErrors.date = "Date is required";
    }
     else if (name === "date" && isDateEarlier(value)) {
      newErrors.date = "This Date Cant be applied";
    }
    else{
      delete newErrors.date;
    }
    if (name === "time") {
      if (!value) {
        newErrors.time = "Time is required";
      } else{
        const selectedTime = parseInt(value.split(":")[0]);
        const maxBookableHours = closingTime - selectedTime;
        if (maxBookableHours <= 0) {
          newErrors.time = `Booking not possible after ${closingTime}:00`;
        } else if (maxBookableHours > maxHours) {
          newErrors.time = `Booking not possible before ${openingTime}:00`;
        // }else if(currentDate === todayString && isTimeEarlier(value)) {
        // console.log("Booking Over");
        // newErrors.time = "Booking Over"; // Show an error message
        } else {
          delete newErrors.time;
        }
      }
    }
    if (name === "players" && (!value || value <= 0)) {
      newErrors.players = "Number of players is required";
    } else {
      delete newErrors.players;
    }

    if (name === "hours") {
      if (!value || value <= 0) {
        newErrors.hours = "Number of hours is required";
      } else {
        const selectedTime = parseInt(formData.time.split(":")[0] || 0);
        const maxBookableHours = closingTime - selectedTime;
        if (value > maxBookableHours) {
          newErrors.hours = `Only ${maxBookableHours} hour(s) can be booked`;
        } else {
          delete newErrors.hours;
        }
      }
    }

    setErrors(newErrors);
  };
  const handleSubmit = () => {
    if (!validateForm()) return;
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
    setErrors({});
  };
  const handleClose = () => {
    setFormData({ date: "", time: "", players: "", hours: "" });
    setErrors({});
    setShowForm(false);
  };

  return (
    <>
      <div className="booking-details">
        <div className="image-container">
          <img
            src={selectedTurf.image}
            alt={selectedTurf.name}
            className="turf-image"
          />
        </div>
        <div className="details-container">
          <h2>{selectedTurf.name}</h2>
          <div className="field-row">
            <p>
              <strong>City:</strong> {selectedTurf.city}
            </p>
            <p>
              <strong>Sport:</strong> {selectedTurf.sports}
            </p>
            <p>
              <strong>Type:</strong> {selectedTurf.category}
            </p>
            <p>
              <strong>Surface Type:</strong> {selectedTurf.surface}
            </p>
            <p>
              <strong>Turf Size:</strong> {selectedTurf.size}
            </p>
            <p>
              <strong>Time:</strong> {selectedTurf.time}
            </p>
            <p>
              <strong>Price:</strong> ₹{selectedTurf.price}/hour
            </p>
          </div>
          <div className="button-container">
            <button className="book-btn" onClick={() => setShowForm(true)}>
              Book It
            </button>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="popup">
            <h3>Book Your Slot</h3>
            <label>
              Turf Name:{" "}
              <input type="text" value={selectedTurf.name} disabled />
            </label>
            <label>
              Sport: <input type="text" value={selectedTurf.sports} disabled />
            </label>
            <label>
              Type: <input type="text" value={selectedTurf.category} disabled />
            </label>
            <label>
              Price per hour:{" "}
              <input type="text" value={`₹${selectedTurf.price}`} disabled />
            </label>

            <label>
              Date:{" "}
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
            {errors.date && <p className="error-message">{errors.date}</p>}

            <label>
              Time:{" "}
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </label>
            {errors.time && <p className="error-message">{errors.time}</p>}

            <label>
              No. of Players:{" "}
              <input
                type="number"
                name="players"
                value={formData.players}
                onChange={handleChange}
                required
              />
            </label>
            {errors.players && (
              <p className="error-message">{errors.players}</p>
            )}

            <label>
              No. of Hours:{" "}
              <input
                type="number"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                required
              />
            </label>
            {errors.hours && <p className="error-message">{errors.hours}</p>}
            <p>Total Amount: ₹{formData.hours * selectedTurf.price || 0}</p>

            <div className="button-container">
              <button
                className="book-slot-btn"
                onClick={handleSubmit}
                disabled={Object.keys(errors).length > 0}
              >
                Book Slot
              </button>
              <button className="close-btn" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
