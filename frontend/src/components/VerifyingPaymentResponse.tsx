import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { verifyKhaltiPayment } from "../api/consumer/consumerPayment/verifyPayment";

// ✅ Response Interfaces
export interface VerifyPaymentResponse {
  message: string;
  orderId: number;
}

export interface VerifyPaymentError {
  message: string;
  error?: string;
}

function KhaltiResponse() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pidx = urlParams.get("pidx");

    if (!pidx) {
      toast.error("❌ Missing payment identifier.", {
        theme: "dark",
        autoClose: 3000,
      });
      navigate("/consumer/cart");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await verifyKhaltiPayment(pidx) ;

        if (res.status === 201 && res.data) {
          toast.success("✅ Payment successful and order created!", {
            theme: "dark",
            autoClose: 3000,
          });
          navigate("/consumer/order");
        } else {
          toast.error("❌ Unexpected response from server.", {
            theme: "dark",
            autoClose: 3000,
          });
          navigate("/consumer/cart");
        }
      } catch (err) {
        if (err && typeof err === "object" && "response" in err) {
          const error = err as {
            response: { data: VerifyPaymentError; status: number };
          };

          toast.error(`❌ ${error.response.data.message}`, {
            theme: "dark",
            autoClose: 3000,
          });
        } else {
          toast.error("❌ Unknown error during payment verification.", {
            theme: "dark",
            autoClose: 3000,
          });
        }

        navigate("/consumer/cart");
      }
    };

    verifyPayment();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="mb-6"
      >
        <Loader2 size={48} className="text-emerald-600 animate-spin" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-medium text-gray-800"
      >
        Verifying your payment...
      </motion.p>
    </div>
  );
}

export default KhaltiResponse;
