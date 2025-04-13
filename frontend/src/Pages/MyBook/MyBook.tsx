import LoadingPage from "../../component/LoadingPage/LoadingPage";
import {
  useDeleteBookMutation,
  useGetAllBookByAdminQuery,
} from "../../Redux/api/features/Book/bookManagementApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import UpdateBook from "../UpdateBook/UpdateBook";
import { TBook } from "../../utils/Types/GlobalType";
import { useTitle } from "../../component/hook/useTitle";
import BlankPage from "../../component/BlankPage/BlankPage";

const MyBook = () => {
  useTitle("My Books");
  const [deleteBook] = useDeleteBookMutation();
  const { data, isLoading } = useGetAllBookByAdminQuery(undefined);
  const books = data?.data;

  const handleDeleteBook = async (id: string) => {
    toast.loading("Deleting Book", { id: sonarId });
    try {
      const res = await deleteBook(id).unwrap();
      if (res?.status) {
        toast.success("Book deleted successfully", { id: sonarId });
      }
    } catch (error) {
      toast.error("Failed to delete book", { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (books?.length === 0) {
    return <BlankPage data="You haven't added any books" />;
  }

  return (
    <div className="bg-gray-900 text-white  ">
      <div className="container mx-auto px-4  ">
        <h1 className="text-2xl font-semibold text-white mb-6">
          My Uploaded Books
        </h1>
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
          <table className="w-full text-xs">
            {/* Head */}
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-3 text-left">Image</th>
                <th className="py-2 px-3 text-left">Title</th>
                <th className="py-2 px-3 text-left">Brand</th>
                <th className="py-2 px-3 text-left">Author</th>
                <th className="py-2 px-3 text-left">Category</th>
                <th className="py-2 px-3 text-left">Model</th>
                <th className="py-2 px-3 text-left">Price</th>
                <th className="py-2 px-3 text-left">Quantity</th>
                <th className="py-2 px-3 text-left">Available</th>
                <th className="py-2 px-3 text-left">Update</th>
                <th className="py-2 px-3 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((data: TBook, idx: number) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <td className="py-2 px-3">
                    <img
                      src={data?.imageUrl}
                      alt={data?.title}
                      className="w-12 h-8 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-3">{data?.title}</td>
                  <td className="py-2 px-3">{data?.brand}</td>
                  <td className="py-2 px-3">{data?.author}</td>
                  <td className="py-2 px-3">{data?.category}</td>
                  <td className="py-2 px-3">{data?.model}</td>
                  <td className="py-2 px-3">${data?.price.toFixed(2)}</td>
                  <td className="py-2 px-3">{data?.quantity}</td>
                  <td className="py-2 px-3">{data?.inStock ? "Yes" : "No"}</td>
                  <td className="py-2 px-3">
                    <button className="bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded hover:bg-blue-700 transition-colors">
                      <UpdateBook bookInfo={data} />
                    </button>
                  </td>
                  <td className="py-2 px-3">
                    <button
                      className="bg-red-600 text-white text-xs font-medium py-1 px-2 rounded hover:bg-red-700 transition-colors"
                      onClick={() => handleDeleteBook(data?._id)}
                      aria-label={`Delete ${data?.title}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBook;