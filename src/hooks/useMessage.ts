import { useQuery } from "react-query";
import { getMessageCounts, getMessages } from "../api/messageApi";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { Message, MessageCounts } from "../models/message";

/**
 * Fetches a paginated list of messages filtered by status
 * @param currentPage The current page number for pagination
 * @param perPage The number of messages per page
 * @param status The status of messages to filter by ("PENDING" or "REPLIED")
 * @returns The query result containing message data, loading state, and error
 */
export const useMessages = (
  currentPage: number,
  perPage: number,
  messageStatus: string = "PENDING"
) => {
  return useQuery<PaginatedResponse<Message>, any>({
    queryKey: ["messages", currentPage, perPage, messageStatus],
    queryFn: () => getMessages(currentPage, perPage, messageStatus),
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
