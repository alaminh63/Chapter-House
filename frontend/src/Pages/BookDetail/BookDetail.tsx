import { useNavigate, useParams } from "react-router";
import { useGetSingleBookQuery } from "../../Redux/api/features/Book/bookManagementApi";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
// import { useAddCartMutation } from "../../Redux/api/features/Cart/cartManagementApi";
import { toast } from "sonner";
import { useAppSelector } from "../../Redux/hooks";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useTitle } from "../../component/hook/useTitle";

const BookDetail = () => {
  useTitle("Book Detail");

  const { user } = useAppSelector((state) => state.auth);

  const { _id } = useParams();
  //   console.log("The book ID is: ", _id);

  const { data, isLoading } = useGetSingleBookQuery(_id);
  const book = data?.data;
  console.log("Book: ", book);

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleOrder = async () => {
    if (!user) {
      toast.error("You have to logged in first", { id: sonarId });
      return;
    }
    if (user && user?.role === "admin") {
      toast.error("You can to order as admin", { id: sonarId });
      return;
    }

    // naviagate(`/user-checkout/${_id}`);
    navigate(`/user-checkout/${_id}`);
  };
  return (
    <div>
      <h1 className="bg-[#5C3485] p-4 mb-2 rounded-md font-bold text-center text-xl">
        Book Detail
      </h1>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-blue-900 text-white flex justify-center items-center px-6 py-12">
        <div className="max-w-5xl w-full bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20">
          {/* Flex Container */}
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10">
            {/* Book Image */}
            <div className="w-64 h-96 relative">
              <img
                src={book?.imageUrl}
                alt={book?.title}
                className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white/20"
              />
              <span className="absolute top-2 left-2 bg-blue-600 px-3 py-1 text-xs font-bold rounded-full shadow-md">
                {book?.category}
              </span>
            </div>

            {/* Book Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold">{book?.title}</h1>
              <p className="text-lg text-gray-300 mt-2">{book?.description}</p>

              {/* Price & Stock */}
              <div className="mt-4 flex items-center space-x-6">
                <span className="text-2xl font-bold text-green-400">
                  ${book?.price?.toFixed(2)}
                </span>
                <span
                  className={`text-lg font-semibold px-3 py-1 rounded-lg ${
                    book?.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {book?.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Additional Info */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-200">Author:</span>
                  <p className="text-gray-300">{book?.author}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-200">Brand:</span>
                  <p className="text-gray-300">{book?.brand}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-200">Model:</span>
                  <p className="text-gray-300">{book?.model}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-200">
                    Quantity Available:
                  </span>
                  <p className="text-gray-300">{book?.quantity}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-200">
                    Published:
                  </span>
                  <p className="text-gray-300">
                    {new Date(book?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Order Button */}
              <div className="mt-6">
                {book?.inStock ? (
                  <button
                    className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                    onClick={handleOrder}
                  >
                    Order Now
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

export default BookDetail;
