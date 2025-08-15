import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Icon } from "lucide-react";

const Statbox = ({ title, value, description, txtcolor, bgcolor, icon }) => {
  const Icon = icon;

  

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-l ${txtcolor}`}>
          <Icon className={`w-4 h-4 ${icon} ${bgcolor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {title == "Total Sales" ? `Rs ${value}` : `${value}`}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default Statbox;
