import krishakMart_logo from '/krishakMart_Logo.jpg'

function HomeLogo() {
  return (
    <div className="flex justify-center items-center w-full pt-2 sm:pt-4 lg:pt-6">
      <img
        src={krishakMart_logo}
        alt="KrishakMart Logo"
        className="w-24 sm:w-32 lg:w-40 h-auto object-contain"
      />
    </div>
  );
}

export default HomeLogo;
