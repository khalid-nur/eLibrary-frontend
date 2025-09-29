import { useMutation } from "react-query";
import { resetPassword } from "../api/auth";

/**
 * Resets the user's password using a token and new password
 * @returns The mutation result with status, loading state, and error
 */
export const useResetPassword = () => {
  return useMutation<void, any, { token: string; newPassword: string }>({
    mutationKey: ["forgot-password"],
    mutationFn: ({ token, newPassword }) => resetPassword(token, newPassword),
  });
};
