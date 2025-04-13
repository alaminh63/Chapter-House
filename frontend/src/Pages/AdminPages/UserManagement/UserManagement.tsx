import { useTitle } from "../../../component/hook/useTitle";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";
import { useGetAllUserQuery } from "../../../Redux/api/features/User/userManagementApi";
import { TUser } from "../../../utils/Types/GlobalType";
import UserManagementRow from "./UserManagementRow";

const UserManagement = () => {
  useTitle("User Management");
  const { data, isLoading } = useGetAllUserQuery(undefined);
  const users = data?.data;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="  text-white  ">
      <div className="container mx-auto px-4  l">
        <h1 className="text-2xl font-semibold text-white mb-6">All Users</h1>
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
          <table className="w-full text-xs">
            {/* Head */}
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-3 text-left">#</th>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">Role</th>
                <th className="py-2 px-3 text-left">Blocked</th>
                <th className="py-2 px-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((data: TUser, idx: number) => (
                <UserManagementRow key={data._id} user={data} idx={idx + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;