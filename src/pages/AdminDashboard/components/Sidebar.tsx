import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import elibraryLogo from "../../../assets/elibrary_logo.png";
import { adminSidebarData } from "../../../constants/adminSidebarData";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <motion.div
      initial={{ width: 72 }}
      animate={{ width: isOpen ? 240 : 90 }}
      transition={{ duration: 0.3 }}
      className="bg-white h-screen  p-5 pt-8 relative"
    >
      {isOpen ? (
        <button
          onClick={onClose}
          className="absolute right-0 top-0 mt-4 mr-4 text-black "
        >
          <IoMdClose size={25} />
        </button>
      ) : (
        <button className="text-black   ml-3" onClick={onClose}>
          <RxHamburgerMenu size={25} />
        </button>
      )}

      <div className="flex flex-col items-center my-2">
        <img
          src={elibraryLogo}
          className="cursor-pointer duration-500 w-20"
          alt="eLibrary Logo"
        />
      </div>

      <ul className="flex flex-col gap-5 pt-6">
        {adminSidebarData.map((link) => (
          <NavLink
            key={link?.title}
            to={link?.link}
            className={({ isActive }) =>
              `rounded-md px-2 py-3 cursor-pointer text-sm transition-all duration-300 flex items-center gap-5 
            ${!isOpen && "justify-center"} 
            ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-black hover:bg-orange-500 hover:text-white"
            }`
            }
          >
            <link.icon size={25} />
            <span
              className={`${
                !isOpen && "hidden"
              } text-base font-poppins font-medium`}
            >
              {link.title}
            </span>
          </NavLink>
        ))}
      </ul>
    </motion.div>
  );
};
