import { Link } from "react-router";
import { useGetMyCartQuery } from "../../../../Redux/api/features/Cart/cartManagementApi";
import { useAppSelector } from "../../../../Redux/hooks";
import { TUser } from "../../../../utils/Types/GlobalType";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const DashboardCart = () => {
  const  user = useAppSelector((state) => state.auth.user);
  
  const { data, isLoading } = useGetMyCartQuery((user as TUser)?._id);
  const soCart = data?.data;
  console.log('soCart: ', soCart);

  if (isLoading) {
    return <span className="loading loading-dots loading-md"></span>;
  }
  return (
    <div> 
      {user?.role == "user" && (
        <div className=" p-5 text-white relative  ">
          <Link to={"/user-dashboard/user-cart"}>
            {" "}
            <AddShoppingCartIcon />
          </Link>

          <p className="badge badge-secondary absolute top-0 right-1 text-xl text-white">
            {soCart?.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardCart;
