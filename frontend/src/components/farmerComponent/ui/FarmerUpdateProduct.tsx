import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { updateOrderStatus } from "../../../api/farmer/farmerHome/updateOrderStatus";
import { toast } from "react-toastify";

const statusOptions = [
  "PENDING",
  "PROCESSING",
  "DELIVERED",
  "CANCELLED",
] as const;
type OrderStatus = (typeof statusOptions)[number];

interface ProductItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface OrderUpdateState {
  orderId: number;
  status: OrderStatus;
  products: ProductItem[];
}

const statusStyles: Record<
  OrderStatus,
  { bg: string; text: string; border: string }
> = {
  PENDING: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-300",
  },
  PROCESSING: {
    bg: "bg-sky-50",
    text: "text-sky-800",
    border: "border-sky-300",
  },
  DELIVERED: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-300",
  },
  CANCELLED: {
    bg: "bg-rose-50",
    text: "text-rose-800",
    border: "border-rose-300",
  },
};

export default function UpdateOrderComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, status, products }: OrderUpdateState = location.state || {};

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(status);

  useEffect(() => {
    if (!orderId || !status || !products) {
      navigate("/farmer/orders");
    }
  }, [orderId, status, products, navigate]);

  const handleUpdate = async () => {
    try {
      await updateOrderStatus(orderId, selectedStatus);
      toast.success("OrderStatus updated successfully!", {
        theme: "dark",
        autoClose: 3000,
      });
      navigate("/farmer/order");
    } catch (err) {
      toast.error(`Error : ${err}`, { theme: "dark", autoClose: 3000 });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-slate-100 px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10"
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left: Products */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Products in Order #{orderId}
          </h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 items-center bg-slate-100 rounded-xl p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Qty: {product.quantity}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium">
                    Rs {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Status Update */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Update Status</h2>

          <div>
            <span
              className={`text-sm px-4 py-1 rounded-full font-medium border inline-block mb-2 ${statusStyles[selectedStatus].bg} ${statusStyles[selectedStatus].text} ${statusStyles[selectedStatus].border}`}
            >
              Current Status: {selectedStatus}
            </span>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleUpdate}
            className="w-full bg-gradient-to-r hover: cursor-pointer from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-2.5 rounded-md font-semibold transition-all duration-300 shadow-md"
          >
            Update Status
          </motion.button>

          {/* Go Back and Cancel Buttons */}
          <div className="flex justify-between gap-4 pt-2">
            <button
              onClick={() => navigate("/farmer/order")}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Go Back
            </button>
            <button
              onClick={() => (
                setSelectedStatus(status), navigate("/farmer/order")
              )}
              className="w-full border border-rose-300 text-rose-600 py-2 rounded-md hover:bg-rose-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
