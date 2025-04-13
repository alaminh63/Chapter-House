import { useTitle } from "../../../component/hook/useTitle";
import { useGetAdminOrderQuery } from "../../../Redux/api/features/Payment/paymenManagementApi";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";
import BlankPage from "../../../component/BlankPage/BlankPage";
import OrderManagementTable from "./OrderManagementTable";

const OrderManagement = () => {
  useTitle("Order Management");
  const { data, isLoading } = useGetAdminOrderQuery(undefined);
  const orders = data?.data;

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!orders?.length) {
    return <BlankPage data="There are no orders" />;
  }

  return (
    <div className="  text-white ">
      <div className="container mx-auto px-4  l">
        <h1 className="text-2xl font-semibold text-white mb-6">
          Order Management
        </h1>
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
          <table className="w-full text-xs">
            {/* Head */}
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-3 text-left">#</th>
                <th className="py-2 px-3 text-left">Image</th>
                <th className="py-2 px-3 text-left">Book Name</th>
                <th className="py-2 px-3 text-left">Author</th>
                <th className="py-2 px-3 text-left">Category</th>
                <th className="py-2 px-3 text-left">Quantity</th>
                <th className="py-2 px-3 text-left">Price</th>
                <th className="py-2 px-3 text-left">Transaction ID</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">User Name</th>
                <th className="py-2 px-3 text-left">User Email</th>
                <th className="py-2 px-3 text-left">Approval</th>
                <th className="py-2 px-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((data: any, idx: number) => (
                <OrderManagementTable key={data._id || idx} data={data} idx={idx + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;