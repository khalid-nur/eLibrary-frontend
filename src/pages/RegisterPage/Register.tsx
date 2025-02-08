import { Link } from "react-router-dom";
import RegisterForm from "./component/RegisterForm";
import { FaBook, FaCommentDots, FaGlobe, FaListUl } from "react-icons/fa";
import SignupImage from "../../assets/signup-image.jpg";

const Register = () => {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative hidden md:flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover object-top  w-full h-full"
              src={SignupImage}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white">
                Join Our Community of Readers &
                <br className="hidden xl:block" /> Discover Endless Stories
              </h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full">
                    <FaBook className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Diverse Book Collection
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-orange-500  rounded-full">
                    <FaGlobe className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Read Anywhere, Anytime
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-orange-500  rounded-full">
                    <FaCommentDots className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Share Your Feedback
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-orange-500  rounded-full">
                    <FaListUl className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Organized Reading Lists
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full max-w-md 2xl:max-w-md xl:mx-auto">
            <h2 className="text-4xl font-poppins font-bold mb-4 leading-tight text-black ">
              Create Your eLibrary Account
            </h2>

            <RegisterForm />

            <p className="mt-2 text-center text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 ml-1 hover:underline"
              >
                Login
              </Link>
            </p>

            <p className="mt-5 text-sm text-gray-600">
              By creating an account, you agree to our
              <a
                href="/"
                className="text-blue-600 ml-1 transition-all duration-200 hover:underline hover:text-blue-700"
              >
                Terms of Service
              </a>
              <span className="mx-1 inline-block">and</span>
              <a
                href="/"
                className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
