import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalPages, paginate }: PaginationProps) => {
  // Stores the pages to display in the pagination
  const pageNumbers = [];

  // Add page numbers based on the current page
  if (currentPage === 1) {
    pageNumbers.push(currentPage);
    if (totalPages >= currentPage + 1) {
      pageNumbers.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumbers.push(currentPage + 2);
    }
  } else if (currentPage > 1) {
    if (currentPage >= 3) {
      pageNumbers.push(currentPage - 2);
      pageNumbers.push(currentPage - 1);
    } else {
      pageNumbers.push(currentPage - 1);
    }

    pageNumbers.push(currentPage);

    if (totalPages >= currentPage + 1) {
      pageNumbers.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumbers.push(currentPage + 2);
    }
  }
  return (
    <nav className="flex items-center justify-center my-8 md:justify-end ">
      <ul className="flex flex-wrap items-center justify-center space-x-2 overflow-hidden">
        <li>
          <button
            onClick={() => {
              paginate(1);
            }}
            disabled={currentPage === 1}
            className={`px-2 py-1 border rounded-md flex items-center ${
              currentPage === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FaAngleDoubleLeft className="mr-1" />
          </button>
        </li>

        {pageNumbers.map((pageNumber) =>
          typeof pageNumber === "number" ? (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={`px-2  border rounded-md ${
                  currentPage === pageNumber
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            </li>
          ) : (
            <li key={pageNumber}>
              <span className="px-2 py-1 text-gray-400">...</span>
            </li>
          )
        )}

        <li>
          <button
            onClick={() => {
              paginate(totalPages);
            }}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 border rounded-md flex items-center ${
              currentPage === totalPages
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FaAngleDoubleRight className="ml-1" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
