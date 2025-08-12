import { ChartBar, BookOpen, Home, Settings, Users, FileText, GraduationCap, User, BookOpenCheck } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { user, userRole } = useSelector(state => state.auth);

  // Role-based navigation items
  const getNavigationItems = () => {
    if (userRole === "student") {
      return [
        {
          name: "Profile",
          href: "profile",
          icon: User,
          description: "View and edit profile"
        },
        {
          name: "My Learning",
          href: "my-learning",
          icon: BookOpenCheck,
          description: "Track your progress"
        },
     
      ];
    } else if (userRole === "instructor") {
      return [
        {
          name: "Dashboard",
          href: "dashboard",
          icon: Home,
          description: "Overview and analytics"
        },
        {
          name: "Courses",
          href: "courses",
          icon: BookOpen,
          description: "Manage course content"
        },
        {
          name: "Profile",
          href: "profile",
          icon: User,
          description: "View and edit profile"
        }
      ];
    }
    return [];
  };

  const navigationItems = getNavigationItems();

  const isActive = (href) => {
    return location.pathname.includes(href);
  };

  const getRoleDisplayName = () => {
    return userRole === "student" ? "Student Account" : "Instructor Account";
  };

  const getRoleColor = () => {
    return userRole === "student" 
      ? "from-blue-500 to-purple-600" 
      : "from-green-500 to-emerald-600";
  };

  if (!user || !userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex mt-14 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="sticky top-0 h-screen overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center",
                getRoleColor()
              )}>
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Welcome {user.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getRoleDisplayName()}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActiveRoute = isActive(item.href);

              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActiveRoute ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start h-12 px-4 text-left mb-2",
                      isActiveRoute
                        ? "bg-gray-700 dark:bg-blue-950 text-gray-100 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 mr-3",
                      isActiveRoute ? "text-gray-6100 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                    )} />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{item.name}</span>
                     
                    </div>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userRole === "student" ? "Student Portal" : "Instructor Portal"} v1.0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
