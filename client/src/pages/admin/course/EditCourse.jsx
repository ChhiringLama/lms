import { Button } from "@/components/ui/button";

import { Link, useNavigate, useParams } from "react-router-dom";
import CourseTab from "./CourseTab";
import styles from "./EditCourse.module.css";

const EditCourse = () => {
  const params = useParams();
  const id = params.courseId;
  const navigate = useNavigate();

  // const navigate=useNavigate();
  return (
    <div className="flex-1 ">
      <div className="font-newsreader flex items-center justify-between mb-5">
        <div>
          <h1 className="font-semibold text-xl">Add details for your course</h1>
          <span>Once the basic details are set, Continue to lectures page</span>
        </div>
        <div>
          <Link to={`/dashboard/courses/${id}/lecture`}>
            <button className={`${styles.btn1} font-funnel`}>
              {"Go to lectures pages"}
            </button>
          </Link>

        </div>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
