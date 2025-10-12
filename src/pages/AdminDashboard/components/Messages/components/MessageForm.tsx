import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Message } from "../../../../../models/message";
import { useForm } from "react-hook-form";
import { AdminReplyRequest } from "../../../../../types/AdminReplyRequest";
import { formatDate } from "../../../../../utils/dateFormatter.ts";
import { useAdminDeleteMessage, useAdminReplyMessage } from "../../../../../hooks/useMessage";
import DeleteModal from "../../../../../components/DeleteModal";

interface MessageFormProps {
  onClose: () => void;
  message: Message;
}

const MessageForm = ({ onClose, message }: MessageFormProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { mutate: responseMessage, error: responseError } = useAdminReplyMessage();
  const { mutate: deleteMessage, error: deleteError } = useAdminDeleteMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminReplyRequest>({
    defaultValues: {
      response: message.response ?? "",
    },
  });

  const onSubmit = (response: AdminReplyRequest) => {
    responseMessage(
      { messageId: message.id, replyRequest: response },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const deleteMessageHandler = () => {
    deleteMessage(
      { messageId: message.id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="relative max-h-screen overflow-hidden">
      <div className="flex justify-end mb-2 cursor-pointer">
        <button type="button" className=" hover:bg-slate-200/75 hover:rounded-full p-1" onClick={onClose}>
          <IoMdClose size={25} />
        </button>
      </div>

      <h2 className="text-2xl md:text-4xl text-gray-900 font-bold font-poppins mb-2 md:mb-8"> Respond to Message</h2>

      {responseError && (
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md my-2">
          <h4 className="font-semibold text-sm mb-2">Oops! An error occurred</h4>
          <p className="text-sm">
            {responseError.response?.data?.detail ?? responseError.response?.data?.message ?? "Failed to send response"}
          </p>
        </div>
      )}

      {deleteError && (
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md my-2">
          <h4 className="font-semibold text-sm mb-2">Oops! An error occurred</h4>
          <p className="text-sm">
            {deleteError.response?.data?.detail ?? deleteError.response?.data?.message ?? "Failed to delete message"}
          </p>
        </div>
      )}

      <div className="mb-6 space-y-2">
        <p>
          <span className="font-semibold">User:</span> {message.userName} ({message.userEmail})
        </p>
        <p>
          <span className="font-semibold">Title:</span> {message.title}
        </p>
        <p>
          <span className="font-semibold">Status:</span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ml-1
        ${message.messageStatus === "REPLIED" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
        `}
          >
            {message.messageStatus}
          </span>
        </p>
        <p>
          <span className="font-semibold">Admin:</span> {message.adminEmail ?? "Not replied yet"}
        </p>
        <p className="text-sm text-gray-500">Sent: {formatDate(message.createdAt)}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Question:</h3>
        <p className="text-gray-700 whitespace-pre-line">{message.question}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="response" className="block font-semibold text-gray-800 mb-2">
            Response
          </label>
          <textarea
            id="response"
            {...register("response", { required: "Response is required" })}
            rows={6}
            disabled={!!message.response && message.response !== "PENDING"}
            className="w-full border border-gray-300 p-3 rounded-md resize-none focus:outline-none focus:border-2 focus:border-orange-500 transition-all duration-200 disabled:text-gray-500"
          />
          {errors.response && <p className="text-red-600 text-sm mt-1">{errors.response.message}</p>}
        </div>

        <div className="flex items-center">
          {message.messageStatus === "PENDING" && (
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow"
            >
              Response
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="ml-auto px-5 py-2 font-medium  bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>

      {isDeleteModalOpen && (
        <DeleteModal
          title="Delete Message"
          message="Are you sure you want to delete this message?"
          onConfirm={deleteMessageHandler}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MessageForm;
