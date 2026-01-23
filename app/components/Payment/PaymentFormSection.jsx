"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PaymentFormSection() {
  const [selectedPrice, setSelectedPrice] = useState("0");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      orderReference: "",
      serviceType: "",
      amount: "",
      deadline: "",
      message: "",
    },
  });

  // Watch the serviceType field to update price
  const serviceTypeValue = watch("serviceType");

  // Update selected price when serviceType changes
  useEffect(() => {
    if (serviceTypeValue) {
      setSelectedPrice(serviceTypeValue);
    } else {
      setSelectedPrice("0");
    }
  }, [serviceTypeValue]);

  const onSubmit = async (data) => {
    console.log("Payment form submitted:", data);
    // Here you would integrate with your payment provider
    alert("Payment form submitted! (Integration with payment provider needed)");
    reset();
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-lv-blue focus:border-transparent";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";
  const requiredStar = <span className="text-red-500 ml-1">*</span>;

  return (
    <section className="bg-white py-8 md:py-12 lg:py-16" id="payment-form">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Left Card - Payment Form */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-lg p-6 md:p-8" style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
            <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-gray-800 mb-3">
              Complete your payment
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Enter your details, add your order reference, and confirm the amount. Brief message required so we match your payment correctly.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Full name{requiredStar}
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    placeholder="Enter your full name"
                    className={`${inputClass} ${errors.fullName ? "border-red-500 ring-2 ring-red-100" : ""
                      }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

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
                    className={`${inputClass} ${errors.email ? "border-red-500 ring-2 ring-red-100" : ""
                      }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Type & Select Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Service type{requiredStar}
                  </label>
                  <select
                    {...register("orderReference", {
                      required: "Service type is required",
                    })}
                    className={`${inputClass} ${errors.orderReference ? "border-red-500 ring-2 ring-red-100" : ""
                      }`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Service type
                    </option>
                    <option value="embroidery-digitizing">Embroidery Digitizing</option>
                    <option value="vector-digitizing">Vector & CNC Digitizing</option>
                    <option value="custom-vector">Custom Vector</option>
                    <option value="svg-files">SVG Files</option>
                    <option value="cnc-laser-cut">CNC & Laser Cut</option>
                  </select>
                  {errors.orderReference && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.orderReference.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Select price{requiredStar}
                  </label>
                  <select
                    {...register("serviceType", {
                      required: "Select price is required",
                      onChange: (e) => setSelectedPrice(e.target.value),
                    })}
                    className={`${inputClass} ${errors.serviceType ? "border-red-500 ring-2 ring-red-100" : ""
                      }`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Price
                    </option>
                    <option value="8">$8</option>
                    <option value="10">$10</option>
                    <option value="15">$15</option>
                    <option value="20">$20</option>
                    <option value="25">$25</option>
                    <option value="30">$30</option>
                    <option value="35">$35</option>
                    <option value="40">$40</option>
                    <option value="45">$45</option>
                    <option value="50">$50</option>
                    <option value="55">$55</option>
                    <option value="60">$60</option>
                    <option value="65">$65</option>
                    <option value="70">$70</option>
                    <option value="75">$75</option>
                    <option value="80">$80</option>
                    <option value="85">$85</option>
                    <option value="90">$90</option>
                    <option value="95">$95</option>
                    <option value="100">$100</option>
                  </select>
                  {errors.serviceType && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.serviceType.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Quantity{requiredStar}
                  </label>
                  <input
                    {...register("amount", {
                      required: "Quantity is required",
                    })}
                    type="text"
                    placeholder="Quantity"
                    className={`${inputClass} ${errors.amount ? "border-red-500 ring-2 ring-red-100" : ""
                      }`}
                  />
                  {errors.amount && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Deadline</label>
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
                  placeholder="Brief message required. For example left chest logo, deliver JPG and PNG, name text included."
                  rows={5}
                  className={`${inputClass} resize-none ${errors.message ? "border-red-500 ring-2 ring-red-100" : ""
                    }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Payment Method Section */}
              <div>
                <label className={labelClass}>Payment method</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50 text-center">
                  <p className="text-sm text-gray-600">
                    Replace this box with your real payment button, Stripe checkout link, PayPal button, or your embed.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lv-red hover:bg-lv-red-dark text-white font-bold py-3.5 rounded-md text-[15px] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Pay securely"}
              </button>
            </form>
          </div>

          {/* Right Card - Payment Summary */}
          <div className="bg-gray-100 rounded-xl shadow-md p-6 md:p-8">
            {/* Payment Summary Section */}
            <div className=" rounded-lg p-5 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Payment summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Custom service</span>
                  <span className="text-sm text-gray-600">Based on your quote</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Processing</span>
                  <span className="text-sm text-gray-600">Secure checkout</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Delivery</span>
                  <span className="text-sm text-gray-600">By email</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-lv-red">${selectedPrice}.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help Section */}
            <div className="bg-white rounded-lg p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Need help matching your payment?
              </h3>
              <p className="text-sm text-gray-600">
                Email your order reference and payment confirmation to{" "}
                <a
                  href="mailto:support@lasvegasdesignsusa.com"
                  className="text-lv-blue hover:text-lv-red transition-colors"
                >
                  support@lasvegasdesignsusa.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
