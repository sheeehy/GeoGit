import { useState } from "react";
import "../App.css";
import "../index.css";
import GeoGitIcon from "../assets/GeoGitIcon.png";
import TopGithubUsers from "../components/TopGitHubUsers";

function Search() {
  return (
    <>
      <main className="bg-thegray">
        <div className="min-h-screen flex items-center justify-center relative pb-32">
          {/* Background blobs */}
          <div className="absolute w-full max-w-lg">
            <div className="absolute -top-20 -left-6 w-72 h-72 bg-blue-300 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
            <div className="absolute -top-36 left-20 w-72 h-72 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
            <div className="absolute -bottom-14 left-72 w-72 h-72 bg-blue-300 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
            <div className="absolute top-10 -right-10 w-72 h-72 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>

            <div className="absolute top-40 -right-10 w-72 h-72 bg-blue-400 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
            <div className="absolute top-40 -left-10 w-72 h-72 bg-blue-300 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
          </div>

          <div className="relative">
            <div className="relative z-10 pt-0 pb-20">
              {/* Other elements */}

              <div className="flex justify-center">
                <img
                  src={GeoGitIcon}
                  alt="GeoGit Icon"
                  className="max-w-smallish pb-3"
                />
              </div>

              <div className="custom-card">
                <h1 className="text-center font-Mona font-bold text-white text-5xl leading-20 max-w-2xl">
                  Search
                </h1>
              </div>
              <TopGithubUsers />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Search;
