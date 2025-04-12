import { useLottie } from "lottie-react";
import { Helmet } from "react-helmet-async";
import { StartFromTop } from "../../component/hook/StartFromTop";
import RegAnim from "../../../public/Reg_Lottie.json";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router"; // Fixed import
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useRegistrationMutation } from "../../Redux/api/features/auth/authApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HomeIcon from "@mui/icons-material/Home";
import { useTitle } from "../../component/hook/useTitle";

const Registration = () => {
  useTitle("Registration");
  const [addRegister] = useRegistrationMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [accept, setAccept] = useState(false);

  const options = {
    animationData: RegAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleAccept = (event: ChangeEvent<HTMLInputElement>) => {
    setAccept(event.target.checked);
  };

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const name = Form.namee.value;
    const email = Form.email.value;
    const password = Form.password.value;
    const confirmPassword = Form.confirmPassword.value;
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password don't match", { id: sonarId });
      return;
    }

    const formData = { name, email, password };
    toast.loading("Creating Account", { id: sonarId });
    try {
      const res = await addRegister(formData).unwrap();
      if (res?.success) {
        toast.success("Registration successful", { id: sonarId });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Registration failed", { id: sonarId });
    }
  };

  return (
    <div className="min-h-screen   flex  max-w-5xl  mx-auto flex-col md:flex-row">
      <Helmet>
        <title>Registration | Boundless Reads</title>
      </Helmet>
      <StartFromTop />

      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="flex items-center space-x-1.5 text-gray-300 hover:text-white transition-colors"
          aria-label="Go to homepage"
        >
          <HomeIcon fontSize="small" />
          <span className="text-xs font-medium">Home</span>
        </Link>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl flex justify-center">
          <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6">
            <h1 className="text-xl font-semibold text-white text-center mb-6">Create Your Account</h1>
            <form onSubmit={handleRegistration} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="namee" className="block text-xs font-medium text-gray-200 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="namee"
                  name="namee"
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-200 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
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

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-200 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleShowPasswordConfirm}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={showPasswordConfirm ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showPasswordConfirm ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="accept"
                  name="accept"
                  checked={accept}
                  onChange={handleAccept}
                  className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor="accept" className="ml-2 text-xs text-gray-300">
                  I accept the{" "}
                  <Link
                    to="/terms-and-condition"
                    className="text-blue-400 hover:text-blue-300 underline"
                    aria-label="View terms and conditions"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!accept}
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
                aria-label="Register"
              >
                Create Account
              </button>

              {/* Login Link */}
              <p className="text-center text-xs text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium underline"
                  aria-label="Go to login"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Lottie Animation Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-gray-850">
        <div className="w-full max-w-md">{View}</div>
      </div>
    </div>
  );
};

export default Registration;