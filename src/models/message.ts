/**
 * Represents a message object
 */
export interface Message {
  id: string;
  userName: string;
  userEmail: string;
  title: string;
  question: string;
  adminEmail?: string;
  response?: string;
  messageStatus: string;
  createdAt: string;
  updatedAt?: string;
}

// Represents the count of messages
export interface MessageCounts {
  // Number of pending messages
  pendingMessagesCount: number;
}
