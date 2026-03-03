import React from "react";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact";
import Book from "./components/Book";
import GalleryPage from "./components/GalleryPage";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminGallery from "./components/AdminGallery";
import AdminLayout from "./components/AdminLayout";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin-dashboard/galleries"
          element={
            <AdminLayout>
              <AdminGallery />
            </AdminLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
