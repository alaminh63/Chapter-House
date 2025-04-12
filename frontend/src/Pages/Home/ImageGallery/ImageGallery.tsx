import LoadingPage from "../../../component/LoadingPage/LoadingPage";
import { useGetBookImagesQuery } from "../../../Redux/api/features/Book/bookManagementApi";
import "./ImageGallery.css";
import SectionTitle from "../../SharedPage/SectionTitle/SectionTitle";
import { useState } from "react";
const ImageGallery = () => {
  const { data, isLoading } = useGetBookImagesQuery(undefined);
  const bookImages = data?.data;
  // console.log("Image: ", bookImages);

  const [selectedImage, setSelectedImage] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openImage = (imageUrl: any) => {
    setSelectedImage(imageUrl);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <SectionTitle
        subHeading={"Explore Our Latest Book Image"}
        heading={"Image Gallery"}
      />
      <div className="">
        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookImages?.map((image: { imageUrl: string }, index: number) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => openImage(image.imageUrl)}
            >
              <img
                src={image.imageUrl}
                alt={`Book ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeImage}
          >
            <div className="relative max-w-4xl w-full p-4">
              <img
                src={selectedImage}
                alt="Selected Book"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
