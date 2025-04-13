import { Link, Outlet, useLocation } from "react-router"; // Fixed import
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { logout } from "../../Redux/api/features/auth/authSlice";
import { adminDashboards } from "../../utils/Array/adminDashboard";
import { useTitle } from "../../component/hook/useTitle";

const AdminDashboard = () => {
  useTitle("Admin Dashboard");
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation()?.pathname;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Dashboard Header */}
      <div className="bg-gray-800 shadow-md py-3 px-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-4">
          {/* Menu Icon for Mobile */}
          <label className="md:hidden" htmlFor="my-drawer-2">
            <MenuIcon className="cursor-pointer text-gray-300 hover:text-white transition-colors" fontSize="small" />
          </label>
          {/* Home Link and Title */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="bg-gray-700 p-1.5 rounded-full text-gray-300 hover:text-white transition-colors"
              aria-label="Go to homepage"
            >
              <HomeIcon fontSize="small" />
            </Link>
            <h1 className="text-lg font-semibold">ChapterHouse</h1>
          </div>
        </div>
        <div className="hidden md:flex text-sm text-gray-300">
          Boundless Reads Book Shop
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span>{user?.email}</span>
          <span>({user?.role})</span>
        </div>
      </div>

      {/* Drawer */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content */}
          <div className="mx-4 md:mx-8 my-6 md:my-8">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="Close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-gray-800 min-h-full w-64 p-4 text-gray-200">
            {/* Sidebar content */}
            <div className="md:hidden flex items-center space-x-2 mb-4">
              <Link
                to="/"
                className="bg-gray-700 p-1.5 rounded-full text-gray-300 hover:text-white transition-colors"
                aria-label="Go to homepage"
              >
                <HomeIcon fontSize="small" />
              </Link>
              <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
            </div>

            <div className="flex flex-col gap-2">
              {adminDashboards.map((data) => (
                <Link
                  key={data?.path}
                  to={data?.path}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                    location === data?.path
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {data?.text}
                </Link>
              ))}
              <button
                className="mt-4 py-2 px-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => dispatch(logout())}
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;