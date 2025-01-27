import { useBookReviewById } from "../../hooks/useReview";
import { Link } from "react-router-dom";
import Reviews from "../../components/Reviews";

interface LatestReviewsProps {
  bookId: string | undefined;
}

const LatestReviews = ({ bookId }: LatestReviewsProps) => {
  const initialPage = 0;
  const latestReviewsLimit = 3;

  const {
    data: reviewData,
    isLoading: isReviewLoading,
    error: reviewError,
  } = useBookReviewById(bookId, initialPage, latestReviewsLimit);

  if (isReviewLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="flex justify-end">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Reviews</h2>

      {reviewData && reviewData.content.length > 0 ? (
        <>
          {reviewData?.content.map((review) => (
            <Reviews key={review.id} review={review} />
          ))}

          <div className="my-3">
            <Link
              type="button"
              className="text-orange-500 font-medium"
              to={`/`}
            >
              View all reviews
            </Link>
          </div>
        </>
      ) : (
        <div className="m-3">
          <p className="lead">
            There are no reviews for this book at the moment
          </p>
        </div>
      )}
    </div>
  );
};

export default LatestReviews;
