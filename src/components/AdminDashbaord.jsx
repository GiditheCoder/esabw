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
    
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
          <p className="text-sm text-black">
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
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-6">
          {["Pending", "Approved", "Declined"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium ${
                activeTab === tab
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
            Download PDF
          </button>
          <button className="px-4 py-2 text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
            Clear All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Number</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Service Type</th>
              <th className="px-4 py-3 text-left">Appliance Type</th>
              <th className="px-4 py-3 text-left">Date Submitted</th>
              <th className="px-4 py-3 text-left">Request Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">{item.id}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.service}</td>
                <td className="px-4 py-3">{item.appliance}</td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-full">
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center gap-7">
                 <button
  className="text-black hover:underline"
  onClick={() => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setShowDetails(false);
  }}
>
  Review
</button>
{/* Deleting button */}
                  <button className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg text-black hover:bg-red-100">
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-full max-w-md rounded-xl p-6 relative">

      {/* Close button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-5 right-2 p-1 text-gray-400 hover:text-black"
      >
        ✕
      </button>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
          <p className="text-sm text-gray-500">
            {selectedItem.appliance} | {selectedItem.service}
          </p>
        </div>

        <span className="px-3 py-1 text-xs mt-6 p-10 font-bold rounded-full bg-gray-200 text-gray-700">
          Pending Review
        </span> 
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
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
        className="mt-4 text-sm text-gray-500 flex items-center gap-1"
      >
        {showDetails ? "Hide Details" : "View More"}
        <span>{showDetails ? "▲" : "▼"}</span>
      </button>

      {/* Expanded content */}
      {showDetails && (
        <div className="mt-4 border-t pt-4 text-sm space-y-3">
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
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Warehouse picture-front.jpg",
                "Warehouse picture-top.jpg",
                "Solar equipments.jpg",
              ].map((file) => (
                <span
                  key={file}
                  className="px-3 py-2  text-xs bg-gray-100 rounded-lg"
                >
                  📎 {file}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 bg-black text-white py-2 rounded-lg">
          Approve
        </button>
        <button className="flex-1 border border-black py-2 rounded-lg">
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

