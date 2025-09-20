import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import shoeApi from "../api/shoeapi";

export default function HomePage() {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    shoeApi.get("banners/").then((res) => setBanners(res.data));
    shoeApi.get("categories/").then((res) => setCategories(res.data));
    shoeApi
      .get("/shoe")
      .then((res) => setShoes(res.data.filter((s) => s.is_trending)))
      .catch((err) => console.error("Error fetching shoes:", err));
  }, []);

  // Auto-slide effect (2.5 seconds per banner)
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="w-full">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold tracking-wide">StepUp.in</h1>
      </div>

      {/* ===== Header with category links ===== */}
      <div className="flex justify-center border-t border-b py-2 gap-10 font-medium">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/category/${c.id}`)}
            className="hover:text-red-600 transition"
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* ===== Banner Carousel ===== */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((b) => (
            <div key={b.id} className="min-w-full relative">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute top-1/3 left-10 bg-black bg-opacity-60 text-white p-6 rounded-lg max-w-md">
                <button
                  onClick={() => navigate(`/category/${categories[0]?.id}`)}
                  className="bg-white text-black px-4 py-2 mt-3 rounded-md"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Overview Section ===== */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="max-w-2xl mx-auto text-gray-700 leading-relaxed">
          "Explore our curated selection of high-quality shoes for every
          occasion. From durable athletic shoes designed for peak performance
          to stylish casual sneakers and elegant dress shoes, we offer a
          diverse range of footwear to suit your needs..."
        </p>
      </div>

      {/* ===== What are you looking for? (Categories Grid) ===== */}
      <div className="text-center">
        <h2 className="text-xl font-bold mb-8">What are you looking for?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/category/${c.id}`)}
              className="cursor-pointer"
            >
              <img
                src={c.image}
                alt={c.name}
                className="rounded-lg shadow-md w-full h-[300px] object-cover"
              />
              <p className="mt-3 font-semibold text-lg">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== New & Trending Section ===== */}
      <div className="max-w-6xl mx-auto p-6 mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">New & Trending</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {shoes.map((shoe) => (
            <div
              key={shoe.id}
              className="bg-white rounded-xl shadow-md p-4 text-center  hover:shadow-lg transition"
             
            >
              <img
  src={shoe.image.startsWith("http") ? shoe.image : `http://127.0.0.1:8000${shoe.image}`}
  alt={shoe.name}
  className="w-full h-48 object-contain mb-4 rounded"
/>

              <h3 className="font-semibold">{shoe.name}</h3>
              <p className="text-gray-600">MRP : ₹ {shoe.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
