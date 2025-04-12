import { ChangeEvent, FormEvent, useRef, useState } from "react";
import "./AddBook.css";
import { bookCategories } from "../../utils/Array/BookCategory";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useAppSelector } from "../../Redux/hooks";
import { useAddBookMutation } from "../../Redux/api/features/Book/bookManagementApi";
import axios from "axios";
import bookImage from "../../assets/Images/Camera_2.jpg";
import CreateIcon from "@mui/icons-material/Create";
import { useTitle } from "../../component/hook/useTitle";

const imageHostingUrl =
  "https://api.cloudinary.com/v1_1/dixfkupof/image/upload";

const AddBook = () => {
  useTitle("Add Book");
  const [addBook] = useAddBookMutation();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  //   console.log("User in Add Book: ", user);
  const [category, setCategory] = useState("");
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const data = e.target.value;
    setCategory(data);
    // console.log("Data: ", data);
  };

  //in Stock
  let inStock;

  ///Handle Image

  const uploadImage = () => {
    console.log("Upload Image");
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("File selected: ", file); // Debugging
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    } else {
      setPreviewImage(null);
    }
  };
  // console.log("Image Preview: ", previewImage);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const Form = event.target as HTMLFormElement;
    const title = Form.titlee.value;
    const author = Form.author.value;
    const brand = Form.brand.value;
    const model = Form.model.value;
    const price = parseFloat(Form.price.value);
    const description = Form.description.value;
    const quantity = parseInt(Form.quantity.value);
    const fileInput = Form.image.files[0];
    if (quantity > 0) {
      inStock = true;
    } else {
      inStock = false;
    }
    if (!category) {
      toast.error("Category field is empty", { id: sonarId });
    }

    if (!fileInput) {
      toast.error("Please select an image", { id: sonarId });
      return;
    }
    // console.log("File input: ", fileInput);

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("file", fileInput);
    formData.append("upload_preset", "suvrodeb");
    formData.append("cloud_name", "dixfkupof");
    console.log("Selected File:", fileInput);

    try {
      toast.loading("Inserting Book", { id: sonarId });
      // Upload the image using Axios
      // const response = await axios.post(imageHostingUrl, formData);

      // console.log("Image Upload response: ", response);
      const imageResponse = await axios.post(imageHostingUrl, formData);

      // console.log("Uploaded image URL:", res?.data?.url);

      if (imageResponse?.data?.url) {
        const imageUrl = imageResponse?.data?.url; // Get the image URL
        console.log("Image uploaded successfully:", imageUrl);
        // toast.success("Image Upload successfully", { id: sonarId });

        ///Send Data in Back end
        const formData = {
          title,
          author,
          brand,
          model,
          price,
          imageUrl,
          category,
          description,
          quantity,
          inStock,
          refUser: user?._id,
        };
        // console.log("Form Data: ", formData);
        toast.loading("Inserting Book", { id: sonarId });
        const res = await addBook(formData).unwrap();
        console.log("Res: ", res);
        if (res?.success) {
          toast.success(res?.message, { id: sonarId });
        }
      } else {
        console.error("Image upload failed:", imageResponse);
        toast.error("Something error in uploading Image", { id: sonarId });
        toast.error("Imagebb server issue to upload image", { id: sonarId });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Imagebb server issue to upload image", { id: sonarId });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-6 text-teal-400 text-center">
          Add a New Book
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex justify-center">
            {previewImage ? (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg shadow-lg cursor-pointer"
                  onClick={uploadImage}
                />
                <CreateIcon
                  className="absolute top-2 right-2 text-white cursor-pointer"
                  onClick={uploadImage}
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={bookImage}
                  alt="Default"
                  className="w-48 h-48 object-cover rounded-lg shadow-lg cursor-pointer"
                  onClick={uploadImage}
                />
                <CreateIcon
                  className="absolute top-2 right-2 text-white cursor-pointer"
                  onClick={uploadImage}
                />
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="titlee"
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Author</label>
                <input
                  type="text"
                  name="author"
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Brand</label>
                <input
                  type="text"
                  name="brand"
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Model</label>
                <input
                  type="text"
                  name="model"
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 removeDefaultIcon"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Category
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={handleCategory}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {bookCategories.map((data, idx) => (
                    <option key={idx} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 removeDefaultIcon"
              />
            </div>
            <input
              ref={imageRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            <button
              type="submit"
              className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
