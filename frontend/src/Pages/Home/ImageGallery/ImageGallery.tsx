import LoadingPage from "../../../component/LoadingPage/LoadingPage";
import { useGetBookImagesQuery } from "../../../Redux/api/features/Book/bookManagementApi";
import SectionTitle from "../../SharedPage/SectionTitle/SectionTitle";
import { useState, useEffect } from "react";

const ImageGallery = () => {
  const { data, isLoading } = useGetBookImagesQuery(undefined);
  const bookImages = data?.data;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        closeImage();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedImage]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SectionTitle
        subHeading={"Explore Our Latest Book Collection"}
        heading={"Image Gallery"}
      />

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookImages?.map((image: { imageUrl: string }, index: number) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => openImage(image.imageUrl)}
          >
            <img
              src={image.imageUrl}
              alt={`Book ${index + 1}`}
              className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
              View Image
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-300 cursor-default"
          onClick={closeImage}
        >
          <div
            className="relative max-w-5xl   m-4 flex flex-col items-end gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImage}
              className="p-2 bg-white/90 absolute -right-12  rounded-full shadow-lg hover:bg-white transition-all duration-200 z-10"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src={selectedImage}
              alt="Selected Book"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
