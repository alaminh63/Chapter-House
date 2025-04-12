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
  // console.log("User: ", user);
  const [deleteOrder] = useDeletePaymentMutation();
  const { data, isLoading } = useGetMyOrderQuery((user as TUser)?._id);
  const orders = data?.data;
  console.log("Orders: ", orders);

  const handleDelete = async (_id: string) => {
    console.log("Payment id: ", _id);
    toast.loading("Deleting Order", { id: sonarId });
    const res = await deleteOrder(_id).unwrap();
    if (res?.status) {
      console.log("Res: ", res);
      toast.success("Deleted Successfully", { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  if (orders?.length == 0) {
    return <BlankPage data=" You didn't make any Order " />;
  }

  return (
    <div>
      <h1 className="text-white text-xl font-bold my-4">My Order</h1>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
        <table className="w-full text-sm">
          {/* head */}
          <thead className="">
            <tr className="bg-teal-500">
              <th className="py-3 px-4 text-left"></th>
              <th className="py-3 px-4 text-left">Book Image</th>
              <th className="py-3 px-4 text-left">Book Name</th>
              <th className="py-3 px-4 text-left">Book Author</th>
              <th className="py-3 px-4 text-left">Book Category</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Transaction id</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Admin Approval</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {orders?.map((data: any, idx: number) => (
              <tr
                key={idx}
                className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-300 "
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">
                  {" "}
                  <img
                    src={data?.productId?.imageUrl}
                    className="w-[65px] h-[80px] rounded-md"
                    alt=""
                  />
                </td>
                <td className="py-3 px-4">{data?.productId?.title}</td>
                <td className="py-3 px-4">{data?.productId?.author}</td>
                <td className="py-3 px-4">{data?.productId?.category}</td>
                <td className="py-3 px-4">{data?.quantity}</td>
                <td className="py-3 px-4">{data?.price}</td>
                <td className="py-3 px-4">{data?.transactionId}</td>
                <td className="py-3 px-4">{formatDate(data?.createdAt)}</td>
                <td className="py-3 px-4">
                  {data?.adminApproval === "pending" ? (
                    <p className="badge badge-secondary text-white">
                      {data?.adminApproval}
                    </p>
                  ) : (
                    <p className="badge badge-primary text-white">
                      {data?.adminApproval}
                    </p>
                  )}
                </td>
                <td className="py-3 px-4">
                  {" "}
                  <button
                    className="btn btn-error text-white"
                    onClick={() => handleDelete(data?._id)}
                  >
                    <DeleteIcon />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
