import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { Book } from "../../../../../models/book";

interface BookTableRowProps {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}

const BookTableRow = ({ book, onEdit, onDelete }: BookTableRowProps) => {
  return (
    <tr className="cursor-pointer hover:bg-slate-50">
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
        <div className="inline-flex items-center gap-3">
          <img
            className="w-12 h-16 flex items-center justify-center font-semibold text-white bg-orange-500/80"
            src={book.img}
            alt={book.title}
          />

          {book.title}
        </div>
      </td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{book.copiesAvailable}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{book.copies}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{book.category}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <button className="text-blue-600 hover:text-blue-800" onClick={onEdit}>
            <RiEdit2Line size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800" onClick={onDelete}>
            <RiDeleteBin5Line size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookTableRow;
