import React from "react";
import box4 from "../images/box4.png";
import box5 from "../images/box5.png";
import box6 from "../images/box6.png";
import box7 from "../images/box7.png";


const Services = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Background Header */}
        <div
          className="relative rounded-3xl overflow-hidden py-28 px-6 text-center"
          style={{
            backgroundImage: `url(${box4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
         

          <div className="relative z-10 max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-gray-200 leading-relaxed mb-22">
              We go beyond simple fixes. Our team of certified engineers provides
              end-to-end technical support for residential and commercial
              equipment. Whether you are facing a critical breakdown or setting
              up a new facility, we ensure your technology operates at peak
              performance.
            </p>
          </div>
        </div>

        {/* Service Cards — FLOATING IN FRONT */}
        <div className="relative z-20 -mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="-mt-16 mb-6">
              <img
                src={box5}
                alt="Diagnostics and Repair"
                className="mx-auto mt-18 rounded-xl shadow-md"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Diagnostics & Repair
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We troubleshoot and fix complex issues for a wide range of
              appliances, including TVs, air conditioners, and washing
              machines.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="-mt-16 mb-6">
              <img
                src={box6}
                alt="Professional Installation"
                className="mx-auto mt-18 rounded-xl shadow-md"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Professional Installation
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Secure and compliant installation for heavy-duty appliances. We
              ensure your equipment is mounted and fitted correctly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="-mt-16 mb-6">
              <img
                src={box7}
                alt="System Setup and Configuration"
                className="mx-auto mt-18 rounded-xl shadow-md"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              System Setup & Configuration
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Don’t struggle with the manual. Our engineers handle the technical
              configuration to ensure your devices operate at peak performance.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
