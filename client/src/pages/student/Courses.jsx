import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import Course from "./Course";
import { useEffect, useState } from "react";

const Courses = () => {
  const { data, isLoading, isSuccess, isError } = useGetPublishedCourseQuery();
  const [courses, setCourses] = useState();

  useEffect(() => {
    if (isSuccess) {
      setCourses(data.courses);
    }
  }, [isSuccess, data]);

  if(isError) 
    return <h1>An error occured</h1>

  return (
    <div className="font-funnel bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-2 text-green-700">
          Ready to learn?
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Select your next course and start your journey today.
        </p>
        {isLoading ? (
          <CourseSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses?.map((course) => (
              <Course course={course} key={course._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse bg-white rounded-lg shadow p-4">
          <div className="h-40 bg-gray-200 rounded mb-4" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
};

export default Courses;
