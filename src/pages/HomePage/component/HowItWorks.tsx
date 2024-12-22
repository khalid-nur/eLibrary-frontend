import { motion } from "framer-motion";
import PersonLaptop from "../../../assets/pretty-woman-working-her-home-office-smiling-end-enjoying-time-her-living-room.jpg";
import { circleVariants } from "../../../utils/animation";
import { steps } from "../../../constants/howItWorksData";

const HowItWorks = () => {
  const totalCircles = 42;

  return (
    <section className="py-16 bg-white md:py-24">
      <div className="container mx-auto flex flex-col md:flex-row px-6 justify-center items-stretch lg:h-72  2xl:h-[350px]">
        <div className="bg-orange-500 text-white p-8 md:p-12 w-full md:w-1/2 flex items-center justify-center ">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works?
            </h2>
            <p className="text-base text-gray-900 md:text-xl leading-relaxed ">
              Get started quickly and easily to access a vast collection of
              books and begin reading your favorites from our collection.
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 ">
          <img
            src={PersonLaptop}
            alt="Person using a laptop"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden md:block top-8">
            <div className="flex justify-between items-center mx-auto max-w-[70%] h-1">
              {[...Array(totalCircles)].map((_, index) => (
                <motion.div
                  variants={circleVariants}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: true }}
                  key={index}
                  className="w-1.5 h-1.5 rounded-full"
                ></motion.div>
              ))}
            </div>
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            {steps.map((step, index) => (
              <div key={index}>
                <div className="flex items-center justify-center w-14 h-14 mx-auto bg-white border-2 border-gray-300 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-600">
                    {index + 1}
                  </span>
                </div>
                <div className="mt-6  md:mt-10">
                  <h3 className="text-xl font-poppins font-semibold leading-tight text-gray-900 ">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
