import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import User from "./components/Users/User";
import { useLogout } from "../../hooks/useLogout";
import Books from "./components/Books/Books";
import Checkouts from "./components/Checkouts/Checkouts";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate: logout } = useLogout();

  return (
    <div className="flex h-svh overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} />

      <div className="min-h-screen overflow-y-auto  no-scrollbar w-full bg-gray-100 p-2 md:p-4">
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
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<User />} />
          <Route path="/books" element={<Books />} />
          <Route path="/checkouts" element={<Checkouts />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
