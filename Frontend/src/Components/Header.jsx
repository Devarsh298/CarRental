import React, { useEffect, useState } from "react";
// import logo from "../assets/logo.svg?url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const Header = () => {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/users/logout",
          { withCredentials: true }
        );
        if (data.data) {
          localStorage.removeItem("token");
          console.log(data.message);
          alert(data.message);
          setToken(false);
          navigate("/");
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(true);
    }

    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
   
    
  }, [token, user]);
  return (
    <div>
      {/* Header Navigation */}
      <nav className="header-nav shadow-sm px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="nav-container max-w-7xl mx-auto flex justify-between items-center">
          <div className="logo-section flex items-center space-x-2">
            {/* <img src={logo} alt="Logo" className="w-auto object-contain" /> */}
          </div>

          <div className="nav-links items-center hidden md:flex space-x-8">
            <a href="/" className="nav-link text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a
              href="/cars"
              className="nav-link text-gray-700 hover:text-blue-600"
            >
              Cars
            </a>
            <a
              href="/Managebooking"
              className="nav-link text-gray-700 hover:text-blue-600"
            >
              My Bookings
            </a>
            <div className="search-nav-wrapper relative">
              <div className="search-nav-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search cars"
                className="search-nav-input pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="auth-section flex items-center space-x-4">
            {token ? (
              <>
                <h3 className="capitalize">Welcome {user} </h3>
                <button
                  onClick={handleLogout}
                  className="login-btn bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="login-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <a href="/login">Login</a>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
