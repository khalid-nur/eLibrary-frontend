import React, { useState } from "react";
import { bookCategories } from "../../constants/SearchPageData";
import { useSearch } from "../../hooks/useBook";
import Pagination from "../../components/Pagination";
import { PulseLoader } from "react-spinners";
import BookCard from "./component/BookCard";
import { SiAmazoncloudwatch } from "react-icons/si";

const SearchBooksPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(5);

  const {
    data: bookData,
    error: bookError,
    isLoading: isBookLoading,
  } = useSearch(currentPage - 1, booksPerPage, searchQuery, selectedCategory);

  // Total number of books
  const totalAmountOfBooks = bookData ? bookData.totalElements : 0;

  // Total number of pages
  const totalPages = bookData ? bookData.totalPages : 0;

  // Index of the last book on the current page
  const indexOfLastBook = currentPage * booksPerPage;

  // Index of the first book on the current page
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  // The last book index displayed on the current page
  const lastBookOnPage =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage // If the current page can display a full set of books, calculate the last book index
      : totalAmountOfBooks; // If not, the last book index is the total number of books

  // Handles the submission for searching books
  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedCategory("");
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  // Handles pagination
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading state spinner while fetching book data
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
        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-poppins font-semibold mb-4">
                Filter By
              </h2>
              <div className="mb-6">
                <h3 className="text-lg font-poppins font-medium">Category</h3>
                <div className="w-full border border-t-0 border-grey-300 my-2 xl:w-3/4"></div>
                <ul className="space-y-2">
                  {bookCategories.map((category: string) => (
                    <li key={category}>
                      <label
                        className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors duration-300"
                        onClick={() => {
                          setSelectedCategory(category);
                          setSearchQuery("");
                          setSearchInput("");
                          setCurrentPage(1);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategory === category}
                          readOnly
                          className="peer appearance-none h-2 w-2 bg-gray-600 transition-all duration-300 checked:bg-orange-500 checked:rotate-45 hover:rotate-45 hover:bg-orange-500"
                        />
                        <span className="peer-checked:text-orange-500">
                          {category}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 text-orange-500 font-medium"
                  onClick={() => {
                    setSelectedCategory("");
                    setSearchQuery("");
                    setSearchInput("");
                    setCurrentPage(1);
                  }}
                >
                  See All
                </button>
              </div>
            </div>

            <div className="md:col-span-3">
              <form
                onSubmit={searchSubmitHandler}
                className="flex justify-between items-center mb-8"
              >
                <div className="flex items-center w-full border rounded-lg shadow-sm md:w-3/4 xl:w-2/3">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchInput(e.target.value)
                    }
                    placeholder="Search..."
                    className="p-3 w-full rounded-l-lg text-gray-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-3 bg-black text-white font-semibold rounded-r-lg hover:opacity-90 transition-all duration-300"
                  >
                    Search
                  </button>
                </div>
              </form>

              <p className="mb-6">
                Result For
                <span className="font-medium ml-1">
                  "{searchInput || selectedCategory || "All"}"
                </span>
              </p>

              <p className="text-gray-600 text-sm mb-4">
                {indexOfFirstBook + 1} to {lastBookOnPage} of{" "}
                {totalAmountOfBooks}
                <span> Book Found</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {totalAmountOfBooks > 0 ? (
                  bookData?.content.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center my-8 ">
                    <SiAmazoncloudwatch
                      size={80}
                      className="text-orange-500 mb-4"
                    />

                    <h3 className="text-sm font-poppins font-semibold text-gray-700 text-center">
                      We could not find what you were looking for
                      <br /> Please try again
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
    </section>
  );
};

export default SearchBooksPage;
