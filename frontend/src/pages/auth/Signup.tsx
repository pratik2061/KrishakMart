import AuthSignup from "../../components/authComponent/AuthSignup";
import Footer from "../../components/Footer"; // Adjust path if needed


function Signup() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow min-h-[85vh] flex items-center justify-center">
        <AuthSignup/>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Signup;
