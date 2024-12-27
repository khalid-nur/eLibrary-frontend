import React, { useState } from "react";
import { bookCategories } from "../../constants/SearchPageData";
import { useSearch } from "../../hooks/useBook";

const SearchBooksPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    data: bookData,
    error: bookError,
    isLoading: isBookLoading,
  } = useSearch(0, 5, searchQuery, selectedCategory);

  const totalAmountOfBooks = bookData ? bookData.totalElements : 0;

  // Handles the submission for searching books
  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedCategory("");
    setSearchQuery(searchInput);
  };

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
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategory === category}
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
                1 of {totalAmountOfBooks} Book Found
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {totalAmountOfBooks > 0 ? (
                  bookData?.content.map((book) => (
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
                          <h3 className="font-semibold text-lg">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            By {book.author}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-4 mb-4">
                        {book.description}
                      </p>
                      <a
                        href="/"
                        className="text-base font-medium hover:opacity-70"
                      >
                        View details
                      </a>
                    </div>
                  ))
                ) : (
                  <div>
                    {/* TODO: Display a better ui message */}
                    <h3>Can't find what you are looking for?</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TODO: Add pagination */}
    </section>
  );
};

export default SearchBooksPage;
