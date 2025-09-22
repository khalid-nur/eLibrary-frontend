import apiClient from "./axiosConfig";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { Message, MessageCounts } from "../models/message";
import { AdminReplyRequest } from "../types/AdminReplyRequest";

/**
 * Fetches a paginated list of messages filtered by status
 * @param page The page number for pagination
 * @param size The number of messages per page
 * @param messageStatus The status of messages to filter by ("PENDING" or "REPLIED")
 * @returns A PaginatedResponse containing filter message data
 */
export const getMessagesByStatus = async (
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

/**
 * Fetches a paginated list of all messages without filters
 * @param page The page number for pagination
 * @param size The number of messages per page
 * @returns A PaginatedResponse containing all message data
 */
export const getAllMessages = async (page: number, size: number): Promise<PaginatedResponse<Message>> => {
  const response = await apiClient.get(`/messages/admin/messages?&page=${page}&size=${size}`);

  return response.data;
};

/**
 * Admin responds to a message from a user
 * @param messageId The ID of the message to reply to
 * @param replyRequest The admin reply request data
 * @returns void
 */
export const adminReplyMessage = async (messageId: string, replyRequest: AdminReplyRequest): Promise<void> => {
  await apiClient.put(`/messages/admin/messages/${messageId}/reply`, replyRequest);
};

/**
 * Deletes a message by its id
 * @param messageId The id of the message to delete
 * @returns void
 */
export const adminDeleteMessage = async (messageId: string): Promise<void> => {
  await apiClient.delete(`/messages/admin/message/${messageId}`);
};
