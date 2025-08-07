import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/login",
        form,
        { withCredentials: true }
      );
      if (data.data) {
        console.log(data.data.user);
        alert(data.message);
        setForm({
          email: "",
          password: "",
        });
     
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", data.data.user.fullname);
        Navigate("/");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
      console.error(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-8 h-8 border-2 border-white rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-32 w-12 h-12 border-2 border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/3 w-6 h-6 bg-white rotate-45 animate-bounce"></div>
          <div className="absolute top-1/2 right-20 w-10 h-10 border-2 border-white transform rotate-12 animate-ping"></div>
        </div>
      </div>

      {/* Glassmorphism form container */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 flex flex-col gap-6">
        {/* Form header with glow effect */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            Welcome Back
          </h2>
          <p className="text-white/80 text-sm">Sign in to your account</p>
        </div>

        {/* Email field */}
        <div className="space-y-2">
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
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300"
              placeholder="Enter your email"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Password field */}
        <div className="space-y-2">
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
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm pr-12 transition-all duration-300"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 px-2 py-1 rounded"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? (
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
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
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
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Login button with gradient */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-purple-400/50"
        >
          <span className="flex items-center justify-center gap-2">
            Sign In
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </button>

        {/* Register link */}
        <div className="text-center mt-4">
          <p className="text-white/80 text-sm">
            Don't have an account?{" "}
            <button className="text-purple-300 hover:text-purple-200 font-medium hover:underline transition-colors duration-200 bg-transparent border-none cursor-pointer">
              <a href="/register">Create Account</a>
            </button>
          </p>
        </div>

        {/* Forgot password link */}
        <div className="text-center">
          <button
            onClick={() => alert("Navigate to forgot password page")}
            className="text-white/60 hover:text-white/80 text-xs hover:underline transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            Forgot your password?
          </button>
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
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UserLogin;
