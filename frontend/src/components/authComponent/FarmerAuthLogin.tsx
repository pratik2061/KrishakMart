import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { ClipLoader } from "react-spinners";

export default function FarmerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-green-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-zinc-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Farmer Login 🌾</h1>
          <p className="text-gray-500 mt-2">
            Log in to manage your farm products
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              required
              type="email"
              className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="farmer@example.com"
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
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-300"
          >
            <ClipLoader size={20} color="white" loading={false} />
            <span className="ml-2">Log In</span>
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
  );
}
