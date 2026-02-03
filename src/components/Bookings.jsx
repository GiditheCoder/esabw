import React from "react";
import book from "../images/bookappointment.png";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
   const navigate = useNavigate();

  return (
    <section className="">
      {/* Outer container */}
      <div className=" mx-auto">
        {/* Gradient Card */}
        <div className="rounded-[40px] bg-gradient-to-br from-[#041725] via-[#0a2a44] to-[#041725] text-white px-8 py-20 md:px-16">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Our Booking Process
            </h2>
            <p className="mt-4 text-gray-300 text-sm md:text-base">
              Engineering expertise you can rely on, with a process designed for
              your convenience.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            
            {/* Step 1 */}
            <div className="border border-white rounded-2xl p-8 backdrop-blur-sm">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-white mb-6 text-sm">
                1
              </span>
              <p className="text-sm leading-relaxed text-gray-200">
                Go to the{" "}
                <span className="font-semibold text-white">
                  “Book Appointment”
                </span>{" "}
                section and fill the appointment form.
                <br />
                <span className="text-gray-400 block mt-3">
                  Note: Account creation is not required.
                </span>
              </p>
            </div>

            {/* Step 2 */}
            <div className="border border-white rounded-2xl p-8 backdrop-blur-sm">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-white mb-6 text-sm">
                2
              </span>
              <p className="text-sm leading-relaxed text-gray-200">
                Review your details and submit. You will receive an email
                notification from our team within 24 hours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="border border-white rounded-2xl p-8 backdrop-blur-sm">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-white mb-6 text-sm">
                3
              </span>
              <p className="text-sm leading-relaxed text-gray-200">
                Upon approval of your request, you will receive an email with
                further instructions.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
          
                     <button
                       onClick={() => navigate("/book")}
                      className="mt-8 inline-flex items-center gap-3 rounded-lg bg-white px-7 py-3 text-sm font-medium text-black hover:opacity-90 transition">
             
              Book Appointment
               <img
                src={book}
                alt="Book appointment"
                className="w-5 h-5 object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bookings;
