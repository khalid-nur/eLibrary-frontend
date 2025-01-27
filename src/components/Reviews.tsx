import StarsReview from "./StarsReview";
import { Review } from "../models/review";
import { formatDate } from "../utils/dateFormatter.ts";

interface ReviewProps {
  review: Review;
}

const Reviews = ({ review }: ReviewProps) => {
  return (
    <div>
      <h3 className="font-semibold">{review.userEmail}</h3>
      <p className="text-sm text-gray-500 mt-1">{formatDate(review.date)}</p>
      <p className="mt-2">{review.reviewDescription}</p>

      <div className="flex justify-end">
        <StarsReview rating={review.rating} />
      </div>
    </div>
  );
};

export default Reviews;
