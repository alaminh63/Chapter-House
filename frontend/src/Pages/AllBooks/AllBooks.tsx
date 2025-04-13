import { useEffect, useState } from "react";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
import { useGetAllBookQuery } from "../../Redux/api/features/Book/bookManagementApi";
import { useNavigate } from "react-router";
import { TBook } from "../../utils/Types/GlobalType";
import { useTitle } from "../../component/hook/useTitle";
import { toast } from "sonner";
import { useAddCartMutation } from "../../Redux/api/features/Cart/cartManagementApi";
import { useAppSelector } from "../../Redux/hooks";

const AllBooks = () => {
  useTitle("All Book");
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // State for filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [author, setAuthor] = useState<string>("");
  const [inStock, setInStock] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: bookData,
    isLoading,
    error,
  } = useGetAllBookQuery({
    ...(searchTerm && { searchTerm }),
    ...(category && { category }),
    ...(minPrice && { minPrice: String(minPrice) }),
    ...(maxPrice && { maxPrice: String(maxPrice) }),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
    ...(author && { author }),
    ...(inStock && { inStock: inStock === "true" }),
    page: currentPage,
    limit: 5,
  });

  if (error) {
    toast.error("Error while fetching books");
  }

  const [addCart,] = useAddCartMutation();

  const books = bookData?.data || [];
  const totalPages = bookData?.pagination?.totalPages || 1;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGoDetail = (_id: string) => {
    navigate(`/book-detail/${_id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const [newSortBy, newSortOrder] = selectedValue.split(':');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleAddToCart = async (book: TBook) => {
    const cleanData = {
      bookId: book._id,
      userId: user?._id,
      quantity: 1,
      price: book.price
    }
    try {
      const res = await addCart(cleanData).unwrap;
      console.log('res: ', res);



      toast.success("Book added to cart");

    } catch (error) {
      toast.error("Failed to add book to cart");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, minPrice, maxPrice, sortBy, sortOrder, author, inStock]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen text-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Explore Our Bookstore
        </h1>

        <div className="bg-gray-900 rounded-xl p-4 mb-8 shadow-lg border border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search books..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-100 placeholder-gray-500 transition-all duration-300"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-100 transition-all duration-300"
            >
              <option value="">All Categories</option>
              <option value="Science">Science</option>
              <option value="Fiction">Fiction</option>
              <option value="Religious">Religious</option>
              <option value="Poetry">Poetry</option>
            </select>
            <div className="flex gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-100 placeholder-gray-500 transition-all duration-300"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-100 placeholder-gray-500 transition-all duration-300"
              />
            </div>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-100 placeholder-gray-500 transition-all duration-300"
            />
            <select
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-100 transition-all duration-300"
            >
              <option value="">All Stock Status</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
            <select
              onChange={handleSortByChange}
              value={`${sortBy}:${sortOrder}`}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-100 transition-all duration-300"
            >
              <option value="">Sort By</option>
              <option value="price:asc">Price: Ascending</option>
              <option value="price:desc">Price: Descending</option>
              <option value="title:asc">Title: Ascending</option>
              <option value="title:desc">Title: Descending</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {books?.map((book: TBook) => (
            <div
              key={book._id}
              className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 border border-gray-700 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                <div className="absolute top-2 right-2 px-2 py-1 bg-teal-500/90 text-xs font-semibold text-white rounded-md shadow-sm">
                  {book.inStock ? "In Stock" : "Sold Out"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-100 mb-1 line-clamp-2 leading-tight">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-400 mb-1 font-medium">
                  by {book.author}
                </p>
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                  {book.category}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-base font-bold text-teal-400">
                    ${book.price}
                  </span>
                  {book.inStock && (
                    <span className="text-xs text-gray-400">
                      {book.quantity} left
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleGoDetail(book._id)}
                    className="flex-1 px-3 py-1.5 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-300 text-sm font-medium shadow-sm"
                  >
                    Details
                  </button>
                  {book.inStock && (
                    <button onClick={() => handleAddToCart(book)} className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 text-sm font-medium shadow-sm">
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-1.5 bg-teal-500 text-white rounded-md disabled:bg-gray-700 hover:bg-teal-600 transition-colors duration-300 text-sm font-medium shadow-sm"
          >
            Previous
          </button>
          <span className="px-4 py-1.5 text-sm text-gray-300 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-1.5 bg-teal-500 text-white rounded-md disabled:bg-gray-700 hover:bg-teal-600 transition-colors duration-300 text-sm font-medium shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;