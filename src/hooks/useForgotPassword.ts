import { useMutation } from "react-query";
import { forgotPassword } from "../api/auth";

/**
 * Sends a password reset request with the user's email
 * @returns The mutation result with status, loading state, and error
 */
export const useForgotPassword = () => {
  return useMutation<void, any, string>({
    mutationKey: ["forgot-password"],
    mutationFn: (email: string) => forgotPassword(email),
  });
};
