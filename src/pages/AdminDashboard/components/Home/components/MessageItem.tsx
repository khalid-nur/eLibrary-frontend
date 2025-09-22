import React from "react";
import { useMessagesByStatus } from "../../../../../hooks/useMessage";
import { formatDate } from "../../../../../utils/dateFormatter.ts";
import { PulseLoader } from "react-spinners";
import { TbMessageOff } from "react-icons/tb";
import StatusMessage from "./StatusMessage";
import { Message } from "../../../../../models/message";
import { Link } from "react-router-dom";

const MessageItem = () => {
  const { data: messageData, isLoading, error } = useMessagesByStatus(0, 3);

  const renderMessagesContent = () => {
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
          avatarIcon={<TbMessageOff className="text-red-400 animate-pulse" size={56} />}
          title={errorTitle || "Error loading messages"}
          description={errorMessage || "Something went wrong. Please try again."}
        />
      );
    }

    if (!messageData || messageData.content.length === 0) {
      return (
        <StatusMessage
          avatarIcon={<TbMessageOff className="text-slate-400 animate-pulse " size={56} />}
          title="No Pending Messages"
          description="There are no messages awaiting your review at this time."
        />
      );
    }

    return (
      <div className="space-y-3">
        {messageData.content.map((msg: Message) => (
          <div key={msg.id} className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
            <div className="flex flex-col  justify-between items-start mb-1 md:flex-row md:items-center">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{msg.userEmail}</p>
                <p className="text-xs text-gray-500">{msg.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{formatDate(msg.createdAt)}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium
                    ${msg.messageStatus === "PENDING" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}
                  `}
                >
                  {msg.messageStatus}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">{msg.question}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
        <Link to={"/admin/dashboard/messages"} className="text-base font-medium hover:opacity-70">
          View all
        </Link>
      </div>
      {renderMessagesContent()}
    </div>
  );
};

export default MessageItem;
