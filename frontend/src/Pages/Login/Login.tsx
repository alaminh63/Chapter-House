import { useLottie } from "lottie-react";
import LoginAnim from "../../../public/Login_Lottie.json";
import { Link, useNavigate } from "react-router"; // Updated import
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
import HomeIcon from "@mui/icons-material/Home";
import { useTitle } from "../../component/hook/useTitle";

const Login = () => {
  useTitle("Login");
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const options = {
    animationData: LoginAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  const toGo = "/";

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const email = Form.email.value;
    const password = Form.password.value;
    const formData = { email, password };
    toast.loading("Logging in", { id: sonarId });
    try {
      const res = await login(formData).unwrap();
      const token = res?.data?.token;
      const user = verifyToken(token);
      if (res?.success) {
        toast.success("Login successful", { id: sonarId });
        dispatch(setUser({ user, token }));
        Form.reset();
        navigate(toGo);
      }
    } catch (error) {
      toast.error("Login failed", { id: sonarId });
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto   flex flex-col md:flex-row ">
      <Helmet>
        <title>Login | Boundless Reads</title>
      </Helmet>
      <StartFromTop />

      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Go to homepage"
        >
          <HomeIcon fontSize="medium" />
          <span className="text-sm font-medium">Home</span>
        </Link>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-white text-center mb-8">Welcome Back</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-base font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label="Log in"
            >
              Sign In
            </button>

            {/* Registration Link */}
            <p className="text-center text-sm text-gray-300">
              Don’t have an account?{" "}
              <Link
                to="/registration"
                className="text-blue-400 hover:text-blue-300 font-medium underline"
                aria-label="Go to registration"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Lottie Animation Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gray-850">
        <div className="w-full max-w-lg">{View}</div>
      </div>
    </div>
  );
};

export default Login;