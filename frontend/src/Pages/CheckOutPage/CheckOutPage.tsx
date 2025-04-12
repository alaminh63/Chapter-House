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

  // Determine maximum quantity allowed based on stock
  const maxQuantity = book?.inStock ? book.quantity : 0;

  const handleQuantity = (value: string) => {
    if (!book?.inStock) {
      toast.error("This book is currently out of stock.", { id: sonarId });
      return;
    }

    if (value === "p") {
      if (quantity < maxQuantity) {
        // Check against maximum quantity
        setQuantity((quantity) => quantity + 1);
      } else {
        toast.error(`Maximum quantity available is ${maxQuantity}`, {
          id: sonarId,
        });
      }
    } else {
      if (quantity > 1) {
        // Prevent quantity from going below 1
        setQuantity((quantity) => quantity - 1);
      }
    }
  };

  const handleBuyNow = async () => {
    if (!quantity || quantity <= 0) {
      toast.error("Please select a valid quantity.", { id: sonarId });
      return;
    }

    if (quantity > maxQuantity) {
      toast.error(`You can't order more than ${maxQuantity}`, { id: sonarId });
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
        toast.error("Payment initiation failed.", { id: sonarId });
      }
    } catch (error: any) {
      console.error("Payment error:", error);

      if (error?.data?.message) {
        toast.error(error?.data?.message, { id: sonarId });
      } else {
        toast.error(
          "An unexpected error occurred during payment.",
          { id: sonarId }
        );
      }
    } finally {
      // Consider using toast.remove(sonarId) here if you want to remove the loading toast regardless of success or failure
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!book) {
    return <div>Book not found!</div>; //Handle the case where book is not found
  }

  return (
    <div>
      <h1 className="bg-blue-500 p-4 mb-2 rounded-md font-bold text-center text-xl">
        Checkout page
      </h1>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-700 to-green-600 text-white flex justify-center items-center px-6 py-12">
        <div className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20">
          {/* Flex Container */}
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10">
            {/* Book Image */}
            <div className="w-64 h-96 relative">
              <img
                src={book?.imageUrl}
                alt={book?.title}
                className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white/20"
              />
              <span className="absolute top-2 left-2 bg-green-500 px-3 py-1 text-xs font-bold rounded-full shadow-md">
                {book?.category}
              </span>
            </div>

            {/* Book Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold">{book?.title}</h1>
              <p className="text-lg text-gray-300 mt-2">{book?.description}</p>

              {/* Price */}
              <div className="mt-4 flex items-center space-x-6">
                <span className="text-2xl font-bold text-yellow-400">
                  ${book?.price?.toFixed(2)}
                </span>

                {/* Stock Count Display */}
                <span className="text-lg text-gray-300">
                  Available Stock: {book.quantity}
                </span>

                <span
                  className={`text-lg font-semibold px-3 py-1 rounded-lg ${
                    book?.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {book?.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center space-x-4">
                <button
                  className="px-5 py-3 text-lg font-semibold bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                  onClick={() => handleQuantity("n")}
                  disabled={!book?.inStock || quantity <= 1} // Disable if out of stock or quantity is 1
                >
                  -
                </button>
                <span className="text-2xl font-bold px-6 py-2 bg-white text-black rounded-lg shadow-md">
                  {quantity}
                </span>
                <button
                  className="px-5 py-3 text-lg font-semibold bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                  onClick={() => handleQuantity("p")}
                  disabled={!book?.inStock || quantity >= maxQuantity} // Disable if out of stock or quantity is at max
                >
                  +
                </button>
              </div>

              <div className="mt-6 flex items-center space-x-4 bg-blue-600 w-full md:w-1/2 py-2 px-4 rounded-md font-bold">
                <h1>
                  Total Price: ${(quantity * book?.price).toFixed(2)}{" "}
                </h1>
              </div>

              {/* Buy Now Button */}
              <div className="mt-6">
                {book?.inStock ? (
                  <button
                    className="px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                ) : (
                  <button
                    className="px-6 py-3 text-lg font-semibold text-white bg-gray-600 rounded-lg shadow-md cursor-not-allowed"
                    disabled
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;