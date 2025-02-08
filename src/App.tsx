import Home from "./pages/HomePage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBooksPage from "./pages/SearchPage/SearchBooksPage";
import BookCheckoutPage from "./pages/BookCheckoutPage/BookCheckoutPage";
import Register from "./pages/RegisterPage/Register";
import Layout from "./pages/MainLayout";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchBooksPage />} />
            <Route path="/checkout/:bookId" element={<BookCheckoutPage />} />
          </Route>

          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
