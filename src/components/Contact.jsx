import React, { useState } from "react";
import boxappointment from "../images/boxappoint.png";
import { useNavigate } from "react-router-dom";
import sparkle from "../images/sparkle.png";
import BackwardIcon from "../images/Backwardicon.png";
import CloseIcon from "../images/CloseIcon.png";
import { motion as Motion, AnimatePresence } from "framer-motion";
import MapIcon from "../images/mapicon.png";
import Menu from "../images/menu.png";
import Close from "../images/CloseIcon.png";
import { useCreateMessage } from "../hooks/server/mutations";

const Contact = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const {
    mutateAsync: createMessage,
    isPending,
    isError,
    error,
  } = useCreateMessage({
    onSuccess: () => {
      setSuccessModal(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createMessage(formData);
    } catch {
      // Error state is handled by react-query
    }
  };
  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <div
        className="
          min-h-[70vh]
          rounded-b-[50px]
          bg-cover bg-center
          text-white
          px-8 py-6
        
                  "
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${boxappointment})`,
        }}
      >
        {/* <nav className="flex items-center justify-between border border-white rounded-xl bg-white/10 backdrop-blur-md px-9 py-5">
          <div className="text-sm font-semibold">Brand Logo</div>

        <ul className="flex gap-6 text-sm text-white">
  <li
   onClick={() => navigate("/")}
   className="cursor-pointer font-medium hover:text-[#0093FF] transition-colors duration-300">
    Home
  </li>
  <li className="cursor-pointer opacity-90 hover:text-[#0093FF] transition-colors duration-300">
    Services
  </li>
  <li className="cursor-pointer opacity-90 hover:text-[#0093FF] transition-colors duration-300">
    About us
  </li>
  <li
  onClick={() => navigate("/contact")}
   className="cursor-pointer opacity-90 hover:text-[#0093FF] transition-colors duration-300">
    Contact
  </li>
</ul>
        </nav> */}

        <nav className="relative flex items-center justify-between border border-white rounded-xl bg-white/10 backdrop-blur-md px-6 py-4">
          <div className="text-sm font-semibold">Brand Logo</div>

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

        <div className="flex min-h-[55vh] items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
              Contact Us
            </h1>

            <p className="mt-4 text-xs sm:text-sm opacity-90">
              Have a question or need assistance? We’re here to help.
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTACT SECTION ================= */}
      <div className="max-w-5xl mx-auto px-6 mt-24 pb-20">
        {/* Contact Form */}
        <div className="bg-white border border-black rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold mb-1">Send a Message</h2>
          <p className="text-sm text-gray-500 mb-6">
            Fill out the form below and we will get back to you shortly.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">
                Full Name <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 rounded-md bg-[#EDF0F3] border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Email Address <span className="text-red-500"> *</span>
              </label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 rounded-md bg-[#EDF0F3] border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Phone Number <span className="text-red-500"> *</span>
              </label>
              <input
                type="tel"
                placeholder="+234 123 456 7890"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 rounded-md  bg-[#EDF0F3] border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Message <span className="text-red-500"> *</span>
              </label>
              <textarea
                rows="4"
                placeholder="Type message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 rounded-md bg-[#EDF0F3] border border-gray-300 px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#041725] text-white py-3 rounded-md text-sm font-medium hover:bg-slate-800 transition disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>

            {isError && (
              <p className="text-sm text-red-600">
                {error?.message || "Failed to send. Please try again."}
              </p>
            )}
          </form>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-1 gap-4 mt-6">
          <div className="bg-white border border-black rounded-xl shadow-sm p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-md  bg-slate-100 flex items-center justify-center">
              📞
            </div>
            <div>
              <p className="text-sm font-medium">Phone Number</p>
              <p className="text-sm text-gray-500">07771096969</p>
              <p className="text-xs text-gray-400">Mon – Sat, 8am – 5pm</p>
            </div>
          </div>

          <div className="bg-white border border-black rounded-xl shadow-sm p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center">
              ✉️
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-gray-500">info@bigdadcommunications.com</p>
              <p className="text-xs text-gray-400">
                Our team will respond within 24hours
              </p>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-6 bg-gray-100 border border-black rounded-xl h-48 flex items-center justify-center text-gray-500 text-sm">
          <img className="w-9 h-9" src={MapIcon} alt="" />
          Map integration placeholder <br />
          47 Ocean Street, PL2 2DJ, Plymouth
        </div>
      </div>

      <AnimatePresence>
        {successModal && (
          <Motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Motion.div
              className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between mb-6">
                <button
                  onClick={() => navigate("/")}
                  className="text-sm text-gray-500"
                >
                  <img
                    src={BackwardIcon}
                    alt="back"
                    className="inline h-4 w-4 mr-1"
                  />
                  Back Home
                </button>

                <button onClick={() => setSuccessModal(false)}>
                  <img src={CloseIcon} alt="close" className="h-4 w-4" />
                </button>
              </div>

              <Motion.img
                src={sparkle}
                className="mx-auto mb-6 h-20 w-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />

              <h2 className="text-xl font-bold mb-2">Form Submitted!</h2>
              <p className="text-sm text-gray-500">
                Thank you! We will get back to you shortly.
              </p>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
