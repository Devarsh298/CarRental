import React, { useEffect, useState } from "react";
import AdminHeader from "../Components/AdminHeader";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";

const AdminManageBooking = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("https://carrental-backend-dsbl.onrender.com/api/order/getallproducts", {
        withCredentials: true,
      });
      if (data.data) setAllOrders(data.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(
        "https://carrental-backend-dsbl.onrender.com/api/order/changeStatus",
        { orderId, carStatus: status },
        { withCredentials: true }
      );
      alert(`Order ${status}ed successfully.`);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="">
        {/* Sidebar */}
        {/* <AdminSidebar /> */}

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Bookings</h1>
          <p className="text-gray-600 mb-4">
            Track all customer bookings, approve or cancel requests, and manage booking statuses.
          </p>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="grid grid-cols-7 text-center p-4 bg-gray-50 border-b font-medium text-gray-700">
              <div>Customer Name</div>
              <div>OrderId</div>
              <div>Car</div>
              <div>Date Range</div>
              <div>Total</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {allOrders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-7 text-center p-4 border-b bg-gray-50 text-sm text-gray-700"
              >
                <div>{order.userId.fullname}</div>
                <div className="truncate">{order._id}</div>
                <div>{order.item.brand}</div>
                <div>
                  {new Date(order.pickupDate).toLocaleDateString()} -{" "}
                  {new Date(order.returnDate).toLocaleDateString()}
                </div>
                <div>${order.totalAmount}</div>
                <div>{order.carStatus}</div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleStatusChange(order._id, "Confirm")}
                    disabled={order.carStatus === "Confirm"}
                    className={`text-white px-3 py-1 rounded-full text-sm ${
                      order.carStatus === "Confirm"
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500"
                    }`}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusChange(order._id, "Cancel")}
                    disabled={order.carStatus === "Cancel"}
                    className={`text-white px-3 py-1 rounded-full text-sm ${
                      order.carStatus === "Cancel"
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageBooking;