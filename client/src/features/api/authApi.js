import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";


const BASE_USER_API = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_USER_API,
    credentials: "include", //Sends cookies like JWT and others to the backend along with request
  }),
  tagTypes: ["Activity"],
  endpoints: (builder) => ({
    //Function
    registerUser: builder.mutation({
      //mutation to post data
      query: (inputData) => ({
        url: "register", //->  http://localhost:8080/api/v1/user/register
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      // mutation because login is still post method

      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({ user: result.data.user, isAuthenticated: true })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({ user: result.data.user, isAuthenticated: true })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      //eslint-disable-next-line
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {

          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    pushActivity: builder.mutation({
      query: ({ action, actionDes }) => ({
        url: "/create-activity",
        method: "POST",
        body: { action, actionDes }
      }),
      invalidatesTags: ["Activity"],
    }),
    getActivity:builder.query({
      query:()=>({
        url:`/get-activity`,
        method:"GET"
      }),
      providesTags:["Activity"]
    })
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  usePushActivityMutation,
  useGetActivityQuery,
  useLogoutUserMutation,
} = authApi;
