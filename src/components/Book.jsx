import { useState } from "react";
import boxappointment from "../images/boxappoint.png";
import { useNavigate } from "react-router-dom";
import sparkle from "../images/sparkle.png";
import BackwardIcon from "../images/Backwardicon.png";
import CloseIcon from "../images/CloseIcon.png";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useCreateAppointment } from "../hooks/server/mutations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";

const Book = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showCustomAppliance, setShowCustomAppliance] = useState(false);

  const formSchema = z.object({
    serviceType: z.string().min(1, "Service type is required"),
    serviceDescription: z
      .string()
      .min(10, "Please provide at least 10 characters"),
    applianceType: z.string().optional().or(z.literal("")),
    customApplianceType: z.string().optional().or(z.literal("")),
    appointmentDate: z.string().min(1, "Appointment date is required"),
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(7, "Enter a valid phone number"),
    address: z.string().min(1, "Address is required"),
  });

  const defaultValues = {
    serviceType: "",
    serviceDescription: "",
    applianceType: "",
    customApplianceType: "",
    appointmentDate: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const formValues = form.watch();

  const {
    mutateAsync: createAppointment,
    isPending,
    isError,
    error,
  } = useCreateAppointment({
    onSuccess: () => {
      setOpenModal(false);
      setSuccessModal(true);
      form.reset(defaultValues);
      setUploadedFile(null);
    },
  });

  const handleFileUpload = (event) => {
    const [file] = event.target.files || [];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFile({
        id: Date.now(),
        name: file.name,
        size: (file.size / 1024).toFixed(2),
        file,
        preview: reader.result,
      });
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const onSubmit = async (values) => {
    const payload = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      payload.append(key, value);
    });
    if (uploadedFile?.file) {
      payload.append("image", uploadedFile.file, uploadedFile.name);
    }

    try {
      await createAppointment(payload);
    } catch {
      // Error state is handled by react-query
    }
  };

  const handleProceed = form.handleSubmit(() => setOpenModal(true));

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
        <Navbar />

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
            <Form {...form}>
              <form onSubmit={handleProceed} className="space-y-4">
                {/* Service Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Service Information</h3>
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Service type <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a service type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Repair">Repair</SelectItem>
                            <SelectItem value="Installation">
                              Installation
                            </SelectItem>
                            <SelectItem value="Setup">Setup</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceDescription"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Service/Problem Description{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Describe the issue with your appliance and what issue you're experiencing"
                            className="w-full bg-[#EDF0F3]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applianceType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Appliance Type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setShowCustomAppliance(value === "Others");
                            if (value !== "Others") {
                              form.setValue("customApplianceType", "");
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select the appliance you want to fix" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Television">
                              Television
                            </SelectItem>
                            <SelectItem value="Air Conditioner">
                              Air Conditioner
                            </SelectItem>
                            <SelectItem value="Freezer">Freezer</SelectItem>
                            <SelectItem value="Solar">Solar</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  {showCustomAppliance && (
                    <FormField
                      control={form.control}
                      name="customApplianceType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            Specify Appliance Type{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your appliance type"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="appointmentDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Preferred Appointment Date{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="date" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

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
                  multiple={false}
                  accept="image/png,image/jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Display uploaded files */}
                {uploadedFile && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-300 p-3">
                      <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                        <img
                          src={uploadedFile.preview}
                          alt={uploadedFile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-700 truncate">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {uploadedFile.size}kb
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveFile}
                        className="shrink-0 p-1.5 hover:bg-gray-200 rounded-full transition"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="mt-8 space-y-4">
                  <h3 className="font-semibold text-lg">Contact Information</h3>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Full Name"
                            className="bg-[#EDF0F3]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className={"text-red-500"} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email Address"
                            className="bg-[#EDF0F3]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className={"text-red-500"} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Phone Number"
                            className="bg-[#EDF0F3]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className={"text-red-500"} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Service Address{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main Street"
                            className="bg-[#EDF0F3]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className={"text-red-500"} />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="mt-8 w-full rounded-lg bg-slate-900 py-3 text-white font-semibold hover:bg-slate-800"
                >
                  Proceed
                </Button>

                <p className="mt-3 text-center text-xs text-gray-500">
                  By submitting this form, you agree to be contacted regarding
                  your service request.
                </p>
              </form>
            </Form>
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
                  {formValues.serviceType || "Not provided"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Appliance:{" "}
                <span className="font-medium">
                  {formValues.applianceType || "Not provided"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Description: {formValues.serviceDescription || "Not provided"}
              </p>
              <p className="text-sm text-gray-600">
                Appointment Date: {formValues.appointmentDate || "Not provided"}
              </p>
            </div>

            {/* Image Preview */}
            <div className="mb-4 flex flex-wrap gap-3">
              {uploadedFile ? (
                <div className="h-20 w-20 rounded-lg border bg-gray-100 overflow-hidden">
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-20 w-20 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                  No image
                </div>
              )}
            </div>

            <hr className="my-4" />

            {/* Contact Info */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-2">
                Contact Information
              </h3>
              <p className="text-sm text-gray-600">
                Full Name: {formValues.fullName || "Not provided"}
              </p>
              <p className="text-sm text-gray-600">
                Email: {formValues.email || "Not provided"}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {formValues.phone || "Not provided"}
              </p>
              <p className="text-sm text-gray-600">
                Address: {formValues.address || "Not provided"}
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={form.handleSubmit(onSubmit)}
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
          <Motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Motion.div
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

              <Motion.img
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
            </Motion.div>
          </Motion.div>
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
