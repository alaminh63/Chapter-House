import { useParams } from "react-router";
import { useAppSelector } from "../../Redux/hooks";
import { useState } from "react";
import { TUser } from "../../utils/Types/GlobalType";
import { useGetSingleBookQuery } from "../../Redux/api/features/Book/bookManagementApi";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useInitialPayMutation } from "../../Redux/api/features/Payment/paymenManagementApi";

const CheckOutPage = () => {
  const [initialPayment] = useInitialPayMutation();
  const { user } = useAppSelector((state) => state.auth);
  const { _id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(_id);
  const book = data?.data;

  const [quantity, setQuantity] = useState(1);
  const maxQuantity = book?.inStock ? book.quantity : 0;

  const handleQuantity = (value: string) => {
    if (!book?.inStock) {
      toast.error("This book is out of stock.", { id: sonarId });
      return;
    }

    if (value === "p") {
      if (quantity < maxQuantity) {
        setQuantity((prev) => prev + 1);
      } else {
        toast.error(`Maximum quantity available is ${maxQuantity}.`, {
          id: sonarId,
        });
      }
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleBuyNow = async () => {
    if (!quantity || quantity <= 0) {
      toast.error("Please select a valid quantity.", { id: sonarId });
      return;
    }

    if (quantity > maxQuantity) {
      toast.error(`You can't order more than ${maxQuantity}.`, { id: sonarId });
      return;
    }

    const orderData = {
      productId: _id,
      userId: (user as TUser)._id,
      quantity,
      price: book?.price * quantity,
    };

    toast.loading("Processing payment...", { id: sonarId });

    try {
      const res = await initialPayment(orderData).unwrap();
      if (res?.url) {
        window.location.replace(res?.url);
      } else {
        toast.error("Failed to initiate payment.", { id: sonarId });
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "An error occurred during payment.",
        { id: sonarId }
      );
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <p className="text-gray-300 text-xl font-medium">Book not found!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen   text-gray-100">
      {/* Header */}
      <header className="  shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-indigo-300">
            Secure Checkout
          </h1>
          <div className="text-base text-gray-400">
            Step 1 of 2: Order Confirmation
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="  mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Order Details */}
          <section className="lg:col-span-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              Your Order
            </h2>
            <div className="flex items-start gap-4 border-b border-gray-700 pb-4">
              <div className="relative flex-shrink-0">
                <img
                  src={book?.imageUrl}
                  alt={book?.title}
                  className="w-44 h-48 object-cover rounded-md shadow-sm"
                />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-sm font-medium px-2 py-0.5 rounded-full">
                  {book?.category}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-100 leading-tight">
                  {book?.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                  {book?.description}
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full font-medium ${
                      book?.inStock
                        ? "bg-green-600/20 text-green-300"
                        : "bg-red-600/20 text-red-300"
                    }`}
                  >
                    {book?.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  <span className="text-gray-400">
                    {book.quantity} available
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-lg text-gray-400">
                <span>Unit Price</span>
                <span className="text-indigo-400 font-semibold">
                  ${book?.price?.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* Checkout Form */}
          <section className="lg:col-span-3 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              Order Summary
            </h2>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-lg font-medium text-gray-300 mb-2"
              >
                Select Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantity("n")}
                  disabled={!book?.inStock || quantity <= 1}
                  className={`w-12 h-12 flex items-center justify-center rounded-md text-xl font-semibold transition-all duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:text-gray-400 ${
                    book?.inStock && quantity > 1
                      ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/50"
                      : ""
                  }`}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span
                  id="quantity"
                  className="w-16 text-center py-3 bg-gray-700 rounded-md text-gray-100 text-xl font-medium"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantity("p")}
                  disabled={!book?.inStock || quantity >= maxQuantity}
                  className={`w-12 h-12 flex items-center justify-center rounded-md text-xl font-semibold transition-all duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:text-gray-400 ${
                    book?.inStock && quantity < maxQuantity
                      ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/50"
                      : ""
                  }`}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-600 pt-4 mb-6">
              <div className="space-y-3 text-lg">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({quantity} item{quantity > 1 ? "s" : ""})</span>
                  <span>${(book?.price * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between text-xl font-semibold text-gray-100 pt-3 border-t border-gray-600">
                  <span>Estimated Total</span>
                  <span className="text-indigo-400">
                    ${(book?.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Proceed to Payment */}
            <button
              onClick={handleBuyNow}
              disabled={!book?.inStock || quantity <= 0}
              className={`w-full py-4 rounded-md text-lg font-semibold text-white transition-all duration-200 tracking-wide ${
                book?.inStock && quantity > 0
                  ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/50"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              Continue to Payment
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CheckOutPage;