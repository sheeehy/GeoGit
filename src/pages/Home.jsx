import { useState } from "react";
import "../App.css";
import "../index.css";
import GeoGitIcon from "../assets/GeoGitIcon.png";
import GlobeComponent from "../components/GlobeComponent";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <main className="bg-thegray home-no-scroll">
        <div className="min-h-screen flex items-center justify-center relative pb-32">
          {/* Background blobs */}
          <div className="absolute w-full max-w-lg">
            <div className="absolute -top-20 -left-6 w-72 h-72 bg-blue-300 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
            <div className="absolute -top-36 left-20 w-72 h-72 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
            <div className="absolute -top-24 left-72 w-72 h-72 bg-blue-300 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
            <div className="absolute top-10 -right-10 w-72 h-72 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
            <div className="absolute top-40 -right-10 w-72 h-72 bg-blue-400 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
            <div className="absolute top-40 -left-10 w-72 h-72 bg-blue-300 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
          </div>

          <div className="relative">
            {/* Globe behind */}
            <div className="absolute flex justify-center pl-3 globe-position">
              <GlobeComponent />
            </div>
            <div className="relative z-10 pt-0 pb-20">
              {/* Other elements */}

              <div className="flex justify-center">
                <img
                  src={GeoGitIcon}
                  alt="GeoGit Icon"
                  className="max-w-smallish pb-3"
                />
              </div>

              <div className="HomeContainer">
                <h1 className="text-center font-Mona font-bold text-white text-5xl leading-20 max-w-2xl ">
                  Rank the top GitHub users by location, simplified.
                </h1>
                <h2 className=" h2text text-center font-Hublot text-gray-300 text-lg max-w-md leading-20 pt-4 pb-4 ">
                  Start by entering the city you want to rank GitHub users from.
                  For now, ranks are based on followers. Leave a ★ on the{" "}
                  <a
                    href="https://github.com/sheeehy/Geo-Git-v2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-100 ease-in-out hover:text-gray-400 font-bold text-white"
                  >
                    repo
                  </a>
                  !
                </h2>
                <Link to="/search" className="get-started-button font-mono">
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          <a
            href="https://github.com/sheeehy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-Hublot leading-5 tracking-wider pb-2 jack-sheehy"
          >
            Jack Sheehy :) <br />
            ©2023
          </a>
        </div>
      </main>
    </>
  );
}
export default Home;
