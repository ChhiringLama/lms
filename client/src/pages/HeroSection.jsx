import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Course from "./student/Course";
import Courses from "./Courses";
import CourseCategories from "./CourseCategories";
import Lecturers from "./Lecturers";
import Footer from "./Footer";

const HeroSection = () => {
  const navigate=useNavigate();
  const [searchQuery, setSearchQuery]=useState("");

  const searchHandler=(e)=>{
    e.preventDefault();
    if(searchQuery.trim() !== "")
    navigate(`/course/search?q=${searchQuery}`)
     setSearchQuery("")
  }

  return (
    <>
    <section
      className="font-funnel relative pt-40 pb-24 px-4 flex flex-col items-center justify-center text-center min-h-[60vh] overflow-hidden z-10"
      style={{
        backgroundImage: `url('/src/assets/work-net.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800 to-white opacity-80 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center w-full">
        <h2 className="text-2xl md:text-6xl font-extrabold  mb-4 drop-shadow-lg text-gray-100">
          Learn Something New Today
        </h2>
        <p className=" md:text-lg mb-8 max-w-2xl text-gray-100">
          Discover top courses and start your learning journey today.
        </p>
        <form onSubmit={searchHandler} className="flex flex-col md:flex-row gap-4 w-full max-w-xl justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            placeholder="Search for courses..."
            className="flex-1 px-4 py-3 rounded-md border border-sky-400 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          />
          <button type="submit" className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow transition">
            Search
          </button>
        </form>
        <button className="mt-8 px-8 py-3 bg-green-100 hover:bg-green-200 text-green-900 font-semibold rounded-full border border-green-300 shadow transition backdrop-blur">
          <span className="tracking-wide">Explore Courses</span>
        </button>
      </div>
    </section>
    <Courses/>
    <CourseCategories/>
    <Lecturers/>
    <Footer/>
    </>
  );
};

export default HeroSection;