import { Course } from '../models/courseModel.js';
import { Review } from '../models/reviewsModel.js';

export const createReview = async (req, res) => {
    try {
        const { courseId, message: body, rating } = req.body;
        const author = req.id;
        const reviewBody = { author, body, rating }

    
        const course = await Course.findById(courseId)

        const newReview = new Review(reviewBody);
        course.reviews.push(newReview);

        await newReview.save();
        await course.save();
        console.log(newReview)

        res.status(200).json({
            message: "Success"

        })

    } catch (error) {
        console.log(error)
        res.status(400).json(
            {
                message: "An error occured",
                error
            }
        )
    }
}