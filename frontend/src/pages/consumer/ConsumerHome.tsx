import { useEffect, useState } from "react";
import { fetchProduct } from "../../api/consumer/consumerHome/fecthProduct";
import ProductCard from "../../components/ui/ProductCard";
export interface Product {
  id: number;
  productCategory: string;
  productDescription: string;
  productImage: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    address: string;
    image: string | null;
    contact: string;
    email: string;
    farmer: {
      farmAddress: string;
      farmName: string;
    };
  };
}

export interface FetchProductResponse {
  data: {
    data: Product[];
    message: string;
  };
}

function ConsumerHome() {
  const [productData, setProductData] = useState<Product[]>([]);

  const fetchPrductData = async () => {
    const res = (await fetchProduct()) as FetchProductResponse;
    setProductData(res.data.data);
  };

  useEffect(() => {
    fetchPrductData();
  }, []);
  return (
    <div className="w-full min-h-screen">
      <div className="border-b  border-zinc-300 text-gray-600 lg:px-14 md:px-10 px-6  lg:py-8 md:py-6 py-4 font-bold lg:text-2xl md:text-xl text-lg ">
        PRODUCTS
      </div>
      <div className="w-full  md:px-14 px-6 py-6 flex flex-wrap ">
        {productData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ConsumerHome;
