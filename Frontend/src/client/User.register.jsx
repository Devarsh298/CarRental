import axios from "axios";
import React, { useState } from "react";

const URI = import.meta.env.VITE_BACKEND_URI

const UserRegister = () => {
  
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  // e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  try {
    const { data } = await axios.post(`${URI}/api/users/register`, form);

    if (data?.success) {
      alert("User registered successfully!");
      setForm({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
      });
    } else {
      alert(data?.message || "Registration failed.");
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Registration failed.";
    alert(errorMessage);
    console.log(errorMessage);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen py-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-6000"></div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-8 h-8 border-2 border-white rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-32 w-12 h-12 border-2 border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/3 w-6 h-6 bg-white rotate-45 animate-bounce"></div>
          <div className="absolute top-1/2 right-20 w-10 h-10 border-2 border-white transform rotate-12 animate-ping"></div>
          <div className="absolute bottom-40 right-40 w-4 h-4 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Glassmorphism form container */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 flex flex-col gap-3">
        {/* Form header with glow effect */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
            Join Us Today
          </h2>
          <p className="text-white/80 text-sm">Create your new account</p>
        </div>

        {/* Full Name field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-white/90">
            Full Name
          </label>
          <div className="relative group">
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300"
              placeholder="Enter your full name"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Email field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-white/90">
            Email Address
          </label>
          <div className="relative group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300"
              placeholder="Enter your email"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Mobile Number field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-white/90">
            Mobile Number
          </label>
          <div className="relative group">
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10,15}"
              className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300"
              placeholder="Enter your mobile number"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Password field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-white/90">
            Password
          </label>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm pr-11 transition-all duration-300"
              placeholder="Create a strong password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 px-1 py-1 rounded"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? (
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
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Confirm Password field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-white/90">
            Confirm Password
          </label>
          <div className="relative group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm pr-11 transition-all duration-300"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 px-1 py-1 rounded"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
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
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Register button with gradient */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-2.5 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-emerald-400/50 mt-1"
        >
          <span className="flex items-center justify-center gap-2">
            Create Account
            
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </span>
        </button>

        {/* Login link */}
        <div className="text-center mt-2">
          <p className="text-white/80 text-sm">
            Already have an account?{" "}
            <button className="text-emerald-300 hover:text-emerald-200 font-medium hover:underline transition-colors duration-200 bg-transparent border-none cursor-pointer">
              <a href="/login">Sign In</a>
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UserRegister;
