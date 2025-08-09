import { Link } from "react-router-dom";

const CourseBox = ({ course }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <Link to={`/course-detail/${course._id}`}>
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-600 text-sm">{course.subTitle}</p>
        <h5>{course.isPublished ? "Published" : "Not Published"}</h5>
        <p className="text-gray-600 text-sm mb-2">{course.creator?.name}</p>
        <p className="text-green-600 font-bold">NPR {course.coursePrice}</p>
      </Link>
    </div>
  );
};

export default CourseBox;
