import { useState } from "react";
import { useAdminRenewLoan, useAdminReturnBook, useAdminCheckouts } from "../../../../hooks/useCheckout";
import { LoanOverview } from "../../../../models/checkout";
import CheckoutTableRow from "./components/CheckoutTableRow";
import ActionModal from "../../../../components/ActionModal";
import { PulseLoader } from "react-spinners";
import StatusMessage from "../Home/components/StatusMessage";
import { TbMessageOff } from "react-icons/tb";
import Pagination from "../../../../components/Pagination";

const Checkouts = () => {
  const [selectedAction, setSelectedAction] = useState<"renew" | "return" | null>(null);
  const [selectedCheckout, setSelectedCheckout] = useState<LoanOverview | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [checkoutsPerPage] = useState<number>(12);

  const {
    data: checkoutData,
    isLoading: isLoadingCheckouts,
    error: checkoutError,
  } = useAdminCheckouts(currentPage - 1, checkoutsPerPage);
  const { mutate: renewLoan } = useAdminRenewLoan();
  const { mutate: returnLoan } = useAdminReturnBook();

  const totalPages = checkoutData ? checkoutData.totalPages : 0;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const maxRenewals = 2;
  const isActionModalOpen = selectedAction !== null && selectedCheckout !== null;

  console.log(checkoutData);
  console.log(isActionModalOpen);
  console.log("this is selected checkout ", selectedCheckout);

  const modalConfirmHandler = () => {
    if (!selectedAction || !selectedCheckout) return;

    if (selectedAction === "renew") {
      console.log("Renewing", selectedCheckout);
      renewLoan(
        { userId: selectedCheckout.userId, bookId: selectedCheckout.bookId },
        {
          onSuccess: () => {
            setSelectedAction(null);
            setSelectedCheckout(null);
          },
        }
      );
    }

    if (selectedAction === "return") {
      console.log("Returning", selectedCheckout);
      returnLoan(
        { userId: selectedCheckout.userId, bookId: selectedCheckout.bookId },
        {
          onSuccess: () => {
            setSelectedAction(null);
            setSelectedCheckout(null);
          },
        }
      );
    }
  };

  const modalCloseHandler = () => {
    setSelectedAction(null);
    setSelectedCheckout(null);
  };

  if (isLoadingCheckouts) {
    return (
      <div className="flex justify-center items-center h-full">
        <PulseLoader size={12} />
      </div>
    );
  }

  if (checkoutError) {
    const errorMessage = checkoutError?.response?.data?.detail;
    const errorTitle = checkoutError?.response?.data?.title;

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
        <div className="flex flex-row gap-2 items-center justify-between mb-4 md:flex-row md:gap-0">
          <h1 className="text-xl text-gray-900 font-poppins font-medium  md:text-2xl">All Checkouts</h1>
        </div>

        {isActionModalOpen && selectedAction && selectedCheckout && (
          <ActionModal
            title={selectedAction === "renew" ? "Renew Book" : "Return Book"}
            message={
              selectedAction === "renew"
                ? selectedCheckout.renewalCount >= maxRenewals
                  ? "This book has already reached the maximum number of renewals and cannot be renewed again."
                  : "Are you sure you want to renew this book for another period?"
                : "Are you sure you want to return this book?"
            }
            confirmText={selectedAction === "renew" ? "Renew" : "Return"}
            confirmColor={selectedAction === "renew" ? "bg-blue-600 text-white" : "bg-green-600 text-white"}
            disableConfirm={selectedAction === "renew" && selectedCheckout.renewalCount >= maxRenewals}
            onConfirm={modalConfirmHandler}
            onCancel={modalCloseHandler}
          />
        )}

        <div className="flex-grow h-[calc(100dvh-250px)] overflow-y-auto overflow-x-auto no-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Name</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Email</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">bookAuthor</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">
                  Checkout Date
                </th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Return Date</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">
                  Times Renewed
                </th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Status</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {checkoutData?.content.map((checkout: LoanOverview) => (
                <CheckoutTableRow
                  key={checkout.id}
                  checkout={checkout}
                  onEdit={() => {
                    setSelectedCheckout(checkout);
                    setSelectedAction("renew");
                  }}
                  onDelete={() => {
                    setSelectedCheckout(checkout);
                    setSelectedAction("return");
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

export default Checkouts;
