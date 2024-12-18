import { LuBookCopy, LuScrollText, LuMessageSquareText } from "react-icons/lu";
import { PiBooks } from "react-icons/pi";
import { motion } from "framer-motion";
import Clock from "../../../assets/clock_16147727.png";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Book Checkout",
      description:
        "Checking out books is quick and simple. Whether you’re after a thrilling mystery or a heartwarming novel, you can easily find and borrow your next read.",
      icon: <LuBookCopy className="w-6 h-6 lg:w-8 lg:h-8 text-[#31A0FE]" />,
      bgColor: "bg-[#D4EAF6]",
    },
    {
      title: "Personal Shelf",
      description:
        "Keep track of all the books you’ve checked out with your own personal shelf. It’s your little space to see what you’ve been reading.",
      icon: <PiBooks className="w-6 h-6 lg:w-8 lg:h-8 text-[#23856D]" />,
      bgColor: "bg-[#D6F1CC]",
    },
    {
      title: "Checkout History",
      description:
        "Look back at everything you’ve checked out. Perfect for remembering books you loved or re-reading an old favorite.",
      icon: <LuScrollText className="w-6 h-6 lg:w-8 lg:h-8 text-[#EC5C2E]" />,
      bgColor: "bg-[#F3DCD5]",
    },
    {
      title: "Message Us",
      description:
        "We’re just a message away. Need recommendations or want to request a book? We’re here to help and make your experience easier.",
      icon: (
        <LuMessageSquareText className="w-6 h-6 lg:w-8 lg:h-8 text-[#a12f99]" />
      ),
      bgColor: "bg-[#d5a3d2]",
    },
  ];

  const staggerContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <section className="py-16 bg-wrapper md:py-24">
      <div className="container mx-auto">
        {/* Header */}
        <motion.h1
          initial={{
            y: 40,
            opacity: 0,
          }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="text-3xl text-center text-gray-900 font-poppins font-bold mb-8 md:text-4xl xl:text-5xl "
        >
          Why Choose Us?
        </motion.h1>

        {/* Main Content */}
        <div className="flex flex-col justify-center px-6 gap-6 lg:flex-row">
          {/* Left Side: What We Offer */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:w-3/5 p-4"
          >
            <motion.h2 className=" text-2xl text-center font-poppins font-bold mb-6 md:mb-8">
              <span className="relative after:content-link after:absolute after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2 ">
                What We Offer
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  variants={itemVariants}
                  key={index}
                  className="px-6 pt-8 pb-12 shadow-sm bg-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-poppins font-bold">
                      {feature.title}
                    </h3>
                    <div className={`${feature.bgColor} p-3 rounded-xl`}>
                      {feature.icon}
                    </div>
                  </div>
                  <p className="text-start text-gray-500 ">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: eLibrary Availability */}
          <div className="lg:w p-4 flex flex-col">
            <h2 className="text-2xl text-center font-poppins font-bold mb-6 md:mb-8">
              <span className="relative after:content-link2 after:absolute after:-bottom-1 after:-right-6 ">
                Availability
              </span>
            </h2>
            <motion.div className="p-3 shadow-lg bg-gray-900 rounded-lg  h-full   items-center flex-col justify-center ">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 2,
                  ease: "easeInOut",
                }}
                viewport={{ once: true }}
                className=" relative flex flex-col justify-between  lg:space-y-6  p-3 h-ful md:flex-row gap-6 lg:flex-col lg:max-w-72 z-0"
              >
                <div className=" absolute top-0 right-0 md:left-52 md:top-4 lg:left-20 lg:top-2 rotate-[35deg] -z-10 ">
                  <img
                    className="w-48 md:w-64 lg:w-72 "
                    src={Clock}
                    alt="Clock"
                  />
                </div>

                <div className="flex-1 ">
                  <h4 className="text-white text-lg font-bold mb-2">
                    Access Hours
                  </h4>
                  <p className="text-gray-300">
                    Mon-Fri: 9 AM - 9 PM
                    <br />
                    Sat-Sun: 10 AM - 6 PM
                  </p>
                </div>

                <div className="flex-1">
                  <h4 className="text-white text-lg font-bold mb-2">
                    Support Hours
                  </h4>
                  <p className="text-gray-300">
                    Available 24/7 via online chat and email support.
                  </p>
                </div>

                <div className="flex-1">
                  <h4 className="text-white text-lg font-bold mb-2">
                    Special Services
                  </h4>
                  <p className="text-gray-300">
                    Exclusive access to premium books, personalized
                    recommendations, and events for members.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
