import { useEffect, useState } from "react";
import { fetchCartData } from "../../../api/consumer/consumerHome/fetchCartItem";
import { IoClose } from "react-icons/io5";
import { deleteCartProduct } from "../../../api/consumer/consumerHome/deleteCartProduct";
import { toast } from "react-toastify";
import NoProductInCart from "../../NoProductInCart";
import { updateCartProductQuantity } from "../../../api/consumer/consumerHome/updateCart";
import { motion } from "framer-motion";

export interface cartProduct {
  id: number;
  price: number;
  productId: string;
  quantity: number;
  product: {
    id: number;
    productImage: string;
    productName: string;
    productQuantity: number;
    productCategory: string;
    productPrice: number;
  };
}

export interface fetchCartProductResponse {
  data: {
    cartItem: cartProduct[];
    message: string;
  };
}

function CartSection() {
  const [cartItem, setCartItem] = useState<cartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchProductData = async () => {
    const res = (await fetchCartData()) as fetchCartProductResponse;
    setCartItem(res.data.cartItem);
  };

  const deleteCartProductFunction = async (id: number) => {
    const res = await deleteCartProduct(id);
    if (res.success) {
      toast(res.data, {
        theme: "dark",
        autoClose: 3000,
        type: "success",
      });
      setCartItem((prev) => prev.filter((p) => p.product.id !== id));
    } else {
      toast(res.message, {
        theme: "dark",
        autoClose: 3000,
        type: "error",
      });
    }
  };

  const handleQuantityChange = async (
    productId: number,
    type: "increment" | "decrement"
  ) => {
    setCartItem((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQuantity =
            type === "increment"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);
          updateCartProductQuantity(productId, newQuantity);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const total = cartItem.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItem]);

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <section className="py-6 relative">
      {cartItem.length === 0 ? (
        <NoProductInCart />
      ) : (
        <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8 mx-auto">
          {/* Header Row */}
          <div className="hidden lg:grid grid-cols-12 gap-6 py-6 border-b border-gray-300">
            <div className="col-span-6 font-semibold text-xl text-gray-600">
              Product
            </div>
            <div className="col-span-3 font-semibold text-xl text-gray-600 text-center">
              Quantity
            </div>
            <div className="col-span-3 font-semibold text-xl text-gray-600 text-center">
              Price
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col space-y-6">
            {cartItem.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-3 border-b border-gray-300 relative rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
              >
                {/* Delete Button */}
                <button
                  onClick={() => deleteCartProductFunction(item.product.id)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-red-600 transition-colors z-10"
                  aria-label="Remove product"
                >
                  <IoClose size={24} />
                </button>

                {/* Product Info */}
                <div className="col-span-12 lg:col-span-6 flex items-center gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src={item.product.productImage}
                      alt={item.product.productName}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNS41IDQwLjVMMzUuNSA1OS41SDY0LjVWNDAuNUgzNS41WiIgZmlsbD0iI0Q5RDlEOSIvPgo8Y2lyY2xlIGN4PSI0My41IiBjeT0iNDcuNSIgcj0iMi41IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0zNS41IDU0LjVMNDMuNSA0Ni41TDUwIDUzTDU3IDQ2TDY0LjUgNTMuNVY1OS41SDM1LjVWNTQuNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                      {item.product.productName}
                    </h3>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                      {item.product.productCategory}
                    </p>
                    <p className="text-emerald-600 font-semibold mt-2 text-sm sm:text-base">
                      Rs. {item.product.productPrice}{" "}
                      <span className="text-xs sm:text-sm text-gray-600">/kg</span>
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-12 lg:col-span-3 flex items-center justify-center mt-4 lg:mt-0">
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm bg-white">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, "decrement")
                      }
                      className="px-4 py-2 sm:px-5 sm:py-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer select-none text-xl sm:text-2xl font-bold text-gray-700 flex items-center justify-center min-w-[40px] sm:min-w-[44px]"
                      aria-label="Decrease quantity"
                    >
                      –
                    </button>
                    <input
                      readOnly
                      value={item.quantity}
                      className="w-12 sm:w-16 text-center font-semibold bg-white text-gray-900 border-x border-gray-300 py-2 text-base sm:text-lg leading-tight"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, "increment")
                      }
                      className="px-4 py-2 sm:px-5 sm:py-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer select-none text-xl sm:text-2xl font-bold text-gray-700 flex items-center justify-center min-w-[40px] sm:min-w-[44px]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-12 lg:col-span-3 flex flex-col justify-center items-center mt-4 lg:mt-0">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Subtotal</p>
                  <p className="text-emerald-600 font-bold text-xl sm:text-2xl leading-none">
                    Rs. {item.price * item.quantity}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total and Checkout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-md p-6 mt-10 max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <h4 className="text-2xl font-semibold text-gray-900">Total</h4>
              <span className="text-emerald-600 font-extrabold text-3xl">
                Rs. {totalPrice}
              </span>
            </div>
            <button className="w-full mt-6 bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl">
              Continue to Payment
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default CartSection;
