import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Layers, Tag, User } from "lucide-react";

const Course = ({ course }) => {
  return (
    <div
      key={course.id}
      className="font-funnel bg-white rounded-lg shadow hover:shadow-lg transition  flex flex-col"
    >
      <img
        src={course.courseThumbnail}
        alt="course thumbnail"
        className="h-48 w-full object-cover rounded"
      />
      <div className="p-4">

        <h3 className="font-hedvig font-semibold text-lg mb-1 truncate">{course.courseTitle}</h3>
        <div className="flex gap-2 items-center mb-3">
          < Layers className="h-4 w-4"></Layers><span className="text-gray-500 text-sm"> {course.category}</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">

            <Avatar>
              <AvatarImage src={course.creator.photoUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <span className="block font-semibold text-sm text-green-900">{course.creator.name}</span>
              <span className="font-bold text-gray-600">Rs {course.coursePrice}</span>
            </div>
          </div>
          <a href={`course-detail/${course._id}`}>
            <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded text-sm font-semibold">
              Enroll
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Course;
