import { Book } from "../../../models/book";

interface BookProps {
  book: Book;
}

const BookCard = ({ book }: BookProps) => {
  return (
    <div
      key={book.id}
      className="border-2 p-4 rounded-lg shadow hover:shadow-xl transition-all duration-500 ease-in-out cursor-pointer hover:border-2 hover:border-orange-200 transform hover:-translate-y-2"
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={book.img}
          alt={`${book.title} Book Cover`}
          className="w-28 h-44 object-cover rounded-md transition-all duration-500 ease-in-out"
        />
        <div>
          <h3 className="font-semibold text-lg">{book.title}</h3>
          <p className="text-sm text-gray-500">By {book.author}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm line-clamp-4 mb-4">
        {book.description}
      </p>
      <a href="/" className="text-base font-medium hover:opacity-70">
        View details
      </a>
    </div>
  );
};

export default BookCard;
