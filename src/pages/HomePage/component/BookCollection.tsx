import { motion } from "framer-motion";
import Slider from "react-slick";
import {
  titleVariants,
  dividerVariants,
  textVariants,
  imageVariants,
} from "../../../utils/animation";
import { sliderSettings } from "../../../constants/bookCollectionData";
import { useBooks } from "../../../hooks/useBook";

const BookCollection = () => {
  const {
    data: bookData,
    error: bookError,
    isLoading: isBookLoading,
  } = useBooks(0, 9);

  // Skeleton loading state
  if (isBookLoading) {
    return (
      <section className="bg-white animate-pulse">
        <div className="py-16 overflow-hidden md:py-24">
          <div className="container mx-auto">
            <div className="h-8 w-3/4 bg-gray-100 mx-auto mb-4 rounded md:h-10 md:w-1/2"></div>
            <div className="h-6 w-5/6 bg-gray-200 mx-auto mb-8 rounded md:h-16 md:w-3/4 xl:w-3/5"></div>
            <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="h-48 w-full bg-gray-100 rounded-md md:h-56 lg:h-64"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error handling state
  if (bookError) {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              {bookError.message}
            </h2>
            <p className="text-gray-700 mb-4">
              We could not load data Please try reloading again
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className=" bg-white">
      <div className="py-16 overflow-hidden md:py-24">
        <div className="container mx-auto ">
          <motion.h2
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl text-center text-gray-900 font-poppins font-bold mb-4 md:text-4xl xl:text-5xl"
          >
            Browse Our <span className="text-orange-600">Collection</span>
          </motion.h2>

          <motion.div
            variants={dividerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-11/12 border border-t-0 border-orange-300 mx-auto mb-4 md:w-2/3 lg:w-2/3 xl:w-1/2 2xl:w-2/5"
          ></motion.div>

          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-base text-center text-gray-500 px-4 mx-auto mb-5 md:mb-10 md:px-12 md:max-w-2xl lg:max-w-3xl md:text-lg"
          >
            Explore a wide range of books in various genres. From thrilling
            mysteries to captivating novels, we have something for every reader.
          </motion.p>

          <Slider {...sliderSettings}>
            {bookData?.content.map((books) => (
              <div key={books.title} className="mb-10">
                <div className=" flex flex-row items-center justify-center">
                  <motion.img
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    src={books.img}
                    loading="lazy"
                    className="w-3/4 md:w-40 2xl:w-52  h-auto object-cover hover:bg-slate-600"
                    alt="Book cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BookCollection;
