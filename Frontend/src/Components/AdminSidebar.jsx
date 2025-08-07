import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import dashboardIcon from "../assets/dashboardIcon.svg?url";
// import AddCarIcon from "../assets/addIcon.svg?url";
// import ManageCarsIcon from "../assets/listIcon.svg?url";
// import ManageBookingsIcon from "../assets/users_icon.svg?url";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems = [
    { name: "Dashboard", icon: null, ref: "/admin/dashboard" },
    { name: "Add car", icon: null, ref: "/admin/addcar" },
    { name: "Manage Cars", icon: null, ref: "/admin/adminManagecar" },
    {
      name: "Manage Bookings",
      icon: null,
      ref: "/admin/adminManageBooking",
    },
  ];

  const handleMenuClick = (item) => {
    if (setActiveTab) {
      setActiveTab(item.name);
    }
    navigate(item.ref);
  };

  return (
    <div className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium">DS</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">devarsh sutariya</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                (activeTab === item.name) || (pathname === item.ref)
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {/* {item.icon && <img src={item.icon} alt={item.name} className="w-5 h-5" />} */}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;