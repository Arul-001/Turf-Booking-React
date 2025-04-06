import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const { setUser } = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div className="dashboard-container">
        <div className="dashboard-header">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        <div className="dashboard-content">
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
  <span className="action-icon edit-icon" title="Edit">✏️</span>
  <span className="action-icon delete-icon" title="Delete">🗑️</span>
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
