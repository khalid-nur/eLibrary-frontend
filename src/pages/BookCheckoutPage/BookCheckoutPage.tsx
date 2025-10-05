import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useBookById } from "../../hooks/useBook";
import { PulseLoader } from "react-spinners";
import LatestReviews from "./LatestReviews";
import BookCheckoutCard from "./components/BookCheckoutCard";
import NotFoundPage from "../NotFoundPage";

const BookCheckoutPage = () => {
  const [showReviews, setShowReviews] = useState(false);

  const { bookId } = useParams();
  const { data: bookData, isLoading: isBookLoading, error: bookError, isError } = useBookById(bookId);

  if (isBookLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PulseLoader size={12} />
      </div>
    );
  }

  if (isError || bookError) {
    return <NotFoundPage message={bookError.response.data.message} linkTo="/search" linkText="Explore our Library" />;
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

          <BookCheckoutCard book={bookData} />
        </div>

        <div className="mt-12 pt-8 md:w-1/2">
          <div className="flex space-x-8 border-b pb-4">
            <button
              className={`text-gray-800  ${!showReviews && "border-b-2 border-gray-800 font-semibold"}`}
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
                <LatestReviews bookId={bookData?.id} />
              ) : (
                <div>
                  <h2 className="text-lg font-poppins font-semibold text-gray-800">Category: {bookData?.category}</h2>
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
