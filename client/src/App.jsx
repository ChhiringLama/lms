import Login from "./pages/Login";
import "./App.css";

import HeroSection from "./pages/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import MyLearning from "./pages/student/MyLearning";
import Sidebar from "./pages/Sidebar";
import CourseTable from "./pages/admin/course/CourseTable";
import Dashboard from "./pages/Dashboard";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/SearchPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import Verification from "./pages/Verification";

// Simple redirect component
const DashboardRedirect = () => {
  return <Dashboard />;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Public routes
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/browse-courses",
        element: <Courses />,
      },
      {
        path: "/course/search",
        element: <SearchPage />,
      },
      {
        path: "/course-detail/:courseId",
        element: <CourseDetail />,
      },
      {
        path: "/verification",
        element: <Verification />,
      },

      // Unified Dashboard Route - Both students and instructors use this
      {
        path: "/dashboard",
        element: <Sidebar />,
        children: [
          // Default dashboard route - will redirect based on role
          {
            path: "",
            element: <Dashboard />,
          },

          // Student routes
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "my-learning",
            element: <MyLearning />,
          },
          {
            path: "browse-courses",
            element: <Courses />,
          },
          {
            path: "course-progress/:courseId",
            element: <CourseProgress />,
          },

          // Instructor routes
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "courses",
            element: <CourseTable />,
          },
          {
            path: "courses/create",
            element: <AddCourse />,
          },
          {
            path: "courses/:courseId",
            element: <EditCourse />,
          },
          {
            path: "courses/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "courses/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
