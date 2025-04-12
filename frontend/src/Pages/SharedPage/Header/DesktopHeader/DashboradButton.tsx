import { Link } from "react-router";
import { useAppSelector } from "../../../../Redux/hooks";

const DashboradButton = () => {
  const { user } = useAppSelector((state) => state.auth);
  // console.log("User: ", user);
  const role = user?.role;
  // console.log("Role: ", role);
  return (
    <div>

      <div
        tabIndex={0}
        role="button"
        className="btn text-white  bg-[#19CB7C] hover:bg-slate-600 border-none"
      >      <Link to={`/${role}-dashboard`}>Dashboard</Link>

      </div>


    </div>
  );
};

export default DashboradButton;
