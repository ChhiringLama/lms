import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useLoadUserQuery } from "@/features/api/authApi";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BookOpen, User, Play } from "lucide-react";
import { useGetEnrolledCourseQuery } from "@/features/api/courseApi";

const MyLearning = () => {

  const { data, isLoading } = useLoadUserQuery();
  const user = data?.user;

  const {data:coursesEnrolledData}=useGetEnrolledCourseQuery(user?._id);



  console.log(coursesEnrolledData);
  useEffect(() => {
    if (user) {
      console.log("User loaded:", user);
    }
  }, [user]);



  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Learning</h1>
            <p className="text-gray-600 dark:text-gray-400">Continue your learning journey and pick up right where you left off!</p>
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!user || !user.enrolledCourses) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Learning</h1>
            <p className="text-gray-600 dark:text-gray-400">Continue your learning journey and pick up right where you left off!</p>
          </div>
        </div>

        {/* Empty State */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses yet</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              You haven't enrolled in any courses yet. Start your learning journey today!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Learning</h1>
          <p className="text-gray-600 dark:text-gray-400">Continue your learning journey and pick up right where you left off!</p>
        </div>
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500">{user.enrolledCourses.length} courses</span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.enrolledCourses.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses yet</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                You haven't enrolled in any courses yet. Start your learning journey today!
              </p>
            </CardContent>
          </Card>
        ) : (
          coursesEnrolledData?.enrolledCourses?.map((course) => (
            <LearningCard course={course} key={course?.id} />
          ))
        )}
      </div>
    </div>
  );
};



const LearningCard = ({ course }) => {

  const navigate=useNavigate()

  const selectCourseHandler=(courseId)=>{
      navigate(`/dashboard/course-progress/${courseId}`);
  }

return(
  <Card className="hover:shadow-md transition-shadow group">
    <CardHeader className="pb-3">
      <div className="relative">
        <img
          src={course?.courseThumbnail}
          alt={course?.courseTitle}
          className="h-32 w-full object-cover rounded-lg mb-3"
        />
        <div className="absolute top-2 right-2">
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src={`${course?.creator?.photoUrl}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
        {course?.courseTitle}
      </CardTitle>
      <CardDescription className="flex items-center gap-2">
        <User className="w-4 h-4" />
        {course?.creator?.name}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button className="w-full" size="sm" onClick={()=>selectCourseHandler(course?._id)}>
        <Play className="w-4 h-4 mr-2" />
        Continue Learning
      </Button>
    </CardContent>
  </Card>
    )
  }

const SkeletonCard = () => (
  <Card className="animate-pulse">
    <CardHeader className="pb-3">
      <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
    </CardHeader>
    <CardContent>
      <div className="h-9 w-full bg-gray-200 dark:bg-gray-700 rounded" />
    </CardContent>
  </Card>
);

export default MyLearning;
