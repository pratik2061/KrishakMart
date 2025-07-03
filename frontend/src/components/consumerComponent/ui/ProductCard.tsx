import { toast } from "react-toastify";
import { addToCart } from "../../../api/consumer/consumerHome/addToCart";
import type { Product } from "../../../pages/consumer/ConsumerHome";
import { motion } from "framer-motion";

export interface successType {
  data: {
    data: {
      message: string;
    };
  };
}

function ProductCard({ product }: { product: Product }) {
  const addCartProduct = async () => {
    const res = await addToCart(product.id);

    if (res.success) {
      toast(res.data, {
        theme: "dark",
        autoClose: 3000,
        type: "success",
      });
    } else {
      toast(res.message, {
        theme: "dark",
        autoClose: 3000,
        type: "warning",
      });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-[230px] sm:max-w-[280px] lg:max-w-[320px] border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white mx-2 my-4 md:mx-4 md:my-6"
    >
      <div className="w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img
          src={product.productImage}
          alt={`${product.productName} Image`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <h1 className="font-bold text-xl sm:text-2xl mb-1">
          {product.productName}
        </h1>
        <div className="mb-2">
          <span className="bg-stone-600 text-white text-xs sm:text-sm px-2 py-[2px] rounded-md">
            {product.productCategory}
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {product.productDescription}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-[40%_auto] gap-3 items-center">
          <div>
            <p className="font-semibold text-sm">PRICE</p>
            <p className="text-blue-900 font-bold text-lg sm:text-xl">
              Rs. {product.productPrice}
              <span className="text-sm"> /kg</span>
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addCartProduct}
            className="bg-green-600 hover:cursor-pointer hover:bg-green-700 text-white font-bold py-2 rounded-lg w-full transition-colors"
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
