import { FormEvent, useState } from "react";
import { useAppSelector } from "../../Redux/hooks";
import { useChangePasswordMutation } from "../../Redux/api/features/auth/authApi";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useTitle } from "../../component/hook/useTitle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const UserProfile = () => {
  useTitle("User Profile");
  const [updatePassword] = useChangePasswordMutation();
  const { user } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

  const handleUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const oldPassword = Form.oldPassword.value;
    const newPassword = Form.newPassword.value;
    const formData = { oldPassword, newPassword };
    toast.loading("Changing Password", { id: sonarId });
    try {
      const res = await updatePassword({
        id: user?._id,
        userPassword: formData,
      }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: sonarId });
        Form.reset();
      }
    } catch (error) {
      toast.error("Failed to change password", { id: sonarId });
    }
  };

  return (
    <div className="min-h-screen  text-gray-100  ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-100">Profile Settings</h1>
            <p className="mt-2 text-sm text-gray-400">
              Manage your account details and update your password.
            </p>
          </div>

          {/* User Info */}
          <div className="bg-gray-700 rounded-xl p-6 shadow-md mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 bg-indigo-500/10 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-100">{user?.name}</h2>
                <p className="text-sm text-gray-400">{user?.email}</p>
                <p className="text-xs text-gray-500 capitalize mt-1">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Password Change Form */}
          <div className="bg-gray-700 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-medium text-gray-100 mb-6">Change Password</h3>
            <form onSubmit={handleUpdatePassword}>
              {/* Old Password */}
              <div className="mb-6">
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Enter old password"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleShowPasswordConfirm}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors"
                    aria-label={showPasswordConfirm ? "Hide password" : "Show password"}
                  >
                    {showPasswordConfirm ? (
                      <VisibilityIcon fontSize="small" />
                    ) : (
                      <VisibilityOffIcon fontSize="small" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Save password changes"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;