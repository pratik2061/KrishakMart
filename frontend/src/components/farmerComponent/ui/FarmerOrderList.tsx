import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchOrder } from "../../../api/farmer/farmerHome/fetchOrder";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface OrderItem {
  consumerEmail: string;
  consumerName: string;
  orderId: number;
  productId: number;
  productImage: string;
  productName: string;
  quantity: number;
  status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED" | "COMPLETED";
  totalprice: number;
}

export interface FetchOrderResponse {
  data: {
    message: string;
    orders: OrderItem[];
  };
}

interface GroupedOrder {
  id: number;
  consumerName: string;
  status: OrderItem["status"];
  total: number;
  items: {
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}

const statusStyles: Record<
  string,
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
  COMPLETED: {
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-300",
  },
  CANCELLED: {
    bg: "bg-rose-50",
    text: "text-rose-800",
    border: "border-rose-300",
  },
  DELIVERED: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-300",
  },
};

const tabs = ["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"];

export default function FarmerOrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<GroupedOrder[]>([]);
  const [activeTab, setActiveTab] = useState("PENDING");

  const handleUpdateOrder = (
    orderId: number,
    status: OrderItem["status"],
    items: GroupedOrder["items"]
  ) => {
    navigate("/farmer/order/update", {
      state: {
        orderId,
        status,
        products: items, // passing items array
      },
    });
  };

  const fetchOrderFunction = async () => {
    try {
      const res = (await fetchOrder()) as FetchOrderResponse;
      const flatOrders = res.data.orders;

      // Group orders by orderId
      const grouped: Record<number, GroupedOrder> = {};

      for (const item of flatOrders) {
        if (!grouped[item.orderId]) {
          grouped[item.orderId] = {
            id: item.orderId,
            consumerName: item.consumerName,
            status: item.status,
            total: 0,
            items: [],
          };
        }

        grouped[item.orderId].items.push({
          id: item.productId,
          name: item.productName,
          image: item.productImage,
          quantity: item.quantity,
          price: item.totalprice,
        });

        grouped[item.orderId].total += item.totalprice;
      }

      // ✅ Sort by newest first (descending orderId)
      const sortedOrders = Object.values(grouped).sort((a, b) => b.id - a.id);

      setOrders(sortedOrders);
    } catch (error) {
      const errormsg = error ? error : "Failed to fetch ";
      toast(`${errormsg}`, {
        theme: "dark",
        autoClose: 3000,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchOrderFunction();
  }, []);

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <section className="py-10 min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
          👨‍🌾 Orders from Consumer
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                activeTab === tab
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No orders found.</p>
        ) : (
          <div className="space-y-10">
            {filteredOrders.map((order, index) => {
              const isDisabled =
                order.status === "DELIVERED" || order.status === "CANCELLED";

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Order #{order.id}
                    </h2>
                    <span
                      className={`text-xs sm:text-sm px-4 py-1 text-center rounded-full border font-medium 
                        ${statusStyles[order.status].bg} 
                        ${statusStyles[order.status].text} 
                        ${statusStyles[order.status].border}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-5">
                    Consumer:{" "}
                    <span className="font-medium">{order.consumerName}</span>
                  </p>

                  <div className="grid gap-4 sm:gap-5">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center bg-slate-100 hover:bg-slate-200 transition rounded-xl p-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full sm:w-20 sm:h-20 object-cover rounded-lg border border-neutral-300"
                        />
                        <div className="mt-3 sm:mt-0 sm:ml-4 w-full flex justify-between items-center">
                          <div>
                            <h3 className="text-base sm:text-lg font-medium text-gray-800">
                              {item.name}
                            </h3>
                          </div>
                          <div className="text-right">
                            <p className="text-indigo-600 font-semibold">
                              Rs {item.price}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                    <p className="text-lg sm:text-xl font-bold text-gray-800">
                      Total: Rs {order.total}
                    </p>

                    <motion.button
                      whileHover={!isDisabled ? { scale: 1.05 } : {}}
                      whileTap={!isDisabled ? { scale: 0.97 } : {}}
                      disabled={isDisabled}
                      onClick={() =>
                        !isDisabled &&
                        handleUpdateOrder(order.id, order.status, order.items)
                      }
                      className={`w-full sm:w-auto px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-md ${
                        isDisabled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white hover:shadow-lg"
                      }`}
                    >
                      Update Order
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
