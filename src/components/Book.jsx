import { useState } from "react";
import boxappointment from "../images/boxappoint.png";
import { useNavigate } from "react-router-dom";
import sparkle from "../images/sparkle.png";
import BackwardIcon from "../images/Backwardicon.png";
import CloseIcon from "../images/CloseIcon.png";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "../images/menu.png";
import Close from "../images/CloseIcon.png";
import { useCreateAppointment } from "../hooks/server/mutations";

const Book = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    serviceType: "",
    serviceDescription: "",
    applianceType: "",
    appointmentDate: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const {
    mutateAsync: createAppointment,
    isPending,
    isError,
    error,
  } = useCreateAppointment({
    onSuccess: () => {
      setOpenModal(false);
      setSuccessModal(true);
      setFormData({
        serviceType: "",
        serviceDescription: "",
        applianceType: "",
        appointmentDate: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFiles((prev) => [
          ...prev,
          {
            id: Date.now(),
            name: file.name,
            size: (file.size / 1024).toFixed(2),
            file: file,
            preview: reader.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
    event.target.value = "";
  };

  const handleRemoveFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleSubmit = async () => {
    try {
      await createAppointment(formData);
    } catch {
      // Error state is handled by react-query
    }
  };

  return (
    <div className="w-full">
      <div
        className="
          min-h-[70vh]
          rounded-b-[50px]
          bg-cover bg-center
          text-white
          px-8 py-6
        "
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${boxappointment})`,
        }}
      >
        {/* Navbar */}
        <nav className="relative flex items-center justify-between border border-white rounded-xl bg-white/10 backdrop-blur-md px-6 py-4">
          <div className="text-sm font-semibold">Brand Logo</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-sm text-white">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer font-medium hover:text-[#0093FF] transition"
            >
              Home
            </li>
            <li className="cursor-pointer opacity-90 hover:text-[#0093FF] transition">
              Services
            </li>
            <li className="cursor-pointer opacity-90 hover:text-[#0093FF] transition">
              About us
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="cursor-pointer opacity-90 hover:text-[#0093FF] transition"
            >
              Contact
            </li>
          </ul>

          {/* Mobile Menu Icon */}
          <img
            src={menuOpen ? Close : Menu}
            alt="menu"
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute top-full left-0 mt-4 w-full rounded-xl bg-black/90 backdrop-blur-md md:hidden">
              <ul className="flex flex-col items-center gap-6 py-6 text-sm">
                <li onClick={() => navigate("/")} className="cursor-pointer">
                  Home
                </li>
                <li className="cursor-pointer">Services</li>
                <li className="cursor-pointer">About us</li>
                <li
                  onClick={() => navigate("/contact")}
                  className="cursor-pointer"
                >
                  Contact
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* Hero Content */}
        <div className="flex min-h-[55vh] items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Book an Appointment
            </h1>

            <p className="mt-3 text-xs sm:text-sm opacity-90">
              Tell us about your service needs and we'll get back to you
              promptly
            </p>
          </div>
        </div>
      </div>

      {/* ================= FORM SECTION ================= */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* How it works */}
          <div className="mb-8 rounded-xl border border-sky-400/40 bg-[#F4FBFF] p-5 text-sm">
            <p className="font-semibold mb-2">How it works:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-600">
              <li>Fill out the appointment request form below</li>
              <li>Our team will review your request within 24 hours</li>
              <li>You’ll get an email with our decision or next steps</li>
              <li>Once approved, we’ll schedule your appointment</li>
            </ol>
          </div>

          {/* Appointment Form */}
          <div className="rounded-2xl bg-white p-8 text-gray-900 shadow-xl">
            <h2 className="text-2xl font-bold mb-2">
              Appointment Request Form
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Please describe your needs below. All appointment requests are
              reviewed before confirmation.
            </p>

            {/* Service Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Service Information</h3>
              <p>Service type *</p>
              <select
                onChange={handleChange}
                name="serviceType"
                value={formData.serviceType}
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option>Select a service type</option>
                <option>Repair</option>
                <option>Installation</option>
                <option>Setup</option>
              </select>

              <h3>Service/Problem Description *</h3>
              <textarea
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleChange}
                rows="4"
                placeholder="my samsung tv is having an issue, so I want it to be checked"
                className="w-full rounded-lg bg-[#EDF0F3] border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <h3>Appliance Type</h3>
              <select
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                onChange={handleChange}
                name="applianceType"
                value={formData.applianceType}
              >
                <option>Select the appliance you want to fix</option>
                <option>Television</option>
                <option>Air Conditioner</option>
                <option>Freezer</option>
                <option>Solar</option>
              </select>

              <h3>Preferred Appointment Date *</h3>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              {/* Upload */}
              <h2>Upload image (optional)</h2>
              <p>Attach a picture of the issue or appliance</p>
              <div 
                onClick={() => document.getElementById("fileInput").click()}
                className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
              >
                <p className="font-medium">Click to upload image</p>
                <p className="text-xs mt-1">PNG, JPG up to 10MB</p>
              </div>
              <input
                id="fileInput"
                type="file"
                multiple
                accept="image/png,image/jpeg"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Display uploaded files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-3">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-300 p-3"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-700 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}kb</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        className="flex-shrink-0 p-1.5 hover:bg-gray-200 rounded-full transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="mt-8 space-y-4">
              <h3 className="font-semibold text-lg">Contact Information</h3>

              <p>
                Full Name <span className="text-red-500 ">*</span>
              </p>
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#EDF0F3]  border px-4 py-3 text-sm"
              />

              <p>
                Email Address <span className="text-red-500">*</span>
              </p>

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#EDF0F3]  border px-4 py-3 text-sm"
              />

              <p>
                Phone Number <span className="text-red-500">*</span>
              </p>
              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#EDF0F3]  border px-4 py-3 text-sm"
              />

              <p>
                Service Address <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                placeholder="123 Main Street"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#EDF0F3]  border px-4 py-3 text-sm"
              />
            </div>

            {/* Submit */}
            <button
              onClick={() => setOpenModal(true)}
              className="mt-8 w-full rounded-lg bg-slate-900 py-3 text-white font-semibold hover:bg-slate-800 transition"
            >
              Proceed
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              By submitting this form, you agree to be contacted regarding your
              service request.
            </p>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-2">Confirm details</h2>

            <p className="text-sm text-gray-500 mb-4">
              Confirm your information before submission.
            </p>

            {/* Service Info */}
            <div className="mb-4">
              <h3 className="font-semibold text-sm mb-2">
                Service Information
              </h3>
              <p className="text-sm text-gray-600">
                Service Type:{" "}
                <span className="font-medium">
                  {formData.serviceType || "Not provided"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Appliance:{" "}
                <span className="font-medium">
                  {formData.applianceType || "Not provided"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Description: {formData.serviceDescription || "Not provided"}
              </p>
              <p className="text-sm text-gray-600">
                Appointment Date: {formData.appointmentDate || "Not provided"}
              </p>
            </div>

            {/* Image Preview */}
            <div className="mb-4 flex gap-3">
              <div className="h-20 w-20 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                Image
              </div>
            </div>

            <hr className="my-4" />

            {/* Contact Info */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-2">
                Contact Information
              </h3>
              <p className="text-sm text-gray-600">
                Full Name: {formData.fullName || "Not provided"}
              </p>
              <p className="text-sm text-gray-600">
                Email: {formData.email || "Not provided"}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {formData.phone || "Not provided"}
              </p>
              <p className="text-sm text-gray-600">
                Address: {formData.address || "Not provided"}
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="flex-1 rounded-lg bg-slate-900 py-2.5 text-white font-semibold disabled:opacity-60"
              >
                {isPending ? "Submitting..." : "Submit Request"}
              </button>

              <button
                onClick={() => setOpenModal(false)}
                className="flex-1 rounded-lg border py-2.5 font-semibold"
              >
                Cancel Request
              </button>
            </div>

            {isError && (
              <p className="mt-4 text-sm text-red-600">
                {error?.message || "Failed to submit. Please try again."}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ================= SUCCESS MODAL (SEPARATE) ================= */}
      <AnimatePresence>
        {successModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between mb-6">
                <button
                  onClick={() => navigate("/")}
                  className="text-sm text-gray-500"
                >
                  <img
                    src={BackwardIcon}
                    alt="back"
                    className="inline h-4 w-4 mr-1"
                  />
                  Back Home
                </button>

                <button onClick={() => setSuccessModal(false)}>
                  <img src={CloseIcon} alt="close" className="h-4 w-4" />
                </button>
              </div>

              <motion.img
                src={sparkle}
                className="mx-auto mb-6 h-20 w-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />

              <h2 className="text-xl font-bold mb-2">Form Submitted!</h2>
              <p className="text-sm text-gray-500">
                Thank you! We will get back to you shortly.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Book;

// import React, { useState } from "react";
// import boxappointment from "../images/boxappoint.png";
// import { useNavigate } from "react-router-dom";
// import sparkle from "../images/sparkle.png";
// import BackwardIcon from "../images/Backwardicon.png";
// import CloseIcon from "../images/CloseIcon.png";
// import { motion, AnimatePresence } from "framer-motion";

// const Book = () => {
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = useState(false);
//   const [successModal, setSuccessModal] = useState(false);

//   return (
//     <div className="w-full">
//       {/* ================= HERO ================= */}
//       <div
//         className="min-h-[70vh] rounded-b-[50px] bg-cover bg-center text-white px-8 py-6"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${boxappointment})`,
//         }}
//       >
//         <nav className="flex items-center justify-between border border-white rounded-xl bg-white/10 backdrop-blur-md px-9 py-5">
//           <div className="text-sm font-semibold">Brand Logo</div>

//           <ul className="flex gap-6 text-sm text-white">
//             <li onClick={() => navigate("/")} className="cursor-pointer hover:text-[#0093FF]">
//               Home
//             </li>
//             <li className="cursor-pointer hover:text-[#0093FF]">Services</li>
//             <li className="cursor-pointer hover:text-[#0093FF]">About us</li>
//             <li className="cursor-pointer hover:text-[#0093FF]">Contact</li>
//           </ul>
//         </nav>

//         <div className="flex min-h-[55vh] items-center justify-center text-center">
//           <div>
//             <h1 className="text-5xl font-bold">Book an Appointment</h1>
//             <p className="mt-4 text-sm opacity-90">
//               Tell us about your service needs and we'll get back to you promptly
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ================= FORM ================= */}
//       <div className="bg-gray-50 py-20 px-6">
//         <div className="max-w-4xl mx-auto rounded-2xl bg-white p-8 shadow-xl">
//           <h2 className="text-2xl font-bold mb-2">Appointment Request Form</h2>

//           <button
//             onClick={() => setOpenModal(true)}
//             className="mt-8 w-full rounded-lg bg-slate-900 py-3 text-white font-semibold"
//           >
//             Proceed
//           </button>
//         </div>
//       </div>

//       {/* ================= CONFIRM MODAL ================= */}

//     </div>
//   );
// };

// export default Book;
