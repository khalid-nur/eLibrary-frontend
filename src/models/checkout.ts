// Represents the total number of all active checkouts
export interface TotalCheckouts {
  totalCheckouts: number;
}

// Represents the number of books checked out per user
export interface CheckoutPerUser {
  userId: string;
  userEmail: string;
  checkoutCount: number;
}
