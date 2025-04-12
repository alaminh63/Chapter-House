import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const GoTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <button
          className="btn bg-[#0A7CFF] fixed bottom-[30px] right-[50px] hover:bg-[#0A7CFF] border-0"
          onClick={scrollUp}
        >
          {" "}
          <ArrowUpwardIcon className="text-[#FFFFFF]" />
        </button>
      )}
    </div>
  );
};

export default GoTopButton;
