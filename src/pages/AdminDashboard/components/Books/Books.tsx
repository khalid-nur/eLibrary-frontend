import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import SortButton from "../Users/components/SortButton";
import { useBooks, useDeleteBook } from "../../../../hooks/useBook";
import Pagination from "../../../../components/Pagination";
import { Book } from "../../../../models/book";
import BookTableRow from "./components/BookTableRow";
import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import AddBookForm from "./components/AddBookForm";
import EditBookForm from "./components/EditBookForm";
import { PulseLoader } from "react-spinners";
import StatusMessage from "../Home/components/StatusMessage";
import { TbMessageOff } from "react-icons/tb";

const Books = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(12);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const sortBy: string = "title";

  const { data: bookData, isLoading, error } = useBooks(currentPage - 1, booksPerPage, sortBy, sortOrder);
  const { mutate: deleteBook } = useDeleteBook();

  const toggleSortOrder = () => setSortOrder(sortOrder === "asc" ? "desc" : "asc");

  const totalPages = bookData ? bookData.totalPages : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteUserHandler = () => {
    if (!selectedBook) return;
    setIsDeleteModalOpen(false);
    deleteBook(selectedBook.id, { onSuccess: () => setIsDeleteModalOpen(false) });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <PulseLoader size={12} />
      </div>
    );
  }

  if (error) {
    const errorMessage = error?.response?.data?.detail;
    const errorTitle = error?.response?.data?.title;

    return (
      <StatusMessage
        avatarIcon={<TbMessageOff className="text-red-400 animate-pulse" size={56} />}
        title={errorTitle || "Error loading books"}
        description={errorMessage || "Something went wrong. Please try again."}
      />
    );
  }

  return (
    <div className="container flex flex-col">
      <div className="py-2 my-4 px-2 bg-white rounded-lg md:py-4">
        <div className="flex flex-col gap-2 items-center justify-between mb-4 md:flex-row md:gap-0">
          <h1 className="text-xl text-gray-900 font-poppins font-medium  md:text-2xl">All Books</h1>

          <div className="flex items-center gap-2">
            <button
              className=" inline-flex items-center gap-2 px-3.5 py-2 text-sm ont-medium bg-black text-white rounded-lg hover:bg-black/80 transition-all md:text-base"
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              <span>
                <FiPlus />
              </span>
              Create a New Book
            </button>

            <SortButton order={sortOrder} onToggle={toggleSortOrder} />
          </div>
        </div>

        {isEditModalOpen && selectedBook && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <EditBookForm book={selectedBook} onClose={() => setIsEditModalOpen(false)} />
          </Modal>
        )}

        {isAddModalOpen && (
          <Modal onClose={() => setIsAddModalOpen(false)}>
            <AddBookForm
              onClose={() => {
                setIsAddModalOpen(false);
              }}
            />
          </Modal>
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            title="Delete User"
            message="Are you sure you want to delete this user?"
            onConfirm={deleteUserHandler}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}

        <div className="flex-grow h-[calc(100dvh-250px)] overflow-y-auto overflow-x-auto no-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Book Title</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Author</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">
                  Available Copies
                </th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">
                  Total Copies
                </th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Category</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {bookData?.content.map((book: Book) => (
                <BookTableRow
                  key={book.title}
                  book={book}
                  onEdit={() => {
                    setSelectedBook(book);
                    setIsEditModalOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedBook(book);
                    setIsDeleteModalOpen(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
};

export default Books;
