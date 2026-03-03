import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sparkle from "../images/sparkle.png";
import BackwardIcon from "../images/Backwardicon.png";
import CloseIcon from "../images/CloseIcon.png";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { useCreateMessage } from "../hooks/server/mutations";
import Navbar from "./Navbar";
import box10 from "../images/box10.png";

const Contact = () => {
  const navigate = useNavigate();
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
    <div className="bg-[#041725] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden rounded-b-[4rem]"
        style={{
          backgroundImage: `linear-gradient(rgba(4, 23, 37, 0.8), rgba(4, 23, 37, 0.4)), url(${box10})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#0093FF]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Get in <span className="bg-gradient-to-r from-[#0093FF] to-blue-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-base md:text-lg opacity-90 font-medium max-w-2xl mx-auto leading-relaxed text-white">
              Have a technical project or need urgent repairs? Our engineering team
              is ready to provide expert support and bespoke solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pb-32 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Contact Information & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-[#041725] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>

              <h2 className="text-3xl font-bold mb-10 relative z-10">Contact Information</h2>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#0093FF]/20 group-hover:border-[#0093FF]/40 transition-all">
                    <Phone className="text-[#0093FF]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Call Us</p>
                    <p className="text-xl font-bold hover:text-[#0093FF] transition-colors">
                      <a href="tel:08039424024">0803 942 4024</a>
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm italic">
                      <Clock size={14} />
                      <span>Mon – Sat, 8am – 6pm</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#0093FF]/20 group-hover:border-[#0093FF]/40 transition-all">
                    <Mail className="text-[#0093FF]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Email Us</p>
                    <p className="text-xl font-bold hover:text-[#0093FF] transition-colors leading-tight">
                      <a href="mailto:bigdad_2k2@yahoo.com">bigdad_2k2@yahoo.com</a>
                    </p>
                    <p className="mt-2 text-gray-400 text-sm italic">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#0093FF]/20 group-hover:border-[#0093FF]/40 transition-all">
                    <MapPin className="text-[#0093FF]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Visit Us</p>
                    <p className="text-lg font-bold leading-snug">
                      Shop 5, Block D Abattoir Shopping Complex,<br />Abattoir Bus Stop, Agege, Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-12 border border-gray-100"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Send a Message</h2>
              <p className="text-gray-500 font-medium">
                Fill out the form and our engineers will review your request.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. John Doe"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0093FF]/40 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0093FF]/40 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="080 xxx xxx xx"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0093FF]/40 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Your Message *</label>
                <textarea
                  rows="5"
                  required
                  placeholder="Describe your project or maintenance needs..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0093FF]/40 transition-all font-medium resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isPending}
                className="w-full bg-[#0093FF] text-white py-5 rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/20 hover:bg-[#007cd6] transition-all disabled:opacity-70 flex items-center justify-center gap-3 mt-4"
              >
                {isPending ? "Sending Request..." : "Send Message"}
                <Send size={20} className={isPending ? "animate-pulse" : ""} />
              </motion.button>

              {isError && (
                <p className="text-center text-sm font-bold text-red-500 mt-4">
                  {error?.message || "Failed to send message. Please try again."}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {successModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#041725]/80 backdrop-blur-md px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-[3rem] bg-white p-10 text-center shadow-2xl border border-gray-100"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setSuccessModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <img src={CloseIcon} alt="close" className="h-4 w-4" />
                </button>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
              >
                <motion.img
                  src={sparkle}
                  className="h-14 w-14"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />
              </motion.div>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Message Sent!</h2>
              <p className="text-gray-500 font-medium mb-10 leading-relaxed text-lg">
                Thank you for reaching out. One of our engineers will review your inquiry and contact you within 24 hours.
              </p>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-[#041725] text-white py-4 rounded-2xl text-lg font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                <img
                  src={BackwardIcon}
                  alt="back"
                  className="h-5 w-5 brightness-0 invert"
                />
                Return to Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
