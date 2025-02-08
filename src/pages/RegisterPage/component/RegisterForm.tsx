import { useForm } from "react-hook-form";
import { useRegister } from "../../../hooks/useRegister";
import { RegisterUserRequest } from "../../../models/registerUser";

const RegisterForm = () => {
  const { mutate: signUp, isLoading, error } = useRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterUserRequest>();

  const onSubmit = (userData: RegisterUserRequest) => {
    signUp(userData);
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
          type="text"
          placeholder="Enter your full name"
          className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none "
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="Enter email to get started"
          className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters",
            },
          })}
          type="password"
          placeholder="Enter your password"
          className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
          type="password"
          placeholder="Confirm your password"
          className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="relative h-12 w-full overflow-hidden  rounded-2xl border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-[450px]  "
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
