import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-svh overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="min-h-screen overflow-y-auto  no-scrollbar w-full bg-gray-100 p-2 md:p-4">
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
