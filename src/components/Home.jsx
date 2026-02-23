import React from "react";
import box1 from "../images/box1.png";
import book from "../images/bookappointment.png";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div
        className="min-h-screen rounded-b-[50px] bg-cover bg-center text-white px-6 py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${box1})`,
        }}
      >
        <Navbar />
        {/* Hero Section */}
        <div className="flex min-h-[85vh] items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <h1 className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl">
              Expert Engineering Services:
              <span className="block text-[#17A1FA]">
                Repairs, Installation, & Setup
              </span>
            </h1>

            <p className="mt-4 text-xs sm:text-sm opacity-90">
              Professional engineering solutions for your home and business.
            </p>

            <button
              onClick={() => navigate("/book")}
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-white px-7 py-3 text-sm font-medium text-black hover:opacity-90 transition"
            >
              Book Appointment
              <img src={book} alt="Book appointment" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
