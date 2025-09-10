import React from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { AdminUpdateUser, User } from "../../../../../models/user";
import { useUpdateUser } from "../../../../../hooks/useUsers";

interface UserFormProps {
  onClose: () => void;
  user?: User | null;
}

const UserForm = ({ onClose, user }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminUpdateUser>({
    defaultValues: user || { email: "", name: "", role: "USER" },
  });

  const { mutate: updateUser, isLoading, error: updateUserError } = useUpdateUser();

  const onSubmit = (updateUserRequest: AdminUpdateUser) => {
    if (!user) return;

    updateUser({ userId: user.userId, user: updateUserRequest }, { onSuccess: () => onClose() });
  };

  return (
    <div className="relative max-h-screen overflow-hidden">
      <div className="flex justify-end mb-2 cursor-pointer">
        <button type="button" className=" hover:bg-slate-200/75 hover:rounded-full p-1" onClick={onClose}>
          <IoMdClose size={25} />
        </button>
      </div>

      <h2 className="text-2xl md:text-4xl text-gray-900 font-bold font-poppins mb-2 md:mb-8">Update User</h2>

      {updateUserError && (
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md mt-2">
          <h4 className="font-semibold text-sm mb-2">Oops! An error occurred</h4>

          <p className="text-sm">
            <span className="font-medium">Message: </span>
            {updateUserError.response?.data?.detail ??
              updateUserError.response?.data?.message ??
              "Failed to update user"}
          </p>
        </div>
      )}

      <div className="p-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-900 mb-2 " htmlFor="name">
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Name"
                className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1 ml-1">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-900 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-900 mb-2" htmlFor="role">
                Role
              </label>
              <select
                {...register("role", { required: true })}
                className="w-full px-3 py-2 border border-gray-200 rounded md:w-4/5 focus:outline-none"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1 ml-1">{errors.role.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded text-white transition ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-zinc-800 hover:opacity-90"
              }`}
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
