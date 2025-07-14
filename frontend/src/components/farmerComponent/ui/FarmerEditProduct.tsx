/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import type { Product } from "../../../pages/farmer/FarmerHome";
import { updateProduct } from "../../../api/farmer/farmerHome/updateProduct";

interface successType {
  data: {
    message: string;
  };
  status: number;
}

export default function EditProductForm() {
  const location = useLocation();
  const { product } = location.state as { product: Product };
  const [price, setPrice] = useState(product.productPrice);
  const [quantity, setQuantity] = useState(product.productQuantity);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const updateProductHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = (await updateProduct(
        product.id,
        price,
        quantity
      )) as successType;

      if (res.status === 200) {
        toast.success("Product updated successfully!", {
          theme: "dark",
          autoClose: 3000,
        });
        navigate("/farmer");
      } else {
        toast.error("Failed to update product", {
          theme: "dark",
          autoClose: 3000,
        });
      }
      // console.log(res, price, quantity);
    } catch (err) {
      toast.error("Something went wrong!", { theme: "dark", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <motion.form
        onSubmit={updateProductHandler}
        className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-4 md:p-8 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-green-800 text-center">
          Edit Product
        </h2>

        {/* Name (ReadOnly) */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Product Name
          </label>
          <input
            readOnly
            type="text"
            value={product.productName}
            className="w-full px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed italic border border-gray-300 rounded-xl focus:outline-none"
          />
        </div>

        {/* Description (ReadOnly) */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Product Description
          </label>
          <textarea
            readOnly
            value={product.productDescription}
            className="w-full px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed italic border border-gray-300 rounded-xl focus:outline-none"
            rows={4}
          />
        </div>

        {/* Price (Editable) */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Price (Rs)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder={String(product.productPrice)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-green-400 transition
              appearance-none 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Category (ReadOnly) */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Category / Tag
          </label>
          <input
            readOnly
            type="text"
            value={product.productCategory}
            className="w-full px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed italic border border-gray-300 rounded-xl focus:outline-none"
          />
        </div>

        {/* Quantity (Editable) */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            placeholder={String(product.productQuantity)}
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
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          className="w-full py-3 mt-2 bg-green-600 hover: cursor-pointer text-white text-lg font-semibold rounded-xl shadow-md hover:bg-green-700 transition flex items-center justify-center"
        >
          {loading ? <ClipLoader size={22} color="#fff" /> : "Update Product"}
        </motion.button>
      </motion.form>
    </div>
  );
}
