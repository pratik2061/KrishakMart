import CartSection from "../../components/consumerComponent/ui/CartSection";
import { motion } from "framer-motion";

function ConsumerCartSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-200 text-gray-700 lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 flex justify-between items-center shadow-sm">
        <h1 className="font-bold lg:text-2xl md:text-xl text-lg tracking-wide">
          🛒 Your Cart
        </h1>
      </div>

      {/* Cart Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full px-6 md:px-14 py-8"
      >
        <CartSection />
      </motion.div>
    </div>
  );
}

export default ConsumerCartSection;
