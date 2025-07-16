import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  useCheckOutBook,
  useCurrentLoansCount,
  useIsBookCheckoutByUser,
} from "../../../hooks/useCheckout";

interface BookCheckoutButtonProps {
  bookId?: string;
}

const BookCheckoutButton = ({ bookId }: BookCheckoutButtonProps) => {
  const { isAuthenticated } = useAuthContext();
  const { data: isCheckedOut } = useIsBookCheckoutByUser(bookId);
  const { data: checkoutCount } = useCurrentLoansCount();
  const { mutate: checkoutBook } = useCheckOutBook(bookId);

  // Maximum number of books a user can check out at a time
  const maxBookCheckoutCount = 5;

  // Determine if the user can check out the book
  const canUserCheckout =
    !isCheckedOut && (checkoutCount ?? 0) < maxBookCheckoutCount;

  const checkoutHandler = () => {
    checkoutBook();
  };

  const renderButton = () => {
    if (!isAuthenticated) return loginButton();
    if (canUserCheckout) return checkoutButton();
    if (isCheckedOut) {
      return (
        <p className="font-medium text-orange-500">
          Book checked out. Enjoy your read
        </p>
      );
    }
    return (
      <p className="font-medium text-orange-700/70 ">
        Checkout limit reached. Return a book to borrow another
      </p>
    );
  };

  const loginButton = () => (
    <Link
      to="/login"
      className="relative h-12 w-36 flex items-center justify-center overflow-hidden rounded-2xl border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-full before:w-8 before:translate-x-16 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
    >
      Sign In
    </Link>
  );

  const checkoutButton = () => (
    <button
      className="relative h-12 w-36 flex items-center justify-center overflow-hidden rounded-2xl border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-full before:w-8 before:translate-x-16 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
      onClick={checkoutHandler}
    >
      Checkout
    </button>
  );

  return <div>{renderButton()}</div>;
};

export default BookCheckoutButton;
