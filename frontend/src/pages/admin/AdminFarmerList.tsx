import { motion } from "framer-motion";
import { useState } from "react";

// Farmer Interface
interface Farmer {
  id: number;
  name: string;
  email: string;
  location: string;
  verified: boolean;
  image?: string; // optional image URL
}

// Demo Farmers Data
const demoFarmers: Farmer[] = [
  { id: 1, name: "Ramesh Sharma", email: "ramesh@example.com", location: "Kathmandu", verified: true, image: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Sita Gurung", email: "sita@example.com", location: "Pokhara", verified: false, image: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Kiran Rai", email: "kiran@example.com", location: "Chitwan", verified: true, image: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Manish Thapa", email: "manish@example.com", location: "Biratnagar", verified: false, image: "https://i.pravatar.cc/150?img=4" },
];

function AdminFarmerList() {
  const [farmers, setFarmers] = useState<Farmer[]>(demoFarmers);
  const [tab, setTab] = useState<"verified" | "unverified">("unverified");

  // Counts
  const verifiedCount = farmers.filter((f) => f.verified).length;
  const unverifiedCount = farmers.filter((f) => !f.verified).length;

  // Action Handlers
  const handleVerify = (id: number) => {
    setFarmers((prev) =>
      prev.map((f) => (f.id === id ? { ...f, verified: true } : f))
    );
  };

  const handleReject = (id: number) => {
    setFarmers((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-200 text-gray-700 
          lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between 
          items-center shadow-sm">
        <h1 className="font-bold lg:text-2xl md:text-xl text-lg tracking-wide flex items-center gap-2">
          👨‍🌾 Farmers List
        </h1>
      </div>

      {/* Stats Section */}
      <div className="w-full flex gap-6 justify-center py-6 md:px-14 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-md w-1/3 text-center"
        >
          <h2 className="font-bold text-2xl text-green-600">{verifiedCount}</h2>
          <p className="text-gray-600">Verified Farmers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-md w-1/3 text-center"
        >
          <h2 className="font-bold text-2xl text-red-600">{unverifiedCount}</h2>
          <p className="text-gray-600">Unverified Farmers</p>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${tab === "unverified" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("unverified")}
        >
          Unverified
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${tab === "verified" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("verified")}
        >
          Verified
        </button>
      </div>

      {/* Farmer Cards */}
      <div className="w-full md:px-14 px-6 pb-8">
        {tab === "unverified" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {farmers.filter((f) => !f.verified).map((farmer) => (
              <motion.div
                key={farmer.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
              >
                {/* Name + Image Row */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{farmer.name}</h3>
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>

                <p className="text-sm text-gray-600 mt-1">{farmer.email}</p>
                <p className="text-sm text-gray-500">{farmer.location}</p>

                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                    onClick={() => handleVerify(farmer.id)}
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                    onClick={() => handleReject(farmer.id)}
                  >
                    Reject
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === "verified" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {farmers.filter((f) => f.verified).map((farmer) => (
              <motion.div
                key={farmer.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{farmer.name}</h3>
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-12 h-12 rounded-full object-cover "
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{farmer.email}</p>
                <p className="text-sm text-gray-500">{farmer.location}</p>
                <span className="text-green-600 font-semibold">✔ Verified</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AdminFarmerList;
