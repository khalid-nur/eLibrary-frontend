import { LoanStatus } from "../models/checkout";

/**
 * Returns the color classes for a checkout's loan status.
 *
 * @param status The status of the loan
 * @returns The background and text color classes for the status
 */
export const loanStatusColor = (status: LoanStatus) => {
  switch (status) {
    case LoanStatus.ACTIVE:
      return "bg-green-100 text-green-800";
    case LoanStatus.DUE_SOON:
      return "bg-yellow-100 text-yellow-800";
    case LoanStatus.OVERDUE:
      return "bg-red-100 text-red-800";
    case LoanStatus.RETURNED:
      return "bg-gray-100 text-gray-800";
  }
};
