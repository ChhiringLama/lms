import { useNavigate } from "react-router-dom";



const CourseCategories = () => {
  const navigate = useNavigate();

  // Dummy categories array
  const categories = ["Programming", "Design", "Marketing", "Business", "Math"
    , "Health", "Science", "Microprocessor", "Operating System", "Economics","Politics", "Marketing"
  ];

  const handleCategoryClick = (category) => {
    navigate(`/course/search?q=${encodeURIComponent(category)}`);
  };

  return (
    <section className={`font-funnel relative pt-20 pb-16 px-4 flex flex-col items-center justify-center text-center min-h-[40vh] overflow-hidden z-10 `}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-green-900  opacity-80 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center w-full">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-6 text-gray-100">
          Explore Categories
        </h2>
        <p className="md:text-lg mb-8 max-w-2xl text-gray-100">
          Browse courses by category and start learning today.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="px-4 py-3 bg-white hover:bg-green-100 text-green-900 font-semibold rounded-md shadow transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;