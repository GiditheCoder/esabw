import React, { useState } from "react";
import box1 from "../images/box1.png";
import book from "../images/bookappointment.png";
import { useNavigate } from "react-router-dom";
import Menu from "../images/menu.png";
import Close from "../images/CloseIcon.png";

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div
        className="min-h-screen rounded-b-[50px] bg-cover bg-center text-white px-6 py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${box1})`,
        }}
      >
        {/* Navbar */}
        <nav className="fixed inset-x-4 top-4 flex items-center justify-between border border-white rounded-xl bg-white/10 backdrop-blur-md px-6 py-2">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              className="size-12 object-contain"
              alt="Big Dad Communications World Logo"
            />
            <span className="font-medium text-lg leading-3 tracking-widest">
              Big Dad
              <br />
              <span className="font-light text-sm"> Communications World</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-sm text-white">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer font-medium hover:text-[#0093FF] transition"
            >
              Home
            </li>
            <li className="cursor-pointer opacity-90 hover:text-[#0093FF] transition">
              Services
            </li>
            <li className="cursor-pointer opacity-90 hover:text-[#0093FF] transition">
              About us
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="cursor-pointer opacity-90 hover:text-[#0093FF] transition"
            >
              Contact
            </li>
          </ul>

          {/* Mobile Menu Icon */}
          <img
            src={menuOpen ? Close : Menu}
            alt="menu"
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute top-full left-0 mt-4 w-full rounded-xl bg-black/90 backdrop-blur-md md:hidden">
              <ul className="flex flex-col items-center gap-6 py-6 text-sm">
                <li onClick={() => navigate("/")} className="cursor-pointer">
                  Home
                </li>
                <li className="cursor-pointer">Services</li>
                <li className="cursor-pointer">About us</li>
                <li
                  onClick={() => navigate("/contact")}
                  className="cursor-pointer"
                >
                  Contact
                </li>
              </ul>
            </div>
          )}
        </nav>

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
