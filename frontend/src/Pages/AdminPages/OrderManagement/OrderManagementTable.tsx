import { ChangeEvent, useState } from "react";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import {
  useDeletepaymentByAdminMutation,
  useSuccessPaymentMutation,
} from "../../../Redux/api/features/Payment/paymenManagementApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { formatDate } from "../../../utils/Fucntion/convertDate";

interface IProps {
  data: {
    _id: string;
    productId: {
      _id: string;
      imageUrl: string;
      title: string;
      author: string;
      category: string;
    };
    quantity: number;
    price: number;
    transactionId: string;
    createdAt: string;
    userId: {
      name: string;
      email: string;
    };
    adminApproval: string;
  };
  idx: number;
}

const OrderManagementTable = ({ data, idx }: IProps) => {
  const [deleteOrder] = useDeletepaymentByAdminMutation();
  const [makeUpdateOrder] = useSuccessPaymentMutation();
  const [adminApproval, setAdminApproval] = useState(data?.adminApproval);

  const handleAdminApproval = async (event: ChangeEvent<HTMLSelectElement>) => {
    const updateData = event.target.value;
    setAdminApproval(updateData);
    toast.loading("Updating Order", { id: sonarId });
    const confirmOrder = {
      adminApproval: updateData,
      bookId: data?.productId?._id,
      quantity: data?.quantity,
    };
    try {
      const res = await makeUpdateOrder({ id: data?._id, confirmOrder }).unwrap();
      if (res?.status) {
        toast.success("Order updated successfully", { id: sonarId });
      }
    } catch (error) {
      toast.error("Failed to update order", { id: sonarId });
    }
  };

  const handleDelete = async (_id: string) => {
    toast.loading("Deleting Order", { id: sonarId });
    try {
      const res = await deleteOrder(_id).unwrap();
      if (res?.status) {
        toast.success("Order deleted successfully", { id: sonarId });
      }
    } catch (error) {
      toast.error("Failed to delete order", { id: sonarId });
    }
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
      <td className="py-2 px-3">{idx}</td>
      <td className="py-2 px-3">
        <img
          src={data?.productId?.imageUrl}
          className="w-12 h-8 object-cover rounded"
          alt={data?.productId?.title}
        />
      </td>
      <td className="py-2 px-3">{data?.productId?.title}</td>
      <td className="py-2 px-3">{data?.productId?.author}</td>
      <td className="py-2 px-3">{data?.productId?.category}</td>
      <td className="py-2 px-3">{data?.quantity}</td>
      <td className="py-2 px-3">${data?.price.toFixed(2)}</td>
      <td className="py-2 px-3">{data?.transactionId}</td>
      <td className="py-2 px-3">{formatDate(data?.createdAt)}</td>
      <td className="py-2 px-3">{data?.userId?.name}</td>
      <td className="py-2 px-3">{data?.userId?.email}</td>
      <td className="py-2 px-3">
        <select
          value={adminApproval}
          onChange={handleAdminApproval}
          className="bg-gray-700 border border-gray-600 text-white text-xs py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="confirm">Confirm</option>
          <option value="pending">Pending</option>
        </select>
      </td>
      <td className="py-2 px-3">
        <button
          className="bg-red-600 text-white text-xs font-medium py-1 px-2 rounded hover:bg-red-700 transition-colors"
          onClick={() => handleDelete(data?._id)}
          aria-label={`Delete order ${data?.transactionId}`}
        >
          <DeleteIcon fontSize="small" />
        </button>
      </td>
    </tr>
  );
};

export default OrderManagementTable;