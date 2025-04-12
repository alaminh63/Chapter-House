import { toast } from "sonner";
import BlankPage from "../../component/BlankPage/BlankPage";
import { useTitle } from "../../component/hook/useTitle";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
import {
  useDeletePaymentMutation,
  useGetMyOrderQuery,
} from "../../Redux/api/features/Payment/paymenManagementApi";
import { useAppSelector } from "../../Redux/hooks";
import { TUser } from "../../utils/Types/GlobalType";
import DeleteIcon from "@mui/icons-material/Delete";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { formatDate } from "../../utils/Fucntion/convertDate";

const MyOrder = () => {
  useTitle("My Order");
  const { user } = useAppSelector((state) => state.auth);
  const [deleteOrder] = useDeletePaymentMutation();
  const { data, isLoading } = useGetMyOrderQuery((user as TUser)?._id);
  const orders = data?.data;

  const handleDelete = async (_id: string) => {
    toast.loading("Deleting Order", { id: sonarId });
    try {
      const res = await deleteOrder(_id).unwrap();
      if (res?.status) {
        toast.success("Deleted Successfully", { id: sonarId });
      }
    } catch (error) {
      toast.error("Failed to delete order", { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  if (orders?.length === 0) {
    return <BlankPage data="You haven't made any orders yet" />;
  }

  return (
    <div className="min-h-screen   text-gray-100  ">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">My Orders</h1>
        <div className="overflow-x-auto bg-gray-700 rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            {/* Table Head */}
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-3 px-4 font-medium">#</th>
                <th className="py-3 px-4 font-medium">Image</th>
                <th className="py-3 px-4 font-medium">Book Title</th>
                <th className="py-3 px-4 font-medium">Author</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Quantity</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Transaction ID</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {orders?.map((data: any, idx: number) => (
                <tr
                  key={idx}
                  className="border-b border-gray-600 hover:bg-gray-600 transition-colors duration-200"
                >
                  <td className="py-3 px-4 text-gray-300">{idx + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={data?.productId?.imageUrl}
                      className="w-12 h-16 rounded-md object-cover"
                      alt={data?.productId?.title || "Book image"}
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-100">{data?.productId?.title}</td>
                  <td className="py-3 px-4 text-gray-300">{data?.productId?.author}</td>
                  <td className="py-3 px-4 text-gray-300">{data?.productId?.category}</td>
                  <td className="py-3 px-4 text-gray-300">{data?.quantity}</td>
                  <td className="py-3 px-4 text-gray-300">${data?.price?.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-300">{data?.transactionId}</td>
                  <td className="py-3 px-4 text-gray-300">{formatDate(data?.createdAt)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        data?.adminApproval === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {data?.adminApproval}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-700"
                      onClick={() => handleDelete(data?._id)}
                      aria-label={`Delete order ${data?.transactionId}`}
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

export default MyOrder;