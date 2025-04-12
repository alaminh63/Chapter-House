//http://localhost:5000/api/payment/initiate

import { baseApi } from "../../baseApi";

const paymentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initialPay: builder.mutation({
      query: (data) => {
        console.log("Data in Query: ", data);
        return {
          url: "/payment/initiate",
          method: "POST",
          body: data,
        };
      },
    }),
    getMyOrder: builder.query({
      query: (id: string) => {
        return {
          url: `/payment/payment/${id}`,
          method: "GET",
        };
      },
      providesTags: ["payment"],
    }),
    getAdminOrder: builder.query({
      query: () => {
        return {
          url: `/payment/admin/payment`,
          method: "GET",
        };
      },
      providesTags: ["adminpayment"],
    }),
    deletePayment: builder.mutation({
      query: (id) => {
        return {
          url: `/payment/payment/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["adminpayment", "payment"],
    }),
    deletepaymentByAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/payment/admin/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["adminpayment", "payment"],
    }),
    successPayment: builder.mutation({
      query: ({ id, corfirmOrder }) => {
        console.log("Redux id: ", id);
        console.log("Redux confirm Order: ", corfirmOrder);
        return {
          url: `/payment/admin/update/${id}`,
          method: "PATCH",
          body: corfirmOrder,
        };
      },
      invalidatesTags: ["adminpayment", "payment"],
    }),
  }),
});

export const {
  useInitialPayMutation,
  useGetMyOrderQuery,
  useGetAdminOrderQuery,
  useDeletePaymentMutation,
  useSuccessPaymentMutation,
  useDeletepaymentByAdminMutation,
} = paymentManagementApi;
