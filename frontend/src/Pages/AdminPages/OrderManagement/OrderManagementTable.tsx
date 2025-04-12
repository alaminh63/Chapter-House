import { ChangeEvent, useState } from "react";
import { sonarId } from "../../../utils/Fucntion/sonarId";
// import { useAppSelector } from "../../../Redux/hooks";
import {
  useDeletepaymentByAdminMutation,
  useSuccessPaymentMutation,
} from "../../../Redux/api/features/Payment/paymenManagementApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { formatDate } from "../../../utils/Fucntion/convertDate";

interface Iprops {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  idx: number;
}
const OrderManagementTable = ({ data, idx }: Iprops) => {
  //   const { user } = useAppSelector((state) => state.auth);
  // console.log("User: ", user);
  //   console.log("Data: ", data);
  //   const [deleteOrder] = useDeletePaymentMutation();
  const [deleteOrder] = useDeletepaymentByAdminMutation();
  const [makeUpdateOrder] = useSuccessPaymentMutation();

  const [adminApproval, setAdminApproval] = useState(data?.adminApproval);
  const handleAdminApproval = async (event: ChangeEvent<HTMLSelectElement>) => {
    const updateData = event.target.value;
    setAdminApproval(updateData);
    toast.loading("Updating Order", { id: sonarId });
    const corfirmOrder = {
      adminApproval: updateData,
      bookId: data?.productId?._id,
      quantity: data?.quantity,
    };
    console.log("Confirm order: ", corfirmOrder);
    const res = await makeUpdateOrder({ id: data?._id, corfirmOrder }).unwrap();
    if (res?.status) {
      toast.success("Order Updated", { id: sonarId });
    }
  };

  const handleDelete = async (_id: string) => {
    console.log("Payment id: ", _id);
    toast.loading("Deleting Order", { id: sonarId });
    const res = await deleteOrder(_id).unwrap();
    if (res?.status) {
      console.log("Res: ", res);
      toast.success("Deleted Successfully", { id: sonarId });
    }
  };

  return (
    <tr
      key={idx}
      className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-300 "
    >
      <td className="py-3 px-4">{idx + 1}</td>
      <td className="py-3 px-4">
        {" "}
        <img
          src={data?.productId?.imageUrl}
          className="w-[75px] h-[60px] rounded-md"
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
      <td className="py-3 px-4">{data?.userId?.name}</td>
      <td className="py-3 px-4">{data?.userId?.email}</td>
      <td className="py-3 px-4">
        <select
          name=""
          id=""
          value={adminApproval}
          onChange={handleAdminApproval}
          className=" bg-teal-500 text-white p-2 rounded-md"
        >
          <option value="confirm"> confirm </option>
          <option value="pending"> pending </option>
        </select>
      </td>
      <td>
        {" "}
        <button
          className="btn btn-error text-white"
          onClick={() => handleDelete(data?._id)}
        >
          <DeleteIcon />
        </button>{" "}
      </td>
    </tr>
  );
};

export default OrderManagementTable;
