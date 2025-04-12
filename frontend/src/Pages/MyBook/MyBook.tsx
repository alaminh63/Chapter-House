import LoadingPage from "../../component/LoadingPage/LoadingPage";
import {
  useDeleteBookMutation,
  useGetAllBookByAdminQuery,
} from "../../Redux/api/features/Book/bookManagementApi";
// import { useAppSelector } from "../../Redux/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import UpdateBook from "../UpdateBook/UpdateBook";
import { TBook } from "../../utils/Types/GlobalType";
import { useTitle } from "../../component/hook/useTitle";
import BlankPage from "../../component/BlankPage/BlankPage";
const MyBook = () => {
  useTitle("My Book");
  const [deleteBook] = useDeleteBookMutation();
  // const { user } = useAppSelector((state) => state.auth);
  // console.log("User From My Book: ", user);
  const { data, isLoading } = useGetAllBookByAdminQuery(undefined);
  const books = data?.data;
  // console.log("Books: ", books);

  const handelDeleteBook = async (id: string) => {
    toast.loading("Deleting Book", { id: sonarId });
    const res = await deleteBook(id).unwrap();
    console.log("Res: ", res);
    if (res?.status) {
      toast.success("Book deleted successfully", { id: sonarId });
    }
  };
  if (isLoading) {
    return <LoadingPage />;
  }
  if (books?.length === 0) {
    return <BlankPage data=" You didn't Add any book " />;
  }
  return (
    <div>
      <h1 className="text-xl font-bold">My Uploaded Book List</h1>
      <div>
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
          <table className="w-full text-sm">
            {/* head */}
            <thead className=" ">
              <tr className="bg-teal-500">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Brand</th>
                <th className="py-3 px-4 text-left">Author</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Model</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Available</th>
                <th className="py-3 px-4 text-left">Update</th>
                <th className="py-3 px-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody className="">
              {books?.map((data: TBook, idx: number) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-300  "
                >
                  <td className="py-3 px-4">
                    {" "}
                    <img
                      src={data?.imageUrl}
                      alt=""
                      className="w-[65px] h-[40px]"
                    />{" "}
                  </td>
                  <td className="py-3 px-4">{data?.title}</td>
                  <td className="py-3 px-4">{data?.brand}</td>
                  <td className="py-3 px-4">{data?.author}</td>
                  <td className="py-3 px-4">{data?.category}</td>
                  <td className="py-3 px-4">{data?.model}</td>
                  <td className="py-3 px-4">{data?.price}</td>
                  <td className="py-3 px-4">{data?.quantity}</td>
                  <td className="py-3 px-4">{data?.inStock ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn btn-sm btn-success text-white">
                      <UpdateBook bookInfo={data} />
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-error text-white"
                      onClick={() => handelDeleteBook(data?._id)}
                    >
                      <DeleteIcon />
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
