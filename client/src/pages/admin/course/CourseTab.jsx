import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation,
} from "@/features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const { data: courseByIdData, isSuccess: getCourseSuccess } =
    useGetCourseByIdQuery(courseId);

  const [editCourse, { isLoading, error, data, isSuccess }] =
    useEditCourseMutation();

  const [removeCourse, {data:removeData,  isSuccess: removeSuccess, error: removeError }] =
    useRemoveCourseMutation();

  const [publishCourse] = usePublishCourseMutation();

  const [previewThumbnail, setPreviewThumbnail] = useState();

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  useEffect(() => {
    if (getCourseSuccess && courseByIdData) {
      setInput({
        courseTitle: courseByIdData.course.courseTitle,
        subTitle: courseByIdData.course.subTitle,
        description: courseByIdData.course.description,
        category: courseByIdData.course.category,
        courseLevel: courseByIdData.course.courseLevel,
        coursePrice: courseByIdData.course.coursePrice,
        courseThumbnail: courseByIdData.course.courseThumbnail,
      });
      setPreviewThumbnail(courseByIdData.course.courseThumbnail);
    }
  }, [getCourseSuccess, courseByIdData]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success("Course removed successfully");
      navigate("/admin/courses")
    } else if (removeError) {
      toast.error("Course removal failed");
      console.log(removeError);
    }
  }, [removeSuccess, removeError]);

  const handleRemoveCourse = async () => {
    await removeCourse(courseId);
  };

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    console.log("Category selected:", value);
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    console.log("Course Level selected:", value);
    setInput({ ...input, courseLevel: value });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Error to publish or unpublish course");
      console.log(err);
    }
  };

  //Get File
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    console.log(input.courseThumbnail);
    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated");
    }
    if (error) {
      toast.error(
        error.data.message || "An error occured when updating course."
      );
    }
    //eslint-disable-next-line
  }, [isSuccess, error]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic course information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you are done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button variant="destructive" onClick={handleRemoveCourse}>
           <Trash2></Trash2> Remove Course
          </Button>
        </div>
     
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Mobile Programming"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Learn to write the best Mobile app"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={input.category || "Select a Category"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Topics</SelectLabel>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="System Design">System Design</SelectItem>
                    <SelectItem value="Database Management">
                      Database Management
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={input.courseLevel || "Difficulty"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulties</SelectLabel>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in NPR</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder={input.coursePrice || " "}
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div className="flex items-end gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/courses")}>
              <ArrowLeft></ArrowLeft>
              Go Back
            </Button>
            <Button onClick={updateCourseHandler} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-2 animate-spin"></Loader2>
                  Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
