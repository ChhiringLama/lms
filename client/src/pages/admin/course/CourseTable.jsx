import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";


const CourseTable = () => {
  const navigate=useNavigate();

  const {data, isLoading } = useGetCreatorCourseQuery();



  if(isLoading)
    return <h1>Loading</h1>

  console.log(data);

  return (
    <div className="">
      <Button className="mb-2">
        <Link to="create">Create a new Course</Link>
      </Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((course) => (
            <TableRow key={course._id}>
              <TableCell><bold>Rs </bold> {course?.coursePrice || "NA"}</TableCell>
              <TableCell><Badge variant={course?.isPublished ? "verified" : "destructive"}>{course?.isPublished ? "Published" : "Draft"}</Badge></TableCell>
              <TableCell className="font-medium">{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline" onClick={()=>{navigate(`${course._id}`)}}><Edit></Edit></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  );
};

export default CourseTable;
