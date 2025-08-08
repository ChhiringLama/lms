import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLoadUserQuery } from "@/features/api/authApi";
import { useEffect } from "react";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const user = data?.user;
  useEffect(() => {
    if (user) {
      console.log("User loaded:", user);
    }
  }, [user]);

  // const { enrolledCourses: courses } = data.user;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto my-20 px-4 md:px-0">
        <h2 className="text-center mb-4">Loading...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!user || !user.enrolledCourses) {
    return (
      <div className="text-center text-gray-500 py-12">
        Unable to load your courses.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-20 px-4 md:px-0">
      <h1 className="font-funnel font-bold text-2xl text-green-800 mb-2 text-center">
        All Your Courses
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Continue your learning journey and pick up right where you left off!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {isLoading ? (
          user.enrolledCourses.map((course) => (
            <SkeletonBox course={course} key={course.id} />
          ))
        ) : user.enrolledCourses.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            You have no courses yet.
          </div>
        ) : (
          user.enrolledCourses.map((course) => (
            <LearningCard course={course} key={course.id} />
          ))
        )}
      </div>
    </div>
  );
};

const LearningCard = ({ course }) => (
  <div className="bg-white rounded-lg hover:shadow-lg transition p-4 flex flex-col items-center border-2 border-solid">
    <img
      src={course.image}
      alt={course.title}
      className="h-24 w-full object-cover rounded mb-3"
    />
    <Avatar className="mb-3">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div className="font-semibold text-green-900 text-center mb-2 truncate w-full">
      <h3 className="font-opensans text-lg">{course.title}</h3>
    </div>
    <div className="text-sm text-gray-500 mb-4 text-center">
      {course.instructor}
    </div>
    <button className="mt-auto px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded text-sm font-semibold w-full">
      Advance
    </button>
  </div>
);

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow p-4 flex flex-col items-center">
    <div className="h-12 w-12 bg-gray-200 rounded-full mb-3" />
    <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
    <div className="h-8 w-full bg-gray-200 rounded" />
  </div>
);
export default MyLearning;
