import {
  BookOpen,
  Users,
  TrendingUp,
  FileText,
  Calendar,
  Award,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Statbox from "./admin/Statbox.jsx";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import {
  useGetTotalSalesQuery,
} from "@/features/api/purchaseApi";
import { useGetActivityQuery, usePushActivityMutation } from "@/features/api/authApi";

const Dashboard = () => {
  const { userRole } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);


  //Fetch all course  
  const {
    data: instructorCourses,
    isLoading: instCLoading,
    isSuccess: instCSuccess,
  } = useGetCreatorCourseQuery();

  const [totalCourses, setTotalCourses] = useState("0");
  const [enrolledStd, setEnrolledStd] = useState("0");
  const [totalLectures, setTotalLectures] = useState("0");
  const [totalSales, setTotalSales] = useState("0");

  const { data: totalSl, isSuccess: totalSlSuccess, isLoading } = useGetTotalSalesQuery();
  useEffect(() => {
    setTotalSales(totalSl?.totalSales);
  }, [totalSlSuccess, totalSl]);

  useEffect(() => {
    if (instCSuccess) {
      console.log(instructorCourses);

      const tc = instructorCourses.courses.length;

      const tl = instructorCourses.courses.reduce((acc, course) => {
        return acc + course.lectures.length;
      }, 0);

      //Setting the total enrolled students
      const es = instructorCourses.courses.reduce((acc, course) => {
        return acc + course.enrolledStudents.length;
      }, 0);

      setTotalCourses(tc);
      setEnrolledStd(es);
      setTotalLectures(tl);

      // setTotalCourses(tc);
    }
  }, [instCSuccess, instructorCourses]);

  // Redirect students to their learning dashboard, instructors stay here
  useEffect(() => {
    if (userRole === "student") {
      setIsRedirecting(true);
      navigate("/dashboard/my-learning");
    }
  }, [userRole, navigate]);



  // If student, show loading while redirecting
  if (userRole === "student" || isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">
            Redirecting to your learning dashboard...
          </p>
        </div>
      </div>
    );
  }
  

  const { data: recentActivities, isSuccess: getAcSuccess, isLoading: getALoading } = useGetActivityQuery();

  console.log(recentActivities)



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your courses.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Statbox
          title={"Total Courses"}
          value={totalCourses}
          description={"Active courses"}
          txtcolor={`text-orange-600`}
          bgColor={`bg-orange-50`}
          icon={BookOpen}
        />
        <Statbox
          title={"Total Students"}
          value={enrolledStd}
          description={"Enrolled students"}
          txtcolor={`text-green-600`}
          bgColor={`bg-green-50`}
          icon={Users}
        />
        <Statbox
          title={"Total Lectures"}
          value={totalLectures}
          description={"Course content"}
          txtcolor={`text-purple-600`}
          bgColor={`bg-purple-50`}
          icon={FileText}
        />
        <Statbox
          title={"Total Sales"}
          value={totalSales || 0}
          description={"Sales made"}
          txtcolor={`text-orange-600`}
          bgColor={`bg-orange-50`}
          icon={TrendingUp}
        />
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">

              {getALoading ? (
                <h4>Loading please wait</h4>
              ) : recentActivities?.activities?.length > 0 ? (
                recentActivities.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.actionDes}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {activity.timestamp}
                    </span>
                  </div>
                ))
              ) : (
                <p>No recent activities</p>
              )}


            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={()=>{
                  navigate(`/dashboard/courses/create`)
                }}
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  Create New Course
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Start building a new course
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
