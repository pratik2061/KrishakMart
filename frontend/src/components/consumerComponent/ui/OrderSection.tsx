import { useEffect, useState } from "react";
import { fetchOrder } from "../../../api/consumer/consumerHome/fetchOrder";
import NoOrder from "../../NoOrder";

function OrderSection() {
  const [order] = useState([]);

  const fetchOrderData = async () => {
    const res = await fetchOrder();
    console.log(res);
  };
  useEffect(() => {
    fetchOrderData();
  }, []);
  return order.length == 0 ? (
    <NoOrder />
  ) : (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="flex items-start flex-col gap-6 xl:flex-row ">
          <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-3xl p-6 bg-gray-200 border border-gray-100 flex flex-col  md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400">
                <div className="img-box ">
                  <img
                    src="https://pagedone.io/asset/uploads/1701167635.png"
                    alt="Denim Jacket image"
                    className="w-full md:max-w-[122px] rounded-lg object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                  <div className="">
                    <h2 className="font-medium text-xl leading-8 text-black mb-3">
                      Dark Denim Jacket
                    </h2>
                    <p className="font-normal text-lg leading-8 text-gray-500 ">
                      By: Dust Studios
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-8">
                    <h6 className="font-medium text-xl leading-8 text-indigo-600">
                      $120.00
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto ">
            <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                Order Summary
              </h2>
              <div className="data py-6 border-b border-gray-200">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Product Cost
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-900">
                    $360.00
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Shipping
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-600">
                    $40.00
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 ">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                    Order Status
                  </p>
                  <p className="font-medium text-lg leading-8 text-emerald-500">
                    #PENDING
                  </p>
                </div>
              </div>
              <div className="total flex items-center justify-between pt-6">
                <p className="font-normal text-xl leading-8 text-black ">
                  Total
                </p>
                <h5 className="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                  $400.00
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSection;
