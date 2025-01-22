import { useState } from "react";
import { motion } from "framer-motion"; // Add this import
import { Link, useParams } from "react-router-dom";
import { useBookById } from "../../hooks/useBook";
import { PulseLoader } from "react-spinners";
import StarsReview from "../../components/StarsReview";

const BookCheckoutPage = () => {
  const [showReviews, setShowReviews] = useState(false);

  const { bookId } = useParams();
  const {
    data: bookData,
    isLoading: isBookLoading,
    error: bookError,
  } = useBookById(bookId);

  if (isBookLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PulseLoader size={12} />
      </div>
    );
  }

  return (
    <section className="bg-white min-h-screen flex flex-col">
      <div className="container mx-auto px-6 py-12 md:py-16 flex-grow">
        <div className="flex flex-col md:flex-row items-center md:items-start  mt-20 md:mt-28">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={bookData?.img}
              alt={` ${bookData?.title} Book Cover`}
              className="rounded-lg shadow-lg min-w-72 w-96 "
            />
          </div>

          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-12">
            <h1 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800">
              {bookData?.title}
            </h1>
            <p className="text-gray-600 mt-2 ">{bookData?.author}</p>
            <p className="text-gray-500 text-sm mt-1">
              {bookData?.copiesAvailable} out of {bookData?.copies} copies
              available
            </p>

            <StarsReview rating={3.5} />

            <p className="text-gray-700 mt-6 line-clamp-5">
              {bookData?.description}
            </p>

            <div className="mt-4 md:mt-8">
              <Link
                to="/login"
                className="relative h-12 w-36 flex items-center justify-center overflow-hidden rounded-2xl border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-full before:w-8 before:translate-x-16 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
              >
                Sign In
              </Link>
            </div>

            <div className="border border-t-0 border-orange-400/30 my-4 "></div>
            <p className="text-gray-500 mt-4">
              Sign in to be able to leave a review
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 md:w-1/2">
          <div className="flex space-x-8 border-b pb-4">
            <button
              className={`text-gray-800  ${
                !showReviews && "border-b-2 border-gray-800 font-semibold"
              }`}
              onClick={() => setShowReviews(false)}
            >
              Description
            </button>
            <button
              className={`text-gray-600 hover:text-gray-800 ${
                showReviews && "border-b-2 border-gray-800 font-semibold"
              }`}
              onClick={() => setShowReviews(true)}
            >
              Reviews
            </button>
          </div>

          <div className="mt-6">
            <motion.div
              key={showReviews ? "reviews" : "description"}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {showReviews ? (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Reviews
                  </h2>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-poppins font-semibold text-gray-800">
                    Category: {bookData?.category}
                  </h2>
                  <p className="text-gray-700 mt-4">{bookData?.description}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCheckoutPage;
