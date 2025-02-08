// MainLayout.tsx
import { Outlet } from "react-router-dom";
import NavBar from "./HomePage/component/NavBar";
import Footer from "./HomePage/component/Footer";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
