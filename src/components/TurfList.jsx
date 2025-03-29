import React from "react";

const TurfList = ({ turfs }) => {
  return (
    <div className="turf-container">
      {turfs.length > 0 ? (
        turfs.map((turf, index) => (
          <div key={index} className="turf-card">
            <img src={turf.image} alt={turf.name} className="turf-image" />
            <div className="turf-info">
              <h2>{turf.name}</h2>
              <p><strong>City:</strong> <span>{turf.city}</span></p>
              <p><strong>Sport:</strong> <span>{turf.sports}</span></p>
              <p><strong>Type:</strong> <span>{turf.category}</span></p>
              <p><strong>Surface Type:</strong> <span>{turf.surface}</span></p>
              <p><strong>Turf Size:</strong> <span>{turf.size}</span></p>
              <p><strong>Time:</strong> <span>{turf.time}</span></p>
              <p><strong>Price:</strong> ₹<span>{turf.price}</span>/hour</p>
            </div>
          </div>
        ))
      ) : (
        <p>No turfs available.</p>
      )}
    </div>
  );
};

export default TurfList;
