import { useEffect, useState } from "react";
import { fetchOrder } from "../../../api/consumer/consumerHome/fetchOrder";
import NoOrder from "../../NoOrder";
import { motion } from "framer-motion";

export interface OrderResponse {
  data: {
    message: string;
    data: Order[];
  };
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  orderStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "DELIVERED";
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface Product {
  id: number;
  userId: number;
  productName: string;
  productDescription: string;
  productCategory: string;
  productImage: string;
  productPrice: number;
  productQuantity: number;
  createdAt: string;
  updatedAt: string;
}

const tabs = [
  { key: "PENDING", label: "🟡 Pending" },
  { key: "PROCESSING", label: "🔄 Processing" },
  { key: "DELIVERED", label: "✅ Delivered" },
  { key: "CANCELLED", label: "❌ Cancelled" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function OrderSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("PENDING");

  const fetchOrderData = async () => {
    try {
      const res = (await fetchOrder()) as OrderResponse;
      const sorted = res.data.data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sorted);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  if (orders.length === 0) return <NoOrder />;

  const filteredOrders = orders.filter((order) => order.orderStatus === activeTab);

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border 
                ${
                  activeTab === tab.key
                    ? "bg-indigo-600 text-white border-indigo-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {filteredOrders.length === 0 ? (
          <motion.div
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No orders found for this status.
          </motion.div>
        ) : (
          <div className="flex flex-col gap-10">
            {filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                  <span
                    className={`text-sm px-4 py-1 rounded-full font-medium uppercase tracking-wide border 
                      ${
                        order.orderStatus === "DELIVERED"
                          ? "bg-green-100 text-green-700 border-green-300"
                          : order.orderStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                          : order.orderStatus === "PROCESSING"
                          ? "bg-sky-100 text-sky-700 border-sky-300"
                          : order.orderStatus === "CANCELLED"
                          ? "bg-rose-100 text-rose-700 border-rose-300"
                          : "bg-gray-100 text-gray-600 border-gray-300"
                      }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                {/* Products */}
                <div className="grid gap-6 mb-8">
                  {order.orderItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex flex-col md:flex-row items-start md:items-center bg-gray-100 rounded-2xl p-4 md:p-6 transition"
                    >
                      <img
                        src={item.product.productImage}
                        alt={item.product.productName}
                        className="w-28 h-28 object-cover rounded-xl border border-gray-300"
                      />
                      <div className="flex flex-col md:flex-row md:justify-between w-full md:items-center md:ml-6 mt-4 md:mt-0">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {item.product.productName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.product.productCategory}
                          </p>
                        </div>
                        <div className="flex flex-col md:items-end mt-4 md:mt-0">
                          <p className="text-indigo-600 font-semibold text-lg">
                            Rs {item.price}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t pt-6 flex justify-between text-lg font-medium text-gray-800">
                  <p>Total:</p>
                  <p className="text-indigo-600">Rs {order.totalPrice}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderSection;
