import { TBook } from "../../../utils/Types/GlobalType";

interface Iprops {
  book: TBook;
}
const BookContent = ({ book }: Iprops) => {
  //   console.log("book: ", book);
  const {
    author,
    brand,
    category,
    description,
    imageUrl,
    inStock,
    model,
    price,
    quantity,

    title,
  } = book;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const byUser: any = book?.refUser;
  return (
    <div className="w-full md:w-[320px] p-4 mx-auto bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-white overflow-hidden">
      {/* Book Image */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-[160px] object-cover rounded-lg transition-all duration-300 hover:scale-110"
        />
        {/* Availability Badge */}
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
            inStock ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      {/* Book Details */}
      <div className="space-y-3">
        {/* Title */}
        <h1 className="text-lg font-bold text-white hover:text-yellow-300 transition-all duration-300">
          {title}
        </h1>

        {/* Author & Category */}
        <div className="text-xs flex flex-wrap gap-2">
          <span className="bg-purple-900 px-2 py-1 rounded-md">
            <span className="text-yellow-300 font-semibold">Author:</span>{" "}
            {author}
          </span>
          <span className="bg-purple-900 px-2 py-1 rounded-md">
            <span className="text-yellow-300 font-semibold">Category:</span>{" "}
            {category}
          </span>
        </div>

        {/* Brand & Model */}
        <div className="text-xs flex flex-wrap gap-2">
          <span className="bg-purple-900 px-2 py-1 rounded-md">
            <span className="text-yellow-300 font-semibold">Brand:</span>{" "}
            {brand}
          </span>
          <span className="bg-purple-900 px-2 py-1 rounded-md">
            <span className="text-yellow-300 font-semibold">Model:</span>{" "}
            {model}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-gray-200 line-clamp-2">{description}</p>

        {/* Price & Quantity */}
        <div className="flex justify-between items-center border-t border-b border-purple-400 py-2">
          <span className="text-lg font-bold text-yellow-300">
            ৳ {price.toLocaleString()}
          </span>
          <span className="text-xs bg-purple-900 px-2 py-1 rounded-md">
            <span className="text-yellow-300 font-semibold">Stock:</span>{" "}
            {quantity}
          </span>
        </div>

        {/* User Reference */}
        <p className="text-xs text-gray-300">
          <span className="font-semibold text-yellow-300">Added by:</span>{" "}
          {byUser?.name}
        </p>
      </div>
    </div>
  );
};

export default BookContent;
