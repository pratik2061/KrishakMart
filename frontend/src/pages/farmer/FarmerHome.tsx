import { motion } from "framer-motion";
import { IoAdd } from "react-icons/io5";
import FarmerProductCard from "../../components/farmerComponent/ui/FarmerProductCard";
import { fetchOwnProducts } from "../../api/farmer/farmerHome/fetchOwnProducts";
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  productCategory: string;
  productDescription: string;
  productImage: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  createdAt: string;
}

export interface FetchProductResponse {
  data: {
    products: Product[];
    message: string;
  };
  status: number;
}

function FarmerHome() {
  const [productData, setProductData] = useState<Product[]>([]);

  const fetchFarmerOwnProduct = async () => {
    const res = (await fetchOwnProducts()) as FetchProductResponse;
    setProductData(res.data.products);
  };

  useEffect(() => {
    fetchFarmerOwnProduct();
  }, []);
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-200 text-gray-700 lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 flex justify-between items-center shadow-sm">
        <h1 className="font-bold lg:text-2xl md:text-xl text-lg tracking-wide flex items-center gap-2">
          🧺 Products
        </h1>
        <motion.button
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
      </div>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full md:px-14 px-6 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {productData.map((product, index) => (
          <FarmerProductCard
            product={product}
            key={index}
            onDelete={(id) =>
              setProductData((prev) => prev.filter((p) => p.id !== id))
            }
          />
        ))}
      </motion.div>
    </div>
  );
}

export default FarmerHome;
