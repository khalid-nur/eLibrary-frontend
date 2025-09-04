import { Link } from "react-router-dom";
import { useUserAccounts } from "../../../../../hooks/useUsers";
import StatusMessage from "./StatusMessage";
import { PiUsersLight } from "react-icons/pi";
import { PulseLoader } from "react-spinners";
import { User } from "../../../../../models/user";

const AccountCard = () => {
  const { data: accountData, isLoading, error } = useUserAccounts(0, 6);

  const renderAccountsContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-32">
          <PulseLoader size={12} />
        </div>
      );
    }

    if (error) {
      const errorMessage = error?.response?.data?.detail;
      const errorTitle = error?.response?.data?.title;

      return (
        <StatusMessage
          avatarIcon={
            <PiUsersLight className="text-red-400 animate-pulse" size={56} />
          }
          title={errorTitle || "Error loading accounts"}
          description={
            errorMessage || "Something went wrong. Please try again."
          }
        />
      );
    }

    if (!accountData || accountData.content.length === 0) {
      return (
        <StatusMessage
          avatarIcon={
            <PiUsersLight className="text-slate-400 animate-pulse" size={56} />
          }
          title="No Accounts Found"
          description="Looks like there are no accounts yet. Once new members join, their details will show up here."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {accountData.content.map((user: User) => {
          return (
            <div
              key={user.id}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-100 bg-slate-50 hover:bg-slate-100 transition"
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full font-semibold text-white  bg-orange-500/80 text-yellow-60`}
              >
                {user.name.slice(0, 2).toUpperCase()}
              </div>

              {/* User Info */}
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Accounts</h2>
        <Link
          to={"/admin/dashboard/users"}
          className="text-base font-medium hover:opacity-70"
        >
          View all
        </Link>
      </div>
      {renderAccountsContent()}
    </div>
  );
};

export default AccountCard;
