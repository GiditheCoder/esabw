import React from "react";
import box8 from "../images/box8.png";
import book from "../images/bookappointment.png";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-[#041725]">
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative flex min-h-screen items-center justify-center pt-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(4, 23, 37, 0.7), rgba(4, 23, 37, 0.9)), url(${box8})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#0093FF]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-600/20 blur-[120px] rounded-full"></div>

        <div className="container relative z-10 px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Modern Solutions for <br />
              <span className="bg-gradient-to-r from-[#0093FF] via-blue-400 to-[#0093FF] bg-clip-text text-transparent">
                Technical Excellence
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed font-medium text-white">
              Premier technical solutions for high-performance home and
              commercial equipment. Engineering excellence, delivered daily.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/book")}
                className="group inline-flex items-center gap-3 rounded-xl bg-[#0093FF] px-8 py-3 text-sm font-bold text-white hover:bg-[#007cd6] hover:shadow-[0_0_20px_rgba(0,147,255,0.4)] transition-all active:scale-95"
              >
                Book Appointment
                <img src={book} alt="Book appointment" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 px-8 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all active:scale-95"
              >
                Our Services
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
