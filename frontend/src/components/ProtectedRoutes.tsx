import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { verifyToken } from "../auth/slice/authThunk";
import { toast } from "react-toastify";
import Footer from "../components/Footer"; // adjust path as needed

interface dataTypes {
  id: number;
  email: string;
  role: string;
}

export const ProtectedRoutes = ({
  allowableRoles,
}: {
  allowableRoles: string;
}) => {
  const [user, setUser] = useState<dataTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const storedUserString = localStorage.getItem("user_data");
      const storedUser = storedUserString
        ? (JSON.parse(storedUserString) as dataTypes)
        : null;

      const res = await verifyToken();

      if (
        typeof res === "object" &&
        res.id === storedUser?.id &&
        res.email === storedUser?.email &&
        res.role === storedUser?.role
      ) {
        setUser(storedUser);
      } else {
        toast("Session expired. Please log in again.", {
          theme: "dark",
          type: "error",
          autoClose: 3000,
        });
        localStorage.removeItem("user_data");
        setUser(null);
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== allowableRoles)
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
