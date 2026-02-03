// import React from "react";
// import box8 from "../images/box8.png";
// import box9 from "../images/box9.png";
// import box10 from "../images/box10.png";

// const Why = () => {
//   return (
//     <section className="bg-gray-50 py-20 px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//             Why Choose Us?
//           </h2>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             Engineering expertise you can rely on, with a process designed for
//             your convenience.
//           </p>
//         </div>

//         {/* Row 1 */}
//         <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
//           <img
//             src={box8}
//             alt="Certified engineers"
//             className="rounded-2xl w-full object-cover"
//           />

//           <div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">
//               Certified Engineering Professionals
//             </h3>
//             <p className="text-gray-600 leading-relaxed">
//               Unlike standard repair directories, every appointment is reviewed
//               by a qualified Website Manager to ensure the right expertise is
//               matched to your specific issue. We prioritize technical accuracy
//               for all repairs and installations.
//             </p>
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
//           <div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">
//               Friction-Free Booking
//             </h3>
//             <p className="text-gray-600 leading-relaxed">
//               We value your time. Our streamlined booking platform allows you to
//               describe your issue, upload photos of the problem, and request a
//               slot in minutes—no account creation or complex sign-ups required.
//             </p>
//           </div>

//           <img
//             src={box9}
//             alt="Easy booking"
//             className="rounded-2xl w-full object-cover"
//           />
//         </div>

//         {/* Row 3 */}
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <img
//             src={box10}
//             alt="Clear communication"
//             className="rounded-2xl w-full object-cover"
//           />

//           <div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">
//               Clear Communication
//             </h3>
//             <p className="text-gray-600 leading-relaxed">
//               Never be left in the dark. From the moment you submit a request to
//               the final approval, our email-driven workflow keeps you updated at
//               every step, ensuring you know exactly when help is on the way.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Why;


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
    <section className="bg-[#EFF2F4] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#041725]">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-[#041725]/70 max-w-2xl mx-auto">
            Engineering expertise you can rely on, with a process designed for
            your convenience.
          </p>
        </motion.div>

        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.img
            src={box8}
            alt="Certified engineers"
            className="rounded-2xl w-full object-cover"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          />

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-[#041725] mb-4">
              Certified Engineering Professionals
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Unlike standard repair directories, every appointment is reviewed
              by a qualified Website Manager to ensure the right expertise is
              matched to your specific issue. We prioritize technical accuracy
              for all repairs and installations.
            </p>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-[#041725] mb-4">
              Friction-Free Booking
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We value your time. Our streamlined booking platform allows you to
              describe your issue, upload photos of the problem, and request a
              slot in minutes—no account creation or complex sign-ups required.
            </p>
          </motion.div>

          <motion.img
            src={box9}
            alt="Easy booking"
            className="rounded-2xl w-full object-cover"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          />
        </div>

        {/* Row 3 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={box10}
            alt="Clear communication"
            className="rounded-2xl w-full object-cover"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          />

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-[#041725] mb-4">
              Clear Communication
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Never be left in the dark. From the moment you submit a request to
              the final approval, our email-driven workflow keeps you updated at
              every step, ensuring you know exactly when help is on the way.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Why;
