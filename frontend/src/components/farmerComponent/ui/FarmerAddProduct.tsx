import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductForm() {
  const [imageName, setImageName] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <motion.form
      encType="multipart/form-data"
        className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-4 md:p-8 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-green-800 text-center">
          Add New Product
        </h2>

        {/* Product Name */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Product Description
          </label>
          <textarea
            placeholder="Write short description"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            rows={4}
          />
        </div>

        {/* Product Image */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Product Image
          </label>

          {!imageName ? (
            <label className="flex items-center gap-3 p-3 bg-green-50 border border-green-300 rounded-xl cursor-pointer hover:bg-green-100 transition">
              <input
              
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="text-green-700 font-medium">Choose Image</span>
            </label>
          ) : (
            <div className="flex items-center justify-between bg-green-50 border border-green-300 rounded-xl px-4 py-3">
              <span className="text-green-700 font-medium truncate max-w-[70%]">
                {imageName}
              </span>
              <div className="flex gap-2">
                <label className="text-sm text-green-700 font-medium cursor-pointer hover:underline">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setImageName("")}
                  className="text-sm text-red-600 font-medium hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Price (Rs)
          </label>
          <input
            type="number"
            placeholder="e.g. 120"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-green-400 transition
              appearance-none 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Category / Tag
          </label>
          <input
            type="text"
            placeholder="e.g. Vegetables, Fruits, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Quantity
          </label>
          <input
            type="number"
            placeholder="Enter quantity"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-green-400 transition
              appearance-none 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 mt-2 bg-green-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-green-700 transition"
        >
          Submit Product
        </motion.button>
      </motion.form>
    </div>
  );
}
