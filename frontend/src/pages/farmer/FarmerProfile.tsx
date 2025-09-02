import { motion } from "framer-motion";

function FarmerProfileSection() {
  // 🔹 Dummy farmer data
  const farmer = {
    name: "Pratik Sharma",
    email: "pratiksharma@example.com",
    contact: "+977-9812345678",
    address: "Kathmandu, Nepal",
    farmerName: "Pratik's Farm",
    farmAddress: "Lalitpur, Nepal",
    image: "https://randomfarmer.me/api/portraits/men/32.jpg",
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Page Heading */}
      <div className="w-full sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-200 lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 shadow-sm ">
        <h1 className="font-bold lg:text-3xl md:text-2xl text-xl tracking-wide text-gray-700">
          👤 farmer Profile
        </h1>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center px-6 md:px-14 py-12 text-center"
      >
        {/* Profile Image with pop-up effect */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
          className="w-56 h-56 rounded-full overflow-hidden border-4 border-green-400 shadow-2xl mb-12"
        >
          <img
            src={farmer.image}
            alt={farmer.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* farmer Info (Label & Value boxes hover separately) */}
        <div className="w-full max-w-3xl space-y-6">
          {[
            { label: "Full Name", value: farmer.name },
            { label: "Email", value: farmer.email },
            { label: "Contact", value: farmer.contact },
            { label: "Address", value: farmer.address },
            { label: "Farm Name", value: farmer.farmerName },
            { label: "Farm Address", value: farmer.farmAddress },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row gap-4 items-stretch"
            >
              {/* Label Box */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.3 }}
                className="w-40 border border-gray-300 rounded-xl py-4 px-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-md flex items-center justify-center"
              >
                <span className="font-semibold text-gray-600">
                  {item.label}
                </span>
              </motion.div>

              {/* Value Box */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.3 }}
                className="flex-1 border border-gray-300 rounded-xl py-4 px-6 bg-gradient-to-br from-white to-green-50 shadow-md flex items-center justify-center"
              >
                <span className="text-lg font-medium text-gray-800">
                  {item.value}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default FarmerProfileSection;
