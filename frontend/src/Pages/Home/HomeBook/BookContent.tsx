import React from 'react';
import { TBook } from '../../../utils/Types/GlobalType';
import { FaShoppingCart, FaEye, FaHeart, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Iprops {
  book: TBook;
}

const BookContent = ({ book }: Iprops) => {
  const {
    author,
    imageUrl,
    inStock,
    price,
    title,
    description,
    category,
    brand,
  } = book;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    hover: { y: -8, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: "#4ADE80", color: "white", transition: { duration: 0.2, ease: "easeInOut" } },
  };

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Image Section */}
      <div className="aspect-w-4 aspect-h-5">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-48 transition-transform duration-300 transform group-hover:scale-105" // Fixed Height
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col h-full"> {/* Flex and h-full added */}
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-1">By {author}</p>

        {/* Additional Information */}
        <div className="mt-3 space-y-2 flex-grow"> {/* flex-grow added */}
          <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <div className="flex"> {/* Star Flex */}
              {Array(5).fill(null).map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <span className="text-lg font-bold text-gray-900">${price.toLocaleString()}</span>
          </div>
        </div>

        {/* Category and Brand */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>Category: {category}</span>
          <span>Brand: {brand}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <motion.button
            className="bg-gray-100 hover:bg-green-500 hover:text-white text-gray-700 font-semibold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
            aria-label="View Details"
            variants={buttonVariants}
            whileHover="hover"
          >
            <FaEye className="mr-2" /> View
          </motion.button>
          <motion.button
            className="bg-gray-100 hover:bg-green-500 hover:text-white text-gray-700 font-semibold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
            aria-label="Add to Cart"
            variants={buttonVariants}
            whileHover="hover"
          >
            <FaShoppingCart className="mr-2" /> Cart
          </motion.button>
          <motion.button
            className="bg-gray-100 hover:bg-green-500 hover:text-white text-gray-700 font-semibold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
            aria-label="Add to Wishlist"
            variants={buttonVariants}
            whileHover="hover"
          >
            <FaHeart className="mr-2" /> Wishlist
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookContent;