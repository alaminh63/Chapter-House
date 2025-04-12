import { baseApi } from "../../baseApi";

const cartManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (data) => {
        return {
          url: "/cart",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["cart"],
    }),
    getMyCart: builder.query({
      query: (id: string) => {
        return {
          url: `/cart/${id}`,
          method: "GET",
        };
      },
      providesTags: ["cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => {
        console.log("Come cart id for delete: ", id);
        return {
          url: `/cart/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["cart"],
    }),
  }),
});

export const { useAddCartMutation, useGetMyCartQuery, useDeleteCartMutation } =
  cartManagementApi;
