import { Button } from "@/components/ui/button";

const SimilarCourses = ({ allCourses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allCourses?.map((course) => (
        <CourseBox key={course._id} course={course} />
      ))}
    </div>
  );
};

const CourseBox = ({ course }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h4 className="text-m font-funnel text-gray-600 font-semibold">{course.courseTitle}</h4>
      <p className="text-sm text-gray-500 mb-2">{course.courseLevel.charAt(0).toUpperCase() + course.courseLevel.slice(1)}</p>
      <p className="text-green-600 font-bold mb-4">Rs {course.coursePrice}</p>
      <Button  variant="secondary">
         <a href={`${course._id}`}>
        View Course
         </a>
      </Button>
    </div>
  );
};

export default SimilarCourses;
