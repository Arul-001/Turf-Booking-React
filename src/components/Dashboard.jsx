import React from "react";

const Dashboard = () => {
  return (
    <section className="dashboard-head">
      <div className="dashboard">
        <h2>Welcome to Your Dashboard</h2>
        <div className="rows">
          <div className="dashboard-col">
            <h3>Your Turf Booking History</h3>
            <p>Greenfield Ground - 5th Oct 2024 - 3:00 PM to 5:00 PM</p>
            <p>City Sports Arena - 1st Oct 2024 - 1:00 PM to 2:00 PM</p>
            <a href="book-slot.html" className="button">Book New Turf</a>
          </div>

          <div className="dashboard-col">
            <h3>Your Order History</h3>
            <p>Nike Football Shoes - Ordered on 3rd Oct 2024</p>
            <p>Wilson Tennis Racket - Ordered on 25th Sept 2024</p>
            <a href="products.html" className="button">Shop More Products</a>
          </div>

          <div className="dashboard-col">
            <h3>Profile Settings</h3>
            <br />
            <a href="#" className="button">Edit Profile</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
