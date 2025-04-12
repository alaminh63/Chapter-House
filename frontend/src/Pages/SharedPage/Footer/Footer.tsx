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
    <div className=" bg-[#0B1221] flex flex-col items-center text-white mt-10">
      <footer className="footer py-10 px-0  rounded-md grid grid-cols-1 md:grid-cols-4  max-w-7xl mx-auto">
        <aside>
          <img className="w-[146px]" src={logo} alt="" />
          <p>You Can Purchase All Type of Book From Our Shop</p>
          <div className="flex gap-4 text-xl mt-2">
            <Link to={"https://www.facebook.com/suvrodev.1122"} target="_blank">
              {" "}
              <FacebookIcon />
            </Link>
            <Link to={"https://x.com/suvrodev1408"} target="_blank">
              {" "}
              <XIcon />{" "}
            </Link>
            <Link
              to={"https://www.instagram.com/whateversuvrodeb/"}
              target="_blank"
            >
              {" "}
              <InstagramIcon />{" "}
            </Link>
            <Link
              to={"https://www.linkedin.com/in/suvrodeb-howlader/"}
              target="_blank"
            >
              {" "}
              <LinkedInIcon />{" "}
            </Link>
            <Link to="" onClick={handleWhatsapp}>
              {" "}
              <WhatsAppIcon />{" "}
            </Link>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Quick Link</h6>

          <Link to="/service" className="link link-hover">
            Service
          </Link>

          <a className="link link-hover">Free Course</a>
          <a className="link link-hover">We do?</a>
          <a className="link link-hover">Blog</a>
        </nav>
        <nav>
          <h6 className="footer-title">Support</h6>
          <Link to="/about-us" className="link link-hover">
            About us
          </Link>

          <a className="link link-hover" onClick={handlePhoneCall}>
            +880 1951912997
          </a>
          <a className="link link-hover" onClick={handleEmail}>
            suvrodeb.cse@gmail.com
          </a>

          {/* <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a> */}
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>

          <Link to="/condition" className="link link-hover">
            Terms of use
          </Link>
          <a className="link link-hover">Privacy policy</a>
          {/* <a className="link link-hover">Cookie policy</a> */}
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
