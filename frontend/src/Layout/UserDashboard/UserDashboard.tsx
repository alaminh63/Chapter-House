import MenuIcon from "@mui/icons-material/Menu";
import "./UserDashboard.css";
import { Link, Outlet, useLocation } from "react-router";
import { userDashboards } from "../../utils/Array/userDashboard";
import WestIcon from "@mui/icons-material/West";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logout } from "../../Redux/api/features/auth/authSlice";
import { useTitle } from "../../component/hook/useTitle";

const UserDashboard = () => {
  useTitle("User Dashboard");
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation()?.pathname;

  //   console.log("Location: ", location);
  return (
    <div>
      {/* Dashboard Header */}
      <div className=" text-xl font-bold text-center bg-gradient-to-r from-purple-500 to-indigo-500 py-4 px-4 flex text-white">
        <div className="w-[33%] flex justify-start">
          {/* Menu Icon */}
          <label className="md:hidden" htmlFor="my-drawer-2">
            <MenuIcon className="cursor-pointer lg:hidden" />
          </label>
        </div>
        <p className="w-[33%] hidden md:block">
          This is Boundless Reads Book Shop
        </p>
        <div className="w-[33%] flex justify-center text-[12px] md:text-[16px]">
          <p className="">{user?.email}</p>
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
            {/* Sidebar content here */}
            <div className="flex gap-x-4 items-center mb-6">
              <div className="bg-indigo-500 text-white p-2 rounded-full shadow-lg">
                <Link to={"/"}>
                  <WestIcon />
                </Link>
              </div>
              <h1 className="text-xl font-bold text-white">User Dashboard</h1>
            </div>

            <div className="flex flex-col gap-4">
              {userDashboards.map((data) => (
                <Link
                  key={data?.path}
                  to={data?.path}
                  className={`dashboardLink block px-4 py-2 rounded-md transition ${
                    location === data?.path
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-600 hover:text-white"
                  }`}
                >
                  {data?.text}
                </Link>
              ))}
              <div>
                <button
                  className="btn bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md w-full"
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

export default UserDashboard;
