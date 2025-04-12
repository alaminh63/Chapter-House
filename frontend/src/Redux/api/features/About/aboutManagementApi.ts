import { baseApi } from "../../baseApi";

const aboutManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAbout: builder.mutation({
      query: (data) => {
        return {
          url: "/about",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["about"],
    }),
    getAllAbout: builder.query({
      query: () => {
        return {
          url: "/about",
          method: "GET",
        };
      },
      providesTags: ["about"],
    }),

    updateAbout: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/about/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["about"],
    }),
  }),
});

export const {
  useAddAboutMutation,
  useGetAllAboutQuery,
  useUpdateAboutMutation,
} = aboutManagementApi;
