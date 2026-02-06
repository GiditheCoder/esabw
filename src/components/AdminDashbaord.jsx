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
                <td className="px-4 py-3 flex items-center gap-3">
                  <button className="text-black hover:underline">
                    Review
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-black hover:bg-red-100">
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

