import ProductCard from "../../components/ui/ProductCard";

function ConsumerHome() {
  return (
    <div className="w-full min-h-screen">
      <div className="border-b border-zinc-300  lg:px-14 md:px-10 px-6  lg:py-8 md:py-6 py-4 font-bold lg:text-2xl md:text-xl text-lg ">
        PRODUCTS
      </div>
      <ProductCard />
    </div>
  );
}

export default ConsumerHome;
