import { baseApi } from "../../baseApi";

const usertManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/auth/allusers`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        console.log("Come cart id for delete: ", id);
        return {
          url: `/auth/allusers/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id, updateData }) => {
        console.log("Come cart id for Update: ", id);
        console.log("Come cart data for Update: ", updateData);
        return {
          url: `/auth/allusers/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usertManagementApi;
