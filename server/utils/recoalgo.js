import { Course } from "../models/courseModel.js";

export const getRecommendedCourses = async (currentCourseId) => {
  try {
    // Define courseLevel values for comparison
    const courseLevelValues = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
    };

    // Find the current course and its courseLevel
    const currentCourse = await Course.findById(currentCourseId).populate(
      "reviews"
    );

    console.log("Course found!");

    if (!currentCourse) {
      throw new Error("Course not found");
    }

    const { courseLevel } = currentCourse;

    // Fetch all courses with the same courseLevel, excluding the current course
    const similarLevelCourses = await Course.find({
      isPublished: true, // Only pick published courses
      _id: { $ne: currentCourseId }, // Exclude the current course
    }).populate("reviews");

    // Define min and max for courseLevel normalization
    const minLevel = 1; // beginner
    const maxLevel = 3; // advanced

    // Add review count for each course and calculate the weighted score
    const coursesWithScores = similarLevelCourses.map((course) => {
      // Normalize courseLevel using min-max normalization
      const levelScore =
        (courseLevelValues[course.courseLevel] - minLevel) /
        (maxLevel - minLevel);

      // Calculate the review count dynamically
      const reviewCount = course.reviews.length;

      // Normalize review count by scaling it based on max review count across all courses
      const normalizedReviewCount =
        reviewCount /
        Math.max(...similarLevelCourses.map((c) => c.reviews.length));

      // Calculate the weighted score for this course
      // Course level weight = 60%, Review count weight = 40%
      const score = 0.6 * levelScore + 0.4 * normalizedReviewCount;

      return { course, score };
    });

    // Sort by score (highest first) and limit results to top 5 recommendations
    const sortedCourses = coursesWithScores
      .sort((a, b) => b.score - a.score) // Sort by weighted score in descending order
      .slice(0, 5) // Limit to top 5 recommendations
      .map((item) => item.course); // Return only the course objects

    return sortedCourses.slice(0,3);
  } catch (error) {
    console.error("Error in getRecommendedCourses:", error);
    throw error;
  }
};