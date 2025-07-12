import React from 'react';
import { Link } from 'react-router-dom';
import NoProduct from '/no_product_in_cart.jpg';

const NoProductInCart: React.FC = () => {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center  px-4">
      <img
        src={NoProduct}// You can replace this with your own image
        alt="Empty cart"
        className="w-40 h-40 mb-6 opacity-80"
      />
      <p className="text-gray-600 text-2xl font-semibold mb-2">Your cart is empty</p>
      <p className="text-gray-500 text-md mb-6">Looks like you haven’t added anything yet.</p>
      <Link to={'/consumer'} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md transition-all">
        Browse Products
      </Link>
    </div>
  );
};

export default NoProductInCart;
