import { Link } from "react-router";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import logo from "../../../assets/Logo/Logo.png";

const Footer = () => {
  const url = "facebook.com/ChapterHouse";
  const handleWhatsapp = () => {
    const whatsappUrl = `https://wa.me/8801775006662`;
    window.open(whatsappUrl, "_blank");
  };

  const phoneNumber = "+8801775006662";
  const handlePhoneCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const emailAddress = "chapterhouse@gmail.com";
  const handleEmail = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className="bg-gradient-to-b from-[#1A1F33] to-[#0B1221] text-white mt-12">
      <footer className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <aside className="flex flex-col items-start space-y-4">
          <img className="w-36 transition-transform duration-300 hover:scale-105" src={logo} alt="Logo" />
          <p className="text-gray-300 text-sm max-w-xs">
            Discover a world of books at ChapterHouse. Your next favorite read is just a click away!
          </p>
          <div className="flex gap-3">
            {[
              { Icon: FacebookIcon, url: "" },
              { Icon: XIcon, url: "" },
              { Icon: InstagramIcon, url: "" },
              { Icon: LinkedInIcon, url: "" },
              { Icon: WhatsAppIcon, onClick: handleWhatsapp },
            ].map(({ Icon, onClick }, index) => (
              <Link
                key={index}
                to={url}
                onClick={onClick}
                target={url ? "_blank" : undefined}
                className="p-2 rounded-full bg-gray-700/50 text-gray-200 hover:bg-[#FF6B6B] hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <Icon fontSize="medium" />
              </Link>
            ))}
          </div>
        </aside>

        {/* Quick Links */}
        <nav className="flex flex-col space-y-3">
          <h6 className="text-lg font-semibold text-[#FF6B6B] tracking-wide">Quick Links</h6>
          {[
            { to: "/", label: "Service" },
            { to: "", label: "Free Course" },
            { to: "", label: "We Do?" },
            { to: "", label: "Blog" },
          ].map(({ to, label }, index) => (
            <Link
              key={index}
              to={to}
              className="text-gray-300 text-sm hover:text-[#FF6B6B] transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Support */}
        <nav className="flex flex-col space-y-3">
          <h6 className="text-lg font-semibold text-[#FF6B6B] tracking-wide">Support</h6>
          <Link to="/about-us" className="text-gray-300 text-sm hover:text-[#FF6B6B] transition-colors duration-200">
            About Us
          </Link>
          <a
            onClick={handlePhoneCall}
            className="text-gray-300 text-sm hover:text-[#FF6B6B] transition-colors duration-200 cursor-pointer"
          >
            +880 1453014924
          </a>
          <a
            onClick={handleEmail}
            className="text-gray-300 text-sm hover:text-[#FF6B6B] transition-colors duration-200 cursor-pointer"
          >
            chapterhouse@gmail.com
          </a>
        </nav>

        {/* Company */}
        <nav className="flex flex-col space-y-3">
          <h6 className="text-lg font-semibold text-[#FF6B6B] tracking-wide">Company</h6>
          {[
            { to: "/", label: "Terms of Use" },
            { to: "", label: "Privacy Policy" },
          ].map(({ to, label }, index) => (
            <Link
              key={index}
              to={to}
              className="text-gray-300 text-sm hover:text-[#FF6B6B] transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>
      </footer>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 py-6 text-center">
        <p className="text-gray-400 text-sm">
          Â© {new Date().getFullYear()} ChapterHouse. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;