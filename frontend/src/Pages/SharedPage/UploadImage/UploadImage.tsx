import axios from "axios";
import { useRef } from "react";

const UploadImage = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const handleImage = async () => {
    if (imageRef.current && imageRef.current.files) {
      const file = imageRef.current.files[0];

      if (!file) {
        console.error("No file selected");
        return;
      }

      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "suvrodeb");
      imageData.append("cloud_name", "dixfkupof");
      console.log("Selected File:", file);

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dixfkupof/image/upload",
          imageData
        );

        console.log("Uploaded image URL:", res?.data?.url);
      } catch (error) {
        console.error("Upload failed:", error);
      }

      // Optional: Convert to Base64 (if needed)
      //   const reader = new FileReader();
      //   reader.onload = () => {
      //     console.log("Base64 Image Data:", reader.result);
      //   };
      //   reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Upload Image
        </h2>

        <label className="w-full flex flex-col items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition">
          <span className="text-sm">Choose an image</span>
          <input
            type="file"
            ref={imageRef}
            accept="image/*"
            className="hidden"
          />
        </label>

        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition"
          onClick={handleImage}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
