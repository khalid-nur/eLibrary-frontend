import { useAuthContext } from "../../../../hooks/useAuthContext";
import MessageItem from "./components/MessageItem";
import AccountCard from "./components/AccountCard";
import BookItem from "./components/BookItem";
import StatCard from "./components/StatCard";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className="container mx-auto min-h-screen overflow-y-auto">
      <h1 className="text-xl text-gray-900 font-poppins font-semibold md:text-3xl xl:text-4xl">
        Welcome, {user?.name}
      </h1>
      <p className="text-base text-slate-500 font-normal">One dashboard to manage and track all activates</p>
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
