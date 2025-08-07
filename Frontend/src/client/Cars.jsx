import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  
  const handleBookNow = (id) => {
    navigate("/carBooking", { state: { carData: id } });
  };

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/product/getAllProducts"
      );
      // console.log(data.data);

      if (data.data) {
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const filteredCars = products.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // SVG Icons
  const SearchIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const FilterIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
      />
    </svg>
  );

  const UsersIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
    </svg>
  );

  const SettingsIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const FuelIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );

  const MapPinIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348z" />
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );

  const MailIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <div className="available-cars-page min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <Header></Header>

      {/* Page Header */}
      <section className="page-header bg-white py-16">
        <div className="header-container max-w-7xl mx-auto px-6 text-center">
          <h1 className="page-title text-4xl font-bold text-gray-900 mb-4">
            Available Cars
          </h1>
          <p className="page-subtitle text-gray-600 mb-8">
            Browse our selection of premium vehicles available for your next
            adventure
          </p>

          {/* Search Bar */}
          <div className="search-section max-w-2xl mx-auto">
            <div className="search-wrapper relative">
              <div className="search-icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search by make, model, or features"
                className="search-input w-full pl-12 pr-16 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button
                className="filter-btn absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilterIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Listing */}
      <section className="cars-listing-section py-12">
        <div className="listing-container max-w-7xl mx-auto px-6">
          {/* Results Info */}
          <div className="results-info mb-8">
            <p className="results-count text-gray-600">
              Showing {filteredCars.length} Cars
            </p>
          </div>

          {/* Cars Grid */}
          <div className="cars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((car) => (
              <div
                key={car._id}
                className="car-listing-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="car-image-wrapper relative">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="car-listing-image w-full h-48 object-cover"
                  />
                  <div className="availability-badge absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <p>Available now</p>
                  </div>
                  <div className="price-badge absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg font-semibold">
                    ${car.dailyPrice}/day
                  </div>
                </div>

                <div className="car-listing-info p-6">
                  <div className="car-header mb-4">
                    <h3 className="car-listing-title text-xl font-bold text-gray-900">
                      {car.brand} {car.model}
                    </h3>
                    <p className="car-category-year text-gray-600">
                      {car.category} • {car.year}
                    </p>
                  </div>

                  <div className="car-features grid grid-cols-2 gap-4 mb-6">
                    <div className="feature-item flex items-center space-x-2">
                      <div className="feature-icon text-gray-500">
                        <UsersIcon />
                      </div>
                      <span className="feature-text text-sm text-gray-600">
                        {car.seats} Seats
                      </span>
                    </div>
                    <div className="feature-item flex items-center space-x-2">
                      <div className="feature-icon text-gray-500">
                        <FuelIcon />
                      </div>
                      <span className="feature-text text-sm text-gray-600">
                        {car.fuelType}
                      </span>
                    </div>
                    <div className="feature-item flex items-center space-x-2">
                      <div className="feature-icon text-gray-500">
                        <SettingsIcon />
                      </div>
                      <span className="feature-text text-sm text-gray-600">
                        {car.transmission}
                      </span>
                    </div>
                    <div className="feature-item flex items-center space-x-2">
                      <div className="feature-icon text-gray-500">
                        <MapPinIcon />
                      </div>
                      <span className="feature-text text-sm text-gray-600">
                        {car.location}
                      </span>
                    </div>
                  </div>

                  <button
                    className="book-now-btn w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => {
                      handleBookNow(car._id);
                      scrollTo(0, 0);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="load-more-section text-center mt-12">
            <button className="load-more-btn bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium">
              Load More Cars
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Cars;
