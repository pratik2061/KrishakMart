import AuthModal from "../../components/authComponent/AuthModal";
import Footer from "../../components/Footer"; // Adjust path if needed


function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow min-h-[80vh] flex items-center justify-center">
        <AuthModal />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Login;
