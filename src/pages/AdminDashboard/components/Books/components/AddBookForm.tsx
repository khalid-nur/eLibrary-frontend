import React from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { BookRequest } from "../../../../../models/book";
import { useCreateBook } from "../../../../../hooks/useBook";

interface AddBookFormProps {
  onClose: () => void;
}

const AddBookForm = ({ onClose }: AddBookFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BookRequest>({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      copies: 0,
      copiesAvailable: 0,
      category: "",
      img: "",
    },
  });

  const { mutate: createBook, isLoading } = useCreateBook();

  const onSubmit = (data: BookRequest) => {
    createBook(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const imageUploadHandler = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result !== null) {
        setValue("img", reader.result as string, { shouldValidate: true });
      }
    };
  };

  return (
    <div className="relative max-h-screen overscroll-y-auto md:overflow-hidden md:overscroll-y-none">
      <div className="flex justify-end mb-2 cursor-pointer">
        <button type="button" className="hover:bg-slate-200/75 hover:rounded-full p-1" onClick={onClose}>
          <IoMdClose size={25} />
        </button>
      </div>

      <h2 className="text-2xl md:text-4xl text-gray-900 font-bold font-poppins mb-2 md:mb-2">Add New Book</h2>

      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col mt-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-900 mb-2">
                Title
              </label>
              <input
                id="title"
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="Book Title"
                className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="author" className="text-sm font-medium text-gray-900 mb-2">
                Author
              </label>
              <input
                id="author"
                {...register("author", { required: "Author is required" })}
                type="text"
                placeholder="Author"
                className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
              />
              {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="copiesAvailable" className="text-sm font-medium text-gray-900 mb-2">
                Available Copies
              </label>
              <input
                id="copiesAvailable"
                {...register("copiesAvailable", {
                  required: "Available copies are required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Must be at least 1" },
                })}
                type="number"
                placeholder="Available Copies"
                className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
              />
              {errors.copiesAvailable && <p className="text-red-500 text-sm">{errors.copiesAvailable.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="copies" className="text-sm font-medium text-gray-900 mb-2">
                Total Copies
              </label>
              <input
                id="copies"
                {...register("copies", {
                  required: "Total copies are required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Must be at least 1" },
                })}
                type="number"
                placeholder="Number of Copies"
                className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
              />
              {errors.copies && <p className="text-red-500 text-sm">{errors.copies.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-900 mb-2">
                Category
              </label>
              <input
                id="category"
                {...register("category", { required: "Category is required" })}
                type="text"
                placeholder="Category"
                className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            <div className="flex flex-col mt-2 md:col-span-2">
              <label htmlFor="img" className="text-sm font-medium text-gray-900 mb-2">
                Book Image
              </label>
              <input
                type="file"
                accept="image/*"
                required
                className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none"
                onChange={(e) => {
                  if (e.target.files?.[0]) imageUploadHandler(e.target.files[0]);
                }}
              />
              {errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}
            </div>

            <div className="flex flex-col mt-2 md:col-span-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Book Description"
                className="mt-1 block w-full py-2 px-2 text-black placeholder-gray-500  transition-all duration-200 border border-gray-200 rounded-md bg-gray-50  caret-orange-500 focus:outline-none min-h-[120px]"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded text-white transition ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-zinc-800 hover:opacity-90"
              }`}
            >
              {isLoading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
