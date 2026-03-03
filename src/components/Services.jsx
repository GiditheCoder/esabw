import React from "react";
import { motion } from "framer-motion";
import box4 from "../images/box4.png";
import box5 from "../images/box5.png";
import box6 from "../images/box6.png";
import box7 from "../images/box7.png";

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="services" className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Background Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden py-32 px-6 text-center shadow-2xl"
          style={{
            backgroundImage: `url(${box4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-white">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Our Services
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-200 text-lg leading-relaxed mb-12 font-medium"
            >
              We go beyond simple fixes. Our team of certified engineers provides
              end-to-end technical support for residential and commercial
              equipment. Whether you are facing a critical breakdown or setting
              up a new facility, we ensure your technology operates at peak
              performance.
            </motion.p>
          </div>
        </motion.div>

        {/* Service Cards — FLOATING IN FRONT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-20 -mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-10"
        >

          {[
            {
              img: box5,
              title: "Diagnostics & Repair",
              desc: "We troubleshoot and fix complex issues for a wide range of appliances, including TVs, air conditioners, and washing machines."
            },
            {
              img: box6,
              title: "Professional Installation",
              desc: "Secure and compliant installation for heavy-duty appliances. We ensure your equipment is mounted and fitted correctly."
            },
            {
              img: box7,
              title: "System Setup & Configuration",
              desc: "Don’t struggle with the manual. Our engineers handle the technical configuration to ensure your devices operate at peak performance."
            }
          ].map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center border border-gray-100 group"
            >
              <div className="mb-8 overflow-hidden rounded-xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={service.img}
                  alt={service.title}
                  className="mx-auto h-48 w-full object-cover transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0093FF] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default Services;
