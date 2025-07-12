import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NoProduct: React.FC = () => {
  return (
    <motion.div
      className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 sm:px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.img
        src={NoProductImage}
        alt="No Products"
        className="w-40 h-40 mb-6 opacity-80 rounded-xl shadow-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        transition={{ delay: 0.1, duration: 0.25 }}
      />
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
        <Link
          to={"/farmer/add-product"}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition-all font-semibold text-lg inline-block"
        >
          Add Product
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NoProduct;
