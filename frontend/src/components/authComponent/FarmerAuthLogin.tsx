import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer"; // adjust path if needed

export default function FarmerSignup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast("Passwords do not match!", {
        theme: "dark",
        autoClose: 3000,
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/farmer/signup", {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        toast("Signup successful! Please login.", {
          theme: "dark",
          autoClose: 3000,
          type: "success",
        });
        navigate("/farmer/login");
      }
    } catch (error: any) {
      toast(error.response?.data?.message || "Signup failed", {
        theme: "dark",
        autoClose: 3000,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-green-50">
      <div className="flex-grow flex items-center justify-center px-4 my-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-zinc-200">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-green-700">Farmer Signup 🌱</h1>
            <p className="text-gray-500 mt-2">Create your account to join KrishakMart</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                required
                type="text"
                className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="John Farmer"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  required
                  type={showConfirm ? "text" : "password"}
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="••••••••"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-3 top-2 flex items-center text-sm text-gray-600"
                >
                  {showConfirm ? <RxEyeOpen /> : <RiEyeCloseLine />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-300 flex items-center justify-center"
            >
              {loading ? <ClipLoader color="white" size={20} /> : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/farmer/login" className="text-green-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
