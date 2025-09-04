import { useAuthContext } from "../../../../hooks/useAuthContext";
import MessageItem from "./components/MessageItem";
import AccountCard from "./components/AccountCard";
import BookItem from "./components/BookItem";
import StatCard from "./components/StatCard";
import { useLogout } from "../../../../hooks/useLogout";
const Home = () => {
  const { user } = useAuthContext();
  const { mutate: logout } = useLogout();

  return (
    <div className="container mx-auto min-h-screen overflow-y-auto">
      <div className="flex justify-end">
        <div className="flex items-center gap-8">
          <button
            className=" relative inline-flex items-center justify-center h-12 w-36 overflow-hidden rounded-2xl border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40 "
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      </div>
      <h1 className="text-xl text-gray-900 font-poppins font-semibold md:text-3xl xl:text-4xl">
        Welcome, {user?.name}
      </h1>
      <p className="text-base text-slate-500 font-normal">
        One dashboard to manage and track all activates
      </p>
      <div className="mt-8 overflow-y-scroll no-scrollbar md:overflow-y-hidden">
        <StatCard />
        <div className="mt-8 flex flex-col w-full gap-6 lg:flex-row ">
          <div className="flex flex-col justify-between lg:w-1/2 gap-6">
            <MessageItem />
            <AccountCard />
          </div>
          <BookItem />
        </div>
      </div>
    </div>
  );
};
export default Home;
