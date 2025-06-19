import { toast } from "react-toastify";
import { addToCart } from "../../../api/consumer/consumerHome/addToCart";
import type { Product } from "../../../pages/consumer/ConsumerHome";

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
        theme: "colored",
        autoClose: 3000,
        type: "success",
      });
      
    } else {
      toast(res.message, {
        theme: "colored",
        autoClose: 3000,
        type: "warning",
      });
    }
  };
  return (
    <div className=" lg:max-w-[320px]  hover:scale-101 md:max-w-[280px] max-w-[230px] border border-gray-200 container rounded-2xl md:shadow-xl shadow-lg md:mx-4 mx-2 md:my-6 my-4   ">
      <img
        src={product.productImage}
        alt={`${product.productName} Image`}
        className="rounded-t-2xl "
      />
      <div className=" p-2 w-full rounded-b-2xl bg-white">
        <h1 className="font-bold md:text-2xl text-xl   px-2 md:py-1 py-0 ">
          {product.productName}
        </h1>
        <div className="px-2">
          <span className=" bg-stone-500  text-white lg:text-[15px] md:text-[12px] text-[10px]   border border-neutral-400  p-[1px] md:rounded-md rounded-sm">
            {product.productCategory}
          </span>
        </div>
        <p className="px-2 tracking-tight text-wrap text-gray-700 md:py-4 py-2">
          {product.productDescription}
        </p>
        <div className="px-2 md:py-2 py-4 grid md:grid-cols-[40%_auto] md:grid-rows-none grid-cols-none grid-rows-2 md:gap-1 gap-3 ">
          <div className="">
            <p className="font-extrabold md:text-[15px] text-[13px]">PRICE</p>
            <p className="font-bold md:text-[20px] text-[18px]">
              Rs. {product.productPrice}
              <span className="md:text-2xl-[15px] text-[13px]">/kg</span>
            </p>
          </div>
          <button
            onClick={() => {
              addCartProduct();
            }}
            className="bg-green-800 hover:bg-green-700 font-bold text-white rounded-lg py-2 hover:cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
