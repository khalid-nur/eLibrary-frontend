import { LoanOverview } from "../../../../../models/checkout";
import { formatDate } from "../../../../../utils/dateFormatter.ts";
import { loanStatusColor } from "../../../../../utils/loanStatus";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { MdAutorenew } from "react-icons/md";

interface CheckoutTableRowProps {
  checkout: LoanOverview;
  onEdit: () => void;
  onDelete: () => void;
}

const CheckoutTableRow = ({ checkout, onEdit, onDelete }: CheckoutTableRowProps) => {
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
        <div className="inline-flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full font-semibold text-white bg-orange-500/80">
            {checkout.userName.slice(0, 2).toUpperCase()}
          </div>
          {checkout.userName}
        </div>
      </td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{checkout.userEmail}</td>
      <td className="px-2 py-3 whitespace-nowrap">
        <div className="inline-flex flex-col gap-1">
          <h3 className="font-semibold text-sm ">{checkout.bookTitle}</h3>
          <p className="text-sm text-gray-500">By {checkout.bookAuthor}</p>
        </div>
      </td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(checkout.checkoutDate)}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(checkout.returnDate)}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500 text-center">{checkout.renewalCount}</td>

      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
        <p className={`p-1 rounded-2xl text-center ${loanStatusColor(checkout.status)}`}>
          {checkout.status.replace(/_/g, " ")}
        </p>
      </td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800" onClick={onEdit}>
            Renew <MdAutorenew size={16} />
          </button>
          <button className="flex items-center gap-1 text-red-600 hover:text-red-800" onClick={onDelete}>
            Return <HiOutlineArrowUturnLeft size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CheckoutTableRow;
