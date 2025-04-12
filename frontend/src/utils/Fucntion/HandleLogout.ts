import { useDispatch } from "react-redux";
import { logout } from "../../Redux/api/features/auth/authSlice";

export const HandleLogout = () => {
  const dispatch = useDispatch();
  dispatch(logout());

  return;
};
