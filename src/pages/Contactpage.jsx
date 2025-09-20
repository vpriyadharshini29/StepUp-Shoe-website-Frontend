import React, { useEffect, useState } from "react";
import shoeApi from "../api/shoeapi";

const ContactSection = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    shoeApi
      .get("contactbanner/") // <-- create a Django endpoint for banner/contact images
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results;
        setImages(data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="p-10 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">For Online Orders</h3>
            <p className="text-gray-700">Inquiry/Complaint</p>
            <p className="text-gray-800 font-medium">9976837520</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Any other queries</h3>
            <p className="text-gray-800">9976837520</p>
            <p className="text-gray-800">9976837520</p>
            <p className="text-gray-600">10 AM – 7 PM</p>
          </div>

          <div>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:customercarestepup.in@gmail.com"
                className="text-blue-600 underline"
              >
                customercarestepup.in@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Dynamic Images */}
        <div className="flex flex-wrap justify-center gap-4">
          {Array.isArray(images) &&
            images.map((img) => (
             <img
  key={img.id}
  src={img.image.startsWith("http") ? img.image : `http://127.0.0.1:8000${img.image}`}
  alt="StepUp Banner"
  className="rounded-lg shadow-md w-full md:w-96 object-cover"
/>
            ))}
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="mt-12 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-6">Enquiry Form</h3>
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-left font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-left font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-left font-medium mb-1">Phone</label>
              <input
                type="tel"
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-left font-medium mb-1">Message</label>
            <textarea
              rows="4"
              className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
              placeholder="Write your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
