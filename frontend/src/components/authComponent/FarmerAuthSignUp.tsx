import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import axios from "axios";

export default function FarmerSignup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    farmName: "",
    farmAddress: "",
    role: "FARMER",
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (image) data.append("image", image);

      await axios.post("http://localhost:5000/api/farmers/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast("Signup successful 🎉", { type: "success", theme: "dark" });
      navigate("/farmer/login");
    } catch (err: any) {
      toast(err.response?.data?.message || "Signup failed", {
        type: "error",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-green-50">
      <div className="flex-grow flex items-center justify-center px-4 my-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl border border-zinc-200"
          style={{ maxHeight: "85vh", overflowY: "auto" }}
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-green-700">Farmer Signup 🌱</h1>
            <p className="text-gray-500 mt-2">Register to manage your farm products</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  className="mt-1 w-full px-3 py-1 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder="John Doe"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-1 w-full px-3 py-1 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder="farmer@example.com"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password + Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="mt-1 w-full px-3 py-1 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 outline-none"
                  >
                    {showPassword ? <RxEyeOpen /> : <RiEyeCloseLine />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  required
                  type="tel"
                  name="contact"
                  className="mt-1 w-full px-3 py-1 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder="+977 9800000000"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                required
                type="text"
                name="address"
                className="mt-1 w-full px-3 py-1 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                placeholder="Your address"
                onChange={handleChange}
              />
            </div>

            {/* Farm Name + Farm Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Farm Name</label>
                <input
                  required
                  type="text"
                  name="farmName"
                  className="mt-1 w-full px-3 py-1 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder="Green Valley Farm"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Farm Address</label>
                <input
                  required
                  type="text"
                  name="farmAddress"
                  className="mt-1 w-full px-3 py-1 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder="Kathmandu, Nepal"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image Upload - Smaller Box */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-10 outline-none border-2 border-dashed border-green-400 rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition"
              >
                <span className="text-green-700 font-medium text-sm">
                  {image ? image.name : "Click to upload"}
                </span>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Role (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                readOnly
                value="FARMER"
                className="mt-1 w-full px-3 py-1 border border-zinc-300 rounded-xl bg-gray-100 text-gray-600 outline-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-300"
            >
              {loading ? <ClipLoader color="white" size={20} /> : "Sign Up"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/farmer/login" className="text-green-600 hover:underline">
              Log in
            </a>
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
