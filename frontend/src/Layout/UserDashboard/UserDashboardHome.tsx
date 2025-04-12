import { Link } from "react-router";

const UserDashboardHome = () => {
  return (
    <div className="min-h-screen  text-gray-100">
      {/* Navigation Header */}
     
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-100">
            Welcome to Your Dashboard
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Effortlessly manage your account, track your orders, and discover tailored features designed for you.
          </p>
          
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Link
            to="/user-dashboard/user-profile"
            className="group relative bg-blue-900/40 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            aria-label="View Profile"
          >
            <div className="absolute inset-0 rounded-xl bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-4">
              <div className="flex-shrink-0 bg-indigo-950/50 p-2.5 rounded-lg">
                <svg
                  className="w-5 h-5 text-indigo-400"
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
                <h2 className="text-lg font-medium text-gray-100 group-hover:text-indigo-400 transition-colors">
                  Profile Settings
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Customize your account details and preferences.
                </p>
              </div>
            </div>
          </Link>

          {/* Cart Card */}
          <Link
            to="/user-dashboard/user-cart"
            className="group relative bg-blue-900/40 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            aria-label="View Cart"
          >
            <div className="absolute inset-0 rounded-xl bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-4">
              <div className="flex-shrink-0 bg-indigo-950/50 p-2.5 rounded-lg">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-100 group-hover:text-indigo-400 transition-colors">
                  Shopping Cart
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Review and manage your selected items.
                </p>
              </div>
            </div>
          </Link>

          {/* Orders Card */}
          <Link
            to="/user-dashboard/user-order"
            className="group relative bg-blue-900/40 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            aria-label="View Orders"
          >
            <div className="absolute inset-0 rounded-xl bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-4">
              <div className="flex-shrink-0 bg-indigo-950/50 p-2.5 rounded-lg">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-100 group-hover:text-indigo-400 transition-colors">
                  Order History
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Monitor order statuses and view past purchases.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-gray-500">
          <p>© 2025 Boundless Reads Book Shop. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a
              href="/privacy"
              className="hover:text-indigo-400 transition-colors"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-indigo-400 transition-colors"
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserDashboardHome;