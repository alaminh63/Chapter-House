import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { aboutRoutes } from "../modules/About/about.route";
import { BookRoutes } from "../modules/book/book.route";
import { cartRoutes } from "../modules/Cart/cart.route";
import { OrderRoutes } from "../modules/order/order.route";
import { paymentRoutes } from "../modules/Payment/payment.route";
import { userRoutes } from "../modules/user/user.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: OrderRoutes,
  },
  {
    path: "/products",
    route: BookRoutes,
  },
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/login",
    route: AuthRoutes,
  },
  {
    path: "/cart",
    route: cartRoutes,
  },
  {
    path: "/about",
    route: aboutRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
