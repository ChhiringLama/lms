import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { AlertOctagon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { usePushActivityMutation } from "@/features/api/authApi";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);

  const [createCourse, { data, error, isSuccess, isLoading }] =
    useCreateCourseMutation();
  const navigate = useNavigate();

  const createCourseHandle = async () => {
    if (courseTitle == " " || category == "" || coursePrice == 0) {
      toast.error("Please fill in all the input field")
    } else {
      await createCourse({ courseTitle, category, coursePrice });
    }

  };

  const [pushActivity, { isSuccess: pushSuccess }] = usePushActivityMutation();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  //To display message
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course created");
      pushActivity({ action: "Course Created", actionDes: courseTitle });
      navigate(-1);
    } else if (error) {
      console.log(error);
      toast.error(error.message || "Operation failed");
    }
    //eslint-disable-next-line
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Add course</h1>
        <h6 className="text-sm">Ready to publish?</h6>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            placeholder="Your Course Name"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          ></Input>
        </div>
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            name="coursePrice"
            value={coursePrice}

            onChange={(e) => setCoursePrice(e.target.value)}
          ></Input>
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={(value) => getSelectedCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Programming">Programming</SelectItem>
                <SelectItem value="System Design">System Design</SelectItem>
                <SelectItem value="Database Management">
                  Database Management
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandle}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
