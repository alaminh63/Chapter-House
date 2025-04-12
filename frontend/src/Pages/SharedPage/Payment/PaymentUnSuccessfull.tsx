import { useParams, Link } from "react-router";
import { useTitle } from "../../../component/hook/useTitle";

const PaymentUnSuccessfull = () => {
  useTitle("Payment Failed");
  const { transactionId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-900 flex items-center justify-center text-white">
      <div className="text-center p-8 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md max-w-md">
        <h1 className="text-3xl font-bold mb-4">❌ Payment Failed!</h1>
        <p className="text-lg mb-6">
          We couldn't process your payment. Your transaction ID was:
        </p>
        <div className="bg-red-800 text-white py-3 px-5 rounded-lg font-mono text-sm shadow-inner mb-8">
          {transactionId || "N/A"}
        </div>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentUnSuccessfull;
