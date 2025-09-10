import { useBookCount } from "../../../../../hooks/useBook";
import { useMessagesCount } from "../../../../../hooks/useMessage";
import { useUserAccountCount } from "../../../../../hooks/useUsers";
import { useCheckoutCount } from "../../../../../hooks/useCheckout";

const StatCard = () => {
  const { data: bookData } = useBookCount();
  const { data: messageData } = useMessagesCount();
  const { data: userAccountCountData } = useUserAccountCount();
  const { data: checkoutData } = useCheckoutCount();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <div className="bg-white p-3 rounded-xl w-full lg:w-56 xl:w-80">
        <div className="flex items-center gap-1">
          <h2 className="text-slate-500 text-sm font-poppins font-medium">Checkouts</h2>
        </div>
        <p className="mt-3 text-gray-900 text-3xl font-poppins font-semibold xl:text-4xl">
          {checkoutData?.totalCheckouts || 0}
        </p>
      </div>

      <div className="bg-white p-3 rounded-xl w-full lg:w-56 xl:w-80">
        <div className="flex items-center gap-1">
          <h2 className="text-slate-500 text-sm font-poppins font-medium">Total Users</h2>
        </div>
        <p className="mt-3 text-gray-900 text-3xl font-poppins font-semibold xl:text-4xl">
          {userAccountCountData?.totalUsers || 0}
        </p>
      </div>

      <div className="bg-white p-3 rounded-xl w-full lg:w-56 xl:w-80">
        <div className="flex items-center gap-1">
          <h2 className="text-slate-500 text-sm font-poppins font-medium">Total Books</h2>
        </div>
        <p className="mt-3 text-gray-900 text-3xl font-poppins font-semibold xl:text-4xl">
          {bookData?.totalBooks || 0}
        </p>
      </div>

      <div className="bg-white p-3 rounded-xl w-full lg:w-56 xl:w-80">
        <h2 className="text-slate-500 text-sm font-poppins font-medium">Pending Messages</h2>
        <p className="mt-3 text-gray-900 text-3xl font-poppins font-semibold xl:text-4xl">
          {messageData?.pendingMessagesCount || 0}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
