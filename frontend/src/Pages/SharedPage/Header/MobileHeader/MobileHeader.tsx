import "./MobileHeader.css";
import { useState } from "react";
import logo from "../../../../assets/Logo/Logo.png";
import MobileHeaderOption from "./MobileHeaderOption/MobileHeaderOption";
const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="  w-full  flex justify-between items-center py-2 px-5 bg-[#0F172A] relative z-20">
        <div className="flex items-center justify-start gap-x-2">
          <img src={logo} alt="" className=" w-[50px] h-[50px] rounded-full" />
          <h1 className="font-bold">Boundless Reads</h1>
        </div>
        <div className="">
          <div
            className={`menu-icon ${isOpen ? "open" : ""}`}
            onClick={handleClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div
        className={`absolute  w-full transition-all duration-700 ${
          isOpen ? "top-[66px]" : "-top-[400px] "
        }`}
      >
        <MobileHeaderOption handleClick={handleClick} />
      </div>
    </div>
  );
};

export default MobileHeader;
