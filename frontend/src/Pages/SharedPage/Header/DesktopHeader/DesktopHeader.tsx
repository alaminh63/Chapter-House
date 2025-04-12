import { Link, NavLink } from "react-router";
import logo from "../../../../assets/Logo/Logo.png";
import { useAppSelector } from "../../../../Redux/hooks";
import { useDispatch } from "react-redux";
import { logout } from "../../../../Redux/api/features/auth/authSlice";
import DashboradButton from "./DashboradButton";
import DashboardCart from "./DashboardCart";

const DesktopHeader = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className=" text-white  bg-[#0F172A]">
      <div className="max-w-[100rem] mx-auto p-2  flex justify-between items-center px-10 relative z-10">
        <div className=" w-[25%]  flex items-center gap-x-4">
          <Link to={"/"}>
            {" "}
            <img src={logo} alt="" className="w-[75px] h-[75px] rounded-full" />
          </Link>
          <p className="font-bold text-xl">Boundless Reads</p>
        </div>
        <div className="flex justify-center  gap-4 w-[50%] ">
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-500" : "acLk ")}
            to="/home"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-500" : "acLk ")}
            to="/all-books"
          >
            All Book
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-500" : "acLk ")}
            to="/about-us"
          >
            About Us
          </NavLink>
        </div>

        <div className="w-[25%]  flex justify-end items-center 0">
          {token ? (
            <div className=" flex items-center gap-x-3">
              <DashboardCart />
              <DashboradButton />
              <button
                className=" btn text-white btn-error "
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className=" btn btn-primary text-white ">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
