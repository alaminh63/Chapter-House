import { useLottie } from "lottie-react";
import { Helmet } from "react-helmet-async";
import { StartFromTop } from "../../component/hook/StartFromTop";
import RegAnim from "../../../public/Reg_Lottie.json";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useRegistrationMutation } from "../../Redux/api/features/auth/authApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Registration = () => {
  const [addRegister] = useRegistrationMutation();
  const navigate = useNavigate();
  const options = {
    animationData: RegAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accept, setAccept] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleAccept = (event: ChangeEvent<HTMLInputElement>) => {
    setAccept(event.target.checked);
  };

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.namee.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", { id: sonarId });
      return;
    }

    const formData = { name, email, password };
    toast.loading("Creating account...", { id: sonarId });

    try {
      const res = await addRegister(formData).unwrap();
      if (res?.success) {
        toast.success("Registration successful!", { id: sonarId });
        navigate("/login");
      } else {
        toast.error(res?.message || "Registration failed.", { id: sonarId });
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred.", { id: sonarId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Registration | BookShop</title>
      </Helmet>
      <StartFromTop />

      <div className="max-w-5xl w-full space-y-8 bg-white rounded-2xl shadow-xl overflow-hidden flex md:flex-row flex-col">
        {/* Left Side: Animation */}
        <div className="md:w-1/2 flex items-center justify-center p-8 bg-blue-50 rounded-tl-2xl rounded-bl-2xl">
          <div className="w-full">{View}</div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:w-1/2 py-8 px-10 flex flex-col justify-center">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create your Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Let's get you started!
            </p>
          </div>

          {/* Registration Form */}
          <form className="mt-8 space-y-6" onSubmit={handleRegistration}>
            <div>
              <label htmlFor="namee" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="namee"
                  name="namee"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" // Force text color
                />
              </div>
            </div>

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
                  className="appearance-none bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" // Force text color
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
                  autoComplete="new-password"
                  required
                  className="appearance-none bg-white block w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" // Force text color
                />
                <div
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <VisibilityOffIcon className="text-gray-500" />
                  ) : (
                    <VisibilityIcon className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" // Force text color
                />
                <div
                  onClick={handleShowConfirmPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon className="text-gray-500" />
                  ) : (
                    <VisibilityIcon className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="accept"
                  name="accept"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={accept}
                  onChange={handleAccept}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="accept" className="font-medium text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms-and-condition" className="text-blue-600 hover:text-blue-500">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!accept}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;