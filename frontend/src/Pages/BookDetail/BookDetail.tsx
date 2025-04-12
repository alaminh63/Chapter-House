import { useNavigate, useParams } from "react-router";
import { useGetSingleBookQuery } from "../../Redux/api/features/Book/bookManagementApi";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
import { toast } from "sonner";
import { useAppSelector } from "../../Redux/hooks";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useTitle } from "../../component/hook/useTitle";

const BookDetail = () => {
  useTitle("Book Detail");

  const { user } = useAppSelector((state) => state.auth);
  const { _id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(_id);
  const book = data?.data;
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleOrder = async () => {
    if (!user) {
      toast.error("Please log in to place an order", { id: sonarId });
      return;
    }
    if (user?.role === "admin") {
      toast.error("Admins cannot place orders", { id: sonarId });
      return;
    }
    navigate(`/user-checkout/${_id}`);
  };

  return (
    <div className="min-h-screen   text-gray-100">
      {/* Header */}
      <header className="  shadow-lg">
        <h1 className="text-2xl font-bold text-center py-4 text-indigo-300">
          Book Details
        </h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-5">
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden   mx-auto border border-gray-700">
          <div className="flex flex-col lg:flex-row">
            {/* Book Image */}
            <div className="relative lg:w-1/3 p-6">
              <img
                src={book?.imageUrl}
                alt={book?.title}
                className="w-full h-80 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-8 left-8 bg-indigo-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                {book?.category}
              </span>
            </div>

            {/* Book Details */}
            <div className="lg:w-2/3 p-6 space-y-6">
              <h2 className="text-3xl font-bold text-gray-100">{book?.title}</h2>
              <p className="text-gray-400 leading-relaxed">{book?.description}</p>

              {/* Price & Stock */}
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-indigo-400">
                  ${book?.price?.toFixed(2)}
                </span>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    book?.inStock
                      ? "bg-green-600 text-green-100"
                      : "bg-red-600 text-red-100"
                  }`}
                >
                  {book?.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-300">Author:</span>
                  <p className="text-gray-400">{book?.author}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Brand:</span>
                  <p className="text-gray-400">{book?.brand}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Model:</span>
                  <p className="text-gray-400">{book?.model}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Quantity:</span>
                  <p className="text-gray-400">{book?.quantity}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Published:</span>
                  <p className="text-gray-400">
                    {new Date(book?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Order Button */}
              <div>
                <button
                  onClick={handleOrder}
                  disabled={!book?.inStock}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-all duration-300 ${
                    book?.inStock
                      ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  {book?.inStock ? "Order Now" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;