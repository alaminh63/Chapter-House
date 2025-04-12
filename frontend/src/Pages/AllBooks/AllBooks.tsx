import { useEffect, useState } from "react";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
import { useGetAllBookQuery } from "../../Redux/api/features/Book/bookManagementApi";

import { useNavigate } from "react-router";
import { TBook } from "../../utils/Types/GlobalType";
import { useTitle } from "../../component/hook/useTitle";
import { toast } from "sonner";

const AllBooks = () => {
  useTitle("All Book");
  const navigate = useNavigate();

  // State for filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [inStock, setInStock] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch books with filters and pagination
  const {
    data: bookData,
    isLoading,
    error,
  } = useGetAllBookQuery(
    Object.fromEntries(
      Object.entries({
        ...(searchTerm && { searchTerm }),
        ...(category && { category }),
        ...(author && { author }),
        ...(minPrice && { minPrice: String(minPrice) }),
        ...(maxPrice && { maxPrice: String(maxPrice) }),
        ...(inStock !== "" && { inStock: String(inStock) }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        page: currentPage,
        limit: 5,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).filter(([_, v]) => v !== undefined) // Filter out undefined values
    )
  );

  // Handle API Error
  if (error) {
    toast.error("Error while fetching books");
  }

  const books = bookData?.data || [];
  const totalPages = bookData?.pagination?.totalPages || 1;

  // Handle search/filter changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGoDetail = (_id: string) => {
    navigate(`/book-detail/${_id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Effect to reset current page to 1 on filter changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    searchTerm,
    category,
    author,
    minPrice,
    maxPrice,
    inStock,
    sortBy,
    sortOrder,
  ]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-0 md:px-4">
        <h1 className="text-4xl font-extrabold text-teal-400 text-center mb-8">
          All Books
        </h1>

        {/* Filters Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          {/* Search Book */}
          <div className="mb-6">
            <h2 className="text-xl text-teal-400 mb-2">Search Book</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by title, author, or category"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Sort and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sort By */}
            <div>
              <h2 className="text-xl text-teal-400 mb-2">Sort By</h2>
              <select
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Default</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <h2 className="text-xl text-teal-400 mb-2">Order</h2>
              <select
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Default</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <h2 className="text-xl text-teal-400 mb-2">Category</h2>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Category</option>
                <option value="Science">Science</option>
                <option value="Fiction">Fiction</option>
                <option value="Religious">Religious</option>
                <option value="Poetry">Poetry</option>
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <h2 className="text-xl text-teal-400 mb-2">Author</h2>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Search by author"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Price Range Filter */}
            <div>
              <h2 className="text-xl text-teal-400 mb-2">Price Range</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min Price"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max Price"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* In Stock Filter */}
            <div>
              <h2 className="text-xl text-teal-400 mb-2">In Stock</h2>
              <select
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Table */}
        <div className=" overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-teal-500">
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Brand</th>
                <th className="py-3 px-4 text-left">Author</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Model</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Available</th>
                <th className="py-3 px-4 text-left">Detail</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((data: TBook, idx: number) => (
                <tr
                  key={idx}
                  className=" border-b border-gray-700 hover:bg-gray-700 transition-all duration-300"
                >
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={data?.imageUrl}
                      alt={data?.title}
                      className="w-16 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4">{data?.title}</td>
                  <td className="py-3 px-4">{data?.brand}</td>
                  <td className="py-3 px-4">{data?.author}</td>
                  <td className="py-3 px-4">{data?.category}</td>
                  <td className="py-3 px-4">{data?.model}</td>
                  <td className="py-3 px-4">${data?.price}</td>
                  <td className="py-3 px-4">{data?.quantity}</td>
                  <td className="py-3 px-4">
                    {data?.inStock ? (
                      <span className="text-green-400">Yes</span>
                    ) : (
                      <span className="text-red-400">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
                      onClick={() => handleGoDetail(data?._id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-600 transition-all duration-300"
          >
            Prev
          </button>
          <span className="px-4 py-2 text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-600 transition-all duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
