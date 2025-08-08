import React, { useEffect, useState } from "react";
import AdminHeader from "../Components/AdminHeader";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";

const AdminManageCar = () => {
  const URI = import.meta.env.VITE_BACKEND_URI;

  const [activeTab, setActiveTab] = useState("Manage Cars");
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    category: "",
    dailyPrice: "",
    seatingCapacity: "",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/product/getAllProducts`);
      if (data.data) {
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleEditClick = (car) => {
    setEditingCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      category: car.category,
      dailyPrice: car.dailyPrice,
      seatingCapacity: car.seatingCapacity,
      image: car.image,
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingCar(null);
    setFormData({
      brand: "",
      model: "",
      category: "",
      dailyPrice: "",
      seatingCapacity: "",
      image: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${URI}/api/product/updateProduct/${editingCar._id}`,
        formData,
        { withCredentials: true }
      );

      if (data.data) {
        // Update the products list with the updated car
        setProducts(
          products.map((car) =>
            car._id === editingCar._id ? { ...car, ...formData } : car
          )
        );
        handleCloseModal();
        alert(data.message);
      }
    } catch (error) {
      console.error(error?.response?.data?.message);
      alert("Failed to update car. Please try again.");
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const response = await axios.delete(
          `${URI}/api/product/deleteProduct/${carId}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setProducts(products.filter((car) => car._id !== carId));
          alert("Car deleted successfully!");
        }
      } catch (error) {
        console.error("Failed to delete car:", error);
        alert("Failed to delete car. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex">
        {/* Sidebar */}
        {/* <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "Manage Cars" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Manage Cars
              </h1>
              <p className="text-gray-600 mb-6">
                View all listed cars, update their details, or remove them from
                the booking platform.
              </p>

              <div className="bg-white rounded-lg border border-gray-200 overflow-auto">
                <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-gray-700">
                  <div>Image</div>
                  <div>Brand / Model</div>
                  <div>Category</div>
                  <div>Price</div>
                  <div>Seats</div>
                  <div>Actions</div>
                </div>

                {products.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No cars found
                  </div>
                ) : (
                  products.map((car) => (
                    <div
                      key={car._id}
                      className="grid grid-cols-6 gap-4 p-4 border-t border-gray-100 items-center"
                    >
                      <img
                        src={car.image}
                        alt={car.model}
                        className="w-20 h-12 object-cover rounded"
                      />
                      <div>
                        {car.brand} {car.model}
                      </div>
                      <div>{car.category}</div>
                      <div>${car.dailyPrice}/day</div>
                      <div>{car.seatingCapacity}</div>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleEditClick(car)}
                          className="text-sm bg-blue-500 w-16 h-8 rounded-3xl text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="text-sm bg-red-500 w-16 h-8 rounded-3xl text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "Manage Bookings" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Manage Bookings
              </h1>
              <p className="text-gray-600 mb-6">
                Track customer bookings and manage statuses.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                No bookings found
              </div>
            </div>
          )}

          {activeTab === "Add car" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Add New Car
              </h1>
              <p className="text-gray-600 mb-6">
                Fill in car details to list a new car for rental.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-gray-500">
                Add Car Form Goes Here (You can import the existing AddCar
                component here)
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Edit Car</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpdateCar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Economy">Economy</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Off-Roading">Off-roading</option>
                    <option value="Compact">Compact</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Sports">Sports</option>
                    <option value="Full-size">Full-size</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Daily Price ($)
                  </label>
                  <input
                    type="number"
                    name="dailyPrice"
                    value={formData.dailyPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="1"
                    max="12"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Update Car
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageCar;
