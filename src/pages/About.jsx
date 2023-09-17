import { useState } from "react";
import "../App.css";
import "../index.css";
import GeoGitIcon from "../assets/GeoGitIcon.png";
import GlobeComponent from "../components/GlobeComponent";
import { Link } from "react-router-dom";

function About() {
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
            <div className="relative z-10 pt-0 pb-20">
              <div className="flex justify-center">
                <img
                  src={GeoGitIcon}
                  alt="GeoGit Icon"
                  className="max-w-smallish pb-3"
                />
              </div>

              <div className="HomeContainer">
                <h1 className="text-center font-Mona font-bold text-white text-5xl leading-20 max-w-2xl ">
                  About GeoGit
                </h1>
                <h2 className=" h2text text-left font-Hublot text-gray-300 text-lg max-w-md leading-20 pt-4 pb-4 ">
                  GeoGit is a streamlined tool designed to provide insights into
                  the GitHub community. Through our platform, users can rank the
                  top GitHub profiles based on location, offering both a global
                  perspective and a more nuanced, local viewpoint of GitHub
                  enthusiasts.
                </h2>

                <h1 className="pt-10 text-center font-Mona font-bold text-white text-5xl leading-20 max-w-2xl ">
                  How It Works
                </h1>
                <h2 className=" h2text text-left font-Hublot text-gray-300 text-lg max-w-md leading-20 pt-4 pb-4 ">
                  1. Location Input: Begin by entering your desired location
                  into the search box. This could be as specific as a city or as
                  broad as an entire state.
                  <br /> 2. Fetch and Display: Our application immediately
                  scours GitHub's vast database to fetch the top 10 GitHub users
                  for your specified location. This ranking is based primarily
                  on the number of followers.
                  <br /> 3. User Insights: For each listed user, GeoGitRank
                  displays: User avatar Username Actual Name (if available)
                  Number of Followers Count of Public Repositories
                </h2>
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
export default About;
