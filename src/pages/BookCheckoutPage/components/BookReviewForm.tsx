import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useIsBookReviewedByUser } from "../../../hooks/useReview";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { bookRatingOptions } from "../../../constants/bookRatingOptions";

interface BookReviewFormProps {
  bookId?: string;
}

const BookReviewForm = ({ bookId }: BookReviewFormProps) => {
  const { isAuthenticated } = useAuthContext();
  const { data: isReviewed } = useIsBookReviewedByUser(bookId);

  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setRating(null);
    setReviewDescription("");
    setShowReviewForm(false);
  };

  const openReviewForm = () => setShowReviewForm((prev) => !prev);

  return (
    <div className="mt-8">
      {!isAuthenticated && (
        <div>
          <p className="text-gray-500 mt-4">
            Sign in to be able to leave a review.
          </p>
        </div>
      )}

      {isAuthenticated && isReviewed && (
        <p className="font-medium text-gray-600">Thank you for your review</p>
      )}

      {isAuthenticated && !isReviewed && bookId && (
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <button
              type="button"
              onClick={openReviewForm}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-2 transition-all duration-200"
            >
              Leave a review
              <span className="ml-1">
                {showReviewForm ? (
                  <FaChevronUp size={12} />
                ) : (
                  <FaChevronDown size={12} />
                )}
              </span>
            </button>

            <AnimatePresence>
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <select
                      value={rating || ""}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-orange-500 transition-all duration-200"
                      required
                    >
                      <option value="">Select a rating</option>
                      {bookRatingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4"
                  >
                    <label className="block text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={reviewDescription}
                      onChange={(e) => setReviewDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-orange-500 transition-all duration-200"
                      rows={4}
                      placeholder="Optional"
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="relative h-12 w-36 flex items-center justify-center overflow-hidden rounded-2xl border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-full before:w-8 before:translate-x-16 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                  >
                    Submit
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookReviewForm;
