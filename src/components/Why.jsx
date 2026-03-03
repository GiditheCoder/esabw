import React from "react";
import { motion } from "framer-motion";
import box8 from "../images/box8.png";
import box9 from "../images/box9.png";
import box10 from "../images/box10.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const Why = () => {
  return (
    <section id="why" className="bg-[#f8fafc] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#041725] tracking-tight">
            Why Choose Us?
          </h2>
          <div className="h-1.5 w-20 bg-[#0093FF] mx-auto mt-6 rounded-full mb-8"></div>
          <p className="mt-8 text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Engineering expertise you can rely on, with a process designed for
            your absolute convenience and peace of mind.
          </p>
        </motion.div>

        {/* Features Split */}
        <div className="space-y-32">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-blue-100/50 rounded-[3rem] blur-2xl group-hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100 duration-700"></div>
              <img
                src={box8}
                alt="Certified engineers"
                className="relative rounded-[2.5rem] w-full shadow-2xl hover:scale-[1.02] transition-transform duration-700 border-4 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0093FF] mb-8 shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-[#041725] tracking-tight">
                Certified Engineering Professionals
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                Every appointment is reviewed by a qualified Website Manager to
                ensure the right expertise is matched to your specific issue.
                We prioritize technical accuracy for all repairs and installations.
              </p>
            </motion.div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:order-2 relative group"
            >
              <div className="absolute -inset-4 bg-sky-100/50 rounded-[3rem] blur-2xl group-hover:bg-sky-100 transition-colors opacity-0 group-hover:opacity-100 duration-700"></div>
              <img
                src={box9}
                alt="Easy booking"
                className="relative rounded-[2.5rem] w-full shadow-2xl hover:scale-[1.02] transition-transform duration-700 border-4 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:order-1 space-y-6"
            >
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-8 shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-[#041725] tracking-tight">
                Friction-Free Booking
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                We value your time. Our streamlined booking platform allows you to
                describe your issue, upload photos, and request a slot in
                minutes—no account creation or complex sign-ups required.
              </p>
            </motion.div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-indigo-100/50 rounded-[3rem] blur-2xl group-hover:bg-indigo-100 transition-colors opacity-0 group-hover:opacity-100 duration-700"></div>
              <img
                src={box10}
                alt="Clear communication"
                className="relative rounded-[2.5rem] w-full shadow-2xl hover:scale-[1.02] transition-transform duration-700 border-4 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-8 shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-[#041725] tracking-tight">
                Clear Communication
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                From the moment you submit a request to the final approval, our
                email-driven workflow keeps you updated at every step,
                ensuring you know exactly when help is on the way.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
