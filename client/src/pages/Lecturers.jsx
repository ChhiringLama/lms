
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Lecturers = () => {
  // Dummy data for lecturers
  const lecturers = [
    {
      id: 1,
      name: "John Doe",
      photo: "https://via.placeholder.com/150",
      students: 1200,
      bio: "Expert in Web Development",
    },
    {
      id: 2,
      name: "Jane Smith",
      photo: "https://via.placeholder.com/150",
      students: 950,
      bio: "Specialist in Graphic Design",
    },
    {
      id: 3,
      name: "Michael Brown",
      photo: "https://via.placeholder.com/150",
      students: 870,
      bio: "Data Science Enthusiast",
    },
    {
      id: 4,
      name: "Emily Davis",
      photo: "https://via.placeholder.com/150",
      students: 780,
      bio: "Marketing Guru",
    },
  ];

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
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {lecturers.map((lecturer) => (
            <SwiperSlide key={lecturer.id}>
              <Card className="shadow-md">
                <CardHeader className="flex flex-col items-center">
                  <img
                    src={lecturer.photo}
                    alt={lecturer.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <CardTitle className="text-lg font-semibold">
                    {lecturer.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{lecturer.bio}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 font-medium">
                    Students: {lecturer.students}
                  </p>
                  <Button variant="outline" className="mt-4">
                    View Profile
                  </Button>
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