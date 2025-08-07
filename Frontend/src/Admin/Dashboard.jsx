import React, { useEffect, useState } from "react";
// import CarIcon from "../assets/carIcon.svg?url";
// import BookingIcon from "../assets/calendar_icon_colored.svg?url";
// import PendingIcon from "../assets/cautionIconColored.svg?url";
// import ConfirmIcon from "../assets/check_icon.svg?url";
import AdminHeader from "../Components/AdminHeader";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/product/getAllProducts"
      );
      if (data.data) {
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fecthOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/order/getallproducts",
        { withCredentials: true }
      );
      if (data.data) {
        console.log(data.data);

        if (data.data) {
          const allOrders = data.data;
          const pendingOrders = allOrders.filter(
            (order) => order.carStatus === "Pending"
          );
          const confirmedOrders = allOrders.filter(
            (order) => order.carStatus === "Confirm"
          );

          // Monthly Revenue Calculation
          const currentMonth = new Date().getMonth(); // 0-based
          const currentYear = new Date().getFullYear();

          const thisMonthOrders = allOrders.filter((order) => {
            const orderDate = new Date(order.pickupDate);
            return (
              orderDate.getMonth() === currentMonth &&
              orderDate.getFullYear() === currentYear &&
              order.carStatus === "Confirm" // Only confirmed orders count
            );
          });

          const revenue = thisMonthOrders.reduce(
            (sum, order) => sum + order.totalAmount,
            0
          );

          setOrders(allOrders);
          setPendingCount(pendingOrders.length);
          setConfirmedCount(confirmedOrders.length);
          setMonthlyRevenue(revenue);
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fecthOrders();
  }, []);

  const stats = [
    {
      title: "Total Cars",
      value: products.length,
      icon: null,
      color: "bg-blue-50",
    },
    {
      title: "Total Bookings",
      value: orders.length,
      icon: null,
      color: "bg-green-50",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: null,
      color: "bg-yellow-50",
    },
    {
      title: "Confirmed",
      value: confirmedCount,
      icon: null,
      color: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader />
      <div className="">
        {/* Sidebar */}
        {/* <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}

        {/* Main Content */}
        <div className="flex flex-col p-6 ">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor overall platform performance including total cars,
              bookings, revenue, and recent activities
            </p>
          </div>

          {/* Dashboard Content */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.color} p-6 rounded-lg border border-gray-200`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className="text-2xl">
                      {/* <img
                        src={stat.icon}
                        alt={stat.title}
                        className="w-6 h-6"
                      /> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings and Monthly Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Recent Bookings
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Latest customer bookings
                </p>
                <div className="space-y-3">
                  {orders.map((booking) => (
                    <div
                      key={booking._id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.userId.fullname}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.item.brand}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(booking.pickupDate).toLocaleDateString()}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.carStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Monthly Revenue
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Revenue for current month
                </p>
                <div className="mt-4 p-4 w-36 bg-gray-50 rounded-md">
                  <div className="text-4xl font-bold text-blue-600">
                    ${monthlyRevenue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;