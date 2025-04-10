import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_URL;

const Booking = ({ selectedTurf, onClose }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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
 
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });

  //   let newErrors = { ...errors };
  //   // const todayString = new Date().toISOString().split("T")[0];
  //   if (name === "date" && !value) {
  //     newErrors.date = "Date is required";
  //   } else if (name === "date" && isDateEarlier(value)) {
  //     newErrors.date = "This Date Cant be applied";
  //   } else {
  //     delete newErrors.date;
  //   }
  //   if (name === "time") {
  //     if (!value) {
  //       newErrors.time = "Time is required";
  //     } else {
  //       const selectedTime = parseInt(value.split(":")[0]);
  //       const maxBookableHours = closingTime - selectedTime;
  //       if (maxBookableHours <= 0) {
  //         newErrors.time = `Booking not possible after ${closingTime}:00`;
  //       } else if (maxBookableHours > maxHours) {
  //         newErrors.time = `Booking not possible before ${openingTime}:00`;
  //         // }else if(currentDate === todayString && isTimeEarlier(value)) {
  //         // console.log("Booking Over");
  //         // newErrors.time = "Booking Over"; // Show an error message
  //       } else {
  //         delete newErrors.time;
  //       }
  //     }
  //   }
  //   if (name === "players" && (!value || value <= 0)) {
  //     newErrors.players = "Number of players is required";
  //   } else {
  //     delete newErrors.players;
  //   }

  //   if (name === "hours") {
  //     if (!value || value <= 0) {
  //       newErrors.hours = "Number of hours is required";
  //     } else {
  //       const selectedTime = parseInt(formData.time.split(":")[0] || 0);
  //       const maxBookableHours = closingTime - selectedTime;
  //       if (value > maxBookableHours) {
  //         newErrors.hours = `Only ${maxBookableHours} hour(s) can be booked`;
  //       } else {
  //         delete newErrors.hours;
  //       }
  //     }
  //   }

  //   setErrors(newErrors);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTimeFloat = now.getHours() + now.getMinutes() / 60;
  
    const openingTime = parseFloat(selectedTurf.time.split("-")[0]);    
    const closingTime = parseFloat(selectedTurf.time.split("-")[1]);   
  
    const timeToFloat = (timeStr) => {
      if (!timeStr) return 0;
      const [h, m] = timeStr.split(":").map(Number);
      return h + m / 60;
    };
  
    const updatedData = {
      ...formData,
      [name]: value,
    };
  
    // Copy previous errors
    const updatedErrors = { ...errors };
  
    // DATE VALIDATION
    if (name === "date"|| name==="time") {
      const bookingDate = new Date(updatedData.date);
      const today = new Date(currentDate);
  
      if (bookingDate < today) {
        updatedErrors.date = "Booking date cannot be in the past";
      } else {
        delete updatedErrors.date;
      }
  
      // If booking for today, check time + 30 mins
      const isToday = value === currentDate;
      if (isToday && updatedData.time) {
        const bookingTime = timeToFloat(updatedData.time);
        if (bookingTime < currentTimeFloat + 0.5) {
          updatedErrors.time = "Booking time must be at least 30 minutes from now";
        } else {
          delete updatedErrors.time;
        }
      }
      if (bookingDate > today)
        delete updatedErrors.time;
    }
  
    // TIME VALIDATION
    if (name === "time") {
      const bookingTime = timeToFloat(value);
  
      if (bookingTime < openingTime || bookingTime > closingTime - 1) {
        updatedErrors.time = `Time must be between ${openingTime.toFixed(2)} and ${(closingTime - 1).toFixed(2)}`;
      } else if (updatedData.date === currentDate && bookingTime < currentTimeFloat + 0.5) {
        updatedErrors.time = "Booking time must be at least 30 minutes from now";
      } else {
        delete updatedErrors.time;
      }
  
      // If hours exist, validate combined time
      if (updatedData.hours) {
        const end = bookingTime + parseInt(updatedData.hours);
        if (end > closingTime) {
          updatedErrors.hours = `Booking exceeds closing time of ${closingTime.toFixed(2)}`;
        } else {
          delete updatedErrors.hours;
        }
      }
    }
  
    // PLAYERS VALIDATION
    if (name === "players") {
      if (value <= 0 || value > 15) {
        updatedErrors.players = "Number of players must be between 1 and 15";
      } else {
        delete updatedErrors.players;
      }
    }
  
    // HOURS VALIDATION
    if (name === "hours") {
      const hoursVal = parseInt(value);
      const bookingTime = timeToFloat(updatedData.time);
      const end = bookingTime + hoursVal;
  
      if (hoursVal <= 0) {
        updatedErrors.hours = "Number of hours must be greater than 0";
      } else if (updatedData.time && end > closingTime) {
        updatedErrors.hours = `Booking exceeds closing time of ${closingTime.toFixed(2)}`;
      } else {
        delete updatedErrors.hours;
      }
    }
  
    setErrors(updatedErrors);
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    // console.log({
    //   Turf: selectedTurf.name,
    //   Sport: selectedTurf.sports,
    //   Type: selectedTurf.category,
    //   Price: selectedTurf.price,
    //   Date: formData.date,
    //   Time: formData.time,
    //   Players: formData.players,
    //   Hours: formData.hours,
    //   TotalAmount: formData.hours * selectedTurf.price,
    // });
    const bookingData = {
      name: user.name,
      email: user.email,
      turf: selectedTurf.name,
      sport: selectedTurf.sports,
      type: selectedTurf.category,
      price: selectedTurf.price,
      date: formData.date,
      time: formData.time,
      players: formData.players,
      hours: formData.hours,
      totalAmount: formData.hours * selectedTurf.price,
    };
    console.log(bookingData);
    try {
      const response = await fetch(`${baseURL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Booking Confirmed!");
        setShowForm(false);
        setFormData({ date: "", time: "", players: "", hours: "" });
        setErrors({});
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Server error occurred");
    }
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
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
            <button
              className="book-btn"
              onClick={() => {
                if (!user?.name) {
                  setShowLoginPrompt(true);
                } else {
                  setShowForm(true);
                }
              }}
            >
              Book It
            </button>
          </div>
        </div>
      </div>
      {showLoginPrompt && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Please login to book a turf.</p>
            <div className="popup-actions">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="popup-cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="popup-login-btn"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Book Your Slot</h3>
            <div className="form-grid">
            <label>
              Name: <input type="text" value={user?.name || ""} disabled />
            </label>
            <label>
              Email: <input type="text" value={user?.email || ""} disabled />
            </label>
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
              {errors.date && <p className="error-message">{errors.date}</p>}
            </label>
            

            <label>
              Time:{" "}
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
               {errors.time && <p className="error-message">{errors.time}</p>}
            </label>

            <label>
              No. of Players:{" "}
              <input
                type="number"
                name="players"
                value={formData.players}
                onChange={handleChange}
                required
              />{errors.players && (
                <p className="error-message">{errors.players}</p>
              )}
            </label>
            
            <label>
              No. of Hours:{" "}
              <input
                type="number"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                required
              />{errors.hours && <p className="error-message">{errors.hours}</p>}
            </label>
            </div>
            <p>Total Amount: ₹{formData.hours * selectedTurf.price || 0}</p>

            <div className="button-container">
              <button className="close-btn" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="book-slot-btn"
                onClick={handleSubmit}
                disabled={Object.keys(errors).length > 0}
              >
                Book Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
