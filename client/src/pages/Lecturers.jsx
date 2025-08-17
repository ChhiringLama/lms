import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Users } from "lucide-react";


const Lecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const controller = new AbortController();
    const fetchLecturers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/miscellaneous/get-lecturers",
          {
            signal: controller.signal,
          }
        );

        console.log(response.data);
        setLecturers(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.message || "Failed to fetch lecturers");
          console.error("Error fetching lecturers:", err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchLecturers();

    return () => controller.abort(); // Cleanup function
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p>Loading lecturers...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className=" py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="font-funnel text-2xl md:text-4xl font-extrabold mb-6 text-gray-800">
            Browse Lecturers
          </h2>
          <p className="text-gray-600">
            Meet our top lecturers with the highest number of students.
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          className="mySwiper"
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {lecturers?.data?.map((lecturer) => (
            <SwiperSlide key={lecturer._id}>
              <Card className="rounded-xl border border-gray-200 bg-white">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={lecturer.photoUrl || "/default-avatar.png"}
                      alt={lecturer.name}
                      className="w-14 h-14 rounded-full object-cover border"
                    />
                    <div>
                      <CardTitle className="text-lg font-semibold leading-tight">
                        {lecturer.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                        {lecturer.email}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-4 pb-4 flex justify-between items-center border-t pt-3">
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <Users className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{lecturer.totalStudents} Students</span>
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <BookOpen className="h-4 w-4 mr-1 text-green-500" />
                    <span>{lecturer.courseCount} Courses</span>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Lecturers;
