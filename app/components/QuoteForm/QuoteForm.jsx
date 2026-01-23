"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function QuoteForm() {
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
      company: "",
      subject: "",
      service: "",
      budget: "",
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

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onSubmit = async (data) => {
    console.log("Submitted:", data);
    alert("Form submitted successfully!");
    reset();
    setFilesPreview([]);
  };

  // 🔹 Custom classes
  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 hover:bg-white transition focus:outline-none focus:ring-1 focus:ring-[var(--lv-sky-blue)]";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const requiredStar = <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="w-full md:w-auto max-w-6xl mx-auto ">
      <div>
        <h2 className="text-center text-3xl font-bold text-lv-black mb-2">
          Get Your Free Quote
        </h2>

        <p className="text-gray-600 text-lg mb-6 text-center px-3">
          Fill out the form below and we will get back to you within 24 hours
        </p>

        <div className="w-full">
          <div className="border-2 border-[var(--lv-blueGreen)] rounded-xl p-8 bg-white shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>First Name{requiredStar}</label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="Enter your first name"
                    className={`${inputClass} ${
                      errors.firstName
                        ? "border-red-500 ring-2 ring-red-100"
                        : ""
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Last Name{requiredStar}</label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Enter your last name"
                    className={`${inputClass} ${
                      errors.lastName
                        ? "border-red-500 ring-2 ring-red-100"
                        : ""
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Email{requiredStar}</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-z]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="your.mail@example.com"
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
                  <label className={labelClass}>Phone{requiredStar}</label>
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
                          height: "48px",
                          borderRadius: "0.5rem",
                          border: "1px solid #9ca3af",
                          background: "white",
                          fontSize: "0.875rem",
                          paddingLeft: "50px",
                        }}
                        buttonStyle={{
                          border: "1px solid #9ca3af",
                          borderRadius: "0.5rem 0 0 0.5rem",
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

              {/* Company Name */}
              <div>
                <label className={labelClass}>Company Name</label>
                <input
                  {...register("company")}
                  placeholder="Your Company Inc."
                  className={inputClass}
                />
              </div>

              {/* Subject */}
              <div>
                <label className={labelClass}>Subject{requiredStar}</label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Brief description of your inquiry"
                  className={`${inputClass} ${
                    errors.subject ? "border-red-500 ring-2 ring-red-100" : ""
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Service & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>
                    Request Service{requiredStar}
                  </label>
                  <select
                    {...register("service", { required: "Select a service" })}
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
                    <option value="graphic-design">Graphic Design</option>
                    <option value="logo-design">Logo Design</option>
                    <option value="photo-editing">Photo Editing</option>
                  </select>
                  {errors.service && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Select budget range</label>
                  <select
                    {...register("budget")}
                    className={inputClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select budget range
                    </option>
                    <option value="under-100">Under $100</option>
                    <option value="100-500">$100 - $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000+">$5,000+</option>
                  </select>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className={labelClass}>Additional information</label>
                <textarea
                  {...register("message")}
                  placeholder="Tell us more about your project..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className={labelClass}>Attachments</label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer w-full border-2 border-dashed border-gray-400 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center text-center"
                >
                  <svg
                    width="48"
                    height="22"
                    fill="none"
                    className="mb-4 text-[var(--lv-blueGreen)]"
                  >
                    <path
                      d="M12 3v10M7 10l5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <div>
                    <span className="text-[var(--lv-blueGreen)] font-medium mb-1 font-underline">
                      Click to upload
                    </span>
                    <span className="text-sm">
                      {" "}
                      or{" "}
                      <span className="font-semibold text-gray-600">
                        drag and drop here
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Supports: PDF, DOC, JPG, PNG (Max 10MB)
                  </p>
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
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Selected files:
                    </p>
                    {filesPreview.map((f, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center rounded-lg bg-blue-50 px-4 py-3 text-sm border border-blue-100"
                      >
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-[var(--lv-blueGreen)] mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            />
                          </svg>
                          <span className="font-medium text-gray-800 truncate max-w-xs">
                            {f.name}
                          </span>
                        </div>
                        <span className="text-gray-500 text-xs">
                          {(f.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--lv-blueGreen)] hover:bg-[var(--lv-blueGreen)]/90 transition text-white py-4 rounded-lg text-base font-semibold cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
