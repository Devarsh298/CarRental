import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import mainCarImage from "../assets/main_car.png";
import carImage1 from "../assets/car_image1.png";

const Homepage = () => {
  const URI = import.meta.env.VITE_BACKEND_URI;

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/product/getAllProducts`);
      if (data.data) {
        // console.log(data.data);

        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleSearch = () => {
    console.log("Search params:", { pickupLocation, pickupDate, returnDate });
    // Optional: filter products based on dates and location if needed
  };

  const handleRentNow = (id) => {
    navigate("/carBooking", { state: { carData: id } });
  };

  const testimonials = [
    {
      id: 1,
      name: "Emma Rodriguez",
      location: "Sacramento, Spain",
      rating: 5,
      review:
        "I've rented cars from various companies, but the experience with CarRental was exceptional...",
    },
    {
      id: 2,
      name: "John Smith",
      location: "Orlando, USA",
      rating: 5,
      review:
        "CarRental made my trip so much easier. The car was delivered right to my door and the service was impeccable...",
    },
    {
      id: 3,
      name: "Ava Johnson",
      location: "Sydney, Australia",
      rating: 5,
      review:
        "I highly recommend CarRental! Their fleet is amazing, and I always feel safe navigating the roads...",
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="car-rental-website min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-r from-gray-100 to-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            Luxury cars on Rent
          </h1>

          {/* Search Form */}
          <div className="bg-white shadow-lg rounded-full p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                >
                  <option value="">Please select location</option>
                  <option value="New York">New York</option>
                  <option value="Chicago">Chicago</option>
                  <option value="New Jersey">New Jersey</option>
                  <option value="Los Angeles">Los Angeles</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pick-up Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-8 py-3 rounded-3xl hover:bg-blue-700"
              >
                <i className="fa-solid fa-magnifying-glass mr-2"></i> Search
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <img
            src={mainCarImage}
            alt="Luxury sedan"
            className="mx-auto max-w-2xl w-full"
          />
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Vehicles
          </h2>
          <p className="text-gray-600">
            Explore our selection of premium vehicles available for your next
            adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {products.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Featured
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg">
                  ${car.dailyPrice}/day
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {car.brand} {car.model}
                </h3>
                <p className="text-gray-600">{car.year}</p>

                <div className="grid grid-cols-2 gap-4 my-4 text-sm text-gray-600">
                  <p>👥 {car.seatingCapacity} seats</p>
                  <p>⚙️ {car.transmission}</p>
                  <p>⛽ {car.fuelType}</p>
                  <p>📍 {car.location}</p>
                </div>

                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  onClick={() => {
                    handleRentNow(car._id);
                    scrollTo(0, 0);
                  }}
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-blue-600 hover:text-blue-700 font-semibold">
            Explore all cars →
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Do You Own a Luxury Car?
            </h2>
            <p className="text-blue-100 mb-8">
              Monetize your vehicle effortlessly by joining on CarRental. We
              take care of insurance, driver verification and secure payments —
              so you can earn passive income, stress-free.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold">
              List your car
            </button>
          </div>
          <div>
            <img src={carImage1} alt="BMW luxury car" className="w-full" />
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600">
            Discover why discerning travelers choose Shay Venture for their
            luxury accommodations around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="ml-4 text-left">
                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-600">{t.location}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700">{t.review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Never Miss a Deal!
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to get the latest offers, new arrivals and exclusive
            discounts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
