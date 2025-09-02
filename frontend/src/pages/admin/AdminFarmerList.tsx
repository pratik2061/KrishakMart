/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { farmerListApi } from "../../api/admin/farmerlist";
import default_farmer_image from "/default_farmer.png";
import { rejectFarmerApi, verifyFarmerApi } from "../../api/admin/verifyFarmer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Farmer {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  isVerified: boolean;
  image: string | null;
  farmName: string;
  farmAddress: string;
}

interface FarmerListResponse {
  data: {
    data: {
      farmers: Farmer[];
      message: string;
    };
  };
}

function AdminFarmerList() {
  const [tab, setTab] = useState<"verified" | "unverified">("unverified");
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all farmers
  const fetchAllFarmers = async () => {
    try {
      const res = (await farmerListApi()) as FarmerListResponse;
      setFarmers(res.data.data.farmers);
    } finally {
      setLoading(false);
    }
  };

  // Approve/Verify farmer
  const verifyFarmer = async (id: number) => {
    try {
      const isVerified = true;
      const res = await verifyFarmerApi(id, isVerified);

      if (res.success) {
        toast(res.data, {
          theme: "dark",
          autoClose: 3000,
          type: "success",
        });

        // Update farmer state dynamically
        setFarmers((prev) =>
          prev.map((farmer) =>
            farmer.id === id ? { ...farmer, isVerified: true } : farmer
          )
        );
      } else {
        toast(res.message, {
          theme: "dark",
          autoClose: 3000,
          type: "error",
        });
      }
    } catch (error) {
      toast("Something went wrong!", {
        theme: "dark",
        autoClose: 3000,
        type: "error",
      });
    }
  };

  const rejectFarmer = async (id: number) => {
    try {
      const res = await rejectFarmerApi(id);

      if (res.success) {
        toast(res.data, {
          theme: "dark",
          autoClose: 3000,
          type: "success",
        });

        // Update farmer state dynamically
        setFarmers((prev) => prev.filter((farmer) => farmer.id !== id));
      } else {
        toast(res.message, {
          theme: "dark",
          autoClose: 3000,
          type: "error",
        });
      }
    } catch (error) {
      toast("Something went wrong!", {
        theme: "dark",
        autoClose: 3000,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchAllFarmers();
  }, []);

  const verifiedFarmers = farmers.filter((f) => f.isVerified);
  const unverifiedFarmers = farmers.filter((f) => !f.isVerified);

  const selectedFarmers =
    tab === "verified" ? verifiedFarmers : unverifiedFarmers;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div
        className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-zinc-200 text-gray-700 
          px-6 py-4 sm:px-10 sm:py-5 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center shadow-sm"
      >
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl tracking-wide flex items-center gap-2">
          👨‍🌾 Farmers List
        </h1>
      </div>

      {/* Stats Section */}
      <div className="w-full flex flex-col sm:flex-row gap-4 justify-center py-6 px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-md flex-1 text-center"
        >
          <h2 className="font-bold text-2xl text-green-600">
            {verifiedFarmers.length}
          </h2>
          <p className="text-gray-600">Verified Farmers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-md flex-1 text-center"
        >
          <h2 className="font-bold text-2xl text-red-600">
            {unverifiedFarmers.length}
          </h2>
          <p className="text-gray-600">Unverified Farmers</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6 px-6 sm:px-10">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            tab === "unverified"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setTab("unverified")}
        >
          Unverified
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            tab === "verified"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setTab("verified")}
        >
          Verified
        </button>
      </div>

      {/* Farmer Cards */}
      <div className="w-full px-6 sm:px-10 pb-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading farmers...</p>
        ) : selectedFarmers.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            {tab === "verified"
              ? "No verified farmers found."
              : "No unverified farmers found."}
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {selectedFarmers.map((farmer) => (
              <motion.div
                key={farmer.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col"
              >
                {/* Farmer Details */}
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400 mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-blue-700">
                      👤 {farmer.name}
                    </h3>
                    <img
                      src={farmer.image || default_farmer_image}
                      alt={farmer.name}
                      className="w-25 h-25 rounded-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    📧 {farmer.email}
                  </p>
                  <p className="text-sm text-gray-700">🏠 {farmer.address}</p>
                  <p className="text-sm text-gray-700">
                    📞 {farmer.contact || "N/A"}
                  </p>
                </div>

                {/* Farm Info Section */}
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h4 className="text-sm font-semibold text-green-700">
                    🏡 Farm Details
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">Farm Name:</span>{" "}
                    {farmer.farmName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Farm Address:</span>{" "}
                    {farmer.farmAddress}
                  </p>
                </div>

                {/* Buttons / Status */}
                {farmer.isVerified ? (
                  <span className="mt-3 inline-block px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-center">
                    ✔ Verified
                  </span>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <button
                      onClick={() => verifyFarmer(farmer.id)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectFarmer(farmer.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AdminFarmerList;
