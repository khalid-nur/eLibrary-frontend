import React from "react";
import { useBooks } from "../../../../../hooks/useBook";
import StatusMessage from "./StatusMessage";
import { PiBooksLight } from "react-icons/pi";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

const BookItem = () => {
  const { data: bookData, isLoading, error } = useBooks(0, 6);

  const renderBooksContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-32">
          <PulseLoader size={12} />
        </div>
      );
    }

    if (error) {
      const errorMessage = error?.response?.data?.detail;
      const errorTitle = error?.response?.data?.title;

      return (
        <StatusMessage
          avatarIcon={
            <PiBooksLight className="text-red-400 animate-pulse" size={56} />
          }
          title={errorTitle || "Error loading books"}
          description={
            errorMessage || "Something went wrong. Please try again."
          }
        />
      );
    }

    if (!bookData || bookData.content.length === 0) {
      return (
        <StatusMessage
          avatarIcon={
            <PiBooksLight className="text-slate-400 animate-pulse" size={56} />
          }
          title="No Books Available"
          description="There are currently no books in the library."
        />
      );
    }

    return (
      <div className="flex flex-col items-start justify-evenly gap-6 mt-4">
        {bookData.content.map((book, index) => (
          <div key={index} className="flex gap-3">
            <img
              src={book.img}
              alt={book.title}
              className="w-16 h-24 rounded-md object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {book.title}
              </p>
              <p className="text-xs text-gray-500">
                By {book.author} • {book.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl lg:w-1/2 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Books</h2>
        <Link
          to={"/admin/dashboard/books"}
          className="text-base font-medium hover:opacity-70"
        >
          View all
        </Link>
      </div>
      {renderBooksContent()}
    </div>
  );
};

export default BookItem;
