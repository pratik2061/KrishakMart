import { motion } from "framer-motion";
import { getConsumerProfile } from "../../api/consumer/consumerHome/profile";
import { useEffect, useState } from "react";
import default_consumer_image from "/default_consumer.png";
import { toast } from "react-toastify";

export interface ConsumerData {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  image: string | null;
}

export interface ConsumerResponse {
  data: {
    data: ConsumerData;
  };
}

function ConsumerProfileSection() {
  const [user, setUser] = useState<ConsumerData | null>(null);

  const fetchUserData = async () => {
    try {
      const response = (await getConsumerProfile()) as ConsumerResponse;
      setUser(response.data.data);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col bg-gray-100 items-center">
      {/* Header */}
      <div className="w-full sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-200 lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 shadow-sm">
        <h1 className="font-bold lg:text-3xl md:text-2xl text-xl tracking-wide text-gray-700 text-center">
          👤 User Profile
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
          className="relative w-60 h-60 lg:w-72 lg:h-72 flex-shrink-0 flex items-center justify-center rounded-4xl shadow-2xl"
        >
          <img
            src={user?.image ?? default_consumer_image}
            alt={user?.name ?? "Default User"}
            className="w-56 h-56 lg:w-64 lg:h-64 object-cover rounded-full shadow-lg"
          />
        </motion.div>

        {/* Right: User Info */}
        <div className="flex-1 space-y-6 max-w-2xl w-full">
          {/* Info Card */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 space-y-4">
            {/* Name */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Name:</span>
              <p className="text-gray-800 font-semibold">{user?.name ?? "-"}</p>
            </div>

            {/* Email */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Email:</span>
              <p className="text-gray-800 font-semibold">{user?.email ?? "-"}</p>
            </div>

            {/* Phone Number */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Phone Number:</span>
              <p className="text-gray-800 font-semibold">{user?.contact ?? "-"}</p>
            </div>

            {/* Address */}
            <div className="hover:bg-purple-100 transition-colors rounded-md p-2">
              <span className="block text-gray-500 font-medium">Address:</span>
              <p className="text-gray-800 font-semibold">{user?.address ?? "-"}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="mt-6 w-full lg:w-auto px-8 py-3 text-white font-semibold rounded-xl bg-amber-500 hover:bg-amber-600 shadow-lg transition-all transform hover:scale-105">
            Edit Profile
          </button>
        </div>
      </motion.section>
    </main>
  );
}

export default ConsumerProfileSection;
