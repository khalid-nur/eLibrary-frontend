import elibraryLogo from "../../../assets/elibrary_logo.png";
import { MdMenu, MdClose } from "react-icons/md";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { navVariants, menuVariants } from "../../../utils/animation";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    const currentY = scrollY.get();
    const previousY = scrollY.getPrevious() ?? 0;
    if (currentY > previousY && currentY > 150) {
      setHidden(true);
      setOpen(false);
    } else {
      setHidden(false);
    }
  });

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
          className="flex justify-between items-end py-6 px-8"
        >
          <div className="flex items-end gap-12">
            <div className="text-2xl flex items-center gap-2 font-bold">
              <img className="h-14" src={elibraryLogo} alt="Logo" />
            </div>

            <div className="hidden lg:block">
              <ul className="flex items-center gap-6 text-gray-600 font-poppins">
                <li>
                  <a
                    href="/"
                    className="inline-block text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-orange-500 font-semibold"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    className="inline-block text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-orange-500 font-semibold"
                  >
                    Explore
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    className="inline-block text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-orange-500 font-semibold"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-orange-500 font-semibold"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className=" hidden relative h-12 w-36 overflow-hidden  rounded-full border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40 lg:block">
              Sign In
            </button>

            <button className=" hidden relative h-12 w-36 overflow-hidden  rounded-full border-2 border-orange-400 bg-white  text-black shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-orange-500 before:opacity-10 before:duration-1000 hover:before:-translate-x-40 lg:block">
              Register
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? (
              <MdClose className="text-4xl cursor-pointer" />
            ) : (
              <MdMenu className="text-4xl cursor-pointer" />
            )}
          </div>
        </motion.div>
      </motion.nav>

      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={menuVariants}
        className="fixed inset-x-0 top-24 bg-white z-40 shadow-lg lg:hidden"
      >
        <div className="flex flex-col items-start py-6 px-4 space-y-4">
          <a
            href="/"
            className="text-lg font-semibold text-gray-700 hover:text-orange-500"
          >
            Home
          </a>
          <a
            href="/"
            className="text-lg font-semibold text-gray-700 hover:text-orange-500"
          >
            Explore
          </a>
          <a
            href="/"
            className="text-lg font-semibold text-gray-700 hover:text-orange-500"
          >
            About
          </a>
          <a
            href="/"
            className="text-lg font-semibold text-gray-700 hover:text-orange-500"
          >
            Contact
          </a>

          <button
            className="relative h-12 w-36 overflow-hidden  rounded-full border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40 "
            onClick={() => setOpen(false)}
          >
            Sign In
          </button>
          <button
            className="relative h-12 w-36 overflow-hidden  rounded-full border-2 border-orange-400 bg-white  text-black shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-orange-500 before:opacity-10 before:duration-1000 hover:before:-translate-x-40"
            onClick={() => setOpen(false)}
          >
            Register
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NavBar;
