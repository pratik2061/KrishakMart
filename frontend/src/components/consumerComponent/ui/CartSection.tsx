import { useEffect, useState } from "react";
import { fetchCartData } from "../../../api/consumer/consumerHome/fetchCartItem";
import { IoClose } from "react-icons/io5";
import { deleteCartProduct } from "../../../api/consumer/consumerHome/deleteCartProduct";
import { toast } from "react-toastify";
import NoProductInCart from "../../NoProductInCart";

export interface cartProduct {
  id: number;
  price: number;
  productId: string;
  quantity: number;
  product: {
    id: number;
    productImage: string;
    productName: string;
    productQuantity: number;
    productCategory: string;
    productPrice: number;
  };
}

export interface fetchCartProductResponse {
  data: {
    cartItem: cartProduct[];
    message: string;
  };
}

function CartSection() {
  const [cartItem, setCartItem] = useState<cartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const fetchProductData = async () => {
    const res = (await fetchCartData()) as fetchCartProductResponse;
    setCartItem(res.data.cartItem);
  };

  const deleteCartProductFunction = async (id: number) => {
    const res = await deleteCartProduct(id);
    if (res.success) {
      toast(res.data, {
        theme: "dark",
        autoClose: 3000,
        type: "success",
      });
      setCartItem((prev) => prev.filter((p) => p.product.id !== id));
    } else {
      toast(res.message, {
        theme: "dark",
        autoClose: 3000,
        type: "error",
      });
    }
  };

  useEffect(() => {
    const total = cartItem.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItem]);
  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <section className="py-4 relative">
      {cartItem.length == 0 ? (
        <NoProductInCart />
      ) : (
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-gray-500">
              Product
            </div>
            <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
              <span className="w-full max-w-[260px] text-center">Quantity</span>
              <span className="w-full max-w-[200px] text-center">Price</span>
            </p>
          </div>
          {cartItem.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 py-6 border-b border-gray-300 relative"
            >
              <button
                onClick={() => deleteCartProductFunction(item.product.id)}
                className="absolute right-4 hover:text-red-800  hover:cursor-pointer text-2xl top-5 "
              >
                <IoClose />
              </button>
              <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div className="img-box">
                  <img
                    src={item.product.productImage}
                    alt="product image"
                    className="xl:w-[140px] rounded-xl object-cover"
                  />
                </div>
                <div className="pro-data w-full max-w-sm  ">
                  <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                    {item.product.productName}
                  </h5>
                  <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                    {item.product.productCategory}
                  </p>
                  <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
                    {`Rs. ${item.product.productPrice}`}
                  </h6>
                </div>
              </div>
              <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2 ">
                <div className="flex items-center w-full mx-auto pl-10 mg:pl-0">
                  <button className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M16.5 11H5.5"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16.5 11H5.5"
                        stroke=""
                        strokeOpacity="0.2"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16.5 11H5.5"
                        stroke=""
                        strokeOpacity="0.2"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <input
                    readOnly
                    type="text"
                    className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                    // placeholder="1"
                    value={item.quantity}
                  />
                  <button className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M11 5.5V16.5M16.5 11H5.5"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 5.5V16.5M16.5 11H5.5"
                        stroke=""
                        strokeOpacity="0.2"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 5.5V16.5M16.5 11H5.5"
                        stroke=""
                        strokeOpacity="0.2"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                  {`Rs. ${item.price}`}
                </h6>
              </div>
            </div>
          ))}
          <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto ">
            <div className="flex items-center justify-between w-full py-6">
              <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                Total
              </p>
              <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                Rs. {totalPrice}
              </h6>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-green-800 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-green-600 hover:cursor-pointer">
              Continue to Payment
              <svg
                className="ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartSection;
