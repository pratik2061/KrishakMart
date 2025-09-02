import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import default_consumer_image from "/default_farmer.png";
import { toast } from "react-toastify";
import { getFarmerProfile } from "../../api/farmer/farmerHome/profile";

export interface ConsumerData {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  image: string | null;
  farmer: {
    farmName: string;
    farmAddress: string;
  };
}

export interface ConsumerResponse {
  data: {
    data: ConsumerData;
  };
}

function FarmerProfileSection() {
  const [farmer, setfarmer] = useState<ConsumerData | null>(null);

  const fetchfarmerData = async () => {
    try {
      const response = (await getFarmerProfile()) as ConsumerResponse;
      setfarmer(response.data.data);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    fetchfarmerData();
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="w-full sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-200 lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 shadow-sm">
        <h1 className="font-bold lg:text-3xl md:text-2xl text-xl tracking-wide text-gray-700">
          👤 Farmer Profile
        </h1>
      </div>

      {/* Profile Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 w-full flex flex-col lg:flex-row items-center lg:items-start gap-12 px-6 lg:px-20 py-10"
      >
        {/* Left: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-60 h-60 lg:w-72 lg:h-72 flex-shrink-0 flex items-center justify-center shadow-2xl"
        >
          <img
            src={farmer?.image ?? default_consumer_image}
            alt={farmer?.name ?? "Default farmer"}
            className="w-56 h-56 lg:w-64 lg:h-64 object-cover rounded-full shadow-lg"
          />
        </motion.div>

        {/* Right: Farmer Info */}
        <div className="flex-1 space-y-6 max-w-2xl w-full">
          {/* Info Card */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 space-y-4">
            {/* Name */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Name:</span>
              <p className="text-gray-800 font-semibold">{farmer?.name ?? "-"}</p>
            </div>

            {/* Email */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Email:</span>
              <p className="text-gray-800 font-semibold">{farmer?.email ?? "-"}</p>
            </div>

            {/* Phone Number */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Phone Number:</span>
              <p className="text-gray-800 font-semibold">{farmer?.contact ?? "-"}</p>
            </div>

            {/* Address */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Address:</span>
              <p className="text-gray-800 font-semibold">{farmer?.address ?? "-"}</p>
            </div>

            {/* Farm Name */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Farm Name:</span>
              <p className="text-gray-800 font-semibold">{farmer?.farmer.farmName ?? "-"}</p>
            </div>

            {/* Farm Address */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Farm Address:</span>
              <p className="text-gray-800 font-semibold">{farmer?.farmer.farmAddress ?? "-"}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="mt-6 w-full lg:w-auto px-8 py-3 text-white font-semibold rounded-xl bg-amber-500 hover:cursor-pointer hover:bg-amber-600 shadow-lg transition-all transform hover:scale-105">
            Edit Profile
          </button>
        </div>
      </motion.section>
    </main>
  );
}

export default FarmerProfileSection;
