import { motion } from "framer-motion";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NoProduct: React.FC = () => {
    const navigate = useNavigate()
  return (
    <motion.div
      className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 sm:px-4 "
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.p
        className="text-gray-700 text-3xl font-semibold mb-2 text-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        No products added
      </motion.p>
      <motion.p
        className="text-gray-500 text-base max-w-md mb-6 text-center px-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        You haven't added any products yet. Start by adding your first product to showcase.
      </motion.p>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.25 }}
      >
        <motion.button
        onClick={()=> navigate('/farmer/product/add')}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="group/add relative flex items-center gap-2 px-5 py-3 rounded-xl 
             bg-gradient-to-b from-green-600 to-green-700 
             hover:from-green-700 hover:to-green-800 
             text-white font-bold text-sm sm:text-base 
             shadow-md hover:shadow-lg hover:shadow-emerald-500/30 
             transition-all duration-300 border border-green-500/30 overflow-hidden hover:cursor-pointer"
        >
          {/* Optional background shine on hover */}
          <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover/add:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <IoAdd
            size={18}
            className="text-white group-hover/add:scale-110 transition-transform duration-300"
          />
          <span className="tracking-wide">ADD PRODUCT</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default NoProduct;
