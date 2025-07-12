import { motion } from "framer-motion";
import type { Product } from "../../../pages/farmer/FarmerHome";
import { FaLeaf, FaEdit, FaTrash } from "react-icons/fa";

function FarmerProductCard({ product }: { product: Product }) {
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

        {/* Buttons */}
        <div className="flex gap-3">
          {/* Edit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="group/edit relative flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl 
              bg-gradient-to-b from-amber-500 to-amber-600 
              hover:from-amber-600 hover:to-amber-700 
              text-white font-semibold text-sm sm:text-base 
              shadow-md hover:shadow-xl hover:shadow-amber-500/30 
              transition-all duration-300 border border-amber-500/30 hover:cursor-pointer"
          >
            <FaEdit className="text-white group-hover/edit:scale-110 transition-transform duration-300" size={16} />
            Edit
            <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover/edit:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* Remove Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="group/remove relative flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl 
              bg-gradient-to-b from-red-500 to-red-600 
              hover:from-red-600 hover:to-red-700 
              text-white font-semibold text-sm sm:text-base 
              shadow-md hover:shadow-xl hover:shadow-red-500/30 
              transition-all duration-300 border border-red-500/30 hover:cursor-pointer"
          >
            <FaTrash className="text-white group-hover/remove:scale-110 transition-transform duration-300" size={16} />
            Remove
            <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover/remove:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default FarmerProductCard;
