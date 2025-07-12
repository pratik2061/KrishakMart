import { toast } from "react-toastify";
import { addToCart } from "../../../api/consumer/consumerHome/addToCart";
import type { Product } from "../../../pages/consumer/ConsumerHome";
import { motion } from "framer-motion";
import { FaShoppingCart, FaLeaf } from "react-icons/fa";

export interface successType {
  data: {
    data: {
      message: string;
    };
  };
}

function ProductCard({ product }: { product: Product }) {
  const addCartProduct = async () => {
    const res = await addToCart(product.id);

    if (res.success) {
      toast(res.data, {
        theme: "dark",
        autoClose: 3000,
        type: "success",
      });
    } else {
      toast(res.message, {
        theme: "dark",
        autoClose: 3000,
        type: "warning",
      });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[320px] bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out mx-2 my-4 md:mx-4 md:my-6 overflow-hidden group"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={product.productImage}
          alt={`${product.productName} Image`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-gray-700 text-xs px-3 py-1.5 rounded-full shadow-lg font-medium border border-white/20">
          <FaLeaf className="inline mr-1.5 text-green-500" size={12} />
          {product.productCategory}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col gap-4">
        <h1 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
          {product.productName}
        </h1>

        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {product.productDescription}
        </p>

        {/* Price Section */}
        <div className="pt-2">
          <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-1">
            Price
          </p>
          <p className="text-gray-900 font-bold text-xl sm:text-2xl">
            <span className="text-emerald-600">Rs. {product.productPrice}</span>
            <span className="text-sm text-gray-500 font-medium ml-1">/kg</span>
          </p>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={addCartProduct}
          className="group/button relative mt-4 flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-2xl 
                     bg-gradient-to-b from-emerald-600 to-emerald-700 
                     hover:from-emerald-700 hover:to-emerald-800 
                     text-white font-bold text-sm sm:text-base 
                     shadow-lg hover:shadow-2xl hover:shadow-emerald-500/25
                     transition-all duration-300 ease-in-out 
                     border border-emerald-500/20 hover:border-emerald-400/30
                     overflow-hidden"
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
          
          {/* Button content */}
          <div className="relative z-10 flex items-center gap-3">
            <FaShoppingCart
              className="text-white group-hover/button:animate-bounce transition-transform duration-300"
              size={18}
            />
            <span className="font-bold tracking-wide">Add to Cart</span>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 -top-2 -left-2 w-4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover/button:animate-shine" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProductCard;