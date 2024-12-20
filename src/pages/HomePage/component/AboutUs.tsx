import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import ColleaguesImage from "../../../assets/university-colleagues-posing-university.jpg";
import DotPatterns from "../../../assets/dots-pattern.svg";
import { GiWorld } from "react-icons/gi";

const AboutUs = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  const startAnimation = () => {
    const animation = animate(count, 2940, { duration: 5 });
    return () => animation.stop();
  };

  return (
    <section className="py-16 bg-wrapper md:py-24">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center text-gray-900 font-poppins font-bold  mb-12  md:text-4xl xl:text-5xl">
          About <span className="text-orange-600">Us</span>
        </h2>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="relative  md:w-1/2 md:order-2">
            <img
              className="absolute w-16 h -top-6 -right-4 md:-right-8 2xl:w-20 2xl:h-20  2xl:right-4"
              src={DotPatterns}
              alt="Pattern of dots"
            />

            <div className="relative">
              <div className="overflow-hidden ">
                <img
                  className="object-cover w-full h-full 2xl:w-11/12"
                  src={ColleaguesImage}
                  alt="University colleagues posing"
                />
              </div>

              <div className="absolute -bottom-4 -left-2 lg:-left-4">
                <div className="bg-orange-500">
                  <div className="p-2 pr-4 md:p-2 md:pr-4 lg:p-4 lg:pr-8 2xl:p-9 2xl:pr-14 ">
                    <GiWorld className=" size-8 2xl:size-12" />

                    <motion.span
                      className="mt-1 text-lg font-poppins font-bold text-white lg:text-xl 2xl:text-3xl"
                      onViewportEnter={startAnimation}
                    >
                      {rounded}
                    </motion.span>

                    <span className="block mt-1 text-sm font-medium leading-snug text-gray-900 2xl:text-base ">
                      Happy Readers
                      <br />
                      Enjoying Books
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center md:w-1/2 md:order-1">
            <div className="relative md:max-w-xl space-y-6">
              <h2 className="text-2xl font-bold leading-tight text-black md:text-3xl lg:text-5xl">
                Explore Limitless
                <span className="relative mx-2 inline-block after:absolute after:-bottom-1 after:w-full after:h-2 after:bg-[url('/src/assets/smaller_horizontal_edge_logo.png')] after:bg-contain after:bg-no-repeat after:left-1/2 after:-translate-x-1/2 lg:ml-0 xl:ml-2">
                  Books
                </span>
                <span className="mr-2">and</span>
                <span className="relative inline-block after:absolute after:-bottom-1 after:w-full after:h-2 after:bg-[url('/src/assets/smaller_horizontal_edge_logo.png')] after:bg-contain after:bg-no-repeat after:left-1/2 after:-translate-x-1/2">
                  Stories
                </span>
              </h2>
              <p className="text-base leading-relaxed text-gray-600 xl:text-xl">
                At eLibrary, we make books accessible for everyone. With a
                diverse collection available online, our goal is to inspire
                learning, spark imagination, and connect readers across the
                globe. Explore, learn, and enjoy—all in one place.
              </p>
            </div>

            <div className="mt-4 md:mt-8">
              <button className="relative h-12 w-36 overflow-hidden  rounded-2xl border border-orange-500 bg-orange-500 text-white shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40  ">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
