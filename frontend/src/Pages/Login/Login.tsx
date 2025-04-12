import { useLottie } from "lottie-react";
import LoginAnim from "../../../public/Login_Lottie.json";
import { Link, useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoginMutation } from "../../Redux/api/features/auth/authApi";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useAppDispatch } from "../../Redux/hooks";
import { setUser } from "../../Redux/api/features/auth/authSlice";
import { verifyToken } from "../../utils/Fucntion/verifyToken";
import { StartFromTop } from "../../component/hook/StartFromTop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTitle } from "../../component/hook/useTitle";
import { Google, Facebook } from "@mui/icons-material"; // Import Google and Facebook icons
const Login = () => {
  useTitle("Login");
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const options = {
    animationData: LoginAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  const navigate = useNavigate();
  const toGo = "/";
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const email = Form.email.value;
    const password = Form.password.value;
    const formData = { email, password };

    toast.loading("Logging in...", { id: sonarId });
    try {
      const res = await login(formData).unwrap();
      console.log('res: ', res);
      const token = res?.data?.token;
      const user = verifyToken(token);
      if (res?.success) {
        toast.success("Login successful!", { id: sonarId });
        dispatch(setUser({ user, token }));
        navigate(toGo);
      } else {
        toast.error(res?.message || "Login failed.", { id: sonarId }); // Handle login failure
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred.", { id: sonarId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Login | BookShop</title>
      </Helmet>
      <StartFromTop />

      <div className="max-w-5xl w-full space-y-8 bg-white rounded-lg shadow-xl overflow-hidden flex md:flex-row flex-col">
        {/* Left Side: Animation */}
        <div className="md:w-1/2 flex items-center justify-center p-8 bg-blue-50">
          <div className="w-full">{View}</div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 py-8 px-10 flex flex-col justify-center">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Log in to your Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Select a method to log in:
            </p>
          </div>

        

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="mt-6 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <VisibilityOffIcon className="text-gray-500" /> : <VisibilityIcon className="text-gray-500" />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/registration" className="font-medium text-blue-600 hover:text-blue-500">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;