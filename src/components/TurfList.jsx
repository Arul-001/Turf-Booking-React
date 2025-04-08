import React, { useEffect} from "react";

const TurfList = ({ turfs ,onSelectTurf ,visibleCount, setVisibleCount}) => {

  // Load more turfs when user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        visibleCount < turfs.length
      ) {
        setVisibleCount((prev) => prev + 12);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, turfs.length]);

  const visibleTurfs = turfs.slice(0, visibleCount);

  return (
    <div className="turf-container">
      {visibleTurfs.length > 0 ? (
        visibleTurfs.map((turf, index) => (
          <div key={index} className="turf-card"  onClick={() => onSelectTurf(turf)}>
            <img src={turf.image} alt={turf.name} className="turf-image" />
            <div className="turf-info">
              <h2>{turf.name}</h2>
              <p><strong>City:</strong> <span>{turf.city}</span></p>
              <p><strong>Sport:</strong> <span>{turf.sports}</span></p>
              <p><strong>Type:</strong> <span>{turf.category}</span></p>
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
