import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router";
import { useAppSelector } from "../../../../../Redux/hooks";
import DashboardCart from "../../DesktopHeader/DashboardCart";
import DashboradButton from "../../DesktopHeader/DashboradButton";
import { logout } from "../../../../../Redux/api/features/auth/authSlice";

const MobileHeaderOption = ({ handleClick }) => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="py-6 px-8 flex flex-col gap-6">
      {/* Navigation Links (Styled) */}
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/home"
          onClick={handleClick}
          className={({ isActive }) =>
            `block py-3 px-5 rounded-xl transition-colors duration-200 ${
              isActive
                ? "bg-indigo-700 text-white" // Active link
                : "hover:bg-gray-700 text-gray-300"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/all-books"
          onClick={handleClick}
          className={({ isActive }) =>
            `block py-3 px-5 rounded-xl transition-colors duration-200 ${
              isActive
                ? "bg-indigo-700 text-white" // Active link
                : "hover:bg-gray-700 text-gray-300"
            }`
          }
        >
          All Books
        </NavLink>
        <NavLink
          to="/about-us"
          onClick={handleClick}
          className={({ isActive }) =>
            `block py-3 px-5 rounded-xl transition-colors duration-200 ${
              isActive
                ? "bg-indigo-700 text-white" // Active link
                : "hover:bg-gray-700 text-gray-300"
            }`
          }
        >
          About Us
        </NavLink>
      </nav>

      {/* Authentication Area (Styled) */}
      <div className="border-t border-gray-700 pt-6">
        {token ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <DashboardCart />
              <DashboradButton />
            </div>
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl transition-colors duration-200"
              onClick={() => {
                dispatch(logout());
                handleClick(); // Close menu on logout
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="w-full">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl transition-colors duration-200">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileHeaderOption;