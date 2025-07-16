import { useEffect, useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { ClipLoader } from "react-spinners";
import { loginFarmer, verifyToken } from "../../auth/slice/farmerAuthThunk";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../auth/store/authStore";
import { toast } from "react-toastify";
import Footer from "../../components/Footer"; // adjust path as needed

interface state {
  farmerAuth: {
    farmerData: {
      id: number;
      email: string;
      role: string;
    } | null;
    status: string;
    error: string | null;
  };
}

export default function FarmerLogin() {
  const status = useSelector((state: state) => state.farmerAuth.status);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginFarmer({ email, password }));

    if (loginFarmer.fulfilled.match(result)) {
      const farmerRole = result.payload.role;

      switch (farmerRole) {
        case "FARMER":
          navigate("/farmer");
          break;
        default:
          navigate("/unauthorized");
      }
    } else if (loginFarmer.rejected.match(result)) {
      const errorMsg = (result.payload as string) || "login failed";
      toast(errorMsg, {
        theme: "dark",
        autoClose: 3000,
        type: "error",
      });
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyToken();
        const storedFarmer = JSON.parse(localStorage.getItem("farmer_data") || "null");

        if (
          storedFarmer &&
          res?.id === storedFarmer.id &&
          res?.email === storedFarmer.email &&
          res?.role === storedFarmer.role
        ) {
          switch (res.role) {
            case "FARMER":
              navigate("/farmer");
              break;
            default:
              navigate("/unauthorized");
          }
        }
      } catch {
        localStorage.removeItem("farmer_data");
        navigate("/farmer/login");
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-green-50">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-zinc-200">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-green-700">Farmer Login 🌾</h1>
            <p className="text-gray-500 mt-2">Log in to manage your farm products</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                required
                type="email"
                className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="farmer@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 top-2 flex items-center text-sm text-gray-600"
                >
                  {showPassword ? <RxEyeOpen /> : <RiEyeCloseLine />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>
              <a href="#" className="text-green-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              disabled={status === "loading"}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-300"
            >
              {status === "loading" ? <ClipLoader color="white" size={20} /> : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            New to KrishakMart?{" "}
            <a href="/signup" className="text-green-600 hover:underline">
              Register as Farmer
            </a>
          </p>
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
