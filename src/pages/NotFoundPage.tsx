import { Link } from "react-router-dom";

interface NotFoundPageProps {
  message?: string;
  linkTo?: string;
  linkText?: string;
}

const NotFoundPage = ({ message, linkTo, linkText }: NotFoundPageProps) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-6">
      <h1 className="text-6xl font-poppins font-bold text-gray-800 mb-2">404</h1>
      <p className="text-xl text-gray-700 mb-6 font-medium">
        {message || "Oops! The page you are looking for could not be found in elibrary."}
      </p>

      <Link
        to={linkTo || "/"}
        className="px-6 py-3 relative flex items-center gap-2 rounded-2xl border border-orange-500 bg-orange-500 text-white text-base font-semibold shadow-2xl transition-all before:absolute before:ease before:right-0 before:top-0 before:h-16 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 hover:before:-translate-x-64 overflow-hidden 2xl:text-lg "
      >
        {linkText || "Back to Main Page"}
      </Link>
    </div>
  );
};

export default NotFoundPage;
