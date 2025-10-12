import { useState } from "react";
import { useRenewBookLoan, useReturnBookLoan, useUserCheckouts } from "../../hooks/useCheckout";
import ActionModal from "../../components/ActionModal";
import { Book } from "../../models/book";

const MyBooks = () => {
  const [selectedAction, setSelectedAction] = useState<"renew" | "return" | null>(null);
  const [selectedBook, setSelectedBook] = useState<{ book: Book; daysLeft: number } | null>(null);

  const { data: checkouts } = useUserCheckouts();
  const { mutate: renewBook } = useRenewBookLoan();
  const { mutate: returnBook } = useReturnBookLoan();

  const isActionModalOpen = selectedAction !== null && selectedBook !== null;

  const modalConfirmHandler = () => {
    if (!selectedAction || !selectedBook) return;

    if (selectedAction === "renew") {
      renewBook(selectedBook.book.id, {
        onSuccess: () => {
          modalCloseHandler();
        },
      });
    }

    if (selectedAction === "return") {
      returnBook(selectedBook.book.id, {
        onSuccess: () => {
          modalCloseHandler();
        },
      });
    }
  };

  const modalCloseHandler = () => {
    setSelectedAction(null);
    setSelectedBook(null);
  };

  return (
    <section className="bg-white min-h-screen flex flex-col">
      <div className="container mx-auto px-6 py-12 md:py-16 flex-grow">
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-10">
            <h2 className="font-bold font-poppins text-2xl text-gray-900  mb-8 text-center md:text-3xl xl:text-4xl">
              My Books
            </h2>
          </div>

          {checkouts && checkouts.length === 0 && (
            <div className="text-center text-gray-500 text-lg font-medium py-10">
              You currently have <span className="font-bold">0 checkouts</span>.
            </div>
          )}

          {isActionModalOpen && selectedAction && selectedBook && (
            <ActionModal
              title={selectedAction === "renew" ? "Renew Book" : "Return Book"}
              message={
                selectedAction === "renew"
                  ? selectedBook.daysLeft <= 0
                    ? "Loan is overdue and cannot be renewed. Please return the book."
                    : "Are you sure you want to renew this book for another 7 days?"
                  : "Are you sure you want to return this book?"
              }
              confirmText={selectedAction === "renew" ? "Renew" : "Return"}
              confirmColor={selectedAction === "renew" ? "bg-orange-500 text-white" : "bg-gray-800 text-white"}
              disableConfirm={selectedAction === "renew" && selectedBook.daysLeft <= 0}
              onConfirm={modalConfirmHandler}
              onCancel={modalCloseHandler}
            />
          )}

          {checkouts && checkouts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {checkouts?.map(({ book, daysLeft }) => (
                <div
                  key={book.id}
                  className="border-2 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ease-in-out hover:border-orange-200 transform hover:-translate-y-2 bg-white flex flex-col"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={book.img}
                      alt={`${book.title} Book Cover`}
                      className="w-28 h-44 object-cover rounded-md shadow-sm"
                    />
                    <div className="flex flex-col flex-1">
                      <h3 className="font-semibold text-lg">{book.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">By {book.author}</p>
                      <p className="text-gray-600 text-sm line-clamp-5 mb-4">{book.description}</p>

                      <div className={`text-xs font-bold ${daysLeft <= 0 ? "text-red-600" : "text-orange-500"}`}>
                        {daysLeft <= 0 ? "Overdue" : `${daysLeft} days left`}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-auto">
                    <button
                      className="flex-1 px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                      onClick={() => {
                        setSelectedBook({ book, daysLeft });
                        setSelectedAction("renew");
                      }}
                    >
                      Renew
                    </button>
                    <button
                      className="flex-1 px-5 py-2 text-sm font-semibold rounded-full bg-gray-100 text-gray-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                      onClick={() => {
                        setSelectedBook({ book, daysLeft });

                        setSelectedAction("return");
                      }}
                    >
                      Return
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyBooks;
