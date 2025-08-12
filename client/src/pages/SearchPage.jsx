import { useState } from "react";
import Filter from "@/components/ui/Filter.jsx";
import CourseBox from "@/components/ui/CourseBox.jsx";

import { useGetSearchedCoursesQuery } from "@/features/api/courseApi";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");


  const { data, isLoading } = useGetSearchedCoursesQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  // const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };


  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-5">
      <div className="my-6">
        <h1 className="text-2xl font-bold font-funnel">Results for {query}</h1>
        <p className="text-gray-600 font-funnel">Showing results for {query}</p>
      </div>

      <div className="flex gap-6">
        <div className="w-1/4">
          <Filter handleFilterChange={handleFilterChange} />
        </div>

        <div className="w-3/4">
          {isLoading ? (
            <ResultSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.courses?.map((course, index) => (
                <CourseBox key={index} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ResultSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-sm bg-gray-100 animate-pulse"
        >
          <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
