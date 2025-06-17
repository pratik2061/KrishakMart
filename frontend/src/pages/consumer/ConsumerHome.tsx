import ProductCard from "../../components/ui/ProductCard";

function ConsumerHome() {
  return (
    <div className="w-full min-h-screen">
      <div className="border-b border-zinc-300 text-gray-600 lg:px-14 md:px-10 px-6  lg:py-8 md:py-6 py-4 font-bold lg:text-2xl md:text-xl text-lg ">
        PRODUCTS
      </div>
      <div className="w-full  md:px-14 px-6 py-6 flex flex-wrap ">
        <ProductCard />

        <ProductCard />

        <ProductCard />
        <ProductCard />

        <ProductCard />

        <ProductCard />


      </div>
    </div>
  );
}

export default ConsumerHome;
