import { motion } from "framer-motion";
import Slider from "react-slick";
import {
  titleVariants,
  dividerVariants,
  textVariants,
  imageVariants,
} from "../../../utils/animation";
import {
  sliderSettings,
  defaultSlidesImages,
} from "../../../constants/bookCollectionData";

const BookCollection = () => {
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
            {defaultSlidesImages.map((slideImage) => (
              <div key={slideImage} className="mb-10">
                <div className=" flex flex-row items-center justify-center">
                  <motion.img
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    src={slideImage}
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
