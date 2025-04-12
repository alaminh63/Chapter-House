import { useTitle } from "../../../component/hook/useTitle";
import { useGetAdminOrderQuery } from "../../../Redux/api/features/Payment/paymenManagementApi";

import LoadingPage from "../../../component/LoadingPage/LoadingPage";
import BlankPage from "../../../component/BlankPage/BlankPage";

import OrderManagementTable from "./OrderManagementTable";

const OrderManagement = () => {
  useTitle("Order Management");

  const { data, isLoading } = useGetAdminOrderQuery(undefined);
  const orders = data?.data;
  // console.log("Orders: ", orders);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (orders?.length == 0) {
    return <BlankPage data=" There are no order" />;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Order Management by Admin</h1>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
        <table className="w-full text-sm">
          {/* head */}
          <thead>
            <tr className="bg-teal-500">
              <th className="py-3 px-4 text-left">X</th>
              <th className="py-3 px-4 text-left">Book Image</th>
              <th className="py-3 px-4 text-left">Book Name</th>
              <th className="py-3 px-4 text-left">Book Author</th>
              <th className="py-3 px-4 text-left">Book Category</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Transaction id</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left">User Email</th>
              <th className="py-3 px-4 text-left">Admin Approval</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {orders?.map((data: any, idx: number) => (
              <OrderManagementTable key={idx} data={data} idx={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
