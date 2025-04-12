import { Outlet } from "react-router";
import DesktopHeader from "../../Pages/SharedPage/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "../../Pages/SharedPage/Header/MobileHeader/MobileHeader";
import Footer from "../../Pages/SharedPage/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className=" md:hidden">
        <MobileHeader />
      </div>

      <div className="mx-4 md:mx-10 my-6 md:my-10">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
