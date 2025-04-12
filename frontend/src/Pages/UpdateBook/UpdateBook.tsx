import { Modal } from "antd";
import "./UpdateBook.css";
import UpdateIcon from "@mui/icons-material/Update";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { toast } from "sonner";
import { useUpdateBookMutation } from "../../Redux/api/features/Book/bookManagementApi";
import axios from "axios";
import { bookCategories } from "../../utils/Array/BookCategory";
import bookImage from "../../assets/Images/bookk.jpg";
import { TBook } from "../../utils/Types/GlobalType";

const imageHostingUrl =
  "https://api.cloudinary.com/v1_1/dixfkupof/image/upload";
import CreateIcon from "@mui/icons-material/Create";

interface Iprops {
  bookInfo: TBook;
}

const UpdateBook = ({ bookInfo }: Iprops) => {
  //   console.log("Book Info: ", bookInfo);

  const {
    imageUrl,
    title,
    author,
    brand,
    model,
    price,
    category: bCategory,
    description,
    quantity,
    inStock: bInStock,
  } = bookInfo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  //   Modal Default Class start
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   Modal Default Class end

  const [updateBook] = useUpdateBookMutation();
  const imageRef = useRef<HTMLInputElement | null>(null);
  //   console.log("User in Add Book: ", user);
  const [category, setCategory] = useState(bCategory);
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const data = e.target.value;
    setCategory(data);
    // console.log("Data: ", data);
  };

  //in Stock
  let inStock: boolean = bInStock;
  const uploadImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const [previewImage, setPreviewImage] = useState<string | null>(imageUrl);
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("File selected: ", file); // Debugging
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      console.log("In Here Image url------: ", imageUrl);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "suvrodeb");
      formData.append("cloud_name", "dixfkupof");
      try {
        toast.loading("Uploading Image", { id: sonarId });
        const response = await axios.post(imageHostingUrl, formData);

        if (response.data.url) {
          const imageUrl = response.data.url;
          console.log("New Image Linkkkkkkk: ", imageUrl);
          toast.success("Image Uploaded", { id: sonarId });
          const updateData = { imageUrl: imageUrl };
          const res = await updateBook({
            id: bookInfo?._id,
            updateData,
          }).unwrap();
          console.log("Update Res: ", res);
          if (res?.status) {
            toast.success("Update Image Successfully");
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Imagebb server issue to upload image", { id: sonarId });
      }
    } else {
      setPreviewImage(null);
    }
  };
  //   console.log("Preview Image: ", previewImage);

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

    if (quantity > 0) {
      inStock = true;
    } else {
      inStock = false;
    }

    if (!category) {
      toast.error("Category field is empty", { id: sonarId });
    }

    ///Send Data in Back end
    const updateData = {
      title,
      author,
      brand,
      model,
      price,
      category,
      description,
      quantity,
      inStock,
    };
    console.log("Form Update Data: ", updateData);
    toast.loading("Updating Book", { id: sonarId });
    const res = await updateBook({ id: bookInfo?._id, updateData }).unwrap();
    console.log("Res: ", res);
    if (res?.status) {
      toast.success(res?.message, { id: sonarId });
    }
  };

  return (
    <div className="">
      <div onClick={showModal}>
        <UpdateIcon />
      </div>
      <Modal
        title="Update Book"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="form-container ">
          <h2 className="form-title">Update Book</h2>
          {/* Show the selected image */}
          <div className="image-preview mb-4 flex justify-center">
            {previewImage ? (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg shadow"
                  onClick={() => uploadImage()}
                />
                <p className=" text-black absolute top-4 right-2">
                  {" "}
                  <CreateIcon onClick={() => uploadImage()} />{" "}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={bookImage}
                  alt=""
                  className="w-48 h-48 object-cover rounded-lg shadow"
                  onClick={() => uploadImage()}
                />
                <p className="text-gray-500 text-center">
                  No image selected. Press on Image to Select Image
                </p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4">
              {/* Title Author */}
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="titlee"
                  defaultValue={title}
                  className="bg-white text-black"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  name="author"
                  defaultValue={author}
                  className="bg-white text-black"
                  required
                />
              </div>
            </div>
            {/* Brand Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4">
              <div className="form-group">
                <label htmlFor="title">Brand:</label>
                <input
                  type="text"
                  name="brand"
                  defaultValue={brand}
                  className="bg-white text-black"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Model:</label>
                <input
                  type="text"
                  name="model"
                  defaultValue={model}
                  className="bg-white text-black"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4">
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={price}
                  required
                  className="removeDefaultIcon bg-white text-black"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  name="category"
                  value={category}
                  onChange={handleCategory}
                  className="bg-white text-black"
                  required
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

            <div className="form-group hidden">
              <label htmlFor="quantity">Image:</label>
              <input
                ref={imageRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                rows={4}
                defaultValue={description}
                className="bg-white text-black "
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                name="quantity"
                defaultValue={quantity}
                className="removeDefaultIcon bg-white text-black"
                required
              />
            </div>

            <button type="submit" className="form-submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateBook;
