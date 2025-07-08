import { useEffect, useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, verifyToken } from "../../auth/slice/authThunk";
import type { AppDispatch } from "../../auth/store/authStore";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

interface state {
  auth: {
    userData: {
      id: number;
      email: string;
      role: string;
    } | null;
    status: string;
    error: string | null;
  };
}

export default function AuthLogin() {
  const status = useSelector((state: state) => state.auth.status);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  const checkToken = async () => {
    try {
      const res = await verifyToken(); // Verifies session from server
      const storedUser = JSON.parse(localStorage.getItem("user_data") || "null");

      if (
        storedUser &&
        res?.id === storedUser.id &&
        res?.email === storedUser.email &&
        res?.role === storedUser.role
      ) {
        switch (res.role) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "CONSUMER":
            navigate("/consumer");
            break;
          default:
            navigate("/unauthorized");
        }
      }
    } catch {
      localStorage.removeItem("user_data"); // optional: cleanup
      navigate("/login");
    }
  };

  checkToken();
}, [navigate]);


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      const userRole = result.payload.role;

      switch (userRole) {
        case "ADMIN":
          navigate("/admin");

          break;
        case "CONSUMER":
          navigate("/consumer");

          break;

        default:
          navigate("/unauthorized");
      }
    } else if (loginUser.rejected.match(result)) {
      const errorMsg = (result.payload as string) || "login failed";

      toast(errorMsg, {
        theme: "dark",
        autoClose: 3000,
        type: "error",
      });
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center  lg:py-0 py-2 ">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-zinc-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Welcome Back 👋</h1>
          <p className="text-gray-500 mt-2">
            Log in to order fresh product from local farmers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              required
              name="email"
              type="email"
              className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
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
            {status === "loading" ? (
              <ClipLoader color="white" size={20} />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          New to KrishakMart?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
