import "./MobileHeader.css"; // Keep this import
import { useState } from "react";
import logo from "../../../../assets/Logo/Logo.png";
import MobileHeaderOption from "./MobileHeaderOption/MobileHeaderOption";
import { Link } from "react-router";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50">
      {/* Main Header Section (Dark Mode) */}
      <div className="w-full flex justify-between items-center py-4 px-6 bg-gray-900 text-white relative z-20 shadow-lg">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Boundless Reads Logo"
            className="w-10 h-10 rounded-full ring-2 ring-indigo-500" // Accent color ring
          />
          <span className="font-semibold text-xl tracking-tight">
            Boundless Reads
          </span>
        </Link>

        {/* Menu Icon (Animated) */}
        <button
          onClick={handleClick}
          className="focus:outline-none transform transition-transform duration-300 hover:rotate-180"
        >
          {isOpen ? (
            <XMarkIcon className="h-7 w-7 text-indigo-400" />
          ) : (
            <Bars3Icon className="h-7 w-7 text-indigo-400" />
          )}
        </button>
      </div>

      {/* Mobile Menu (Animated Slide-Down) */}
      <div
        className={`absolute top-full left-0 w-full bg-gray-800 text-white overflow-hidden transition-transform duration-300 ease-out transform-gpu ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Mobile Header Options (Pass handleClick) */}
        <MobileHeaderOption handleClick={handleClick} />
      </div>
    </div>
  );
};

export default MobileHeader;