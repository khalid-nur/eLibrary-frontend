import React from "react";
import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import elibraryLogo from "../../assets/elibrary_logo.png";
import { ResetPasswordRequest } from "../../types/resetPasswordRequest";
import { Link, useSearchParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/useResetPassword";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { mutate, isLoading, isSuccess, error } = useResetPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordRequest>();

  const onSubmit = (data: ResetPasswordRequest) => {
    const token = searchParams.get("token");
    if (!token) return;
    mutate(
      { token: token, newPassword: data.newPassword },
      {
        onSuccess: () => reset(),
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-green-50 p-4">
              <FiCheckCircle size={40} className="text-green-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Password Reset Successful</h2>

          <p className="text-gray-600">
            Your password has been successfully reset. You can now log in using your new password.
          </p>

          <div className="flex items-center mt-6">
            <Link to={"/login"} className="inline-flex items-center font-medium text-orange-600 hover:underline">
              <IoChevronBack size={16} className="mr-1" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <img src={elibraryLogo} alt="eLibrary logo" className="w-40" />
          </div>
          <h2 className="mt-4 text-2xl font-bold">Reset Password</h2>
          <p className="text-center text-gray-600">Please enter a new password to reset your account</p>
        </div>

        {error && (
          <div className="flex items-start bg-red-50 border border-red-400 text-red-800 p-4 rounded-lg shadow-sm my-4">
            <FiAlertCircle className="w-5 h-5 mr-2 flex-shrink-0 text-red-600 mt-0.5" />

            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">Oops! Something went wrong</h4>
              <p className="text-sm">
                {error?.response?.data?.message ?? "Unable to send reset link. Please try again."}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2.5">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 caret-orange-500 focus:outline-none"
              {...register("newPassword", { required: "Password is required" })}
            />
            {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="relative h-12 w-full overflow-hidden rounded-2xl border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-[450px]"
          >
            {isLoading ? "Resting Password..." : " Reset Password"}
          </button>
        </form>

        <div className="flex justify-between my-4">
          <Link to={"/login"} className="inline-flex items-center font-medium text-orange-600">
            <IoChevronBack size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
