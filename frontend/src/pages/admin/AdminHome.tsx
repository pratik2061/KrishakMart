import { motion } from "framer-motion";
import { Users, ShoppingCart, UserCheck } from "lucide-react";

// Dummy Data
const demoFarmers = [
  { id: 1, name: "Ramesh Sharma", verified: true },
  { id: 2, name: "Sita Gurung", verified: false },
  { id: 3, name: "Kiran Rai", verified: true },
  { id: 4, name: "Manish Thapa", verified: false },
];

const demoProducts = [
  { id: 1, name: "Tomatoes" },
  { id: 2, name: "Potatoes" },
  { id: 3, name: "Carrots" },
];

const demoUsers = [
  { id: 1, role: "CONSUMER", name: "Pratik" },
  { id: 2, role: "CONSUMER", name: "Aarati" },
  { id: 3, role: "FARMER", name: "Sita" },
];

function AdminDashboard() {
  const totalFarmers = demoFarmers.length;
  const verifiedFarmers = demoFarmers.filter((f) => f.verified).length;
  const unverifiedFarmers = totalFarmers - verifiedFarmers;

  const totalProducts = demoProducts.length;
  const totalConsumers = demoUsers.filter((u) => u.role === "CONSUMER").length;

  const cardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Top Bar */}
      <div
        className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 text-gray-700 
          lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 flex justify-between items-center shadow-sm"
      >
        <h1 className="font-bold lg:text-3xl md:text-2xl text-xl tracking-wide flex items-center gap-2">
          📊 Admin Dashboard
        </h1>
      </div>

      {/* Stats Grid Section */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-14 py-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Farmers Card */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 15px 25px rgba(0,0,0,0.1)",
          }}
          className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-blue-500 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ring-4 ring-blue-100">
            <UserCheck size={40} className="text-blue-600" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-bold text-xl text-gray-700 mb-3">
              Total Farmers
            </h2>
            <p className="text-4xl font-extrabold text-blue-600 mb-3">
              {totalFarmers}
            </p>
            <div className="flex justify-center sm:justify-start gap-3">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold shadow-md">
                Verified: {verifiedFarmers}
              </span>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold shadow-md">
                Unverified: {unverifiedFarmers}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Products Card */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 15px 25px rgba(0,0,0,0.1)",
          }}
          className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-purple-500 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ring-4 ring-purple-100">
            <ShoppingCart size={40} className="text-purple-600" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-bold text-xl text-gray-700 mb-3">
              Total Products
            </h2>
            <p className="text-4xl font-extrabold text-purple-600">
              {totalProducts}
            </p>
          </div>
        </motion.div>

        {/* Consumers Card */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 15px 25px rgba(0,0,0,0.1)",
          }}
          className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-orange-500 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ring-4 ring-orange-100">
            <Users size={40} className="text-orange-600" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-bold text-xl text-gray-700 mb-3">
              Total Consumers
            </h2>
            <p className="text-4xl font-extrabold text-orange-600">
              {totalConsumers}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;
