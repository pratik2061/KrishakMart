import { useEffect, useState } from "react";
import { fetchProduct } from "../../api/consumer/consumerHome/fecthProduct";
import ProductCard from "../../components/consumerComponent/ui/ProductCard";
import { motion } from "framer-motion";

export interface Product {
  id: number;
  productCategory: string;
  productDescription: string;
  productImage: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    address: string;
    image: string | null;
    contact: string;
    email: string;
    farmer: {
      farmAddress: string;
      farmName: string;
    };
  };
}

export interface FetchProductResponse {
  data: {
    data: Product[];
    message: string;
  };
}

function ConsumerHome() {
  const [productData, setProductData] = useState<Product[]>([]);

  const fetchPrductData = async () => {
    const res = (await fetchProduct()) as FetchProductResponse;
    setProductData(res.data.data);
  };

  useEffect(() => {
    fetchPrductData();
  }, []);
  return (
 <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-200 text-gray-700 lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 flex justify-between items-center shadow-sm">
        <h1 className="font-bold lg:text-2xl md:text-xl text-lg tracking-wide">
          🧺 Available Products
        </h1>
      </div>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full md:px-14 px-6 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {productData.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ConsumerHome;
