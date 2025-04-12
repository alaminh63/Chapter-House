import { Link, Outlet, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import WestIcon from "@mui/icons-material/West";
import { logout } from "../../Redux/api/features/auth/authSlice";
import { adminDashboards } from "../../utils/Array/adminDashboard";
import { useTitle } from "../../component/hook/useTitle";

const AdminDashboard = () => {
  useTitle("Admin Dashboard");
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation()?.pathname;
  return (
    <div>
      {/* Dashboard Header */}
      <div className="text-xl font-bold text-center bg-gradient-to-br from-gray-800 via-gray-900 to-black py-4 px-4 flex text-white">
        <div className="w-[33%] flex justify-start">
          {/* Menu Icon */}
          <label className="md:hidden" htmlFor="my-drawer-2">
            <MenuIcon className="cursor-pointer lg:hidden text-white" />
          </label>
        </div>
        <p className="w-[33%] text-white hidden md:block">
          This is Boundless Reads Book Shop
        </p>
        <div className="w-[33%] flex justify-center text-[12px] md:text-[16px] ">
          <p>{user?.email}</p>
          <span>({user?.role})</span>
        </div>
      </div>

      {/* Start Drawer */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="mx-4 md:mx-10 my-6 md:my-10">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-gradient-to-b from-gray-800 to-gray-900 text-gray-200 min-h-full w-80 p-4">
            {/* Sidebar content */}
            <div className="flex gap-x-4 items-center mb-6">
              <div className="bg-white text-black p-1 rounded-full">
                <Link to={"/"}>
                  <WestIcon />
                </Link>
              </div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>

            <div className="flex flex-col gap-4 my-4">
              {adminDashboards.map((data) => (
                <Link
                  key={data?.path}
                  to={data?.path}
                  className={`dashboardLink text-lg font-medium py-2 px-4 rounded-lg ${
                    location === data?.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  {data?.text}
                </Link>
              ))}

              <div>
                <button
                  className="btn btn-error text-white relative left-4 py-2 px-4 rounded-md mt-4"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
