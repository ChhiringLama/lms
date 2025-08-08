import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { toast } from "sonner";
import Lecture from "./Lecture";
import { Loader2 } from "lucide-react";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState();
  const isLoading = false;
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const [createLecture, { data, isSuccess, error }] =
    useCreateLectureMutation();
  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };
  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch:refetchLecture,
  } = useGetCourseLectureQuery(courseId);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Successfully created a lecture");
      refetchLecture()
    } else if (error) {
      toast.error(error.data.message || "An error occured");
    }
    //eslint-disable-next-line
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Add lectures for your course.</h1>
        <h6 className="text-sm">Build your lecture below</h6>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="lectureTitle"
            placeholder=" Lecture Name"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          ></Input>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(`/admin/courses/${courseId}`)}>
            Go Back to Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
        <h5 className="text-center mt-7 text-gray-500 italic">Dont forget to save your lectures on main course page once you update lectures.</h5>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lecture...</p>
          ) : lectureError ? (
            <p>Failed to load lecture</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No lecture available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => {
              return (<Lecture
                key={lecture._id}
                lecture={lecture}
                index={index}
                courseId={courseId}
              />);
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
