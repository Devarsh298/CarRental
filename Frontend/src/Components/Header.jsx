import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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

const HamburgerIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Header = () => {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        const { data } = await axios.get(
          "https://carrental-backend-dsbl.onrender.com/api/users/logout",
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
      <nav className="header-nav shadow-sm px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 relative">
        <div className="nav-container max-w-7xl mx-auto flex justify-between items-center">
          <div className="logo-section flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-auto object-contain" />
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links items-center hidden md:flex space-x-8">
            <Link to="/" className="nav-link text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link
              to="/cars"
              className="nav-link text-gray-700 hover:text-blue-600"
            >
              Cars
            </Link>
            <Link
              to="/Managebooking"
              className="nav-link text-gray-700 hover:text-blue-600"
            >
              My Bookings
            </Link>
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

          {/* Desktop Auth Section */}
          <div className="auth-section hidden md:flex items-center space-x-4">
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
                <Link to="/login">Login</Link>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="mobile-menu-btn p-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 visible max-h-96"
              : "opacity-0 invisible max-h-0 overflow-hidden"
          }`}
        >
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="block text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={closeMenu}
            >
              Cars
            </Link>
            <Link
              to="/Managebooking"
              className="block text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={closeMenu}
            >
              My Bookings
            </Link>

            {/* Mobile Search */}
            <div className="search-nav-wrapper relative py-2">
              <div className="search-nav-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search cars"
                className="search-nav-input w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Auth Section */}
            <div className="auth-section pt-4 border-t border-gray-200">
              {token ? (
                <div className="space-y-3">
                  <h3 className="capitalize text-gray-700">Welcome {user}</h3>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full login-btn bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={closeMenu}
                  className="w-full login-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Link to="/login" className="block w-full">
                    Login
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;