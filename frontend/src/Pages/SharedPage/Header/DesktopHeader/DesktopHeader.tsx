import { Link, NavLink } from "react-router";
import logo from "../../../../assets/Logo/Logo.png";
import { useAppSelector } from "../../../../Redux/hooks";
import { useDispatch } from "react-redux";
import { logout } from "../../../../Redux/api/features/auth/authSlice";
import DashboradButton from "./DashboradButton";
import DashboardCart from "./DashboardCart";
import { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

const DesktopHeader = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white text-gray-800 sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img
              src={logo}
              alt="Boundless Reads Logo"
              className="w-8 h-8 rounded-full"
            />
          </Link>
          <Link
            to="/"
            className="text-lg font-semibold hover:text-gray-900 transition-colors duration-200"
          >
            Boundless Reads
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation Links (Hidden on Mobile) */}
        <nav
          className={`hidden md:flex space-x-8 ${
            isMenuOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-white py-4 px-4 border-b border-gray-200"
              : ""
          }`}
        >
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-blue-600"
                : "hover:text-gray-500 transition-colors duration-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-books"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-blue-600"
                : "hover:text-gray-500 transition-colors duration-200"
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-blue-600"
                : "hover:text-gray-500 transition-colors duration-200"
            }
          >
            About Us
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <div className="flex items-center space-x-3">
              <DashboardCart />
              <DashboradButton />
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Links (Show on Mobile) */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col items-start py-4 px-4 bg-white border-b border-gray-200">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-blue-600 py-2"
                : "hover:text-gray-500 transition-colors duration-200 py-2"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-books"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-blue-600 py-2"
                : "hover:text-gray-500 transition-colors duration-200 py-2"
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-blue-600 py-2"
                : "hover:text-gray-500 transition-colors duration-200 py-2"
            }
          >
            About Us
          </NavLink>

          {token ? (
            <div className="flex flex-col items-center space-y-3 mt-4">
              <DashboardCart />
              <DashboradButton />
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                Login
              </button>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default DesktopHeader;