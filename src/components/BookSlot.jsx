import React, { useEffect,useState } from "react";
import TurfList from "./TurfList"; // Component to display turfs
import FilterComponent from "./FilterComponent"; // Component for filtering
import Booking from "./Booking";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
const BookSlot = () => {
  // // Sample 25 records for turfs
  // const turfsData = [
  //   { id: 1, name: "Greenfield Arena", category: "Indoor", city: "New York", sports: "Football", surface: "Grass", size: "Large", days: ["Monday", "Wednesday", "Friday"], time: "9:00-20:00", price: 500 },
  //   { id: 2, name: "Blue Sky Sports", category: "Outdoor", city: "Los Angeles", sports: "Basketball", surface: "Concrete", size: "Medium", days: ["Tuesday", "Thursday"], time: "10:00-18:00", price: 400 },
  //   { id: 3, name: "Sunset Playgrounds", category: "Outdoor", city: "San Francisco", sports: "Tennis", surface: "Concrete", size: "Small", days: ["Monday", "Thursday"], time: "8:00-22:00", price: 350 },
  //   { id: 4, name: "City Stadium", category: "Indoor", city: "Chicago", sports: "Football", surface: "Artificial Turf", size: "Large", days: ["Wednesday", "Saturday"], time: "6:00-19:00", price: 600 },
  //   { id: 5, name: "Metro Sports Hub", category: "Outdoor", city: "Houston", sports: "Cricket", surface: "Synthetic", size: "Medium", days: ["Sunday", "Tuesday"], time: "7:00-21:00", price: 550 },
  //   { id: 6, name: "Skyline Arena", category: "Indoor", city: "Miami", sports: "Badminton", surface: "Wood", size: "Small", days: ["Friday", "Saturday"], time: "9:00-17:00", price: 300 },
  //   { id: 7, name: "Champion's Field", category: "Outdoor", city: "Seattle", sports: "Baseball", surface: "Grass", size: "Large", days: ["Monday", "Wednesday"], time: "11:00-23:00", price: 450 },
  //   { id: 8, name: "Lakeside Courts", category: "Indoor", city: "Dallas", sports: "Basketball", surface: "Rubber", size: "Medium", days: ["Tuesday", "Thursday"], time: "12:00-20:00", price: 500 },
  //   { id: 9, name: "Horizon Playhouse", category: "Outdoor", city: "Boston", sports: "Tennis", surface: "Hard Court", size: "Small", days: ["Wednesday", "Friday"], time: "7:00-22:00", price: 400 },
  //   { id: 10, name: "Downtown Sports Club", category: "Indoor", city: "San Diego", sports: "Football", surface: "Synthetic", size: "Large", days: ["Saturday", "Sunday"], time: "6:00-18:00", price: 550 },
  //   { id: 11, name: "Elite Arena", category: "Outdoor", city: "Atlanta", sports: "Basketball", surface: "Concrete", size: "Medium", days: ["Monday", "Thursday"], time: "8:00-19:00", price: 380},
  //   { id: 12, name: "Victory Grounds", category: "Indoor", city: "Denver", sports: "Cricket", surface: "Grass", size: "Large", days: ["Tuesday", "Friday"], time: "10:00-21:00", price: 600 },
  //   { id: 13, name: "Star Court", category: "Outdoor", city: "Las Vegas", sports: "Tennis", surface: "Clay", size: "Large", days: ["Wednesday", "Sunday"], time: "9:00-23:00", price: 420 },
  //   { id: 14, name: "Prime Sports Complex", category: "Indoor", city: "Philadelphia", sports: "Badminton", surface: "Wood", size: "Medium", days: ["Thursday", "Saturday"], time: "7:00-20:00", price: 350 },
  //   { id: 15, name: "Urban Play Zone", category: "Outdoor", city: "Phoenix", sports: "Football", surface: "Artificial Turf", size: "Large", days: ["Monday", "Friday"], time: "6:00-22:00", price: 580 },
  //   { id: 16, name: "Speed Sports Park", category: "Indoor", city: "Detroit", sports: "Basketball", surface: "Rubber", size: "Medium", days: ["Tuesday", "Sunday"], time: "8:00-19:00", price: 470 },
  //   { id: 17, name: "Olympic Club", category: "Outdoor", city: "Minneapolis", sports: "Tennis", surface: "Hard Court", size: "Small", days: ["Wednesday", "Thursday"], time: "9:00-21:00", price: 390 },
  //   { id: 18, name: "Legends Arena", category: "Indoor", city: "Orlando", sports: "Cricket", surface: "Synthetic", size: "Large", days: ["Friday", "Sunday"], time: "10:00-20:00", price: 530 },
  //   { id: 19, name: "Champion Turf", category: "Outdoor", city: "Portland", sports: "Football", surface: "Grass", size: "Medium", days: ["Monday", "Saturday"], time: "7:00-19:00", price: 500 },
  // ];
  const [allTurfs, setAllTurfs] = useState([]);
  const [filteredTurfs, setFilteredTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [previousSelectedTurf, setPreviousSelectedTurf] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/turfs`);
        setAllTurfs(response.data);
        setFilteredTurfs(response.data);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      }
    };

    fetchTurfs();
  }, []);

  useEffect(() => {
    if (selectedTurf) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolling effect
    }
  }, [selectedTurf]);
  // Function to handle search
  const handleSearch = (query) => {
    const result = allTurfs.filter((turf) =>
      turf.name.toLowerCase().includes(query.toLowerCase())
    );
    setSelectedTurf(null);
  setPreviousSelectedTurf(null);
    setFilteredTurfs(result);
  };

  // Function to handle filtering
  const handleApplyFilters = (filters) => {
    let result = allTurfs.filter((turf) => {
      // Check category, city, sports, surface, and size
      return (
        turf.name.toLowerCase().includes(filters.searchTerm) &&
        (!filters.category || turf.category === filters.category) &&
        (!filters.city || turf.city === filters.city) &&
        (!filters.sports || turf.sports === filters.sports) &&
        (!filters.surface || turf.surface === filters.surface) &&
        (!filters.size || turf.size === filters.size) &&
        (!filters.day || turf.days.includes(filters.day)) &&
        (!filters.time || checkTime(filters.time, turf.time)) &&
        (!filters.priceRange || 
          (turf.price >= filters.priceRange[0] && turf.price <= filters.priceRange[1]))
      );
    });
    setSelectedTurf(null);
  setPreviousSelectedTurf(null);
  setVisibleCount(12);
    setFilteredTurfs(result);
  };
  const handleSelectTurf = (turf) => {
    if (previousSelectedTurf) {
      setFilteredTurfs((prev) => [...prev, previousSelectedTurf]);
    }
    setPreviousSelectedTurf(turf);
    setSelectedTurf(turf);
    setFilteredTurfs((prev) => prev.filter((t) => t._id !== turf._id));
    console.log("Selected Turf:", turf);
  };

  // Function to close the booking details
  const handleCloseBooking = () => {
    if (selectedTurf) {
      setFilteredTurfs((prev) => [...prev, selectedTurf]);
      setSelectedTurf(null);
    }
    setPreviousSelectedTurf(null);
  };

  // Function to check if the time falls within the given range
  const checkTime = (filterTime, turfTime) => {
    const [start, end] = turfTime.split("-").map((t) => parseFloat(t.replace(":", ".")));
    const time = parseFloat(filterTime.replace(":", "."));
    return time >= start && time <= end;
  };

  return (
    
    <section className="booking-hea">
      
      <div className="booking">
        <h1>Book a Turf or Play Area</h1>
        <p>Select the type of turf, location, and availability below to make your booking.</p>
        <FilterComponent onSearch={handleSearch} onApplyFilters={handleApplyFilters} />
        {selectedTurf && <Booking selectedTurf={selectedTurf} onClose={handleCloseBooking}  />}
        <TurfList turfs={filteredTurfs} visibleCount={visibleCount}
        setVisibleCount={setVisibleCount} onSelectTurf={handleSelectTurf} />
      </div>
    </section>
  );
};

export default BookSlot;
