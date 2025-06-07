import AuthLogin from "./AuthLogin";
import bgImage from "/auth-sec-bg.jpg";

function AuthModal() {
  return (
    <div className="w-full h-full p-4  ">
      <div className="w-full h-full grid lg:grid-cols-[60%_auto] md:grid-rows-[50%_auto] lg:grid-rows-none sm:grid-cols-none sm:grid-rows-[30%_auto]  lg:gap-1 gap-2 ">
        <div className="w-full h-full lg:rounded-4xl rounded-2xl ">
          <img src={bgImage} className="w-full h-full object-cover overflow-hidden lg:rounded-4xl rounded-2xl " alt="" />
        </div>
        <div className="w-full h-full ">
          <AuthLogin/>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
