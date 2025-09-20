import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../api";
import { useCart } from "../components/cartcontext";
import shoeApi from "../api/shoeapi";
import { FaStar, FaCheck } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [popup, setPopup] = useState(null);
  const renderStars = (count) => (
    <div className="flex">
      {Array.from({ length: count }, (_, i) => (
        <FaStar key={i} className="text-yellow-400" />
      ))}
    </div>
  );

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  useEffect(() => {
    if (!product) {
      shoeApi
        .get(`products/${id}/`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id, product]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {(product.images ?? [product.image ?? "/placeholder.png"]).map(
          (img, idx) => (
            <img
              key={idx}
              src={img}
              alt={product.name}
              className="w-full h-56 object-contain border rounded"
            />
          )
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600">MRP ₹{product.mrp}</p>
        <p className="text-xl font-semibold text-green-700">₹{product.price}</p>
        <p className="text-yellow-500">⭐ {product.rating}/5</p>

        {/* Colors */}
        <div className="mt-4">
          <p className="font-medium">Color:</p>
          <div className="flex gap-2 mt-2">
            {(product.colors ?? []).map((c, idx) => (
              <span
                key={idx}
                className="w-6 h-6 rounded-full border cursor-pointer"
                style={{ backgroundColor: c }}
              ></span>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-4">
          <p className="font-medium">Shoe Size:</p>
          <div className="flex gap-2 mt-2">
            {(product.sizes ?? []).map((s, idx) => (
              <button
                key={idx}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => {
              addToCart(product, quantity);
              setPopup(`${product.name} added to cart ✅`);
            }}
            className="flex-1 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            Add to Cart
          </button>
          <button
            onClick={() =>
              navigate("/checkout", { state: { product, quantity } })
            }
            className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Buy Now
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Product Details</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>

      {popup && (
        <div className="fixed top-6 right-6 bg-white border shadow-lg px-5 py-3 rounded-lg animate-bounce z-50">
          <p className="font-medium text-green-700">{popup}</p>
        </div>
      )}
    </div>


 <section className="p-8 bg-gray-100 min-h-screen flex flex-col gap-8">
      {/* Review 1 */}
      <div className="border p-6 rounded-md shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4">Reviews:</h2>
        <div className="flex items-start gap-6">
          {/* Left Column */}
          <div className="flex flex-col items-start">
           
            <p className="font-semibold">Reviewed by Beverley</p>
            <p className="text-gray-600 text-sm">From: Weymouth</p>

            {/* Ratings */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between w-48">
                <span>Fit</span>
                {renderStars(5)}
              </div>
              <div className="flex justify-between w-48">
                <span>Comfort</span>
                {renderStars(5)}
              </div>
              <div className="flex justify-between w-48">
                <span>Value for Money</span>
                {renderStars(5)}
              </div>
              <div className="flex justify-between w-48">
                <span>Quality</span>
                {renderStars(5)}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            <p className="font-bold">Super Looking</p>
            <div className="flex items-center mb-2">
              <span className="mr-2 text-sm text-gray-600">Overall rating</span>
              {renderStars(5)}
            </div>
            <p className="text-gray-700">
              Very pleased with the super fast delivery and packaging. Shoes are
              very good quality and superb See more...
            </p>
            <p className="mt-3 flex items-center text-gray-800">
              Beverley would recommend this product{" "}
              <FaCheck className="ml-2 text-green-500" />
            </p>
          </div>
        </div>
      </div>

      {/* Review 2 */}
      <div className="border p-6 rounded-md shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4">Reviews:</h2>
        <div className="flex items-start gap-6">
          {/* Left Column */}
          <div className="flex flex-col items-start">
           
            <p className="font-semibold">Reviewed by Beverley</p>
            <p className="text-gray-600 text-sm">From: Weymouth</p>

            {/* Ratings */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between w-48">
                <span>Fit</span>
                {renderStars(5)}
              </div>
              <div className="flex justify-between w-48">
                <span>Comfort</span>
                {renderStars(5)}
              </div>
              <div className="flex justify-between w-48">
                <span>Value for Money</span>
                {renderStars(5)}
              </div>
              <div className="flex justify-between w-48">
                <span>Quality</span>
                {renderStars(5)}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            <p className="font-bold">Super Looking</p>
            <div className="flex items-center mb-2">
              <span className="mr-2 text-sm text-gray-600">Overall rating</span>
              {renderStars(5)}
            </div>
            <p className="text-gray-700">
              Very pleased with the super fast delivery and packaging. Shoes are
              very good quality and superb See more...
            </p>
            <p className="mt-3 flex items-center text-gray-800">
              Beverley would recommend this product{" "}
              <FaCheck className="ml-2 text-green-500" />
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}