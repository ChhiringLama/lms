import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_USER_API = "http://localhost:8080/api/v1/review";

export const reviewApi = createApi({
  reducerPath: "courreviewApiseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_USER_API,
    credentials: "include",
  }),
  endpoints:(builder)=>({
    createReview:builder.mutation({
        query: ({ message, rating, courseId}) => ({
            url: `/create/${courseId}`,
            method: "POST",
            body: { message, rating, courseId }
          }),
        
    })
  })
})

export const {useCreateReviewMutation}=reviewApi;