import Login from "./pages/Login";
import "./App.css";

import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import Profile from "./pages/student/Profile";
import MyLearning from "./pages/student/MyLearning";
import Sidebar from "./pages/admin/Sidebar";
import CourseTable from "./pages/admin/course/CourseTable";
import Dashboard from "./pages/admin/Dashboard";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />,
            <Courses />{" "}
          </>
        ),
      },
      {
        path: "login",
        element: (
          <>
            <Login />,
          </>
        ),
      },
      {
        path: "my-learning",
        element: (
          <>
            <MyLearning />,
          </>
        ),
      },
      {
        path: "profile",
        element: (
          <>
            <Profile />,
          </>
        ),
      },
      {
        path: "course/search",
        element: (
          <>
            <SearchPage />,
          </>
        ),
      },

      {

        path: "course-detail/:courseId",
        element: <CourseDetail />,
      },

      {

        path: "course-progress/:courseId",
        element: <CourseProgress />,
      },



      //Admin route starts from here


      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "courses",
            element: <CourseTable />,

          },
          {
            path: "courses/create",
            element: <AddCourse />,

          },
          {
            //Dynamic routing
            path: "courses/:courseId",
            element: <EditCourse />,

          },
          {
            //Dynamic routing
            path: "courses/:courseId/lecture",
            element: <CreateLecture />,

          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            //Dynamic routing
            path: "courses/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  // const [count, setCount] = useState(0)
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
