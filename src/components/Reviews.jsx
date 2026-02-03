// import React from "react";
// import elipse1 from "../images/elipse1.png";
// import elipse2 from "../images/elipse2.png";
// import elipse3 from "../images/elipse3.png";
// import elipse4 from "../images/elipse4.png";

// const reviews = [
//   {
//     name: "Chinedu O.",
//     role: "AC Repair Services",
//     image: elipse1,
//     text: "I had a critical issue with my air conditioner during the heatwave. The booking process was incredibly smooth, and the team resolved it quickly within 24 hours. Highly recommended!",
//   },
//   {
//     name: "Sarah O.",
//     role: "Installation & Setup",
//     image: elipse2,
//     text: "We needed a complete installation and setup for our new office. The engineers were professional, arrived on time, and the setup was flawless.",
//   },
//   {
//     name: "David K.",
//     role: "TV Repair",
//     image: elipse3,
//     text: "Finally, a website that makes it easy to describe the problem! I uploaded a photo of my broken TV, and they knew exactly what parts to bring. Fantastic service.",
//   },
//   {
//     name: "Gain Logistics",
//     role: "Maintenance",
//     image: elipse4,
//     text: "As a business owner, I need reliability. This company handles all our appliance maintenance requests efficiently. The email updates kept me in the loop the whole time.",
//   },
// ];

// const Reviews = () => {
//   return (
//     <section className="w-full py-20 bg-white">
//       {/* Header */}
//       <div className="text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-semibold text-[#0B1C3F]">
//           What Our Clients Say
//         </h2>
//         <p className="text-gray-500 mt-2">
//           Don’t just take our word for it
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className="relative bg-white rounded-2xl shadow-lg px-6 pt-14 pb-8 text-center"
//           >
//             {/* Avatar */}
//             <div className="absolute -top-8 left-1/2 -translate-x-1/2">
//               <img
//                 src={review.image}
//                 alt={review.name}
//                 className="w-16 h-16 rounded-full object-cover"
//               />
//             </div>

//             <h3 className="font-semibold text-[#0B1C3F]">
//               {review.name}
//             </h3>
//             <p className="text-sm text-gray-400 mb-4">
//               {review.role}
//             </p>

//             <p className="text-sm text-gray-500 leading-relaxed">
//               {review.text}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Reviews;


import React from "react";
import { motion } from "framer-motion";
import elipse1 from "../images/elipse1.png";
import elipse2 from "../images/elipse2.png";
import elipse3 from "../images/elipse3.png";
import elipse4 from "../images/elipse4.png";

const reviews = [
  {
    name: "Chinedu O.",
    role: "AC Repair Services",
    image: elipse1,
    text: "I had a critical issue with my air conditioner during the heatwave. The booking process was incredibly smooth, and the team resolved it quickly within 24 hours. Highly recommended!",
  },
  {
    name: "Sarah O.",
    role: "Installation & Setup",
    image: elipse2,
    text: "We needed a complete installation and setup for our new office. The engineers were professional, arrived on time, and the setup was flawless.",
  },
  {
    name: "David K.",
    role: "TV Repair",
    image: elipse3,
    text: "Finally, a website that makes it easy to describe the problem! I uploaded a photo of my broken TV, and they knew exactly what parts to bring. Fantastic service.",
  },
  {
    name: "Gain Logistics",
    role: "Maintenance",
    image: elipse4,
    text: "As a business owner, I need reliability. This company handles all our appliance maintenance requests efficiently. The email updates kept me in the loop the whole time.",
  },
];

/* Animation variants */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Reviews = () => {
  return (
    <section className="w-full py-20 bg-white">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[#0B1C3F]">
          What Our Clients Say
        </h2>
        <p className="text-gray-500 mt-2">
          Don’t just take our word for it
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            variants={card}
            className="relative bg-white rounded-2xl shadow-lg px-6 pt-14 pb-8 text-center"
          >
            {/* Avatar */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>

            <h3 className="font-semibold text-[#0B1C3F]">
              {review.name}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {review.role}
            </p>

            <p className="text-sm text-gray-500 leading-relaxed">
              {review.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Reviews;
