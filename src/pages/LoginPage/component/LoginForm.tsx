import { useForm } from "react-hook-form";
import { AuthRequest } from "../../../models/authUser";
import { useLogin } from "../../../hooks/useLogin";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const {
    mutate: login,
    isLoading: isLoginLoading,
    error: loginError,
  } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequest>();

  const onSubmit = (userData: AuthRequest) => {
    login(userData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="relative mt-2.5">
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Enter email"
            className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 caret-orange-500 focus:outline-none"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
        </div>
        <div className="relative mt-2.5">
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Enter your password"
            className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 caret-orange-500 focus:outline-none"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm text-orange-500 hover:text-orange-600"
        >
          Forgot Password?
        </Link>
      </div>

      {loginError && (
        <p className="text-red-500 text-sm">
          {loginError.response?.data?.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoginLoading}
        className="relative h-12 w-full overflow-hidden rounded-2xl border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-[450px]"
      >
        {isLoginLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
