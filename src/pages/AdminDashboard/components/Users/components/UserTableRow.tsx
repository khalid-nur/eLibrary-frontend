import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { User } from "../../../../../models/user";
import { formatDate } from "../../../../../utils/dateFormatter.ts";

interface UserTableRowProps {
  user: User;
  checkoutCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

const UserTableRow = ({ user, checkoutCount, onEdit, onDelete }: UserTableRowProps) => {
  return (
    <tr className="cursor-pointer hover:bg-slate-50">
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
        <div className="inline-flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full font-semibold text-white bg-orange-500/80">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          {user.name}
        </div>
      </td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{user.userId}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{checkoutCount}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
        <span
          className={`p-1 rounded-2xl text-center ${
            user.role === "ADMIN" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(user.createdAt)}</td>
      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <button className="text-blue-600 hover:text-blue-800" onClick={onEdit}>
            <RiEdit2Line size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800" onClick={onDelete}>
            <RiDeleteBin5Line size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
