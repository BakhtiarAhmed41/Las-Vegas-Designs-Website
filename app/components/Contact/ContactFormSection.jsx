"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactFormSection() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
      deadline: "",
      message: "",
      attachments: [],
    },
  });

  const [filesPreview, setFilesPreview] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList);
    setValue("attachments", arr, { shouldValidate: true });
    setFilesPreview(arr.map((f) => ({ name: f.name, size: f.size })));
  };

  const onSubmit = async (data) => {
    console.log("Submitted:", data);
    alert("Form submitted successfully!");
    reset();
    setFilesPreview([]);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-lv-blue focus:border-transparent";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";
  const requiredStar = <span className="text-red-500 ml-1">*</span>;

  return (
    <section className="bg-white py-8 md:py-12 lg:py-16" id="quote-form">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Left Card - Quote Form */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-gray-800 mb-3">
              Get Your Free Quote
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Fill this out and attach your file. Brief message is required so we can quote accurately.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    First name{requiredStar}
                  </label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="Enter your first name"
                    className={`${inputClass} ${
                      errors.firstName ? "border-red-500 ring-2 ring-red-100" : ""
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Last name{requiredStar}
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Enter your last name"
                    className={`${inputClass} ${
                      errors.lastName ? "border-red-500 ring-2 ring-red-100" : ""
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Email{requiredStar}
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-z]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="your.email@example.com"
                    className={`${inputClass} ${
                      errors.email ? "border-red-500 ring-2 ring-red-100" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Phone number{requiredStar}
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone number is required" }}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        country="us"
                        value={value}
                        onChange={(val) => onChange("+" + val)}
                        placeholder="+1 (555) 000-0000"
                        inputStyle={{
                          width: "100%",
                          height: "42px",
                          borderRadius: "0.375rem",
                          border: "1px solid #d1d5db",
                          background: "white",
                          fontSize: "0.875rem",
                          paddingLeft: "50px",
                        }}
                        buttonStyle={{
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem 0 0 0.375rem",
                          background: "#f9fafb",
                          borderRight: "none",
                        }}
                        containerStyle={{ width: "100%" }}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Required Service */}
              <div>
                <label className={labelClass}>
                  Required service{requiredStar}
                </label>
                <select
                  {...register("service", { required: "Service is required" })}
                  className={`${inputClass} ${
                    errors.service ? "border-red-500 ring-2 ring-red-100" : ""
                  }`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="vector-digitizing">Vector Digitizing</option>
                  <option value="embroidery-digitizing">
                    Embroidery Digitizing
                  </option>
                  <option value="svg-files">SVG Files</option>
                  <option value="cnc-laser-cut">CNC & Laser Cut</option>
                  <option value="custom-vector">Custom Vector</option>
                  <option value="graphic-design">Graphic Design</option>
                </select>
                {errors.service && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.service.message}
                  </p>
                )}
              </div>

              {/* Budget & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Budget, optional</label>
                  <select {...register("budget")} className={inputClass} defaultValue="">
                    <option value="">Select budget</option>
                    <option value="under-100">Under $100</option>
                    <option value="100-500">$100 - $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000+">$5,000+</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Deadline, optional</label>
                  <input
                    {...register("deadline")}
                    type="text"
                    placeholder="e.g., 2-3 days"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Brief Message */}
              <div>
                <label className={labelClass}>
                  Brief message{requiredStar}
                </label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                  })}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className={`${inputClass} resize-none ${
                    errors.message ? "border-red-500 ring-2 ring-red-100" : ""
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Attach File */}
              <div>
                <label className={labelClass}>Attach file</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer w-full border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center text-center"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 font-medium">
                      Choose File
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      PDF, DOC, JPG, PNG (Max 10MB)
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                  />
                </div>

                {/* File Preview */}
                {filesPreview.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {filesPreview.map((f, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center rounded-md bg-blue-50 px-3 py-2 text-sm border border-blue-100"
                      >
                        <span className="font-medium text-gray-800 truncate max-w-xs">
                          {f.name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {(f.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lv-red hover:bg-lv-red-dark text-white font-bold py-3.5 rounded-md text-[15px] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>

          {/* Right Card - Quick Contact */}
          <div className="bg-gray-100 rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-gray-800 mb-3">
              Quick Contact
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Use the option that fits your country. We can still quote fast if you send your file and a brief message.
            </p>

            <div className="space-y-3 mb-8">
              {/* WhatsApp for UK */}
              <a
                href="https://wa.me/447706709210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-800">
                  Whatsapp for UK customer
                </span>
                <span className="text-sm text-gray-700">
                  +44 7706 709210
                </span>
              </a>

              {/* Text message for USA */}
              <a
                href="sms:7253003797"
                className="flex items-center justify-between bg-white rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-800">
                  Text message for USA customer
                </span>
                <span className="text-sm text-gray-700">
                  +1 (725) 300-3797
                </span>
              </a>

              {/* Call for UK and USA */}
              <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3">
                <span className="text-sm font-semibold text-gray-800">
                  Call for UK and USA customer
                </span>
                <span className="text-sm text-gray-700">
                  <a
                    href="tel:+447706709210"
                    className="hover:text-gray-900 transition-colors"
                  >
                    UK +44
                  </a>
                  <span className="mx-1">,</span>
                  <a
                    href="tel:7253003797"
                    className="hover:text-gray-900 transition-colors"
                  >
                    USA +1
                  </a>
                </span>
              </div>

              {/* Email */}
              <a
                href="mailto:Sales@Lasvegasdesignsusa.com"
                className="flex items-center justify-between bg-white rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-800">
                  Email
                </span>
                <span className="text-sm text-gray-700">
                  Sales@Lasvegasdesignsusa.com
                </span>
              </a>
            </div>

            {/* How it works */}
            <div className="border-t border-gray-300 pt-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                How it works
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="text-sm text-gray-700">
                    Send your file and a brief message
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span className="text-sm text-gray-700">
                    We confirm price and turnaround
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span className="text-sm text-gray-700">
                    We deliver final files in your requested formats
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
