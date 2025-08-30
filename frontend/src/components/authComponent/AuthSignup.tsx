import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";

export default function AuthSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    role: "CONSUMER",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
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

      await axios.post("http://localhost:5000/api/users/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast("Signup successful 🎉", { type: "success", theme: "dark" });
      navigate("/login");
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
    <div className="w-full h-full flex items-center justify-center py-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-zinc-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">
            Create Account 🌿
          </h1>
          <p className="text-gray-500 mt-2">
            Sign up to order fresh products from farmers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>

          {/* Email + Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                placeholder="you@example.com"
                onChange={handleChange}
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
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                >
                  {showPassword ? <RxEyeOpen /> : <RiEyeCloseLine />}
                </button>
              </div>
            </div>
          </div>

          {/* Address + Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                required
                type="text"
                name="address"
                className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                placeholder="Your address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact
              </label>
              <input
                required
                type="tel"
                name="contact"
                className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                placeholder="+977 9800000000"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image Upload with Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Profile Image
            </label>
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

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-300"
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
