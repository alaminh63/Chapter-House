import { Link } from "react-router";

const UserDashboardHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-lg">
            Manage your account, track your orders, and explore new features.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Link
            to="/user-dashboard/user-profile"
            className="bg-white/10 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-3">👤 Profile</h2>
            <p>View and update your profile information.</p>
          </Link>

          {/* Cart Card */}
          <Link
            to="/user-dashboard/user-cart"
            className="bg-white/10 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-3">🛒 My Cart</h2>
            <p>View and manage the items in your cart.</p>
          </Link>

          {/* Orders Card */}
          <Link
            to="/user-dashboard/user-order"
            className="bg-white/10 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-3">📦 My Orders</h2>
            <p>Track your order history and manage current orders.</p>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-white/80">
          <p>© 2025 Boundless Reads Book Shop. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
