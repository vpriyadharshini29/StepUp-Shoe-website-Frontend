import { useLocation } from "react-router-dom";
import { format } from "date-fns";

export default function MyOrdersPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-bold">No Order Found</h2>
        <p className="text-gray-500">Please place an order first.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Your Order</h2>

      {/* Product Summary */}
      {order.items.map((item, index) => (
        <div key={index} className="flex items-center gap-4 border-b pb-4 mb-2">
          <img
            src={item.image || item.images?.[0] || "/placeholder.png"}
            alt={item.name}
            className="w-28 h-28 object-contain border rounded"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Order no #Bh{Date.now()}</p>
            <h3 className="font-bold">{item.name}</h3>
            <p className="text-gray-600">
              Qty: {item.quantity} | Price: ₹{item.price}
            </p>
            <p className="text-gray-500">
              Exp: Delivery by{" "}
              {order.deliveryDate
                ? format(new Date(order.deliveryDate), "EEE, MMM d")
                : "soon"}
            </p>
          </div>
        </div>
      ))}

      {/* Timeline */}
      <div className="mt-6 bg-gray-100 p-6 rounded-lg">
        {/* Order Placed */}
        <div className="flex items-start gap-4 relative pb-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-900 text-white">
            🛒
          </div>
          <div>
            <h4 className="font-semibold text-green-900">Order Placed</h4>
            <p className="text-sm text-gray-600">
              {order.orderDate
                ? format(new Date(order.orderDate), "MMM d, yyyy | hh:mm a")
                : "Pending"}
            </p>
          </div>
          <div className="absolute left-5 top-10 w-px h-full bg-gray-400"></div>
        </div>

        {/* Dispatched */}
        <div className="flex items-start gap-4 relative pb-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white">
            🏠
          </div>
          <div>
            <h4 className="font-semibold text-green-700">Order Dispatched</h4>
            <p className="text-sm text-gray-600">
              {order.dispatchDate
                ? format(new Date(order.dispatchDate), "MMM d, yyyy | hh:mm a")
                : "Not dispatched yet"}
            </p>
          </div>
          <div className="absolute left-5 top-10 w-px h-full bg-gray-400"></div>
        </div>

        {/* In Transit */}
        <div className="flex items-start gap-4 relative pb-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white">
            🚚
          </div>
          <div>
            <h4 className="font-semibold text-green-500">Order in Transit</h4>
            <p className="text-sm text-gray-600">
              Reached at Tenkasi, Post Office
            </p>
          </div>
          <div className="absolute left-5 top-10 w-px h-full bg-gray-400"></div>
        </div>

        {/* Delivered */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white">
            👍
          </div>
          <div>
            <h4 className="font-semibold text-gray-500">Delivered Successfully</h4>
            <p className="text-sm text-gray-600">Not delivered yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
