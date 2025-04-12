import React, { useState, useRef, useEffect } from "react";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";
import { useGetBookImagesQuery } from "../../../Redux/api/features/Book/bookManagementApi";
import "./ImageGallery.css";  // You might need to adjust this depending on your CSS strategy
import SectionTitle from "../../SharedPage/SectionTitle/SectionTitle";
import { FaTimes, FaExpand, FaHeart } from 'react-icons/fa'; // Import icons
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { toast } from 'react-toastify';  //For like and unlike books
import 'react-toastify/dist/ReactToastify.css';
const ImageGallery = () => {
  const { data, isLoading } = useGetBookImagesQuery(undefined);
  const bookImages = data?.data;
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState([]); // track liked books
  const [showModal, setShowModal] = useState(false);
  const [zoomImageUrl, setZoomImageUrl] = useState('');
  const openImage = (imageUrl) => {
    setZoomImageUrl(imageUrl);
    setShowModal(true);
  };
  const closeImage = () => {
    setShowModal(false);
    setZoomImageUrl('');
  };
  const toggleLike = (imageUrl) => {
    if (likedImages.includes(imageUrl)) {
      // Unlike
      setLikedImages(likedImages.filter((url) => url !== imageUrl));
      toast.warn('Book removed from favorites!', { position: "top-right", autoClose: 2000 });
    } else {
      // Like
      setLikedImages([...likedImages, imageUrl]);
      toast.success('Book added to favorites!', { position: "top-right", autoClose: 2000 });
    }
  };
  const gridRef = useRef(null);
  useEffect(() => {
    // Calculate and set grid auto-rows based on image heights (crude approach)
    if (gridRef.current && bookImages && bookImages.length > 0) {
      const firstImage = new Image();
      firstImage.onload = () => {
        const imageHeight = firstImage.height;
        gridRef.current.style.gridAutoRows = `${imageHeight / 2}px`; // Adjust divisor for desired row height
      };
      firstImage.src = bookImages[0].imageUrl; // Load first image to get dimensions
    }
  }, [bookImages]);
  if (isLoading) {
    return <LoadingPage />;
  }
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeInOut" } }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12"> {/* Background */}
      <div className="container mx-auto px-4"> {/* Horizontal padding */}
        <SectionTitle
          subHeading="Explore Our Captivating Collection"
          heading="Enchanting Book Gallery"
        />
        {/* Image Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {bookImages?.map((image, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md cursor-pointer group hover:shadow-lg transition-shadow duration-300"
              onClick={() => openImage(image.imageUrl)}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ backgroundImage: `url(${image.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="aspect-w-3 aspect-h-4">
                {/* This maintains aspect ratio */}
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening the image
                    toggleLike(image.imageUrl);
                  }}
                  aria-label="Like/Unlike"
                >
                  {likedImages.includes(image.imageUrl) ? (
                    <FaHeart color="#e53e3e" /> // Red heart
                  ) : (
                    <FaHeart color="#718096" /> // Gray heart
                  )}
                </button>
              </div>
              {/* Hover Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <FaExpand className="text-white text-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeImage}
            >
              <motion.div
                className="relative max-w-5xl w-full p-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                <img
                  src={zoomImageUrl}
                  alt="Zoomed Book"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                <button
                  onClick={closeImage}
                  className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300"
                  aria-label="Close"
                >
                  <FaTimes className="h-6 w-6 text-gray-800" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default ImageGallery;