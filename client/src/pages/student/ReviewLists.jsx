
import style from './ReviewLists.module.css'

const CheckAndReturnStar = ({ num }) => {
    const starCount = Math.min(num, 5);
    const stars = Array.from({ length: starCount }, (_, i) => "★").join("");
    return <span>{stars}</span>;
}

const SingleReview = ({review}) => {
    return (
        <div className={`${style.singleBox}`}>
            <div className={`${style.userBox}`}>
                <div>
                    <img src={`${review?.author?.photoUrl}` } className={`${style.userBox}`}></img>
                    <h3 className={`font-funnel mb-0`}>{review.author.name}</h3>
                    <span className={style.starRatingNum}><CheckAndReturnStar num={review.rating}/></span>
                </div>
            </div>
            <div>
                <p>{review.body}</p>
            </div>
        </div>
    )
}

const ReviewsSection = ({ reviewsList }) => {
    console.log(reviewsList)

    return (
        <section className="mt-10">
            <h2 className="font-funnel text-2xl font-bold mb-2 text-gray-800">
                Student Reviews
            </h2>
            <div className={`${style.reviewList}`}>
                {reviewsList ? 
                    reviewsList?.map((review) => {
                       return  <SingleReview review={review} key={review._id}/>
                    })
                    : "No Reviews found"
                }
            </div>

        </section>
    );
};




export default ReviewsSection;
