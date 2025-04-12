import { useTitle } from "../../../component/hook/useTitle";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";
import { useGetAllUserQuery } from "../../../Redux/api/features/User/userManagementApi";
import { TUser } from "../../../utils/Types/GlobalType";
import UserManagementRow from "./UserManagementRow";

const UserManagement = () => {
  useTitle("User Management");
  const { data, isLoading } = useGetAllUserQuery(undefined);
  const user = data?.data;
  //   console.log("User: ", user);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Show All User</h1>

      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
        <table className="w-full text-sm">
          {/* head */}
          <thead>
            <tr className="bg-teal-500">
              <th className="py-3 px-4 text-left"></th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">isBlocked</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((data: TUser, idx: number) => (
              <UserManagementRow key={idx} user={data} idx={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
