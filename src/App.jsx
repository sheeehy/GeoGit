import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import GeoGitIcon from "./assets/GeoGitIcon.png";
import { useAuth0 } from "@auth0/auth0-react";

const CLIENT_ID = "502ae01831b11391d1ee";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setIsAuthenticated(true);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }

  return (
    <Router>
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

              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      setIsAuthenticated(false);
                    }}
                    className="px-2 sm:px-4 py-2 block font-bold text-white login-button"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={loginWithGithub} className="px-2 sm:px-4 py-2 block font-bold text-white login-button">
                    Sign In
                  </button>
                </>
              )}
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
