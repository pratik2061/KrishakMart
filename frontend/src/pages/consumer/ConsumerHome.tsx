import { useEffect, useState } from "react";
import { fetchProduct } from "../../api/consumer/consumerHome/fecthProduct";
import ProductCard from "../../components/consumerComponent/ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const fetchPrductData = async () => {
    const res = (await fetchProduct()) as FetchProductResponse;
    setProductData(res.data.data);
  };

  useEffect(() => {
    fetchPrductData();
  }, []);

  // Filtered product list
  const filteredProducts = productData.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-zinc-200 text-gray-700 lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 flex justify-between items-center shadow-sm">
        <h1 className="font-bold lg:text-2xl md:text-xl text-lg tracking-wide">
          🧺 Available Products
        </h1>

        {/* Mobile Search Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            {showMobileSearch ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Search className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* 🔎 Search Bar */}
      {/* Desktop */}
      <div className="hidden md:flex w-full md:px-14 px-6 mt-6 justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for fresh products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Mobile (Animated Expand) */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full px-6 mt-2"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for fresh products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full md:px-14 px-6 py-8"
      >
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-sm flex justify-center"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No products found"
              className="w-40 h-40 mb-6 opacity-80"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              No products found
            </h2>
            <p className="text-gray-500 mt-2">
              Try searching with a different keyword.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ConsumerHome;
