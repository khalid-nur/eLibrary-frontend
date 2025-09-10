import { useState } from "react";
import { User } from "../../../../models/user";
import Pagination from "../../../../components/Pagination";
import { useDeleteUser, useUserAccounts } from "../../../../hooks/useUsers";
import Modal from "../../../../components/Modal";
import UserForm from "./components/UserForm";
import DeleteModal from "../../../../components/DeleteModal";
import StatusMessage from "../Home/components/StatusMessage";
import { TbMessageOff } from "react-icons/tb";
import { PulseLoader } from "react-spinners";
import SortButton from "./components/SortButton";
import UserTableRow from "./components/UserTableRow";
import { useCheckoutCountsPerUser } from "../../../../hooks/useCheckout";

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(12);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const sortBy: string = "name";

  const { data: userData, isLoading, error } = useUserAccounts(currentPage - 1, usersPerPage, sortBy, sortOrder);
  const { data: checkoutCountsData } = useCheckoutCountsPerUser();
  const { mutate } = useDeleteUser();

  const getUserCheckoutCount = (userId: string): number => {
    const record = checkoutCountsData?.find((userCheckout) => userCheckout.userId === userId);
    return record ? record.checkoutCount : 0;
  };

  const totalPages = userData ? userData.totalPages : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteUserHandler = () => {
    if (!selectedUser) return;
    mutate(selectedUser.userId);
    setIsDeleteModalOpen(false);
  };

  const toggleSortOrder = () => setSortOrder(sortOrder === "asc" ? "desc" : "asc");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <PulseLoader size={12} />
      </div>
    );
  }

  if (error) {
    const errorMessage = error?.response?.data?.detail;
    const errorTitle = error?.response?.data?.title;

    return (
      <StatusMessage
        avatarIcon={<TbMessageOff className="text-red-400 animate-pulse" size={56} />}
        title={errorTitle || "Error loading users"}
        description={errorMessage || "Something went wrong. Please try again."}
      />
    );
  }

  return (
    <div className="container flex flex-col">
      <div className="py-2 my-4 px-2 bg-white rounded-lg md:py-4">
        <div className="flex flex-row gap-2 items-center justify-between mb-4 md:flex-row md:gap-0">
          <h1 className="text-xl text-gray-900 font-poppins font-medium  md:text-2xl">All Users</h1>
          <SortButton order={sortOrder} onToggle={toggleSortOrder} />
        </div>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <UserForm user={selectedUser} onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            title="Delete User"
            message="Are you sure you want to delete this user?"
            onConfirm={deleteUserHandler}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}

        <div className="flex-grow h-[calc(100dvh-250px)] overflow-y-auto overflow-x-auto no-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Name</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Email</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">User ID No.</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">
                  Checkouts books
                </th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Role</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Date Joined</th>
                <th className="sticky top-0 z-10 bg-gray-100 px-3 py-3 text-left text-sm text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {userData?.content.map((user: User) => (
                <UserTableRow
                  key={user.userId}
                  user={user}
                  checkoutCount={getUserCheckoutCount(user.userId)}
                  onEdit={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedUser(user);
                    setIsDeleteModalOpen(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
};

export default Users;
