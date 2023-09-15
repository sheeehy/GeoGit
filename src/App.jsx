import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import GeoGitIcon from "./assets/GeoGitIcon.png";

function App() {
  return (
    <Router>
      <header className="bg-transparent py-2">
        <div className="container mx-auto pt-6 px-12 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-white font-bold text-2xl">
              GeoGit
            </Link>
            <img
              src={GeoGitIcon}
              alt="GeoGit Icon"
              className="GeoIcon max-w-smaller"
            />
          </div>
          <nav>
            <ul className="flex space-x-8  text-white font-semibold">
              <li>
                <Link to="/" className="">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Search" className="">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/Contact" className="">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
