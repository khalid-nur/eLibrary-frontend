import HeroSideImage from "../../../assets/hero_section_book_discovery.png.jpg";
import GrainBg from "../../../assets/grain_texture.jpg";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { motion } from "framer-motion";

const Hero = () => {
  const slideRight = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visitable: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 1,
      },
    },
  };

  return (
    <>
      <section className="bg-wrapper ">
        <div className="container mx-auto px-6 py-12 md:py-16 ">
          <div className="flex flex-col mt-20  items-center justify-center md:mt-28  md:flex-row  ">
            <div className="w-full md:w-1/2 space-y-10 flex flex-col  items-center md:items-start">
              <motion.h1
                variants={slideRight}
                initial="hidden"
                animate="visitable"
                className="text-4xl  font-semibold font-poppins leading-tight text-gray-900  md:text-5xl xl:text-5xl 2xl:text-7xl"
              >
                Discover <span className="text-orange-600">Your</span>
                <br />
                Favorite <span className="text-orange-600">Book</span>
                <br />
                From <span className="text-orange-600">Here</span>
              </motion.h1>
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 2,
                }}
              >
                <button className="relative flex items-center gap-2  px-5 py-3   rounded-2xl border border-orange-500 bg-orange-500 text-white text-base font-semibold shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-16 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 hover:before:-translate-x-64 overflow-hidden 2xl:text-lg ">
                  Explore Our Library
                  <motion.div
                    initial={{ x: 5 }}
                    animate={{ x: 10 }}
                    transition={{
                      repeat: Infinity,
                      ease: "easeInOut",
                      duration: 1,
                      repeatType: "mirror",
                    }}
                  >
                    <HiMiniArrowSmallRight className="size-8" />
                  </motion.div>
                </button>
              </motion.div>
            </div>

            <div className="relative w-full md:w-1/2 mt-10 md:mt-0 flex items-center justify-center">
              <div className="relative z-10">
                <img
                  src={HeroSideImage}
                  alt="Woman reading a digital book on a tablet"
                  loading="lazy"
                  className="shadow-lg w-full h-full md:w-72 md:h-[432px] lg:w-80 lg:h-[480px] 2xl:w-96 2xl:h-[576px]"
                />

                <motion.div
                  initial={{
                    x: -55,
                    opacity: 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2.5, duration: 0.3, ease: "easeInOut" }}
                  className="Circle hidden absolute  rounded-full md:w-80 md:h-80 bg-orange-600 md:-right-20 md:top-16 -z-10 md:block  xl:w-96 xl:h-96 xl:-right-40 xl:top-14 2xl:w-[30rem] 2xl:h-[30rem] 2xl:-right-48 2xl:top-14 "
                >
                  <div
                    className="absolute inset-0 z-10 opacity-5 rounded-full"
                    style={{ backgroundImage: `url(${GrainBg})` }}
                  ></div>
                </motion.div>

                <motion.div
                  initial={{
                    x: -145,
                    opacity: 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 3.5, duration: 0.3, ease: "easeInOut" }}
                  className="Circle hidden absolute shadow-3xl  bg-orange-600  rounded-full md:w-56 md:h-56 md:-right-14  md:top-28 -z-10 md:block  xl:w-80 xl:h-80 xl:-right-32 xl:top-24 2xl:w-[24rem] 2xl:h-[24rem] 2xl:-right-36 2xl:top-28  "
                >
                  <div
                    className="absolute inset-0 z-10 opacity-5 rounded-full"
                    style={{ backgroundImage: `url(${GrainBg})` }}
                  ></div>
                </motion.div>

                <motion.div
                  initial={{
                    x: -95,
                    opacity: 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 4.5, duration: 0.3, ease: "easeInOut" }}
                  className="Circle hidden absolute shadow-3xl bg-orange-600  rounded-full md:w-48 md:h-48 md:-right-8  md:top-32  -z-10 md:block  xl:w-64 xl:h-64 xl:-right-24 xl:top-32 2xl:w-[24rem] 2xl:h-80 2xl:-right-24 2xl:top-36  "
                >
                  <div
                    className="absolute inset-0 z-10 opacity-5 rounded-full "
                    style={{ backgroundImage: `url(${GrainBg})` }}
                  ></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
