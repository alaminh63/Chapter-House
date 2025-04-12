import { baseApi } from "../../baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => {
        return {
          url: "/products/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["book", "bookHome", "bookImage"],
    }),
    getAllBookByAdmin: builder.query({
      query: () => {
        return {
          url: `/products/admin/getbook`,
          method: "GET",
        };
      },
      providesTags: ["book"],
    }),
    getAllBook: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/products?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["book"],
    }),
    getSingleBook: builder.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
    }),
    getOwnBook: builder.query({
      query: (id) => {
        return {
          url: `/products/ownbook/${id}`,
          method: "GET",
        };
      },
      providesTags: ["book"],
    }),
    getBookImages: builder.query({
      query: () => {
        return {
          url: `/products/images/book`,
          method: "GET",
        };
      },
      providesTags: ["bookImage"],
    }),
    getHomeBook: builder.query({
      query: () => {
        return {
          url: `/products/images/book/home`,
          method: "GET",
        };
      },
      providesTags: ["bookHome"],
    }),
    deleteBook: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["book", "bookHome", "bookImage"],
    }),
    updateBook: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: ["book", "bookHome", "bookImage"],
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetAllBookQuery,
  useGetSingleBookQuery,
  useGetOwnBookQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetBookImagesQuery,
  useGetHomeBookQuery,
  useGetAllBookByAdminQuery,
} = userManagementApi;
