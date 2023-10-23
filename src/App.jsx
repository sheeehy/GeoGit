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
      <button onClick={() => loginWithRedirect()} style={{}}>
        Login
      </button>
    );
  };
  return (
    <Router>
      <header className="bg-transparent py-2">
        <div className="container mx-auto pt-6 px-4 sm:px-12 flex flex-col sm:flex-row justify-between items-center z-50">
          <Link to="/" className="flex items-center space-x-3 mb-4 sm:mb-0">
            <img
              src={GeoGitIcon}
              alt="GeoGit Icon"
              className="GeoIcon max-w-smaller"
            />
            <span className="hidden sm:inline text-white font-bold text-2xl">
              GeoGit
            </span>
          </Link>

          <nav className="flex items-center font-Hublot">
            <ul className="flex space-x-4 sm:space-x-8 text-white ">
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
                <Link to="/About" className="">
                  About
                </Link>
              </li>
              <li className="font-bold">
                <LoginButton>Log in</LoginButton>
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
