// import React from "react";
// import box2 from "../images/box2.png";
// import box3 from "../images/box3.png";

// const About = () => {
//   return (
//     <section className="w-full bg-white py-20">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* Section Header (CENTERED & OUTSIDE GRID) */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             About Us
//           </h2>
//           <p className="text-gray-500 max-w-xl mx-auto">
//             Experienced team ensuring reliable, top-tier engineering.
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
//           {/* Text Section */}
//           <div className="text-gray-600 leading-relaxed space-y-6 mb-38">
//             <p>
//               Founded on the principles of technical excellence and reliability,
//               our company was established to bridge the gap between complex
//               engineering needs and accessible, professional service.
//             </p>

//             <p>
//               With a background rooted in years of hands-on experience across
//               residential and commercial sectors, we possess the specialized
//               knowledge required to handle intricate repairs, installations,
//               and system setups with precision.
//             </p>

//             <p>
//               Our mission is to simplify the maintenance of your essential
//               equipment by providing transparent, expert-led service that
//               individuals and businesses can trust to get the job done right
//               the first time.
//             </p>
//           </div>

//           {/* Image Section */}
//           <div className="relative flex justify-center lg:justify-end">
//             <img
//               src={box2}
//               alt="Engineer at control panel"
//               className="rounded-xl w-full max-w-lg object-cover"
//             />

//             {/* Overlapping Image */}
//             <div className="absolute -bottom-10 -left-10 bg-gray-200 rounded-xl w-52 h-36 shadow-lg hidden sm:block">
//               <img
//                 src={box3}
//                 alt="Equipment detail"
//                 className="w-full h-full object-cover rounded-xl"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="mt-24 bg-gray-50 rounded-2xl py-10 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-sm">
//           <div>
//             <h3 className="text-3xl font-bold text-gray-900">1000+</h3>
//             <p className="text-gray-500 mt-2">Repairs Completed</p>
//           </div>
//           <div>
//             <h3 className="text-3xl font-bold text-gray-900">95%</h3>
//             <p className="text-gray-500 mt-2">Customer Satisfaction</p>
//           </div>
//           <div>
//             <h3 className="text-3xl font-bold text-gray-900">10+</h3>
//             <p className="text-gray-500 mt-2">Years of Experience</p>
//           </div>
//           <div>
//             <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
//             <p className="text-gray-500 mt-2">Emergency Service</p>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default About;


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
    >
      <h3 className="text-3xl font-bold text-gray-900">
        {count}
        {suffix}
      </h3>
      <p className="text-gray-500 mt-2">{label}</p>
    </motion.div>
  );
};

const About = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Experienced team ensuring reliable, top-tier engineering.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p>
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
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={box2}
              alt="Engineer at control panel"
              className="rounded-xl w-full max-w-lg object-cover"
            />
            <div className="absolute -bottom-10 -left-10 bg-gray-200 rounded-xl w-52 h-36 shadow-lg hidden sm:block">
              <img
                src={box3}
                alt="Equipment detail"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 bg-gray-50 rounded-2xl py-10 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-sm">
          <Stat value={1000} suffix="+" label="Repairs Completed" />
          <Stat value={95} suffix="%" label="Customer Satisfaction" delay={0.1} />
          <Stat value={10} suffix="+" label="Years of Experience" delay={0.2} />
          <Stat value={24} suffix="/7" label="Emergency Service" delay={0.3} />
        </div>

      </div>
    </section>
  );
};

export default About;

