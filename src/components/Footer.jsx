import React, { useEffect, useState } from "react";
import api from "../api";
import shoeApi from "../api/shoeapi";

export default function Footer() {
  const [contact, setContact] = useState({});
  const [footerLinks, setFooterLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
   shoeApi.get("contact/").then((res) => setContact(res.data[0] || {}));
    shoeApi.get("footer/").then((res) => setFooterLinks(res.data));
    shoeApi.get("social/").then((res) => setSocialLinks(res.data));
  }, []);

  return (
    <footer className="bg-teal-900 text-white p-10 grid grid-cols-1 md:grid-cols-4 gap-8 mt-auto">
      <div>
        <h3 className="font-bold mb-2">Contact Us</h3>
        <p>Landline: {contact.landline}</p>
        <p>WhatsApp: {contact.whatsapp}</p>
        <p>Email: {contact.email}</p>
        <p>{contact.address}</p>
      </div>

      <div>
        <h3 className="font-bold mb-2">Shop</h3>
        <ul>
         <li>Women </li>
          <li>Men</li>
           <li>Kids</li>
            <li>Accessories</li>
             <li></li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-2">Info</h3>
        <ul>
         <li>Exchange policy</li>
         <li>Return policy</li>
         <li>Terms of service</li>
         <li>Privacy policy</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-2">Social Media</h3>
        <div className="flex space-x-3">
          {socialLinks.map((s) => (
            <a key={s.id} href={s.url} target="_blank">{s.platform}</a>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-bold mb-2">Stay in touch</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 text-black w-full mb-2"
          />
          <button className="bg-white text-black px-4 py-2 font-bold rounded">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
}
