import React, { useState } from "react";
import { useUserHistory } from "../../hooks/useHistory";
import { PulseLoader } from "react-spinners";
import { GiRead } from "react-icons/gi";
import Pagination from "../../components/Pagination";
import { History } from "../../models/history";
import { formatDate } from "../../utils/dateFormatter.ts";

const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(5);

  const { data: historyData, isLoading } = useUserHistory(currentPage - 1, booksPerPage);

  const totalAmountOfBooks = historyData ? historyData.totalElements : 0;

  const totalPages = historyData ? historyData.totalPages : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
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
          <div className="text-center mb-10">
            <h2 className="font-bold font-poppins text-2xl text-gray-900 mb-8 md:text-3xl xl:text-4xl">
              My Reading History
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {totalAmountOfBooks > 0 ? (
              historyData?.content.map((history: History) => (
                <div
                  key={history.id}
                  className="border-2 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ease-in-out hover:border-orange-200 transform hover:-translate-y-2 bg-white flex flex-col"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={history.img}
                      alt={`${history.title} Book Cover`}
                      className="w-28 h-44 object-cover rounded-md shadow-sm"
                    />
                    <div className="flex flex-col flex-1">
                      <h3 className="font-semibold text-lg">{history.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">By {history.author}</p>
                      <p className="text-gray-600 text-sm line-clamp-5">{history.description}</p>

                      {/* Dates Section */}
                      <div className="mt-3 text-sm text-gray-700">
                        <p>
                          <span className="font-medium">Checked out:</span> {formatDate(history.checkoutDate)}
                        </p>
                        <p>
                          <span className="font-medium">Returned:</span> {formatDate(history.returnDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center my-8 col-span-2">
                <GiRead size={80} className="text-orange-500 mb-4" />
                <h3 className="text-sm font-poppins font-semibold text-gray-700 text-center">
                  You have no reading history yet
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      </div>
    </section>
  );
};

export default HistoryPage;
