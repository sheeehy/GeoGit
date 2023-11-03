import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GoPerson, GoSignOut, GoLocation } from "react-icons/go";

import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Terms from "./pages/terms";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/dropdown-menu";

import GeoGitIcon from "./assets/GeoGitIcon.png";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchGithubUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        await fetch(`http://localhost:4000/getGithubUserData?accessToken=${accessToken}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setUserData(data);
          });
      }
    };
    fetchGithubUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserData(null);
    window.location.reload();
  };

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

              {userData ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img src={userData.avatar_url} alt="User Avatar" className="w-10 h-10 rounded-full" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="font-bold font-Mona ">{userData.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="font-Hublot pb-1 text-gray-300">{userData.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-neutral-600" />
                    <DropdownMenuItem className="font-Hublot">
                      <GoLocation className="mr-2 text-lg" />
                      Location
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-Hublot">
                      <GoPerson className="mr-2 text-lg" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-neutral-600" />
                    <DropdownMenuItem className="font-Hublot" onClick={handleLogout}>
                      <GoSignOut className="mr-2 text-lg" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/SignIn" className="px-2 sm:px-4 py-2 block font-bold text-white login-button">
                  Sign In
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/About" element={<About />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
