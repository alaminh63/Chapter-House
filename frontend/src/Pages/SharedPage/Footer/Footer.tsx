import { Link } from "react-router";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import logo from "../../../assets/Logo/Logo.png";

const Footer = () => {
  const handleWhatsapp = () => {
    const whatsappUrl = `https://wa.me/8801518748081`;
    window.open(whatsappUrl, "_blank");
  };

  const phoneNumber = "+880 1951912997";
  const handlePhoneCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const emailAddress = "suvrodeb.cse@gmail.com";
  const handleEmail = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <footer className="bg-blue-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Service Categories (Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Example Categories (Replace with your actual data) */}
          <div className="text-sm">
            <h6 className="font-semibold text-gray-100 mb-2 uppercase tracking-wider">Services</h6>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Finance, Taxes & Public Debt
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Social Assistance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Justice and Security
                </a>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <h6 className="font-semibold text-gray-100 mb-2 uppercase tracking-wider">Relevant Topics</h6>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Work and Welfare
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Energy, Mining and Environment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Justice and Security
                </a>
              </li>
            </ul>
          </div>
          <div className="text-sm">
            <h6 className="font-semibold text-gray-100 mb-2 uppercase tracking-wider">News</h6>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Social Assistance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Environment And Clime
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Tourism
                </a>
              </li>
            </ul>
          </div>
              <div className="text-sm">
            <h6 className="font-semibold text-gray-100 mb-2 uppercase tracking-wider">Phone number</h6>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Social Assistance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Environment And Clime
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Tourism
                </a>
              </li>
            </ul>
          </div>
              <div className="text-sm">
            <h6 className="font-semibold text-gray-100 mb-2 uppercase tracking-wider">grand prize</h6>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Social Assistance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Environment And Clime
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Tourism
                </a>
              </li>
            </ul>
          </div>
                    <div className="text-sm">
            <h6 className="font-semibold text-gray-100 mb-2 uppercase tracking-wider">About us</h6>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Social Assistance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Environment And Clime
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                  Tourism
                </a>
              </li>
            </ul>
          </div>

          {/* Add more categories as needed */}
        </div>

        {/* Social Icons and Branding (Flex Container) */}
        <div className="mt-8 flex items-center justify-between">
          {/* Social Icons */}
          <div className="flex space-x-4">
            <Link to={"https://www.facebook.com/suvrodev.1122"} target="_blank" className="hover:text-blue-300">
              <FacebookIcon className="text-xl" />
            </Link>
            <Link to={"https://x.com/suvrodev1408"} target="_blank" className="hover:text-blue-300">
              <XIcon className="text-xl" />
            </Link>
            <Link
              to={"https://www.instagram.com/whateversuvrodeb/"}
              target="_blank"
              className="hover:text-blue-300"
            >
              <InstagramIcon className="text-xl" />
            </Link>
            <Link
              to={"https://www.linkedin.com/in/suvrodeb-howlader/"}
              target="_blank"
              className="hover:text-blue-300"
            >
              <LinkedInIcon className="text-xl" />
            </Link>
            <button onClick={handleWhatsapp} className="hover:text-blue-300">
              <WhatsAppIcon className="text-xl" />
            </button>
          </div>

          {/* Branding/Logos (Right Side)  - Replace with your actual logos */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              {/* Replace with your actual logo SVG path */}
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.5 5.25a3 3 0 116 0 3 3 0 01-6 0zm4.5 8.25a3.75 3.75 0 10-7.5 0v.225c0 1.247.672 2.472 1.938 3.075l.732.366a.75.75 0 00.693 0l.732-.366c1.266-.603 1.938-1.828 1.938-3.075v-.225z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">eBookStore</span>
          </div>
        </div>

        {/* Copyright and Legal (Bottom) */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
          <p>
            Unless otherwise stated, the content of this site is published under the terms described in the{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Creative Commons Attribution-ShareAlike 3.0 License
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;