import React, { useEffect, useState } from "react";
import api from "../api";
import shoeApi from "../api/shoeapi";

export default function Header() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    shoeApi.get("navbar/").then((res) => setLinks(res.data));
  }, []);

  return (
    <header className="bg-teal-900 text-white flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <img src="../images/logo.png" alt="Logo" className="w-12 h-12 rounded-full" />
        <input
          type="text"
          placeholder="Search here"
          className="px-4 py-2 rounded-full text-black w-96"
        />
      </div>
      <nav className="flex space-x-6">
        {links.map((link) => (
          <a key={link.id} href={link.url} className="hover:text-pink-400">
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
