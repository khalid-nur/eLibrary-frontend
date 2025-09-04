import apiClient from "./axiosConfig";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { Message, MessageCounts } from "../models/message";

/**
 * Fetches a paginated list of messages filtered by status
 * @param page The page number for pagination
 * @param size The number of messages per page
 * @param messageStatus The status of messages to filter by ("PENDING" or "REPLIED")
 * @returns A PaginatedResponse containing message data
 */
export const getMessages = async (
  page: number,
  size: number,
  messageStatus: string = "PENDING"
): Promise<PaginatedResponse<Message>> => {
  const response = await apiClient.get(
    `/messages/admin/messages/filter?status=${messageStatus}&page=${page}&size=${size}`
  );

  return response.data;
};

/**
 * Fetches the total number of messages by status
 * @returns the total count of messages by status
 */
export const getMessageCounts = async (): Promise<MessageCounts> => {
  const response = await apiClient.get("/messages/admin/message-counts");

  return response.data;
};
