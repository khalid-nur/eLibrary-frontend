import React from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { Book, BookRequest } from "../../../../../models/book";
import { useUpdateBook } from "../../../../../hooks/useBook";

interface EditBookFormProps {
  onClose: () => void;
  book: Book;
}

const EditBookForm = ({ onClose, book }: EditBookFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookRequest>({
    defaultValues: book,
  });

  const { mutate: updateBook, isLoading, error: updateBookError } = useUpdateBook();

  const onSubmit = (data: BookRequest) => {
    if (!book?.id) return;
    updateBook(
      { id: book.id.toString(), data },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const imageUploadHandler = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result !== null) {
        setValue("img", reader.result as string);
      }
    };
  };

  return (
    <div className="relative max-h-screen overflow-hidden">
      <div className="flex justify-end mb-2 cursor-pointer">
        <button type="button" className="hover:bg-slate-200/75 hover:rounded-full p-1" onClick={onClose}>
          <IoMdClose size={25} />
        </button>
      </div>

      <h2 className="text-2xl md:text-4xl text-gray-900 font-bold font-poppins mb-2 md:mb-8">Update Book</h2>

      {updateBookError && (
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md mt-2">
          <h4 className="font-semibold text-sm mb-2">Oops! An error occurred</h4>
          <p className="text-sm">
            <span className="font-medium">Message: </span>
            {updateBookError.response?.data?.detail ??
              updateBookError.response?.data?.message ??
              "Failed to update book"}
          </p>
        </div>
      )}

      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-900 mb-2" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="Book Title"
                className="mt-1 block w-full py-2 px-2 text-black border border-gray-200 rounded-md bg-gray-50"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1 ml-1">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-900 mb-2" htmlFor="author">
                Author
              </label>
              <input
                id="author"
                {...register("author", { required: "Author is required" })}
                type="text"
                placeholder="Author"
                className="mt-1 block w-full py-2 px-2 text-black border border-gray-200 rounded-md bg-gray-50"
              />
              {errors.author && <p className="text-red-500 text-sm mt-1 ml-1">{errors.author.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-900 mb-2" htmlFor="copiesAvailable">
                Available Copies
              </label>
              <input
                id="copiesAvailable"
                {...register("copiesAvailable", {
                  required: "Copies Available is required",
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Available Copies"
                className="mt-1 block w-full py-2 px-2 text-black border border-gray-200 rounded-md bg-gray-50"
              />
              {errors.copiesAvailable && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.copiesAvailable.message}</p>
              )}
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-900 mb-2" htmlFor="copies">
                Total Copies
              </label>
              <input
                id="copies"
                {...register("copies", {
                  required: "Copies is required",
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Number of Copies"
                className="mt-1 block w-full py-2 px-2 text-black border border-gray-200 rounded-md bg-gray-50"
              />
              {errors.copies && <p className="text-red-500 text-sm mt-1 ml-1">{errors.copies.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-900 mb-2" htmlFor="category">
                Category
              </label>
              <input
                id="category"
                {...register("category", { required: "Category is required" })}
                type="text"
                placeholder="Category"
                className="mt-1 block w-full py-2 px-2 text-black border border-gray-200 rounded-md bg-gray-50"
              />
              {errors.category && <p className="text-red-500 text-sm mt-1 ml-1">{errors.category.message}</p>}
            </div>

            <div className="flex flex-col mt-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-900 mb-2" htmlFor="img">
                Book Image
              </label>
              <input
                type="file"
                className="mt-1 block w-full py-2 px-2 text-black border border-gray-200 rounded-md bg-gray-50"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    imageUploadHandler(e.target.files[0]);
                  }
                }}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col mt-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-900 mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Book Description"
                className="mt-1 block w-full py-2 px-2 text-black border border-gray-200 rounded-md bg-gray-50 min-h-[120px]"
              />
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
              {isLoading ? "Updating..." : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookForm;
