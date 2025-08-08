import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import style from "./Lecture.module.css";
import { Button } from "@/components/ui/button";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };

  return (
    <div className={style.listContainer}>
      <div className={style.listItem}>
        <h1 className={style.itemsText}>
          {index + 1} : {lecture.lectureTitle}
        </h1>
        <Button
          className={style.itemsIcon}
          size={20}
          onClick={goToUpdateLecture}
        >
          {" "}
          Edit{" "}
        </Button>
      </div>
    </div>
  );
};

export default Lecture;
