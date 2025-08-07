import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./client/Homepage";
import Cars from "./client/Cars";
import ManageBooking from "./client/ManageBooking";
import Dashboard from "./Admin/Dashboard";
import AddCar from "./Admin/AddCar";
import AdminManageBooking from "./Admin/ManageBookings";
import AdminManageCar from "./Admin/ManageCar.jsx";
import UserRegister from "./client/User.register.jsx";
import UserLogin from "./client/User.login.jsx";
import SellerLogin from "./client/Seller.login.jsx";
import CarRentalBooking from "./client/CarBooking.jsx";
import AdminLayout from "./Components/AdminLayout.jsx";

function App() {
  const admin = localStorage.getItem("sellerToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/cars" element={<Cars></Cars>}></Route>
        <Route path="/carBooking" element={<CarRentalBooking />}></Route>
        <Route
          path="/Managebooking"
          element={<ManageBooking></ManageBooking>}
        ></Route>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />

        <Route path="/admin" element={admin ? <AdminLayout /> : <SellerLogin />}>
          <Route path="dashboard" index  element={<Dashboard></Dashboard>}></Route>
          <Route path="addcar" element={<AddCar></AddCar>}></Route>
          <Route
            path="adminManageBooking"
            element={<AdminManageBooking></AdminManageBooking>}
          ></Route>
          <Route
            path="adminManagecar"
            element={<AdminManageCar></AdminManageCar>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
