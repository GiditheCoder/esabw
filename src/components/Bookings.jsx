import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Bookings = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="bookings" className="py-12">
      {/* Outer container */}
      <div className="mx-auto">
        {/* Dark Section Card */}
        <div className="rounded-[3rem] bg-[#041725] border border-white/5 text-white px-8 py-24 md:px-16 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full"></div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-20 relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Booking Process
            </h2>
            <div className="h-1.5 w-20 bg-[#0093FF] mx-auto mt-6 rounded-full"></div>
            <p className="mt-8 text-gray-400 text-lg leading-relaxed font-medium">
              Engineering expertise you can rely on, with a process designed for
              your absolute convenience.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8 mb-20 relative z-10"
          >
            {[
              {
                step: "1",
                title: "Fill the Form",
                content: <>Go to the <span className="text-[#0093FF] font-semibold">“Book Appointment”</span> section and fill the details of your request.</>,
                note: "Note: Account creation is not required."
              },
              {
                step: "2",
                title: "Wait for Review",
                content: "Review your details and submit. Our technical team will analyze your request and provide feedback within 24 hours.",
              },
              {
                step: "3",
                title: "Get Approval",
                content: "Upon approval, you will receive an email with schedule details and further instructions for our visit.",
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={stepVariants}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
                className="group border border-white/10 rounded-[2rem] p-10 backdrop-blur-sm transition-all duration-300 hover:border-[#0093FF]/30"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0093FF] text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                    {item.step}
                  </span>
                  <CheckCircle2 className="text-[#0093FF]/20 group-hover:text-[#0093FF] transition-colors duration-500" size={28} />
                </div>
                <h4 className="text-xl font-bold mb-4 group-hover:text-[#0093FF] transition-colors">{item.title}</h4>
                <p className="text-base leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.content}
                  {item.note && (
                    <span className="text-[#0093FF]/60 block mt-4 text-sm italic font-medium">
                      {item.note}
                    </span>
                  )}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center relative z-10"
          >
            <button
              onClick={() => navigate("/book")}
              className="group inline-flex items-center gap-3 rounded-2xl bg-[#0093FF] px-10 py-5 text-lg font-bold text-white shadow-xl shadow-blue-500/20 hover:bg-[#007cd6] hover:scale-105 active:scale-95 transition-all"
            >
              Book Your Appointment Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Bookings;
