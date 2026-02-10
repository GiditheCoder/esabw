import React from "react";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact";
import Book from "./components/Book";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashbaord";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
