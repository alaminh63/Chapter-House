import { useParams, Link } from "react-router";
import { useTitle } from "../../../component/hook/useTitle";

const PaymentSuccessfull = () => {
  useTitle("Successfull Payment");
  const { transactionId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-900 flex items-center justify-center text-white">
      <div className="text-center p-8 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md max-w-md">
        <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
        <p className="text-lg mb-6">
          Thank you for your payment. Your transaction ID is:
        </p>
        <div className="bg-purple-800 text-white py-3 px-5 rounded-lg font-mono text-sm shadow-inner mb-8">
          {transactionId || "N/A"}
        </div>
        <Link
          to="/"
          className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessfull;
