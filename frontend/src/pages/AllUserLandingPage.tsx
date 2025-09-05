import { useEffect, useState } from "react";
import { fetchProductForAllConsumer } from "../api/consumer/consumerHome/fecthProduct";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import KrishakMart_Logo from "/krishakMart_Logo.jpg";

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
    data: Product[];
    message: string;
  };
}

function ConsumerLanding() {
  const [productData, setProductData] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const fetchProductData = async () => {
    const res = (await fetchProductForAllConsumer()) as FetchProductResponse;
    setProductData(res.data.data);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  // Filtered product list
  const filteredProducts = productData.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProtectedAction = () => {
    navigate("/login?redirect=/consumer-landing");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-zinc-200 text-gray-700 lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 flex justify-between items-center shadow-sm">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src={KrishakMart_Logo}
            alt="KrishakMart Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="font-bold lg:text-2xl md:text-xl text-lg tracking-wide text-green-700">
            KrishakMart
          </h1>
        </div>

        {/* Large Screen Buttons */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-medium cursor-pointer"
          >
            Signup
          </button>
        </div>

        {/* Mobile Menu & Search */}
        <div className="flex md:hidden items-center gap-2">
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
          <button
            onClick={() => setShowMobileMenu((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
          alt="Fresh vegetables"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            Fresh From Farmers to Your Home
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
            Discover organic, fresh, and affordable product directly from local
            farmers.
          </p>
          <button
            onClick={handleProtectedAction}
            className="mt-6 px-6 py-3 bg-green-600 text-white text-lg rounded-xl shadow-md hover:bg-green-700 transition cursor-pointer"
          >
            Explore Now
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full px-6 py-4 bg-white border-b border-zinc-200 shadow-md flex flex-col gap-2"
          >
            <button
              onClick={() => navigate("/login")}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="w-full px-4 py-2 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-medium"
            >
              Signup
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Search Bar */}
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

      {/* Mobile Search Bar */}
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
          <div className="grid gap-8 grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-md flex justify-center"
              >
                {/* Product Card */}
                <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="h-64 w-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {product.productName}
                    </h2>
                    <p className="text-green-600 font-bold mt-2 text-lg">
                      Rs. {product.productPrice}{" "}
                      <span className="text-slate-400">/kg</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-4 line-clamp-3">
                      {product.productDescription}
                    </p>
                    <button
                      onClick={handleProtectedAction}
                      className="mt-6 w-full py-3 px-4 bg-green-600 text-white rounded-lg 
                            hover:bg-green-700 transition-all font-medium text-base cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
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

      <Footer />
    </div>
  );
}

export default ConsumerLanding;
