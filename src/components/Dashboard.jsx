import { useState,useEffect } from "react";

export default function Dashboard() {
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
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setFormData(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const userExists = users.some((user) => user.email === formData.email);
      if (userExists) {
        alert("Email already exists! Please log in.");
        return;
      }

      const newUser = {
        id: Date.now(), // Generating a unique ID
        name: formData.name,
        dob: formData.dob,
        email: formData.email,
        password: formData.password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsLoggedIn(true);
    } else{
      const user = users.find(
        (user) => user.email === formData.email && user.password === formData.password
      );
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        alert("Invalid email or password");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser"); // Remove user data
    setFormData({ name: "", dob: "", email: "", password: "", confirmPassword: "" });
  };
  if (isLoggedIn && currentUser) {

    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <div className="dashboard-content">
          <h2>Welcome, {currentUser.name || "User"}!</h2>
          <div className="profile-section">
            <h3>User Profile</h3>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Date of Birth:</strong> {currentUser.dob}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <button className="edit-btn">Edit Profile</button>
          </div>
          <div className="booking-history">
            <h3>Turf Booking History</h3>
            <p>No bookings found.</p>
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
