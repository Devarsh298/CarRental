import React, { useState } from "react";
import axios from "axios";
// import UploadIcon from "../assets/upload_icon.svg?url"; // adjust path if needed
import AdminHeader from "../Components/AdminHeader";
import AdminSidebar from "../Components/AdminSidebar";

const AddCar = () => {
  const [activeTab, setActiveTab] = useState("Add car");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    dailyPrice: "",
    category: "",
    seatingCapacity: "",
    transmission: "",
    fuelType: "",
    location: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const token = localStorage.getItem("sellerToken");
      if (token) {
        const { data } = await axios.post(
          "http://localhost:4000/api/product/add",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Car listed successfully!");
        // console.log(data.data);

        // Reset form
        setFormData({
          brand: "",
          model: "",
          year: "",
          dailyPrice: "",
          category: "",
          seatingCapacity: "",
          transmission: "",
          fuelType: "",
          location: "",
          description: "",
          image: null,
        });
      }
    } catch (error) {
      console.error(
        "Error uploading car:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Failed to add car.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="border-4 border-t-transparent border-white rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader />

      <div className="">
        {/* Sidebar */}
        {/* <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "Add car" && (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Add New Car
                </h1>
                <p className="text-gray-600 mt-1">
                  Fill in details to list a new car for booking, including
                  pricing, availability, and car specifications.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                {/* Image Upload */}
                <div className="mb-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center relative">
                    <label
                      htmlFor="carImageUpload"
                      className="cursor-pointer block"
                    >
                      {/* <img
                        src={UploadIcon}
                        alt="Upload"
                        className="mx-auto mb-2 opacity-60"
                      /> */}
                      <p className="text-gray-600">
                        Click to upload a picture of your car
                      </p>
                      <input
                        id="carImageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                  <Input
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  />
                  <Input
                    label="Year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                  />
                  <Input
                    label="Daily Price ($)"
                    name="dailyPrice"
                    type="number"
                    min={0}
                    value={formData.dailyPrice}
                    onChange={handleChange}
                  />
                  <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={[
                      "Economy",
                      "Sedan",
                      "Compact",
                      "Off-Roading",
                      "Full-size",
                      "SUV",
                      "Luxury",
                    ]}
                  />
                  <Input
                    label="Seating Capacity"
                    name="seatingCapacity"
                    type="number"
                    value={formData.seatingCapacity}
                    onChange={handleChange}
                  />
                  <Select
                    label="Transmission"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    options={["Manual", "Automatic"]}
                  />
                  <Select
                    label="Fuel Type"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    options={["Petrol", "Gasoline", "Diesel", "Electric", "Hybrid"]}
                  />
                </div>

                <div className="mt-6">
                  <Select
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    options={[
                      "New York",
                      "Los Angeles",
                      "Chicago",
                      "Houston",
                      "Phoenix",
                      "New Jersey",
                    ]}
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="e.g. Spacious SUV with automatic transmission"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    List Your Car
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Input
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  min,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Reusable Select
const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default AddCar;