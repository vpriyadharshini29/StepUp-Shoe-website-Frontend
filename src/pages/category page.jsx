import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCart } from "../components/cartcontext";
import shoeApi from "../api/shoeapi";
 // ✅ use cart context

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    shoeApi.get(`categories/${id}/`).then((res) => setCategory(res.data));
  }, [id]);

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  if (!category) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => window.history.back()}
        className="text-sm text-gray-500 hover:text-black mb-4"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-8">{category.name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {(category.products ?? []).slice(0, 12).map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div
              className="cursor-pointer"
              onClick={() =>
                navigate(`/product/${p.id}`, { state: { product: p } })
              }
            >
              <img
                src={p.image || (p.images?.[0] ?? "/placeholder.png")}
                alt={p.name}
                className="w-full h-40 object-contain mb-3"
              />
            </div>

            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-gray-500 text-sm">
              {p.description?.slice(0, 30)}...
            </p>
            <p className="text-gray-500 text-sm">MRP ₹{p.mrp}</p>
            <p className="text-xl font-semibold text-green-700">₹{p.price}</p>
            <p className="text-yellow-500">⭐ {p.rating}</p>

            <div className="flex gap-2 mt-2">
              {(p.colors ?? ["#000", "#fff"]).map((c, idx) => (
                <span
                  key={idx}
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: c }}
                ></span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { product: p, quantity: 1 },
                  })
                }
                className="flex-1 px-3 py-1 border rounded hover:bg-gray-100"
              >
                Buy
              </button>
              <button
                onClick={() => {
                  addToCart(p, 1);
                  setPopup(`${p.name} added to cart ✅`);
                }}
                className="flex-1 px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {popup && (
        <div className="fixed top-6 right-6 bg-white shadow-lg border px-4 py-3 rounded-lg animate-bounce">
          <p className="font-medium text-green-700">{popup}</p>
        </div>
      )}
    </div>
  );
}