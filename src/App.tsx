import Home from "./pages/HomePage/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SearchBooksPage from "./pages/SearchPage/SearchBooksPage";
import BookCheckoutPage from "./pages/BookCheckoutPage/BookCheckoutPage";
import Register from "./pages/RegisterPage/Register";
import Layout from "./pages/MainLayout";
import Login from "./pages/LoginPage/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import { PulseLoader } from "react-spinners";

const App = () => {
  const { isAuthenticated, isLoading, user } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PulseLoader size={12} />
      </div>
    );
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchBooksPage />} />
            <Route path="/checkout/:bookId" element={<BookCheckoutPage />} />
          </Route>
          <Route
            path="/register"
            element={!isAuthenticated ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to={"/"} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
