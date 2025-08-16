import { User } from "../models/userModel.js";export const getLecturers = async (req, res) => {
    try {
        const topInstructors = await User.aggregate([
            // Match only instructors
            { $match: { role: "instructor" } },
            
            // Lookup courses created by this instructor
            {
                $lookup: {
                    from: "courses",
                    localField: "_id",
                    foreignField: "creator",
                    as: "taughtCourses"
                }
            },
            
            // Unwind the courses array
            { $unwind: { path: "$taughtCourses", preserveNullAndEmptyArrays: true } },
            
            // Add enrolledStudentsCount with null check
            {
                $addFields: {
                    enrolledStudentsCount: {
                        $cond: {
                            if: { $isArray: "$taughtCourses.enrolledStudents" },
                            then: { $size: "$taughtCourses.enrolledStudents" },
                            else: 0
                        }
                    }
                }
            },
            
            // Group and calculate totals
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    bio: { $first: "$bio" },
                    photoUrl: { $first: "$photoUrl" },
                    totalStudents: { $sum: "$enrolledStudentsCount" },
                    courseCount: { $sum: 1 }
                }
            },
            
            // Sort by total students descending
            { $sort: { totalStudents: -1 } },
            
            // Limit results
            { $limit: 10 }
        ]);

        res.status(200).json({
            success: true,
            data: topInstructors
        });

    } catch (error) {
        console.error("Error fetching lecturers:", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};