import rice from '/rice.jpg'

function ProductCard() {
  return (
    <div className="w-full min-h-screen bg-red-50 lg:p-10 md:p-8 p-6">
      <div className="w-full flex flex-wrap ">
        <div className=" max-w-[300px] container border border-black">
          <img src={rice} alt="" className='' />

        </div>

      </div>
    </div>
  )
}

export default ProductCard