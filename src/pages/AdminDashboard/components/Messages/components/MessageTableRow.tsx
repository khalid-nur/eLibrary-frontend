import { Message } from "../../../../../models/message";
import { formatDate } from "../../../../../utils/dateFormatter.ts";
import { LuEye } from "react-icons/lu";

interface MessageTableRowProps {
  message: Message;
  onEdit: () => void;
}

const MessageTableRow = ({ message, onEdit }: MessageTableRowProps) => {
  return (
    <tr key={message.id} className="border-b">
      <td className="px-3 py-2">
        <div className="font-medium text-gray-900">{message.title}</div>
        <div className="text-sm text-gray-600 truncate max-w-xs">{message.question}</div>
      </td>
      <td className={`px-3 py-2 text-sm `}>
        <p
          className={`p-1 rounded-2xl text-center ${
            message.messageStatus === "REPLIED" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.messageStatus}
        </p>
      </td>
      <td className="px-3 py-2 text-sm">
        <div>{message.userName}</div>
        <div className="text-xs text-gray-500">{message.userEmail}</div>
      </td>
      <td className="px-3 py-2 text-sm">{formatDate(message.createdAt)}</td>
      <td className="px-3 py-2 text-sm">
        <button className="text-gray-600 hover:text-gray-800" onClick={onEdit}>
          <LuEye size={18} />
        </button>
      </td>
    </tr>
  );
};

export default MessageTableRow;
