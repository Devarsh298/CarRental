import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";

const ManageBooking = () => {
  const URI = import.meta.env.VITE_BACKEND_URI;

  const [userOrders, setUserOrdes] = useState([]);

  const fecthOrders = async () => {
    try {
      const { data } = await axios.get(
        `${URI}/api/order/singleuserproduct`,
        { withCredentials: true }
      );
      if (data.data) {
        // console.log(data.data);
        setUserOrdes(data.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    fecthOrders();
  }, []);
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <Header></Header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your all car bookings</p>
        </div>

        {/* Booking Card */}
        {userOrders.length === 0 ? (
          <div className="text-center text-gray-600">No bookings found.</div>
        ) : (
          userOrders.map((order, index) => {
            const item = order?.item || {};
            const imgSrc = item.image || "/placeholder.png";
            const brand = item.brand || "Unknown Brand";
            const model = item.model || "Unknown Model";
            const category = item.category || "";
            const location = item.location || "Unknown Location";
            const pickupDate = order?.pickupDate
              ? new Date(order.pickupDate).toLocaleDateString()
              : "N/A";
            const returnDate = order?.returnDate
              ? new Date(order.returnDate).toLocaleDateString()
              : "N/A";
            const totalAmount =
              order?.totalAmount !== undefined ? order.totalAmount : "0.00";
            const carStatus = order?.carStatus || "Unknown";

            return (
              <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4"
                key={order?._id || index}
              >
                <div className="flex items-start space-x-6">
                  {/* Car Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={imgSrc}
                      alt={brand}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-900">
                          Booking #{index + 1}
                        </span>
                        <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm font-medium">
                          {carStatus}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Price
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          ${totalAmount}
                        </div>
                        <div className="text-sm text-gray-500">
                          Booked on {pickupDate}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600">📅</span>
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Rental Period
                          </div>
                          <div className="text-sm text-gray-600">
                            {pickupDate} To {returnDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600">📍</span>
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Pick-up Location
                          </div>
                          <div className="text-sm text-gray-600">{location}</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {brand}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {model} • {category} • {location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default ManageBooking;
