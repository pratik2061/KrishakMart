import { motion } from "framer-motion";
import { useEffect, useState, type JSX } from "react";
import { farmerListApi } from "../../api/admin/farmerlist";
import { fetchConsumerList } from "../../api/admin/consumerList";
import { fetchProductList } from "../../api/admin/productList";
import { Users, ShoppingBag, UserCheck } from "lucide-react"; // icons
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

interface Products {
  id: number;
  productName: string;
  productImage: string;
  productPrice: number;
  productCategory: string;
  productQuantity: number;
}

interface ProductListResponse {
  data: {
    data: Products[];
  };
}

interface Consumers {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  image: string | null;
}

interface ConsumerListResponse {
  data: {
    data: Consumers[];
  };
}

function AdminDashboard() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [consumers, setConsumers] = useState<Consumers[]>([]);

  const totalFarmers = farmers.length;
  const verifiedFarmers = farmers.filter((f) => f.isVerified).length;
  const unverifiedFarmers = totalFarmers - verifiedFarmers;

  const totalProducts = products.length;
  const totalConsumers = consumers.length;

  const cardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const farmerRes = (await farmerListApi()) as FarmerListResponse;
        setFarmers(farmerRes.data.data.farmers);

        const productRes = (await fetchProductList()) as ProductListResponse;
        setProducts(productRes.data.data);

        const consumerRes = (await fetchConsumerList()) as ConsumerListResponse;
        setConsumers(consumerRes.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const renderStatCard = (
    icon: JSX.Element,
    title: string,
    count: number,
    leftBorderColor: string,
    extraInfo?: JSX.Element
  ) => (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.03 }}
      className={`bg-white p-6 rounded-2xl shadow-md border-l-8 ${leftBorderColor} flex flex-col justify-center cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
      </div>
      <p className="text-4xl font-extrabold text-gray-800 mt-4">{count}</p>
      {extraInfo && (
        <div className="flex gap-2 mt-3 flex-wrap">{extraInfo}</div>
      )}
    </motion.div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div
        className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 text-gray-700 
        lg:px-14 md:px-10 px-6 lg:py-6 md:py-5 py-4 flex justify-between items-center shadow-sm"
      >
        <h1 className="font-bold lg:text-3xl md:text-2xl text-xl tracking-wide">
          📊 Admin Dashboard
        </h1>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Farmers Card */}
        {renderStatCard(
          <Users className="w-6 h-6 text-blue-500" />,
          "Farmers",
          totalFarmers,
          "border-blue-500",
          <>
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium shadow-sm">
              Verified: {verifiedFarmers}
            </span>
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium shadow-sm">
              Unverified: {unverifiedFarmers}
            </span>
          </>
        )}

        {/* Products Card */}
        {renderStatCard(
          <ShoppingBag className="w-6 h-6 text-purple-500" />,
          "Products",
          totalProducts,
          "border-purple-500"
        )}

        {/* Consumers Card */}
        {renderStatCard(
          <UserCheck className="w-6 h-6 text-orange-500" />,
          "Consumers",
          totalConsumers,
          "border-orange-500"
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
