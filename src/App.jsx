import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import GeoGitIcon from "./assets/GeoGitIcon.png";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
      <button onClick={() => loginWithRedirect()} style={{ whiteSpace: "nowrap" }}>
        Sign In
      </button>
    );
  };
  return (
    <Router>
      {/* Display GeoGit icon on small screens */}
      <div className="block sm:hidden text-center mb-4">
        <img src={GeoGitIcon} alt="GeoGit Icon" className="GeoIcon mx-auto w-24" />
      </div>

      <header className="bg-transparent py-4">
        <div className="container mx-auto pt-4 px-4 sm:px-12 flex flex-col sm:flex-row justify-between items-center z-50">
          <Link to="/" className="flex items-center space-x-3 mb-4 sm:mb-0">
            <img src={GeoGitIcon} alt="GeoGit Icon" className="GeoIcon max-w-smaller hidden sm:block" />
            <span className="hidden sm:inline text-white font-bold text-2xl select-none">GeoGit</span>
          </Link>
          <nav className="flex items-center font-Hublot">
            <ul className="flex space-x-2 sm:space-x-4 text-gray-300 font-bold select-none">
              <li>
                <Link to="/" className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Search" className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/About" className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <a href="/login" className="px-2 sm:px-4 py-2 block font-bold text-white login-button">
                  <LoginButton />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
