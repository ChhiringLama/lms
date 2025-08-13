import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (body) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body
      }),
    }),
    getCourseDetailWithStatus:builder.query({
      query:(courseId)=>({
        url:`/course/${courseId}/detail-with-status`,
        method:"GET"
      })
    }),
    isCoursePurchased:builder.mutation({
      query:({courseId, userId})=>({
        url:`/course/${courseId}/purchase-status`,
        method:"POST",
        body: {courseId, userId}
      }),
      
    }),
    getPurchasedCourses:builder.query({
      query:()=>({
        url:`/`,
        method:"GET"
      })
    }),
  })
});


export const {useCreateCheckoutSessionMutation, useGetCourseDetailWithStatusQuery, useGetPurchasedCoursesQuery, useIsCoursePurchasedMutation}=purchaseApi;