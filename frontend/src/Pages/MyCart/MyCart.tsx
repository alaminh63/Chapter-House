import { toast } from "sonner";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
import {
  useDeleteCartMutation,
  useGetMyCartQuery,
} from "../../Redux/api/features/Cart/cartManagementApi";
import { useAppSelector } from "../../Redux/hooks";
import { TUser } from "../../utils/Types/GlobalType";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useTitle } from "../../component/hook/useTitle";
import { useInitialPayMutation } from "../../Redux/api/features/Payment/paymenManagementApi";

const MyCart = () => {
  useTitle("My Cart");
  const { user } = useAppSelector((state) => state.auth);
  const [deleteCart] = useDeleteCartMutation();
  const [initialPayment] = useInitialPayMutation();
  const { data, isLoading } = useGetMyCartQuery((user as TUser)?._id);
  const carts = data?.data;

  const handleDelete = async (id: string) => {
    toast.loading("Deleting", { id: sonarId });
    try {
      const res = await deleteCart(id).unwrap();
      if (res?.status) {
        toast.success("Cart Deleted Successfully", { id: sonarId });
      }
    } catch (error) {
      toast.error("Failed to delete cart item", { id: sonarId });
    }
  };

  const handleConfirmOrder = async (
    cartId: string,
    productId: string,
    price: string,
    quantity: string
  ) => {
    const priceInNumber = Number(price);
    const quantityInNumber = Number(quantity);
    const totalPrice = priceInNumber * quantityInNumber;
    const orderData = {
      cartId,
      userId: user?._id,
      productId,
      price: totalPrice,
      quantity: quantity,
    };
    toast.loading("Confirming Order", { id: sonarId });
    try {
      const res = await initialPayment(orderData).unwrap();
      if (res?.url) {
        window.location.replace(res?.url);
      }
    } catch (error) {
      toast.error("Failed to confirm order", { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen   text-gray-100  ">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-10">
          Your Shopping Cart
        </h1>
        {carts?.length === 0 ? (
          <div className="text-center py-16 bg-gray-700 rounded-xl shadow-sm">
            <p className="text-xl font-medium text-gray-300">Your cart is empty!</p>
            <a
              href="/all-books"
              className="mt-4 inline-flex items-center px-5 py-2.5 bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label="Browse Shop"
            >
              Browse Shop
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {carts?.map((cartItem: any, idx: number) => (
              <div
                key={idx}
                className="bg-gray-700 p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 border border-gray-600"
              >
                <div className="w-24 h-36 flex-shrink-0">
                  <img
                    src={cartItem?.bookId?.imageUrl}
                    alt={cartItem?.bookId?.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-100">
                    {cartItem.bookId?.title}
                  </h2>
                  <p className="text-sm text-gray-300 italic">
                    by {cartItem?.bookId?.author}
                  </p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-200">
                    <p>
                      <span className="font-medium">Category:</span>{" "}
                      {cartItem?.bookId?.category}
                    </p>
                    <p>
                      <span className="font-medium">Model:</span>{" "}
                      {cartItem?.bookId?.model}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span> ${cartItem?.bookId?.price}
                    </p>
                    <p>
                      <span className="font-medium">Quantity:</span> {cartItem?.quantity}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-medium">Total:</span> $
                      {(Number(cartItem?.bookId?.price) * Number(cartItem?.quantity)).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      className="px-5 py-2.5 bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={() =>
                        handleConfirmOrder(
                          cartItem._id,
                          cartItem?.bookId?._id,
                          cartItem?.bookId?.price,
                          cartItem?.quantity
                        )
                      }
                      aria-label={`Confirm order for ${cartItem.bookId?.title}`}
                    >
                      Confirm Order
                    </button>
                    <button
                      className="px-5 py-2.5 bg-red-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={() => handleDelete(cartItem?._id)}
                      aria-label={`Delete ${cartItem.bookId?.title} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;