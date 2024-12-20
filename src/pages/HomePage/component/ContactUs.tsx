import GirlUsingLaptop from "../../../assets/girl-working-on-laptop.jpg";
import { CiAt } from "react-icons/ci";

const ContactUs = () => {
  return (
    <section className="py-16 bg-white md:py-24">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="relative py-10 overflow-hidden bg-black md:py-16 ">
          <div className="absolute inset-0">
            <img
              className="object-cover w-full h-full md:object-left md:scale-150 md:origin-top-left xl:w-4/5"
              src={GirlUsingLaptop}
              alt="Woman working on a laptop"
            />
          </div>

          <div className="absolute inset-0 hidden bg-gradient-to-r md:block from-black to-transparent"></div>

          <div className="absolute inset-0 block bg-black/60 md:hidden"></div>

          <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center md:w-2/3 lg:w-1/2 xl:w-1/3 md:text-left">
              <h2 className="text-3xl font-poppins font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Stay in Touch with eLibrary
              </h2>
              <p className="mt-4 text-base text-gray-200 ">
                Have questions or need help exploring our collection? We are
                here for you! Contact us to learn more about our offerings, get
                personalized recommendations, or share your feedback. Let us
                help you discover your next favorite book!
              </p>

              <form className="mt-8 lg:mt-12">
                <div className="flex flex-col items-center sm:flex-row sm:justify-center">
                  <div className="flex-1 w-full min-w-0 px-4 sm:px-0">
                    <div className="relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <CiAt size={20} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email here"
                        className="block w-full py-4 pl-10 pr-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-gray-200 rounded-md sm:rounded-r-none  focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex relative items-center justify-center overflow-hidden   flex-shrink-0 w-auto px-4 py-4 mt-4 font-semibold text-white bg-orange-500 border border-orange-500 rounded-md sm:mt-0 sm:rounded-l-none transition-all before:absolute before:ease before:right-0 before:top-0 before:h-20 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                  >
                    Contact Us
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
