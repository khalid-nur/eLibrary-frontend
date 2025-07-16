import { Link } from "react-router-dom";
import StarsReview from "../../../components/StarsReview";
import { Book } from "../../../models/book";
import BookCheckoutButton from "./BookCheckoutButton";
import BookReviewForm from "./BookReviewForm";

interface BookCheckoutCardProps {
  book?: Book;
}

const BookCheckoutCard = ({ book }: BookCheckoutCardProps) => {
  return (
    <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-12">
      <h1 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800">
        {book?.title}
      </h1>
      <p className="text-gray-600 mt-2 ">{book?.author}</p>
      <p className="text-gray-500 text-sm mt-1">
        {book?.copiesAvailable} out of {book?.copies} copies available
      </p>

      <StarsReview rating={3.5} />

      <p className="text-gray-700 mt-6 line-clamp-5">{book?.description}</p>

      <div className="mt-4 md:mt-8">
        <BookCheckoutButton bookId={book?.id} />
      </div>

      <div className="border border-t-0 border-orange-400/30 my-4 "></div>
      <BookReviewForm bookId={book?.id} />
    </div>
  );
};

export default BookCheckoutCard;
