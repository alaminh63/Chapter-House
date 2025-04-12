import MenuIcon from "@mui/icons-material/Menu";
import WestIcon from "@mui/icons-material/West";
import { Link, Outlet, useLocation } from "react-router";
import { userDashboards } from "../../utils/Array/userDashboard";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logout } from "../../Redux/api/features/auth/authSlice";
import { useTitle } from "../../component/hook/useTitle";
import { House } from 'lucide-react';
const UserDashboard = () => {
  useTitle("User Dashboard");
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation()?.pathname;

  return (
    <div className="min-h-screen  text-gray-100">
      {/* Dashboard Header */}
      <header className="bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Menu Icon for Mobile */}
            <label htmlFor="my-drawer-2" className="lg:hidden cursor-pointer">
              <MenuIcon className="text-gray-300 hover:text-indigo-400 transition-colors" />
            </label>
            <h2 className="text-xl font-semibold tracking-tight text-indigo-400 hidden md:block">
              <div className=" w-[25%]  flex items-center gap-x-4">
                <Link to={"/"}>
                  {" "}

                  <p className="font-bold text-xl flex gap-2 items-center">ChapterHouse <House /> </p>
                </Link>
              </div>
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-300">{user?.email}</span>
            <span className="text-gray-500">({user?.role})</span>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page Content */}
          <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-2"
            aria-label="Close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-gray-900 text-gray-200 min-h-full w-64 p-6 shadow-lg">
            {/* Sidebar Header */}
            <h2 className="text-xl font-semibold tracking-tight text-indigo-400 mb-6 block md:hidden">
              <div className=" w-[25%]  flex items-center gap-x-4">
                <Link to={"/"}>
                  {" "}

                  <p className="font-bold text-xl flex gap-2 items-center">ChapterHouse <House /> </p>
                </Link>
              </div>
            </h2>
            {/* Sidebar Links */}
            <nav className="space-y-2">
              {userDashboards.map((data) => (
                <Link
                  key={data?.path}
                  to={data?.path}
                  className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${location === data?.path
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
                    }`}
                  aria-label={`Go to ${data?.text}`}
                >
                  {data?.text}
                </Link>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="mt-6">
              <button
                className="w-full px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                onClick={() => dispatch(logout())}
                aria-label="Log out"
              >
                Logout
              </button>
            </div>

            {/* Sidebar Footer */}
            <div className="mt-8 text-xs text-gray-500 text-center">
              <p>© 2025 Boundless Reads</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;