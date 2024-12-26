import NavBar from "./pages/HomePage/component/NavBar";
import Home from "./pages/HomePage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBooksPage from "./pages/SearchPage/SearchBooksPage";
import Footer from "./pages/HomePage/component/Footer";

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchBooksPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
