import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_USER_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_USER_API,
    credentials: "include",
  }),
  tagTypes: [
    "Home-Courses",
    "Courses",
    "SingleCourse",
    "Lecture",
    "LectureList",
  ],
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category, coursePrice }) => ({
        url: "/",
        method: "POST",
        body: { courseTitle, category, coursePrice },
      }),
      invalidatesTags: ["Courses"],
    }),
    getSearchedCourses: builder.query({
      query: ({ searchQuery = "", categories = [], sortByPrice = "" }) => {
        // Build the query string
        const q = typeof searchQuery === "string" ? searchQuery : "";
        let queryString = `/search?q=${encodeURIComponent(q)}`;

        if (Array.isArray(categories) && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }

        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Courses"],
    }),
    getPublishedCourse: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
      providesTags: ["Home-Courses"],
    }),

    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Courses", "SingleCourse"],
    }),
    removeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: ["SingleCourse"],
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Courses"],
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
      invalidatesTags: ["LectureList"],
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["LectureList"],
    }),
    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        lectureDesc,
        isPreviewFree,
        courseId,
        lectureId,
        pdfInfo
      }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "PUT",
        body: { lectureTitle, videoInfo, isPreviewFree, lectureDesc, pdfInfo },
      }),
      invalidatesTags: ["Lecture", "LectureList"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["Lecture"],
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lecture", "LectureList"],
    }),
    getEnrolledCourse: builder.query({
      query: (userId) => ({
        url: `/coursesEnrolled/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useRemoveCourseMutation,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useGetCourseByIdQuery,
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
  usePublishCourseMutation,
  useGetPublishedCourseQuery,
  useGetSearchedCoursesQuery,
  useGetEnrolledCourseQuery
} = courseApi;
