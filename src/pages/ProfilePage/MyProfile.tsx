import { useUserCheckouts } from "../../hooks/useCheckout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { PulseLoader } from "react-spinners";

const MyProfile = () => {
  const { data: checkouts, isLoading } = useUserCheckouts();
  const { user } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader size={12} />
      </div>
    );
  }

  return (
    <section className="bg-white min-h-screen flex flex-col">
      <div className="container mx-auto px-6 py-12 md:py-16 flex-grow">
        <div className="mt-20 md:mt-28 flex gap-12 flex-col lg:flex-row">
          <div className="w-full  bg-wrapper p-6 rounded-xl flex flex-col items-center shadow-md lg:w-1/3 lg:h-96">
            <div className="w-32 h-32 rounded-full font-semibold text-white  bg-orange-500/80 text-yellow-60 flex items-center justify-center mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">{user.name.slice(0, 2).toUpperCase()}</span>
            </div>

            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{user.name}</h2>
            <p className="text-gray-600 mb-1">{user.email}</p>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            <h2 className="font-bold font-poppins text-2xl text-gray-900  mb-4 md:text-3xl xl:text-4xl">
              Current Checkout Books
            </h2>
            {checkouts && checkouts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {checkouts?.map(({ book, daysLeft }) => (
                  <div
                    key={book.id}
                    className="border-2 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ease-in-out border-orange-200 transform  bg-white flex flex-col"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-28 h-44 rounded-md shadow-sm overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img src={book.img} alt={`${book.title}`} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex flex-col flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
                        {book.author && <p className="text-sm text-gray-500 mb-2">By {book.author}</p>}
                        {book.description && <p className="text-gray-600 text-sm line-clamp-5">{book.description}</p>}

                        <div className={`mt-3 text-sm font-bold ${daysLeft <= 0 ? "text-red-600" : "text-orange-500"}`}>
                          {daysLeft <= 0 ? "Overdue" : `${daysLeft} days left`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-wrapper rounded-xl flex flex-col items-center justify-center shadow-md text-center">
                <FiBookOpen className="text-orange-500 text-4xl mb-4" />
                <p className="text-gray-800 text-lg font-medium">
                  You currently have <span className="font-bold">0 checkouts</span>
                </p>
                <Link
                  to="/search"
                  className="mt-4 inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Explore our library
                  <FiBookOpen className="text-white" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
