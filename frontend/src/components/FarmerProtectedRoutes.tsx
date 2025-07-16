import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { verifyToken } from "../auth/slice/farmerAuthThunk";
import { toast } from "react-toastify";
import Footer from "../components/Footer"; // ✅ Make sure this path is correct

interface dataTypes {
  id: number;
  email: string;
  role: string;
}

export const FarmerProtectedRoutes = ({
  allowableRoles,
}: {
  allowableRoles: string;
}) => {
  const [farmer, setFarmer] = useState<dataTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const storedFarmerString = localStorage.getItem("farmer_data");
      const storedFarmer = storedFarmerString
        ? (JSON.parse(storedFarmerString) as dataTypes)
        : null;

      const res = await verifyToken();

      if (
        typeof res === "object" &&
        res.id === storedFarmer?.id &&
        res.email === storedFarmer?.email &&
        res.role === storedFarmer?.role
      ) {
        setFarmer(storedFarmer);
      } else {
        toast("Session expired. Please log in again.", {
          theme: "dark",
          type: "error",
          autoClose: 3000,
        });
        localStorage.removeItem("farmer_data");
        setFarmer(null);
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!farmer) return <Navigate to="/farmer/login" replace />;

  if (farmer.role !== allowableRoles)
    return <Navigate to="/unauthorized" replace />;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main route content area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Persistent footer */}
      <Footer />
    </div>
  );
};
