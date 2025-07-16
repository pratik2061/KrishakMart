import { motion } from "framer-motion";
import FarmerOrderList from "../../components/farmerComponent/ui/FarmerOrderList"; // adjust path if needed

function FarmerOrderSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-200 text-gray-700 lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 flex items-center shadow-sm">
        <h1 className="font-bold lg:text-2xl md:text-xl text-lg tracking-wide select-none">
          📦 Orders
        </h1>
      </div>

      {/* Animated Order List Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:px-14 md:px-10 px-6 py-10"
      >
        <FarmerOrderList />
      </motion.div>
    </div>
  );
}

export default FarmerOrderSection;
