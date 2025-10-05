import { useState } from "react";
import StarsReview from "../../components/StarsReview";
import Pagination from "../../components/Pagination";
import { useParams } from "react-router-dom";
import { useBookAverageRating, useBookReviewById } from "../../hooks/useReview";
import Reviews from "../../components/Reviews";
import { PulseLoader } from "react-spinners";
import NotFoundPage from "../NotFoundPage";

const ReviewListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  const { bookId } = useParams();

  const { data: reviews, isLoading, error, isError } = useBookReviewById(bookId, currentPage - 1, reviewsPerPage);
  const { data: averageRating } = useBookAverageRating(bookId);

  const totalAmountOfReviews = reviews ? reviews.totalElements : 0;
  const totalPages = reviews ? reviews.totalPages : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PulseLoader size={12} />
      </div>
    );
  }

  if (isError || error) {
    return <NotFoundPage message={error.response.data.message} linkTo="/search" linkText="Explore our Library" />;
  }
  return (
    <section className="bg-white min-h-screen flex flex-col">
      <div className="container mx-auto px-6 py-12 md:py-16 flex-grow">
        <div className="mt-20 md:mt-28">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <div className="w-full">
              <h2 className="font-bold font-poppins text-2xl text-gray-900  mb-8 text-center md:text-3xl xl:text-4xl">
                Our customer reviews
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-11 pb-5 max-xl:max-w-2xl max-xl:mx-auto">
                <div className="flex flex-col gap-y-4 w-full">
                  <div className="p-7 rounded-3xl flex items-center justify-center flex-col">
                    <h2 className="font-bold text-4xl text-center text-orange-500 mb-6 xl:text-5xl">Total Reviews</h2>
                    <p className="font-medium text-xl leading-8 text-gray-600 text-center">
                      {totalAmountOfReviews} Reviews
                    </p>
                  </div>
                </div>

                <div className="p-7 bg-wrapper rounded-3xl flex items-center justify-center flex-col">
                  <h2 className="font-bold text-4xl text-center text-orange-500 mb-6 xl:text-5xl">Average Rating</h2>
                  <div className="flex items-center justify-center gap-2 sm:gap-6 mb-4">
                    <p className="text-gray-600 text-2xl font-semibold">{averageRating}</p>
                    <StarsReview rating={averageRating ?? 0.0} />
                  </div>
                </div>
              </div>

              <div className="border border-t-0 border-orange-400/30 my-4"></div>

              <div className="pt-5">
                {reviews?.content.map((review) => (
                  <div key={review.id}>
                    <Reviews review={review} />
                    <div className="border border-t-0 border-gray-400/15 my-4"></div>
                  </div>
                ))}
              </div>

              <div className="container mx-auto px-6 py-4">
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewListPage;
