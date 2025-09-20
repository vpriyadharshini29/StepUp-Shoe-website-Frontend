import { Trash2 } from "lucide-react"; // npm install lucide-react
import { useCart } from "../components/cartcontext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Your Cart</h2>

      {/* Shipping Banner */}
      <div className="border p-3 rounded-md shadow-sm text-center text-sm mb-6">
        <span className="font-semibold">Free & Fast arriving by Monday</span>{" "}
        Order within 23 hours, 53 minutes, 50 seconds
      </div>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row items-start md:items-center justify-between border-b py-6 gap-4"
        >
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <img
              src={item.image || item.images?.[0] || "/placeholder.png"}
              alt={item.name}
              className="w-32 h-32 object-contain border rounded"
            />
            <div>
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-500">
                {item.description?.slice(0, 40)}...
              </p>
              <p className="mt-2 text-gray-700">MRP ₹{item.price}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3">
            <select className="border rounded px-3 py-1">
              {(item.sizes ?? ["41", "42", "43"]).map((s, idx) => (
                <option key={idx} value={s}>
                  Size ({s})
                </option>
              ))}
            </select>

            <select
              className="border rounded px-3 py-1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, parseInt(e.target.value, 10))
              }
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>
                  Quantity ({q})
                </option>
              ))}
            </select>

            <button
              onClick={() => removeFromCart(item.id)}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-lg">
          <span>Summary</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Total</span>
          <span className="font-bold">₹{total}</span>
        </div>
        <div className="flex justify-between text-gray-600 mt-1">
          <span>Delivery</span>
          <span>Free</span>
        </div>
      </div>

      {/* Checkout Section */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/checkout")}
          className="w-full py-3 bg-green-900 text-white font-semibold rounded-md hover:bg-green-800"
        >
          🔒 Checkout Securely
        </button>

        <div className="mt-4 space-y-3">
          <p className="text-center text-gray-500">Express Checkout</p>
          <button className="w-full border py-2 rounded-md">Google Pay</button>
          <button className="w-full border py-2 rounded-md">PayPal</button>
          <button className="w-full border py-2 rounded-md">ClearPay</button>
          <button className="w-full border py-2 rounded-md">Klarna</button>
        </div>
      </div>
    </div>
  );
}
