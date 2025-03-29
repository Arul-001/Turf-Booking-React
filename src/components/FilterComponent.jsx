
import { useState } from "react";
import { FaFilter } from "react-icons/fa";


const FilterComponent = ({ onSearch, onApplyFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    city: "",
    sports: "",
    type: "",
    size: "",
    date: "",
    time: "",
    priceRange: [0, 3500],
  });

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };
  //  Fetch suggestions from backend
  //  useEffect(() => {
  //   if (searchTerm.length > 1) {
  //     fetch(`http://localhost:5000/api/turfs/search?query=${searchTerm}`)
  //       .then((res) => res.json())
  //       .then((data) => setSuggestions(data))
  //       .catch((err) => console.error("Error fetching suggestions:", err));
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [searchTerm]);
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const dayName = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long",
    });

    setFilters({ ...filters, date: selectedDate, day: dayName });
  };
  const handleResetFilters = () => {
    setFilters({
      category: "",
      city: "",
      sports: "",
      type: "",
      size: "",
      date: "",
      day: "",
      time: "",
      priceRange: [0, 3500],
    });
    onApplyFilters({category: "",
      city: "",
      sports: "",
      type: "",
      size: "",
      date: "",
      day: "",
      time: "",
      priceRange: [0, 3500]});
  };
  // Clear Time
  const handleClearTime = () => {
    setFilters({ ...filters, time: "" });
  };

   const handleSelectTurf = (turf) => {
    setSearchTerm(turf.name);
    setSelectedTurf(turf);
    setSuggestions([]);
    onSearch(turf.name); 
   };
    
    const handleApplyFilters = () => {
      onApplyFilters({ 
        ...filters, 
        minPrice: filters.priceRange[0], 
        maxPrice: filters.priceRange[1] 
      });
      setShowFilters(false)
  };

  return (
    <div className="filter-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a play area"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm) {
              onSearch(searchTerm);
              setSuggestions([]);
            }q
          }}
        />
        <button className="filter-button" onClick={toggleFilter}>
          <FaFilter /> Filter
        </button>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((turf) => (
            <li key={turf._id} onClick={() => handleSelectTurf(turf)}>
              {turf.name}
            </li>
          ))}
        </ul>
      )}

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-section">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="filter-dropdown"
            >
              <option value="">Select</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>

          <div className="filter-section">
            <label>City</label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="filter-dropdown"
            >
              <option value="">Select</option>
              <option value="New York" >New York</option>
              <option value="Los Angeles" >Los Angeles</option>
              <option value="Chicago" >Chicago</option>
              <option value="Houston" >Houston</option>
              <option value="Miami" >Miami</option>
            </select>
          </div>

          <div className="filter-section">
            <label>Sports</label>
            <select
              value={filters.sports}
              onChange={(e) => setFilters({ ...filters, sports: e.target.value })}
              className="filter-dropdown"
            >
              <option value="">Select</option>
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Tennis">Tennis</option>
              <option value="Basketball">Basketball</option>
              <option value="Hockey">Hockey</option>
              <option value="Badminton">Badminton</option>
              <option value="Rugby">Rugby</option>
              <option value="Badminton">Badmiton</option>
            </select>
          </div>

          <div className="filter-section">
            <label>Playing Surface</label>
            <select
              value={filters.surface}
              onChange={(e) => setFilters({ ...filters, surface: e.target.value })}
              className="filter-dropdown"
            >
              <option value="">Select</option>
              <option value="Synthetic">Synthetic</option>
              <option value="Wood">Wood</option>
              <option value="Grass">Grass</option>
              <option value="Artificial Turf">Artificial Turf</option>
              <option value="Clay">Clay</option>
              <option value="Concrete">Concrete</option>
              <option value="Rubber">Rubber</option>
              <option value="Hard Court">Hard Court</option>
            </select>
          </div>

          <div className="filter-section">
            <label>Play Area Size</label>
            <select
              value={filters.size}
              onChange={(e) => setFilters({ ...filters, size: e.target.value })}
              className="filter-dropdown"
            >
              <option value="">Select</option>
              <option value="Medium" >Medium</option>
              <option value="Large" >Large</option>
              <option value="Small" >Small</option>
              </select>
          </div>

          <div className="filter-section">
            <label>Date</label>
            <input
              type="date"
              value={filters.date}
              onChange={handleDateChange}
              // onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="filter-input"
            />
            {filters.days && <p>Day: {filters.days}</p>}
          </div>

          <div className="filter-section">
            <label>Time</label>
            <input
              type="time"
              value={filters.time}
              onChange={(e) => setFilters({ ...filters, time: e.target.value })}
              className="filter-input"
            />
          </div>

          <div className="filter-section">
            <label>Price Range</label>
            <input
              type="range"
              min="0"
              max="3000"
              value={filters.priceRange[0]}
              onChange={(e) =>
                setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })
              }
              className="price-slider"
            />
            <input
              type="range"
              min={filters.priceRange[0] + 300}
              max="3500"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })
              }
              className="price-slider"
            />
            <p className="price-range-text">
              Current Range: Rs.{filters.priceRange[0]} - Rs.{filters.priceRange[1]}
            </p>
          </div>

          <div className="filter-actions">
            <button
              className="cancel"
              onClick={() => setShowFilters(false)}
            >
              Cancel
            </button>
            <button className="apply-button" onClick={handleApplyFilters}>
              Apply Filters
            </button>
            <button className="reset-button" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
