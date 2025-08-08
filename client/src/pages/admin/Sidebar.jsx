import { ChartNoAxesColumn, Outdent, SquareLibrary } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="  flex">
      <div className="hidden lg:block w-[234px] sm:w-[300px] space-y-8 border-gray-300 bg-[#f0f0f0] p-5 sticky top-0 h-screen dark:border-gray-700">
        <div className="mt-20 space-y-4 font-newsreader">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h2>Dashboard</h2>
          </Link>
          <Link to="courses" className="flex items-center gap-2">
            <SquareLibrary size={22}></SquareLibrary>
            <h2>Courses</h2>
          </Link>
        </div>
      </div>
      <div className="flex-1 md:pt-24 pl-10 pr-10 pt-2 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
