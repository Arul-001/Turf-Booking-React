import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { z } from "zod";
export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const { setUser } = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user data from backend using token
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data.user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);
  useEffect(() => {
    if (currentUser?.email) {
      axios
        .get(`http://localhost:5000/api/bookings/${currentUser.email}`)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch bookings", err);
        });
    }
  }, [currentUser]);
  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${currentUser.email}`
      );
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${selectedBookingId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove from state too
        setBookings(
          bookings.filter((booking) => booking._id !== selectedBookingId)
        );
        setShowDeletePopup(false);
        setSelectedBookingId(null);
      } else {
        console.error("Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${editFormData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booking");
      }
      fetchBookings();
      setShowEditForm(false);
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "signup" : "login";
    const url = `http://localhost:5000/api/auth/${endpoint}`;

    const payload = isSignUp
      ? {
          name: formData.name,
          dob: formData.dob,
          email: formData.email,
          password: formData.password,
        }
      : {
          email: formData.email,
          password: formData.password,
        };
    console.log("log-init");
    console.log("Sending data to backend:", payload);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Authentication failed");
        return;
      }
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      setUser({ name: data.user.name, email: data.user.email });
    } catch (err) {
      alert("Server error");
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("token");
    setUser({ name: null, email: null });
    setFormData({
      name: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  if (isLoggedIn && currentUser) {
    return (
      <>
        <div className="dashboard-container">
          <div className="dashboard-content">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            <h2>Welcome, {currentUser.name || "User"}!</h2>
            <div className="profile-section">
              <h3>User Profile</h3>
              <p>
                <strong>Name:</strong> {currentUser.name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {currentUser.dob}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <button className="edit-btn">Edit Profile</button>
            </div>
            <div className="booking-history">
              <h3>Turf Booking History</h3>
              {bookings.length > 0 ? (
                <table className="booking-table">
                  <thead>
                    <tr>
                      <th>Turf</th>
                      <th>Sport</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Hours</th>
                      <th>Players</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.turf}</td>
                        <td>{booking.sport}</td>
                        <td>{booking.date}</td>
                        <td>{booking.time}</td>
                        <td>{booking.hours}</td>
                        <td>{booking.players}</td>
                        <td>
                          <span
                            className="action-icon edit-icon"
                            title="Edit"
                            onClick={() => {
                              setEditFormData(booking); // fill form with selected booking
                              setShowEditForm(true);
                            }}
                          >
                            ✏️
                          </span>
                          <span
                            className="action-icon delete-icon"
                            title="Delete"
                            onClick={() => {
                              setSelectedBookingId(booking._id); // assuming _id is used in MongoDB
                              setShowDeletePopup(true);
                            }}
                          >
                            🗑️
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No bookings found.</p>
              )}
            </div>
          </div>
        </div>
        {showDeletePopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <p>Are you sure you want to cancel the booking?</p>
              <div className="popup-actions">
                <button
                  onClick={handleConfirmDelete}
                  className="popup-confirm-btn"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="popup-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showEditForm && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Edit Booking</h3>
              <div className="form-grid">
                <label>
                  Name:{" "}
                  <input type="text" value={editFormData.name || ""} disabled />
                </label>
                <label>
                  Email:{" "}
                  <input
                    type="text"
                    value={editFormData.email || ""}
                    disabled
                  />
                </label>
                <label>
                  Turf:{" "}
                  <input type="text" value={editFormData.turf || ""} disabled />
                </label>
                <label>
                  Sport:{" "}
                  <input
                    type="text"
                    value={editFormData.sport || ""}
                    disabled
                  />
                </label>
                <label>
                  Type:{" "}
                  <input type="text" value={editFormData.type || ""} disabled />
                </label>
                <label>
                  Price:{" "}
                  <input
                    type="text"
                    value={`₹${editFormData.price}`}
                    disabled
                  />
                </label>
                <label>
                  Date:{" "}
                  <input
                    type="date"
                    name="date"
                    value={editFormData.date || ""}
                    onChange={handleEditChange}
                  />
                  {editErrors.date && (
                    <p className="error-message">{editErrors.date}</p>
                  )}
                </label>

                <label>
                  Time:{" "}
                  <input
                    type="time"
                    name="time"
                    value={editFormData.time || ""}
                    onChange={handleEditChange}
                  />
                  {editErrors.time && (
                    <p className="error-message">{editErrors.time}</p>
                  )}
                </label>

                <label>
                  No. of Players:{" "}
                  <input
                    type="number"
                    name="players"
                    value={editFormData.players || ""}
                    onChange={handleEditChange}
                  />
                  {editErrors.players && (
                    <p className="error-message">{editErrors.players}</p>
                  )}
                </label>

                <label>
                  No. of Hours:{" "}
                  <input
                    type="number"
                    name="hours"
                    value={editFormData.hours || ""}
                    onChange={handleEditChange}
                  />
                  {editErrors.hours && (
                    <p className="error-message">{editErrors.hours}</p>
                  )}
                </label>
              </div>
              <p>
                Editing Charge(10%): ₹
                {(editFormData.hours || 0) * (editFormData.price * 0.1 || 0)}
              </p>
              <div className="button-container">
                <button
                  className="close-btn"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="book-slot-btn"
                  onClick={handleEditSubmit}
                  disabled={Object.keys(editErrors).length > 0}
                >
                  Update Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <div className="login-container">
      <div className="login-auth-box">
        <h2 className="login-auth-title">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="login-input"
                required
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="login-input"
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="login-input"
              required
            />
          )}
          <button type="submit" className="login-submit-btn">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="login-toggle-text">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="login-toggle-btn"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
