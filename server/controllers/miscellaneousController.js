import { User } from "../models/userModel.js";
export const getLecturers = async (req, res) => {
    try {
        const topInstructors = await User.aggregate([
            // Match only instructors
            { $match: { role: "instructor" } },
            
            // Lookup courses created by this instructor
            {
                $lookup: {
                    from: "courses", // Ensure this matches your collection name
                    localField: "_id",
                    foreignField: "creator", // Changed from "instructor" to "creator"
                    as: "taughtCourses"
                }
            },
            
            // Unwind the courses array
            { $unwind: { path: "$taughtCourses", preserveNullAndEmptyArrays: true } },
            
            // Group and calculate total students
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    bio: { $first: "$bio" },
                    photoUrl: { $first: "$photoUrl" },
                    totalStudents: {
                        $sum: { $size: "$taughtCourses.enrolledStudents" } // Count students per course
                    },
                    courseCount: { $sum: 1 }
                }
            },
            
            // Sort by total students descending
            { $sort: { totalStudents: -1 } },
            
            // Limit to top 10 instructors
            { $limit: 10 },
            
            // Project final fields
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    bio: 1,
                    photoUrl: 1,
                    totalStudents: 1,
                    courseCount: 1
                }
            }
        ]);

        res.status(200).json(topInstructors);
    } catch (error) {
        console.error("Error fetching lecturers:", error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};