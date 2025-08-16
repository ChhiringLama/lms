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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Lectern, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDesc, setLectureDesc] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasVideo, setVideoStatus] = useState(false)
  const params = useParams();
  const { courseId, lectureId } = params;
  const [removeLecture, { isLoading: removeLoading, isSuccess: removeSuccess },] = useRemoveLectureMutation();
  const [editLecture, { isLoading: isEditLoading, isSuccess: isEditSuccess, error: editError },] = useEditLectureMutation();
  const { data: lectureData } = useGetLectureByIdQuery(lectureId, { skip: !lectureId, });
  const [pdfInfo, setPdfInfo] = useState(null);

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  const editLectureHandler = async () => {
    const title = lectureTitle || lectureData?.lecture?.lectureTitle;
    await editLecture({
      lectureTitle: title,
      videoInfo: uploadVideoInfo,
      courseId,
      lectureDesc,
      lectureId,
      pdfInfo,
      isPreviewFree: isFree,
    });
  };
  const MEDIA_API = "http://localhost:8080/api/v1/media";

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        //10:03 Time Stamp
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            // Example : "http://res.cloudinary.com/dej31pf0h/video/upload/v1753787664/cdozdldnhdcnvg2gumwk.mp4"
            videoUrl: res.data.data.url,
            //Cloudinary ma k id ko marfat save vayeko cha
            publicId: res.data.data.public_id,
          });

          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const pdfChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setUploadProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-pdf`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setPdfInfo({
            pdfUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "PDF upload failed");
      } finally {
        setPdfProgress(false);
      }
    }
  };


  useEffect(() => {
    if (lectureData) {
      setLectureTitle(lectureData.lecture.lectureTitle);
      setLectureDesc(lectureData.lecture.lectureDesc)
      setIsFree(lectureData.lecture.isPreviewFree);
      if (lectureData.lecture.videoUrl) {
        setVideoStatus(true)
      }

    }
  }, [lectureData]);

  useEffect(() => {
    if (isEditSuccess) {
      toast.success("Lecture updated successfully");
    }
    if (editError) {
      toast.error(editError.data.message);
    }
  }, [isEditSuccess, editError]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success("Lecture removed successfully");
    }
  })

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription>Make changes and click when done</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" onClick={removeLectureHandler}>
              {
                removeLoading ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please await
                </> : "Remove Lecture"
              }

            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="EX: Introduction to Java"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
            ></Input>
          </div>
          <div className="my-5">
            <Label>Lecture Description</Label>
            <Input
              type="text"
              placeholder="EX: In This lecture youll learn about .... "
              value={lectureDesc}
              onChange={(e) => setLectureDesc(e.target.value)}
            ></Input>
          </div>
          <div className="my-5">
            <Label>
              {" "}
              Video <span className="text-red-500 mb">*</span>
            </Label>
            <Input
              type="file"
              accept="video/*"
              className="w-fit"
              onChange={fileChangeHandler}
            ></Input>
            <h6 className="text-red-500 font-bold text-sm mt-3">{hasVideo ? "Video is already set" : ""}</h6>
          </div>
          <div className="my-5">
            <Label>
              PDF (optional)
            </Label>
            <Input
              type="file"
              accept=".pdf,.pptx" 
              className="w-fit"
              onChange={pdfChangeHandler}
            />
           
          </div>

          <div>
            <Switch
              id="free"
              checked={isFree}
              onCheckedChange={() => setIsFree(!isFree)}
            />
            <Label htmlFor="free"> This lecture is free</Label>
          </div>
          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress}></Progress>{" "}
              <p>{uploadProgress} % uploaded</p>
            </div>
          )}
          <div className="mt-4">
            <Button
              disabled={mediaProgress || isEditLoading}
              onClick={editLectureHandler}
            >
              {isEditLoading ? "Updating..." : "Update Course"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureTab;
