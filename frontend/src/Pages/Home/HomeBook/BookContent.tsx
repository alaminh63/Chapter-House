import { Link } from "react-router";
import { TBook } from "../../../utils/Types/GlobalType";

interface IProps {
  book: TBook & { _id?: string }; // Extend TBook to include optional _id
}

const BookContent = ({ book }: IProps) => {
  const {
    _id,
    author,
    brand,
    category,
    description,
    imageUrl,
    inStock,
    price,
    quantity,
    title,
    model,
  } = book;
  const byUser: any = book?.refUser;

  return (
    <div className="w-full md:w-80 p-4 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-50">
      {/* Book Image */}
      <div className="relative mb-4 overflow-hidden rounded-md">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {/* Availability Badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${inStock
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      {/* Book Details */}
      <div className="space-y-2">
        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </h1>

        {/* Author & Category */}
        <div className="text-xs flex flex-wrap gap-2">
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Author:
            </span>{" "}
            {author}
          </span>
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Category:
            </span>{" "}
            {category}
          </span>
        </div>

        {/* Brand & Model */}
        <div className="text-xs flex flex-wrap gap-2">
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Brand:
            </span>{" "}
            {brand}
          </span>
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Model:
            </span>{" "}
            {model}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>

        {/* Price, Quantity & Buy Button */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2">
          <div className="flex items-center gap-4">
            <span className="text-base font-semibold text-blue-600 dark:text-blue-400">
              ৳ {price.toLocaleString()}
            </span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              <span className="font-medium text-blue-600 dark:text-blue-400">
                Stock:
              </span>{" "}
              {quantity}
            </span>
          </div>
          {_id && inStock && (
            <Link
              to={`/book-detail/${_id}`}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Buy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookContent;