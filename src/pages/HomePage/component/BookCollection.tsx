import { motion } from "framer-motion";
import Slider from "react-slick";

const BookCollection = () => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const defaultSlidesImages = [
    "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9780062910691&content=M&Return=1&Type=M",
    "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9781250799050&content=M&Return=1&Type=M",
    "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9781982175375&content=M&Return=1&Type=M",
    "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9780525521143&content=M&Return=1&Type=M",
    "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9780156027328&content=M&Return=1&Type=M",
    "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9781668045770&content=M&Return=1&Type=M",
  ];
  return (
    <section className=" bg-white">
      <div className="py-16 overflow-hidden md:py-24">
        <div className="container mx-auto ">
          <motion.h2
            initial={{
              y: 40,
              opacity: 0,
            }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="text-3xl text-center text-gray-900 font-poppins font-bold mb-4 md:text-4xl xl:text-5xl"
          >
            Browse Our <span className="text-orange-600">Collection</span>
          </motion.h2>

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="w-11/12 border border-t-0 border-orange-300 mx-auto mb-4 md:w-2/3 lg:w-2/3 xl:w-1/2 2xl:w-2/5"
          ></motion.div>

          <motion.p
            initial={{
              y: 40,
              opacity: 0,
            }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="text-base text-center text-gray-500 px-4 mx-auto mb-5 md:mb-10 md:px-12 md:max-w-2xl lg:max-w-3xl md:text-lg"
          >
            Explore a wide range of books in various genres. From thrilling
            mysteries to captivating novels, we have something for every reader.
          </motion.p>

          {/* Testimonials Cards */}

          <Slider {...sliderSettings}>
            {defaultSlidesImages.map((slideImage) => (
              <div key={slideImage} className="mb-10">
                <div className=" flex flex-row items-center justify-center">
                  <motion.img
                    initial={{
                      opacity: 0,
                    }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 1,
                      ease: "easeInOut",
                    }}
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
