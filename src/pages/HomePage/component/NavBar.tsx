import elibraryLogo from "../../../assets/elibrary_logo.png";
import { MdMenu, MdClose } from "react-icons/md";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { MdAccountCircle } from "react-icons/md";
import {
  navVariants,
  menuVariants,
  accountDropdownVariants,
} from "../../../utils/animation";
import NavLinkItem from "./NavLinkItem";
import { accountLinks, navLinks } from "../../../constants/navBarData";
import { useLogout } from "../../../hooks/useLogout";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { isAuthenticated, user } = useAuthContext();
  const { mutate: logout } = useLogout();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    const currentY = scrollY.get();
    const previousY = scrollY.getPrevious() ?? 0;
    if (currentY > previousY && currentY > 150) {
      setHidden(true);
      setOpen(false);
      setAccountOpen(false);
    } else {
      setHidden(false);
    }
  });

  const closeDropdown = () => {
    setAccountOpen(false);
  };

  return (
    <div>
      <motion.nav
        variants={navVariants}
        animate={hidden ? "hidden" : "visible"}
        className="bg-wrapper fixed top-0 left-0 w-full z-50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-between items-center py-6 px-8"
        >
          <div className="flex items-end gap-12">
            <div className="text-2xl flex items-center gap-2 font-bold">
              <img className="h-14" src={elibraryLogo} alt="elibrary Logo" />
            </div>

            <div className="hidden lg:block">
              <ul className="flex items-center gap-6 text-gray-600 font-poppins">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLinkItem
                      key={link.to}
                      to={link.to}
                      text={link.text}
                      mobile={false}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center relative self-end md:mr-5  ">
            {isAuthenticated ? (
              <>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setAccountOpen(!accountOpen);
                    setOpen(false);
                  }}
                >
                  <div className="w-10 h-10 flex justify-center items-center rounded-full bg-orange-500 text-white font-bold">
                    <MdAccountCircle size={40} />
                  </div>

                  <p className=" text-base font-semibold font-poppins text-gray-600">
                    Account
                  </p>
                </div>

                <div>
                  {accountOpen && (
                    <div
                      className="fixed top-0 left-0 right-0 bottom-0 bg-transparent z-40"
                      onClick={closeDropdown}
                    />
                  )}

                  <motion.div
                    className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg p-4 z-50"
                    initial="closed"
                    animate={accountOpen ? "open" : "closed"}
                    variants={accountDropdownVariants}
                  >
                    <div className="text-center border-b pb-3 mb-3">
                      <p className="text-lg font-bold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <div className="block lg:hidden">
                        {navLinks.map((link) => (
                          <li key={link.to}>
                            <NavLinkItem
                              to={link.to}
                              text={link.text}
                              mobile={true}
                              closeAll={() => setAccountOpen(false)}
                            />
                          </li>
                        ))}
                      </div>

                      <div className="border-t pt-3 mt-3 lg:border-none lg:pt-0">
                        {accountLinks.map((link) => (
                          <li key={link.to}>
                            <NavLinkItem
                              to={link.to}
                              text={link.text}
                              mobile={true}
                              closeAll={() => setAccountOpen(false)}
                            />
                          </li>
                        ))}
                      </div>
                    </ul>
                    <div className="border-t pt-3 mt-3">
                      {user.role === "ADMIN" && (
                        <NavLink
                          to="/admin/dashboard/home"
                          className={({ isActive }) =>
                            `${
                              isActive
                                ? "text-orange-500 text-base font-medium  "
                                : "text-base  font-medium text-gray-600 hover:text-orange-500"
                            }`
                          }
                          onClick={() => setAccountOpen(false)}
                        >
                          Admin
                        </NavLink>
                      )}
                      <button
                        className="block text-left text-base font-medium text-red-500 hover:text-red-600"
                        onClick={() => logout()}
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="hidden relative h-12 w-36 overflow-hidden rounded-full border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40 lg:inline-flex lg:items-center lg:justify-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden relative h-12 w-36 overflow-hidden rounded-full border-2 border-orange-400 bg-white text-black shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-orange-500 before:opacity-10 before:duration-1000 hover:before:-translate-x-40 lg:inline-flex lg:items-center lg:justify-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {!isAuthenticated && (
            <div className="lg:hidden" onClick={() => setOpen(!open)}>
              {open ? (
                <MdClose className="text-4xl cursor-pointer" />
              ) : (
                <MdMenu className="text-4xl cursor-pointer" />
              )}
            </div>
          )}
        </motion.div>
      </motion.nav>

      {!isAuthenticated && (
        <motion.div
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={menuVariants}
          className="fixed inset-x-0 top-24 bg-white z-40 shadow-lg lg:hidden"
        >
          <div className="flex flex-col items-start py-6 px-4 space-y-4 ">
            <ul className=" space-y-4 ">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLinkItem
                    to={link.to}
                    text={link.text}
                    mobile={true}
                    closeAll={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>

            <Link
              to="/login"
              className="relative inline-flex items-center justify-center h-12 w-36 overflow-hidden rounded-full border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="relative inline-flex items-center justify-center h-12 w-36 overflow-hidden rounded-full border-2 border-orange-400 bg-white text-black shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-orange-500 before:opacity-10 before:duration-1000 hover:before:-translate-x-40"
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NavBar;
