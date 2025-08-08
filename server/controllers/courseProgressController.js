import { CourseProgress } from "../models/courseProgress.js";
import { Course } from "../models/courseModel.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    //Fetch user course progress

    let courseProgress = await courseProgress
      .findOne({ courseId, userId })
      .populate("courseId");

    const courseDeatils = await Course.findById(courseId);

    if (!courseDeatils) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    //Step-2 , If no progress found, return course details with an empty progress
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDeatils,
          progress: [],
          completed: false,
        },
      });
    }

    //Step-3 Return the users course progress along with course details

    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    //fetch or create course progress
    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      //Create a new progress
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    //Find the lecture progress in the course progress
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      //If lecture already exist, update its status
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    }else{
        //Add new lecture progress
    }
  } catch (error) {
    console.log(error);
  }
};
