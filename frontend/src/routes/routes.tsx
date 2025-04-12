import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import AboutUS from "../Pages/AboutUS/AboutUS";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import TermsAndCondition from "../Pages/TermsAndCondition/TermsAndCondition";
import AddBook from "../Pages/AddBook/AddBook";
import ProtectedRoute from "../Layout/ProtectedRoute";
import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetail from "../Pages/BookDetail/BookDetail";
import MyCart from "../Pages/MyCart/MyCart";
import UserProfile from "../Pages/UserProfile/UserProfile";
import UserDashboard from "../Layout/UserDashboard/UserDashboard";
import MyBook from "../Pages/MyBook/MyBook";
import MyOrder from "../Pages/MyOrder/MyOrder";
import AdminProtectedRoute from "../Layout/AdminProtectedRoute";
import AdminDashboard from "../Layout/AdminDashboard/AdminDashboard";
import UserManagement from "../Pages/AdminPages/UserManagement/UserManagement";
import OrderManagement from "../Pages/AdminPages/OrderManagement/OrderManagement";
import PaymentSuccessfull from "../Pages/SharedPage/Payment/PaymentSuccessfull";
import PaymentUnSuccessfull from "../Pages/SharedPage/Payment/PaymentUnSuccessfull";
import LoadingPage from "../component/LoadingPage/LoadingPage";
import UserDashboardHome from "../Layout/UserDashboard/UserDashboardHome";
import AdminDashboardHome from "../Layout/AdminDashboard/AdminDashboardHome";
import CheckOutPage from "../Pages/CheckOutPage/CheckOutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "all-books",
        element: <AllBooks />,
      },

      {
        path: "about-us",
        element: <AboutUS />,
      },
      {
        path: "user-checkout/:_id",
        element: (
          <ProtectedRoute>
            {" "}
            <CheckOutPage />{" "}
          </ProtectedRoute>
        ),
      },

      {
        path: "user-profile",
        element: (
          <ProtectedRoute>
            {" "}
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "book-detail/:_id",
        element: <BookDetail />,
      },
    ],
  },
  {
    path: "user-dashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />{" "}
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <UserDashboardHome />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "user-home",
        element: (
          <ProtectedRoute>
            {" "}
            <UserDashboardHome />{" "}
          </ProtectedRoute>
        ),
      },

      {
        path: "user-profile",
        element: (
          <ProtectedRoute>
            {" "}
            <UserProfile />{" "}
          </ProtectedRoute>
        ),
      },

      {
        path: "user-cart",
        element: (
          <ProtectedRoute>
            {" "}
            <MyCart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "user-order",
        element: (
          <ProtectedRoute>
            {" "}
            <MyOrder />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: (
      <AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminDashboardHome />{" "}
          </AdminProtectedRoute>
        ),
      },
      {
        path: "admin-home",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminDashboardHome />,
          </AdminProtectedRoute>
        ),
      },
      {
        path: "user-profile",
        element: (
          <AdminProtectedRoute>
            <UserProfile />
          </AdminProtectedRoute>
        ),
      },

      {
        path: "admin-add-book",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AddBook />{" "}
          </AdminProtectedRoute>
        ),
      },
      {
        path: "book-management",
        element: (
          <AdminProtectedRoute>
            <MyBook />{" "}
          </AdminProtectedRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminProtectedRoute>
            {" "}
            <UserManagement />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "order-management",
        element: (
          <AdminProtectedRoute>
            {" "}
            <OrderManagement />
          </AdminProtectedRoute>
        ),
      },

      // {
      //   path: "create-about",
      //   element: <CreateAbout />,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "registration",
    element: <Registration />,
  },
  {
    path: "terms-and-condition",
    element: <TermsAndCondition />,
  },
  {
    path: "success-pay/:transactionId",
    element: <PaymentSuccessfull />,
  },
  {
    path: "unsuccess-pay/:transactionId",
    element: <PaymentUnSuccessfull />,
  },
  {
    path: "loading",
    element: <LoadingPage />,
  },
  // {
  //   path: "imageupload",
  //   element: <UploadImage />,
  // },
]);
