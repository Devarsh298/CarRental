import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";

export default function CarRentalBooking() {
  const URI = import.meta.env.VITE_BACKEND_URI;

  const location = useLocation();
  const navigate = useNavigate();

  const carId = location.state?.carData; // expecting carData to be ID string
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    if (!carId) {
      setError("No car ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `${URI}/api/product/getProductsById/${carId}`
      );

      if (data.data) {
        setProduct(data.data);
      } else {
        setError("Product not found");
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setError(
        error.response?.data?.message || "Failed to fetch product details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = async (e) => {
    e.preventDefault();

    if (!product) {
      alert("Product data not available");
      return;
    }

    if (!pickupDate || !returnDate) {
      alert("Please select both pickup and return dates");
      return;
    }

    const startDate = new Date(pickupDate);
    const endDate = new Date(returnDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (dayDifference <= 0) {
      alert("Return date must be after pickup date");
      return;
    }

    const totalPrice = dayDifference * product.dailyPrice;

    const order = {
      item: product._id,
      pickupDate,
      returnDate,
      dayDifference,
      totalPrice,
    };
    // console.log(product._id);

    const userToken = localStorage.getItem("token");

    if (!userToken) {
      alert("Please login to book a car");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post(
        `${URI}/api/order/placeorder`,
        order,
        {
          withCredentials: true,
        }
      );

      if (data.data) {
        alert(data.message || "Booking confirmed!");
        navigate("/Managebooking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert(
        error?.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  const handleBackToCars = () => {
    navigate("/cars");
  };

  useEffect(() => {
    fetchProduct();
  }, [carId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading car details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Error Loading Car
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-x-4">
              <button
                onClick={fetchProduct}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
              <button
                onClick={handleBackToCars}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
              >
                Back to Cars
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Car Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The requested car could not be found.
            </p>
            <button
              onClick={handleBackToCars}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Browse Cars
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const car = product;
  console.log(car);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={handleBackToCars}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
        >
          <span className="mr-2">←</span> Back to all cars
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-64 sm:h-80 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x400?text=Car+Image";
                }}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-600 mb-6">
                {car.category} • {car.year}
              </p>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  👤 {car.seatingCapacity || "N/A"} Seats
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  ⚡ {car.fuelType || "N/A"}
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  ⚙️ {car.transmission || "N/A"}
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  📍 {car.location || "N/A"}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-600">
                  {car.description || "No description available."}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {car.features?.length > 0 ? (
                    car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-blue-600 mr-3 text-lg">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p>No features listed.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  ${car.dailyPrice || 0}
                </div>
                <div className="text-gray-600">per day</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {pickupDate && returnDate && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Days:</span>
                    <span className="font-medium">
                      {Math.ceil(
                        (new Date(returnDate) - new Date(pickupDate)) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-lg">
                      $
                      {Math.ceil(
                        (new Date(returnDate) - new Date(pickupDate)) /
                          (1000 * 60 * 60 * 24)
                      ) * (car.dailyPrice || 0)}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBookNow}
                disabled={!car._id}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {car._id ? "Book Now" : "Loading..."}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                No credit card required to reserve
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
