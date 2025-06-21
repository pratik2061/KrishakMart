import React from "react";
import { Link } from "react-router-dom";
import NoOrderImage from "/no_order.jpg";

const NoOrder: React.FC = () => {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center px-4">
      <img
        src={NoOrderImage} // Order/receipt icon
        alt="No orders"
        className="w-40 h-40 mb-6 opacity-80"
      />
      <p className="text-gray-600 text-2xl font-semibold mb-2">No orders yet</p>
      <p className="text-gray-500 text-md mb-6">
        You haven't placed any orders. Start shopping to see your order history
        here.
      </p>
      <Link
        to={"/consumer"}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md transition-all"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default NoOrder;
