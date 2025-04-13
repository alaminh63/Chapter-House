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

interface FormValues {
  title: string;
  author: string;
  brand: string;
  model: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  image: File | null;
}

const AddBook = () => {
  useTitle("Add Book");
  const [addBook] = useAddBookMutation();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAppSelector((state) => state.auth);

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    author: "",
    brand: "",
    model: "",
    price: 0,
    description: "",
    quantity: 0,
    category: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };


  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormValues(prev => ({ ...prev, category: e.target.value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormValues(prev => ({ ...prev, image: file }));
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    } else {
      setFormValues(prev => ({ ...prev, image: null }));
      setPreviewImage(null);
    }
  };

  const uploadImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, author, brand, model, price, description, quantity, category, image } = formValues;


    if (!category) {
      toast.error("Category field is empty", { id: sonarId });
      return;
    }

    if (!image) {
      toast.error("Please select an image", { id: sonarId });
      return;
    }


    let inStock = quantity > 0;


    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "suvrodeb");
    formData.append("cloud_name", "dixfkupof");


    try {
      toast.loading("Inserting Book", { id: sonarId });

      const imageResponse = await axios.post(imageHostingUrl, formData);

      if (imageResponse?.data?.url) {
        const imageUrl = imageResponse?.data?.url;

        const bookData = {
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


        const res = await addBook(bookData).unwrap();

        if (res?.success) {
          toast.success(res?.message, { id: sonarId });
          // Optionally reset the form after successful submission
          setFormValues({
            title: "",
            author: "",
            brand: "",
            model: "",
            price: 0,
            description: "",
            quantity: 0,
            category: "",
            image: null,
          });
          setPreviewImage(null);
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
                  className="w-24 h-24 object-cover rounded-lg shadow-lg cursor-pointer"
                  onClick={uploadImage}
                />
                <CreateIcon
                  className="absolute top-0 -right-8 text-white cursor-pointer"
                  onClick={uploadImage}
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={bookImage}
                  alt="Default"
                  className="w-24 h-24 object-cover rounded-lg shadow-lg cursor-pointer"
                  onClick={uploadImage}
                />
                <CreateIcon
                  className="absolute top-0 -right-8 text-white cursor-pointer"
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
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formValues.author}
                  onChange={handleInputChange}
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
                  value={formValues.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formValues.model}
                  onChange={handleInputChange}
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
                  value={formValues.price}
                  onChange={handleInputChange}
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
                  value={formValues.category}
                  onChange={handleCategoryChange}
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
                value={formValues.description}
                onChange={handleInputChange}
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
                value={formValues.quantity}
                onChange={handleInputChange}
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