import { Link } from "react-router";

const AdminDashboardHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4 text-teal-400">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-300">
            Manage Boundless Reads Book Shop with ease and efficiency.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <Link
            to="user-profile"
            className="bg-gray-700/40 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-3 text-cyan-400">
              👤 User Profile
            </h2>
            <p>View and update your admin profile information.</p>
          </Link>

          {/* Add Book Card */}
          <Link
            to="/user-dashboard/user-add-book"
            className="bg-white/10 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-3">📚 Add Book</h2>
            <p>Add new books to your collection or inventory.</p>
          </Link>

          {/* My Book Card */}
          <Link
            to="/user-dashboard/user-book"
            className="bg-white/10 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-3">📖 Books Management</h2>
            <p>View and manage books </p>
          </Link>

          {/* User Management */}
          <Link
            to="user-management"
            className="bg-gray-700/40 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-3 text-indigo-400">
              👥 User Management
            </h2>
            <p>Manage registered users and their roles.</p>
          </Link>

          {/* Order Management */}
          <Link
            to="order-management"
            className="bg-gray-700/40 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-3 text-green-400">
              📦 Order Management
            </h2>
            <p>Track and manage orders placed by customers.</p>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-400">
          <p>© 2025 Boundless Reads Book Shop. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
