export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  iat: number;
  exp: number;
};

export type TTokenUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  iat: number;
  exp: number;
};

export type TBook = {
  _id: string;
  title: string;
  author: string;
  brand: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
  quantity: number;
  model: string;
  refUser: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TReview = {
  id: string;
  image: string;
  desc: string;
  name: string;
  position: string;
  rating: number;
};

export type TOrder = {
  _id: string;
  transactionId: string;
  userId: string;
  productId: string;
  price: number;
  quantity: number;
  paidStatus: boolean;
  adminApproval: boolean | string;
};
