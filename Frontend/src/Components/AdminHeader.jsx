import React from 'react'
// import logo from "../assets/logo.svg?url";

const AdminHeader = () => {
  return (
    <>
     <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="logo-section flex items-center space-x-2">
              {/* <img src={logo} alt="Logo" className="w-auto object-contain" /> */}
            </div>
          </div>
          <div className="text-gray-600">
            Welcome, <span className="font-medium">devarsh sutariya</span>
          </div>
        </div>
      </header>
      </>
  )
}

export default AdminHeader;
