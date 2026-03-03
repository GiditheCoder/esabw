import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import box2 from "../images/box2.png";
import box3 from "../images/box3.png";

const Stat = ({ value, suffix, label, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        delay,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.floor(v)),
      });

      return () => controls.stop();
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0093FF] to-blue-400 bg-clip-text text-transparent mb-2">
        {count}
        {suffix}
      </h3>
      <p className="text-gray-600 font-medium uppercase tracking-wider text-xs md:text-sm">{label}</p>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="w-full bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#041725] mb-6 tracking-tight">
            Our Story & Mission
          </h2>
          <div className="h-1.5 w-20 bg-[#0093FF] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Delivering technical excellence and reliability through years of
            specialized engineering experience.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gray-600 text-lg leading-relaxed space-y-8"
          >
            <p className="font-medium">
              Founded on the principles of technical excellence and reliability,
              our company was established to bridge the gap between complex
              engineering needs and accessible, professional service.
            </p>
            <p>
              With a background rooted in years of hands-on experience across
              residential and commercial sectors, we possess the specialized
              knowledge required to handle intricate repairs, installations,
              and system setups with precision.
            </p>
            <p>
              Our mission is to simplify the maintenance of your essential
              equipment by providing transparent, expert-led service that
              individuals and businesses can trust to get the job done right
              the first time.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50">
              <img
                src={box2}
                alt="Engineer at control panel"
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Secondary Image Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-12 -left-12 bg-white p-4 rounded-3xl shadow-2xl hidden md:block border border-gray-100"
            >
              <img
                src={box3}
                alt="Equipment detail"
                className="w-48 h-36 object-cover rounded-2xl shadow-inner shadow-black/5"
              />
              <div className="absolute -top-4 -right-4 bg-[#0093FF] w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 bg-gray-50/50 border border-gray-100 rounded-[3rem] py-16 px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center"
        >
          <Stat value={1000} suffix="+" label="Repairs Completed" />
          <Stat value={95} suffix="%" label="Client Satisfaction" delay={0.1} />
          <Stat value={10} suffix="+" label="Years Experience" delay={0.2} />
          <Stat value={24} suffix="/7" label="Emergency Response" delay={0.3} />
        </motion.div>

      </div>
    </section>
  );
};

export default About;

