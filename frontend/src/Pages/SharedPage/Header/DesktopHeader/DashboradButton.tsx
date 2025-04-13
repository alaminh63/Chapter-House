import { Link } from "react-router";
import { useAppSelector } from "../../../../Redux/hooks";

const DashboradButton = () => {
  const { user } = useAppSelector((state) => state.auth);
  // console.log("User: ", user);
  const role = user?.role;
  // console.log("Role: ", role);
  return (
    <div>
      <Link to={`/${role}-dashboard`}>
        <div
          tabIndex={0}
          role="button"
          className="btn text-white  bg-[#19CB7C] hover:bg-slate-600 border-none"
        >    Dashboard
        </div>
      </Link>


    </div>
  );
};

export default DashboradButton;
