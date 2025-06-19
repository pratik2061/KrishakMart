import krishakMart_logo from '/krishakMart_Logo.jpg'

function HomeLogo() {
  return (
    <div className="flex justify-center items-center w-full pt-2 ">
        <img src={krishakMart_logo} className='overflow-hidden ' />
    </div>
  );
}

export default HomeLogo;
