import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../components/cartcontext";
import shoeApi from "../api/shoeapi";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // If coming from Buy Now → use that product
  const buyNowProduct = location.state?.product;
  const buyNowQuantity = location.state?.quantity ?? 1;

  // Decide whether to show cart or single buy now product
  const checkoutItems = buyNowProduct
    ? [{ ...buyNowProduct, quantity: buyNowQuantity }]
    : cart;

  const total = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle order submission
  const handleOrder = async () => {
    if (!checkoutItems.length) return;

    const placedDate = new Date();
    const dispatchedDate = new Date(placedDate);
    dispatchedDate.setDate(dispatchedDate.getDate() + 1);
    const deliveryDate = new Date(placedDate);
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const orderPayload = {
      items: checkoutItems.map((c) => ({
        product: c.id || c._id,
        quantity: Number(c.quantity),
        price: Number(c.price),
      })),
    };

    try {
      const response = await shoeApi.post("/orders/", orderPayload);
      const orderData = response.data;

      setShowPopup(true);

      setTimeout(() => {
        if (!buyNowProduct) clearCart(); // clear cart only if not Buy Now
        navigate("/my-orders", {
          state: {
            order: {
              ...orderData,
              items: checkoutItems,
              orderDate: placedDate,
              dispatchDate: dispatchedDate,
              deliveryDate: deliveryDate,
              total,
            },
          },
        });
      }, 2000);
    } catch (err) {
      console.error("Order save failed:", err.response?.data || err.message);
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="bg-green-900 text-white p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          {checkoutItems.length > 0 ? (
            <div className="space-y-3">
              {checkoutItems.map((item, index) => (
                <div key={index} className="border-b pb-2">
                  <img
                    src={item.image || item.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    className="w-32 h-32 object-contain border rounded"
                  />
                  <p className="font-bold">{item.name}</p>
                  <p>Size: {item.size ?? "41"}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>MRP: ₹{item.price}</p>
                  <p>Amount: ₹{item.price * item.quantity}</p>
                </div>
              ))}
              <hr className="border-gray-400" />
              <p>Delivery fees: Free</p>
              <p className="font-bold">Total: ₹{total}</p>
            </div>
          ) : (
            <p>No items in cart</p>
          )}
        </div>

        {/* Checkout Form */}
        <div className="md:col-span-2 bg-gray-50 p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4">Complete Your Order</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input placeholder="First Name" className="border p-2 rounded" />
            <input placeholder="Last Name" className="border p-2 rounded" />
            <input placeholder="Email id" className="border p-2 rounded" />
            <input placeholder="Phone Number" className="border p-2 rounded" />
          </div>

          <h4 className="font-semibold mb-2">Payment Details</h4>
          <div className="flex gap-2 mb-4">
           <p>Visa</p><p>gpay</p><p>paypal</p><p>clearpay</p><p>Klarna</p>
           
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input placeholder="Card Holder Name" className="border p-2 rounded" />
            <input placeholder="Card Number" className="border p-2 rounded" />
            <input placeholder="CVV" className="border p-2 rounded" />
            <input placeholder="Expiration Date" className="border p-2 rounded" />
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked /> Cash on Delivery
            </label>
          </div>

          <h4 className="font-semibold mb-2">Shipping Address</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input placeholder="Address Line 1" className="border p-2 rounded col-span-2" />
            <input placeholder="City" className="border p-2 rounded" />
            <input placeholder="State" className="border p-2 rounded" />
            <input placeholder="Landmark" className="border p-2 rounded" />
            <input placeholder="Pincode" className="border p-2 rounded" />
          </div>

          <div className="flex justify-between mt-6">
            <button className="px-6 py-2 bg-gray-300 rounded-md">Cancel</button>
            <button
              onClick={handleOrder}
              className="px-6 py-2 bg-green-900 text-white rounded-md"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Confirmation Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white p-8 rounded-xl shadow-xl text-center"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                🎉 Order Confirmed!
              </h2>
              <p className="text-gray-600">Redirecting to My Orders...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
