import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { api } from "../../api/authServices";

interface res {
  response: {
    data: string;
  };
}

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
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.warn("Please upload a profile image", { theme: "dark" });
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      data.append("image", image);

      await api.post("auth/farmer/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/farmer/login");
      toast.success("Signup successful 🎉", { theme: "dark" });
    } catch (err) {
      const error = err as res;
      toast.error(error.response?.data || "Signup failed", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-green-50">
      <div className="flex-grow flex items-center justify-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-zinc-200"
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
                  placeholder="John Doe"
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="farmer@example.com"
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
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
                    placeholder="••••••••"
                    className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600"
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
                  placeholder="+977 9800000000"
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
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
                placeholder="Your address"
                className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
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
                  placeholder="Green Valley Farm"
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Farm Address</label>
                <input
                  required
                  type="text"
                  name="farmAddress"
                  placeholder="Kathmandu, Nepal"
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Profile Image</label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-green-400 rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-green-700 font-medium text-sm text-center px-2">
                      Click to Upload
                    </span>
                  )}
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {preview && (
                  <button
                    type="button"
                    className="text-red-600 text-sm underline"
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Role (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                disabled
                value="FARMER"
                className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl bg-gray-100 text-gray-600 outline-none cursor-not-allowed"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 
              ${loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"} 
              text-white font-semibold py-2 rounded-xl transition duration-300`}
            >
              {loading ? <ClipLoader size={18} color="#fff" /> : "Sign Up"}
            </button>
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
