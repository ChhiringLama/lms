import { useNavigate, useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BuyCourseButton from "@/components/ui/BuyCourseButton";
import {
  useGetCourseDetailWithStatusQuery,
  useIsCoursePurchasedMutation,
} from "@/features/api/purchaseApi";
import { useEffect, useState } from "react";
import LectureAccordion from "@/components/ui/LectureAccordion";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import style from "./CourseDetail.module.css";
import { toast } from "sonner";

import { useCreateReviewMutation } from "@/features/api/reviewApi";
import Footer from "../Footer";
import ReviewForm from "./ReviewForm";

const CourseDetail = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState({});
  const [purchased, setPurchase] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();
  const { userRole } = useSelector((store) => store.auth);
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);
  const { user } = useSelector((store) => store?.auth);
  const [isCoursePurchased, { data: purchaseStatus }] = useIsCoursePurchasedMutation();
  const [createReview, { isSuccess: reviewCSuccess , error:reviewCError}] = useCreateReviewMutation()
  const [rating, setRating] = useState("3")
  const [message, setMessage] = useState()

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/dashboard/course-progress/${courseId}`);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value)
  }

  const handleRatingSubmit = () => {
    console.log(message, rating, courseId)
    if(message.length < 10){
      toast.error("Message too short")
    }else{
      createReview({ message, rating, courseId })
    }
  }

  useEffect(()=>{
    if(reviewCError){
      toast.error(reviewCError)
    }
  },[reviewCError])

  useEffect(()=>{
    if(reviewCSuccess){
      toast.success("Review Posted")
      setMessage("")
      setRating("3")
    }
  },[reviewCSuccess])

  useEffect(() => {
    if (user?._id) {
      const userId = user._id;
      isCoursePurchased({ courseId, userId });
    }
  }, [user?._id, courseId]);

  useEffect(() => {
    if (data) {
      setCourse(data.course);
      document.title = `${data.course.courseTitle}`;
      // Set the initial video URL to the first lecture's video
      if (
        data.course?.lectures?.length > 0 &&
        data.course.lectures[0].videoUrl
      ) {
        setVideoUrl(data.course.lectures[0].videoUrl);
      }
    }
  }, [data]);

  useEffect(() => {
    if (purchaseStatus?.purchased == true) {
      console.log(purchaseStatus);
      setPurchase(true);
    }
  }, [purchaseStatus])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isError) return <h1>Failed to load course details</h1>;

  return (
    <div className="mt-14 space-y-10">
      {/* Landing Section */}
      <div
        className="py-10 px-5 md:px-20"
        style={{ backgroundColor: "#0b0c0b" }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <img
            src={course?.courseThumbnail}
            alt={course?.courseTitle}
            className="w-96 h-64 object-cover rounded-lg shadow-md"
          />
          <div className="space-y-6">
            <h1 className="font-funnel text-4xl font-bold text-white">
              {course?.courseTitle || "Course Title Here"}
            </h1>
            <p className="text-white text-gray-200">
              {course?.subTitle ||
                "Course subtitle, with something a bit longer than the course"}
            </p>
            <p className="text-sm text-white">
              Created by:{" "}
              <span className="font-semibold">
                {course?.creator?.name || "Creator name here"}
              </span>
            </p>
            <p className="text-sm text-white">
              Enrolled Students:{" "}
              <span className="font-semibold">
                {course?.enrolledStudents?.length || 0}
              </span>
            </p>

            {/* Course Stats Section */}
            <div className="flex items-center space-x-8 mt-6">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white text-sm">
                  <span className="font-semibold">
                    {course?.lectures?.length || 0}
                  </span>{" "}
                  Lectures
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white text-sm">Resources Available</span>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white text-sm">
                  Created:{" "}
                  <span className="font-semibold">
                    {course?.createdAt
                      ? new Date(course.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 px-5 md:px-20 relative">
        <div className="flex-1 space-y-6">
          {/* Description */}
          <div>
            <h2 className="font-funnel mb-2 text-2xl font-semibold text-gray-800">
              Description
            </h2>
            <p
              className="text-gray-600 text-justify"
              dangerouslySetInnerHTML={{ __html: course?.description }}
            ></p>
          </div>

          {/* Course Contents */}
          <Card>
            <CardHeader>
              <CardTitle>
                <h2>Course Contents</h2>
              </CardTitle>
              <CardDescription>
                {course?.lectures?.length || 0}{" "}
                {(course?.lectures?.length || 0) === 1 ? "Lecture" : "Lectures"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-0 m-0">
              <LectureAccordion lectures={course?.lectures || []} />
            </CardContent>
          </Card>
          <div>
            <h2 className="font-funnel mb-2 text-2xl font-semibold text-gray-800">
              Expected Outcome:
            </h2>
            <div
              className={`text-gray-600 text-justify ${style.listItemsCourse}`}
              dangerouslySetInnerHTML={{ __html: course?.expectedOutcome }}
            ></div>

            <ReviewForm handleRatingChange={handleRatingChange} setMessage={setMessage} purchaseStatus={purchaseStatus} handleRatingSubmit={handleRatingSubmit} />

          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 ">
          <div className="space-y-6 sticky top-20">
            {/* Video Demo */}
            <div className="aspect-video bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
              <video
                src={videoUrl}
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.5rem",
                }}
              >
                No video to show
              </video>
            </div>

            {/* Lecture Description */}
            {course?.lectures?.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {course.lectures[0]?.lectureTitle || "Lecture Description"}
                </h3>
                <div className="text-sm text-gray-600">
                  {course.lectures[0]?.lectureDesc ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: course.lectures[0].lectureDesc,
                      }}
                    />
                  ) : (
                    <p>No description available for this lecture.</p>
                  )}
                </div>
              </div>
            )}

            {/* Price and CTA */}
            <div className="p-6 border border-gray-300 rounded-lg shadow-md space-y-4">
              <div className="font-funnel flex justify-center gap-3 items-center">
                <img
                  src="/src/assets/003-price-tag.png"
                  className="w-7 h-7"
                ></img>
                <h3 className="text-gray-400">
                  Price: Rs{" "}
                  <span className="font-semibold text-3xl text-gray-800">
                    {course?.coursePrice || "1000"}
                  </span>{" "}
                </h3>
              </div>
              {userRole === "student" ? (
                purchased ? (
                  <button
                    onClick={handleContinueCourse}
                    className="font-funnel w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                  >
                    {" "}
                    Continue{" "}
                  </button>
                ) : (
                  <BuyCourseButton courseId={courseId} />
                )
              ) : (
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="font-funnel w-full h-12 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Login as Student to buy
                </Button>
              )}

              <div className="text-center ">
                <p className=" font-funnel mt-0 text-center text-gray-600 ">
                  Create an account now and buy the course.
                </p>
                <span className="text-center text-gray-500 text-sm">
                  Get the best course suited for you from us!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
