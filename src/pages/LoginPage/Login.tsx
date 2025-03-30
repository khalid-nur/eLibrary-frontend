import { Link } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import elibraryLogo from "../../assets/elibrary_logo.png";
import personReading from "../../assets/Person-reading-on-a-tablet.jpg";

const Login = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen py-10 bg-gray-900 sm:py-16 lg:py-24">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src={personReading}
          alt="Person reading on a tablet"
        />
      </div>
      <div className="absolute inset-0 bg-gray-900/30"></div>

      <div className="relative w-full max-w-lg px-4 mx-auto sm:px-0">
        <div className="overflow-hidden bg-white rounded-md shadow-md">
          <div className="px-4 py-6 sm:px-8 sm:py-7">
            <img className="h-16" src={elibraryLogo} alt="eLibrary-Logo" />

            <div className="mt-4">
              <h2 className="text-4xl font-poppins font-bold mb-4 leading-tight text-black">
                Welcome back to eLibrary
              </h2>
              <p className="mb-4 text-lg text-gray-600 font-medium">
                Explore our library of endless choices
              </p>
            </div>

            <LoginForm />

            <div className="text-center">
              <p className="mt-2 text-base text-gray-600">
                Join us today!
                <Link
                  to="/register"
                  title=""
                  className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 ml-1 hover:underline"
                >
                  Create a free account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
