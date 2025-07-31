import StarsReview from "./StarsReview";
import { Review } from "../models/review";
import { formatDate } from "../utils/dateFormatter.ts";
import { useState } from "react";

interface ReviewProps {
  review: Review;
}

const Reviews = ({ review }: ReviewProps) => {
  const [showFullReview, setShowFullReview] = useState(false);
  const textReviewLimit = 1000;

  return (
    <div>
      <h3 className="font-semibold">{review.userEmail}</h3>
      <p className="text-sm text-gray-500 mt-1">{formatDate(review.date)}</p>
      <p
        className={`mt-2 text-gray-700   ${
          showFullReview ? "line-clamp-none " : "line-clamp-5 "
        }`}
      >
        {review.reviewDescription}
      </p>

      {review.reviewDescription?.length > textReviewLimit && (
        <button
          onClick={() => setShowFullReview(!showFullReview)}
          className="mt-1 text-sm font-medium hover:underline text-orange-500 transition-all duration-500"
        >
          {showFullReview ? "Read less" : "Read more"}
        </button>
      )}

      <div className="flex justify-end">
        <StarsReview rating={review.rating} />
      </div>
    </div>
  );
};

export default Reviews;
