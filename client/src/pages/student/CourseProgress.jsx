import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from "@/features/api/courseProgressApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
// import { current } from "@reduxjs/toolkit";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useIsCoursePurchasedMutation } from "@/features/api/purchaseApi";
import { useSelector } from "react-redux";

const CourseProgress = () => {
  const { courseId } = useParams();

  const { data, isLoading, isError, isSuccess, refetch } =
    useGetCourseProgressQuery(courseId);
  const navigate = useNavigate();

  const [course, setCourse] = useState([]);
  const [courseStatus, setCourseStaus] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(0);
  const [courseProgress, setCourseProgress] = useState([]);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);

  const [updateLectureProgress] = useUpdateLectureProgressMutation()
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();

  const { user: { _id } } = useSelector((store) => store.auth);
  const [isCoursePurchased, { data: purchaseStatus }] =
    useIsCoursePurchasedMutation();

  useEffect(() => {
    if (_id) {
      const userId = _id;
      isCoursePurchased({ courseId, userId });
    }
  }, [_id, courseId]);
  useEffect(() => { }, [])

  const isLectureCompleted = (lectureId) => {
    // console.log("Checking completion for lecture:", lectureId);
    // console.log("Course progress data:", courseProgress);
    const isCompleted = courseProgress?.some(
      (prog) => prog.lectureId == lectureId && prog.viewed
    );
    return isCompleted;
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  };

  const handleLectureProgress = async (lectureId) => {
    if (!lectureId) {
      console.log("No lectureId provided");
      return;
    }

    console.log("Updating progress for lecture:", lectureId);

    try {
      setIsUpdatingProgress(true);
      const result = await updateLectureProgress({ courseId, lectureId });
      console.log("Progress update result:", result);
      toast.success("Lecture progress updated!");
      refetch();
    } catch (error) {
      console.error("Failed to update lecture progress:", error);
      toast.error("Failed to update lecture progress");
    } finally {
      setIsUpdatingProgress(false);
    }
  }

  useEffect(() => {
    if (data || isSuccess) {
      setCourse(data.data.courseDetails);
      setCourseProgress(data.data.progress);
      setCourseStaus(data.data.completed);
    }
  }, [data, isSuccess]);


  useEffect(() => {
    console.log("Toast useEffect triggered:", { completedSuccess, inCompletedSuccess, markCompleteData, markInCompleteData });

    if (completedSuccess) {
      console.log("Showing completion toast");
      toast.success(markCompleteData?.message || "Course marked as completed!");
      refetch();
    }

    if (inCompletedSuccess) {
      console.log("Showing incompletion toast");
      toast.success(markInCompleteData?.message || "Course marked as incomplete!");
      refetch();
    }
  }, [completedSuccess, inCompletedSuccess, markCompleteData, markInCompleteData, refetch])


  const handleCompleteCourse = async () => {
    try {
      console.log("Marking course as completed:", courseId);
      const result = await completeCourse(courseId);
      console.log("Complete course result:", result);
    } catch (error) {
      toast.error("Failed to mark course as completed");
      console.error("Error completing course:", error);
    }
  }

  const handleInCompleteCourse = async () => {
    try {
      console.log("Marking course as incomplete:", courseId);
      const result = await inCompleteCourse(courseId);
      console.log("Incomplete course result:", result);
    } catch (error) {
      toast.error("Failed to mark course as incomplete");
      console.error("Error incompleting course:", error);
    }
  }


  const initLecture = currentLecture || (course.lectures && course.lectures[0]);
  console.log(initLecture);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Failed to load course details</p>;

  //   const { courseTitle } = courseDetails;

  if (purchaseStatus?.purchased === false) {
    toast.error("Unethical Activity Detected")
    navigate(`/course-detail/${courseId}`)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex h-screen bg-gray-50">
        <div className="flex-2 w-2/3 p-8 pt-6 flex flex-col items-center">
          <div className="w-full max-w-3xl aspect-video bg-black rounded-xl shadow-2xl flex items-center justify-center border border-gray-300 mt-2">
            {isUpdatingProgress && (
              <div className="absolute z-10 bg-black bg-opacity-50 text-white p-2 rounded">
                Updating progress...
              </div>
            )}

            <video
              src={currentLecture?.videoUrl || initLecture?.videoUrl}
              controls
              controlsList="nodownload noremoteplayback"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initLecture?._id)
              }
              onEnded={() =>
                handleLectureProgress(currentLecture?._id || initLecture?._id)
              }
              className="w-full h-full rounded-xl bg-black"
              style={{ objectFit: "cover" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <h4 className="text-xl mt-4 font-semibold mb-4">{`Lecture ${course?.lectures?.findIndex(
            (lec) => lec?._id === (currentLecture?._id || initLecture?._id)
          ) + 1
            } : ${currentLecture?.lectureTitle || initLecture?.lectureTitle
            }`}</h4>

          {/* Lecture Description */}
          <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h5 className="font-medium text-gray-800 mb-3">Description</h5>
            <div className="text-gray-600 text-sm leading-relaxed">
              {currentLecture?.lectureDesc || initLecture?.lectureDesc ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentLecture?.lectureDesc || initLecture?.lectureDesc
                  }}
                />
              ) : (
                <p className="text-gray-500 italic">No description available for this lecture.</p>
              )}
            </div>
          </div>

          {(currentLecture?.pdfUrl || initLecture?.pdfUrl) && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">

              <a
                href={currentLecture?.pdfUrl || initLecture?.pdfUrl}
                target="_blank"
                // rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                <Button>
                  <svg
                    className="w-4 h-4 text-gray-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View PDF Attachment
                </Button>
              </a>
            </div>
          )}
        </div>
        {/* Right: Lecture List */}
        <div className="flex-1 w-1/3 p-6 overflow-y-auto border-l border-gray-200 bg-white">
          <h1>{course?.courseTitle || "Course Title"}</h1>
          <h2 className="text-xl font-bold mb-4">Lectures</h2>
          <div className="mb-5">

            <Button onClick={courseStatus ? handleInCompleteCourse : handleCompleteCourse}>
              {courseStatus ? <><CheckCircle /> <span>Completed</span> </> : "Mark as Completed"}
            </Button>
            <Button variant="outline" className="ml-2" onClick={() => navigate(`/course-detail/${courseId}`)}>
              View Store Page
            </Button>
          </div>
          <div className="space-y-3">
            {course?.lectures?.map((lecture, index) => (
              <div
                key={lecture._id}
                onClick={() => handleSelectLecture(lecture)}
                className={`cursor-pointer p-3 rounded-lg transition-colors ${lecture?._id === (currentLecture?._id || initLecture?._id)
                  ? "bg-blue-100 border-blue-300"
                  : "bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">
                      {index + 1}. {lecture?.lectureTitle}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {isLectureCompleted(lecture._id) ? (
                        <Badge
                          variant={"outline"}
                          className="bg-green-100 text-green-700 border-green-300"
                        >
                          ✓ Viewed
                        </Badge>
                      ) : (
                        <Badge
                          variant={"outline"}
                          className="bg-gray-100 text-gray-600 border-gray-300"
                        >
                          ○ Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
