import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  adminDeleteMessage,
  adminReplyMessage,
  getAllMessages,
  getMessageCounts,
  getMessagesByStatus,
} from "../api/messageApi";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { Message, MessageCounts } from "../models/message";
import { AdminReplyRequest } from "../types/AdminReplyRequest";

/**
 * Fetches a paginated list of messages filtered by status
 * @param currentPage The current page number for pagination
 * @param perPage The number of messages per page
 * @param status The status of messages to filter by ("PENDING" or "REPLIED")
 * @returns The query result containing message data, loading state, and error
 */
export const useMessagesByStatus = (currentPage: number, perPage: number, messageStatus: string = "PENDING") => {
  return useQuery<PaginatedResponse<Message>, any>({
    queryKey: ["messages", currentPage, perPage, messageStatus],
    queryFn: () => getMessagesByStatus(currentPage, perPage, messageStatus),
  });
};

/**
 * Fetches the total count of messages grouped by status
 * @returns The query result containing message counts per status, loading state, and error
 */
export const useMessagesCount = () => {
  return useQuery<MessageCounts, any>({
    queryKey: ["messages-count"],
    queryFn: getMessageCounts,
  });
};

/**
 * Fetches a paginated list of all messages without filters
 * @param currentPage The current page number for pagination
 * @param perPage The number of messages per page
 * @returns The query result containing all message data, loading state, and error
 */
export const useAllMessages = (currentPage: number, perPage: number) => {
  return useQuery<PaginatedResponse<Message>, any>({
    queryKey: ["all-messages", currentPage, perPage],
    queryFn: () => getAllMessages(currentPage, perPage),
  });
};

/**
 * Admin responds to a message from a user
 * @param messageId The id of the message to reply to
 * @param replyRequest The admin reply request data
 * @returns The mutation result containing success state, loading state, and error
 */
export const useAdminReplyMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<void, any, { messageId: string; replyRequest: AdminReplyRequest }>({
    mutationKey: ["admin-reply-message"],
    mutationFn: ({ messageId, replyRequest }) => adminReplyMessage(messageId, replyRequest),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-messages"]);
    },
  });
};

/**
 * Deletes a message by its id
 * @param messageId The id of the message to delete
 * @returns The mutation result containing success state, loading state, and error
 */
export const useAdminDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<void, any, { messageId: string }>({
    mutationKey: ["admin-delete-message"],
    mutationFn: ({ messageId }) => adminDeleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-messages"]);
    },
  });
};
