import { useState } from "react";
import { useAllMessages } from "../../../../hooks/useMessage";
import { Message } from "../../../../models/message";
import MessageTableRow from "./components/MessageTableRow";
import Modal from "../../../../components/Modal";
import MessageForm from "./components/MessageForm";
import Pagination from "../../../../components/Pagination";
import { PulseLoader } from "react-spinners";
import StatusMessage from "../Home/components/StatusMessage";
import { TbMessageOff } from "react-icons/tb";

const Messages = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [messagesPerPage] = useState<number>(12);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { data: messageData, isLoading, error } = useAllMessages(currentPage - 1, messagesPerPage);
  const totalPages = messageData ? messageData.totalPages : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        title={errorTitle || "Error loading messages"}
        description={errorMessage || "Something went wrong. Please try again."}
      />
    );
  }

  return (
    <div className="container flex flex-col">
      <div className="py-2 my-4 px-2 bg-white rounded-lg md:py-4">
        <div className="flex flex-row gap-2 items-center justify-between mb-4 md:flex-row md:gap-0">
          <h1 className="text-xl text-gray-900 font-poppins font-medium  md:text-2xl">All Messages</h1>
        </div>

        {isModalOpen && selectedMessage && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <MessageForm onClose={() => setIsModalOpen(false)} message={selectedMessage} />
          </Modal>
        )}

        <div className="flex-grow h-[calc(100dvh-250px)] overflow-y-auto overflow-x-auto no-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Message</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Status</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">User</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Created At</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messageData?.content.map((message: Message) => (
                <MessageTableRow
                  key={message.id}
                  message={message}
                  onEdit={() => {
                    setSelectedMessage(message);
                    setIsModalOpen(true);
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

export default Messages;
