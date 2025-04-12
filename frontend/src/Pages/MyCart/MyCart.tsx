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
  console.log("My Cart: ", carts);

  const handleDelete = async (id: string) => {
    toast.loading("Deleting", { id: sonarId });
    const res = await deleteCart(id).unwrap();
    if (res?.status) {
      toast.success("Cart Deleted Successfully", { id: sonarId });
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
    const res = await initialPayment(orderData).unwrap();
    if (res?.url) {
      window.location.replace(res?.url);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          🛒 Checkout Cart
        </h1>
        {carts?.length === 0 ? (
          <div className="text-center">
            <p className="text-2xl font-bold">Your cart is empty!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {carts?.map((cartItem: any, idx: number) => (
              <div
                key={idx}
                className=" bg-white/10 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-32 h-48">
                  <img
                    src={cartItem?.bookId?.imageUrl}
                    alt={cartItem?.bookId?.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {cartItem.bookId?.title}
                  </h2>
                  <p className="text-lg italic">
                    by {cartItem?.bookId?.author}
                  </p>
                  <div className="my-3 space-y-1">
                    <p>
                      <span className="font-semibold">Category:</span>{" "}
                      <span className="text-yellow-400">
                        {cartItem?.bookId?.category}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Model:</span>{" "}
                      <span className="text-green-400">
                        {cartItem?.bookId?.model}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span>{" "}
                      <span className="text-orange-400">
                        ${cartItem?.bookId?.price}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {cartItem?.quantity}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={() =>
                        handleConfirmOrder(
                          cartItem._id,
                          cartItem?.bookId?._id,
                          cartItem?.bookId?.price,
                          cartItem?.quantity
                        )
                      }
                    >
                      Confirm Order
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={() => handleDelete(cartItem?._id)}
                    >
                      Delete from Cart
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
