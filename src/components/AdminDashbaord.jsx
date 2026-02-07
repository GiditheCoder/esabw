import React, { useState } from "react";
import bell from "../images/bell.png";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  const data = Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1).padStart(2, "0"),
    name: "John Doe",
    service: "Repair",
    appliance: "Air Conditioner",
    date: "01 - 01 - 2026",
    status: "Pending",
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
const [showDetails, setShowDetails] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);


  return (
    
    <div className="p-3 sm:p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Admin Dashboard</h2>
          <p className="text-xs sm:text-sm text-black">
            Manage appointment requests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center border rounded-lg hover:bg-gray-100">
            ⟳
          </button>
        <button className="w-9 h-9 flex items-center justify-center bg-blue-500 rounded-lg">
  <img
    src={bell}
    alt="bell"
    className="w-5 h-5 filter invert brightness-0"
  />
</button>

        </div>
      </div>

      {/* Tabs + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto">
          {["Pending", "Approved", "Declined"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                activeTab === tab
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-2 sm:px-4 py-2 text-xs sm:text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 whitespace-nowrap">
            Download PDF
          </button>
          <button className="flex-1 sm:flex-none px-2 sm:px-4 py-2 text-xs sm:text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 whitespace-nowrap">
            Clear All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 border rounded-lg overflow-x-auto">
        <table className="w-full text-xs sm:text-sm min-w-max sm:min-w-full">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="px-1.5 sm:px-4 py-3 text-left min-w-12">Number</th>
              <th className="px-1.5 sm:px-4 py-3 text-left min-w-32">Name</th>
              <th className="px-1.5 sm:px-4 py-3 text-left min-w-24">Service Type</th>
              <th className="px-1.5 sm:px-4 py-3 text-left min-w-28">Appliance Type</th>
              <th className="px-1.5 sm:px-4 py-3 text-left min-w-20">Date Submitted</th>
              <th className="px-1.5 sm:px-4 py-3 text-left min-w-20">Status</th>
              <th className="px-1.5 sm:px-4 py-3 text-left min-w-24">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-1.5 sm:px-4 py-3 font-medium">{item.id}</td>
                <td className="px-1.5 sm:px-4 py-3">{item.name}</td>
                <td className="px-1.5 sm:px-4 py-3">{item.service}</td>
                <td className="px-1.5 sm:px-4 py-3">{item.appliance}</td>
                <td className="px-1.5 sm:px-4 py-3 text-xs">{item.date}</td>
                <td className="px-1.5 sm:px-4 py-3">
                  <span className="px-1.5 sm:px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap">
                    {item.status}
                  </span>
                </td>
                <td className="px-1.5 sm:px-4 py-3">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <button
                      className="text-xs sm:text-sm text-black hover:underline whitespace-nowrap"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsModalOpen(true);
                        setShowDetails(false);
                      }}
                    >
                      Review
                    </button>
                    <button className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-100 rounded-lg text-black hover:bg-red-100 flex-shrink-0">
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-0">
    <div className="bg-white w-full max-w-md rounded-xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">

      {/* Close button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-3 sm:top-5 right-2 p-1 text-gray-400 hover:text-black"
      >
        ✕
      </button>

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-semibold mb-2">{selectedItem.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-gray-500">
            {selectedItem.appliance} | {selectedItem.service}
          </p>
          <span className="px-2 sm:px-3 py-1 text-xs font-bold rounded-full bg-gray-200 text-gray-700 whitespace-nowrap">
            Pending Review
          </span>
        </div>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm mb-4">
        <div>
          <p className="text-gray-400">Date Submitted</p>
          <p className="font-medium">12-01-2026</p>
        </div>

        <div>
          <p className="text-gray-400">Date Requested</p>
          <p className="font-medium">18-01-2026</p>
        </div>

        <div>
          <p className="text-gray-400">Phone number</p>
          <p className="font-medium">+234 123 456 7890</p>
        </div>

        <div>
          <p className="text-gray-400">Service Type</p>
          <p className="font-medium">Repair</p>
        </div>
      </div>

      {/* View more toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-xs sm:text-sm text-gray-500 flex items-center gap-1"
      >
        {showDetails ? "Hide Details" : "View More"}
        <span>{showDetails ? "▲" : "▼"}</span>
      </button>

      {/* Expanded content */}
      {showDetails && (
        <div className="mt-4 border-t pt-4 text-xs sm:text-sm space-y-3">
          <div>
            <p className="font-medium">Customer Information</p>
            <p className="text-gray-500">johndoe@example.com</p>
            <p className="text-gray-500">123 main street</p>
          </div>

          <div>
            <p className="font-medium">Service / Problem Description</p>
            <p className="text-gray-500">
              Air conditioner repair and mounting.
            </p>
          </div>

          <div>
            <p className="font-medium">Uploaded files</p>
            <div className="flex flex-col gap-2 mt-2">
              {[
                "Warehouse picture-front.jpg",
                "Warehouse picture-top.jpg",
                "Solar equipments.jpg",
              ].map((file) => (
                <span
                  key={file}
                  className="px-2 sm:px-3 py-1 sm:py-2 text-xs bg-gray-100 rounded-lg break-all w-fit"
                >
                  📎 {file}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 sm:gap-3 mt-6">
        <button className="flex-1 bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-900">
          Approve
        </button>
        <button className="flex-1 border border-black py-2 rounded-lg text-sm hover:bg-gray-50">
          Decline
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminDashboard;

