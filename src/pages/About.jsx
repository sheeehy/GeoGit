import "../App.css";
import GeoGitIcon from "../assets/GeoGitIcon.png";
import { FaCity } from "react-icons/fa6";
import { GoQuestion, GoGraph } from "react-icons/go";
import { BsGear } from "react-icons/bs";

function About() {
  return (
    <>
      <main className="bg-thegray home-no-scroll fade-in1">
        <div className="min-h-screen flex items-center justify-center relative pb-32">
          {/* Background GIT! blobs */}
          <div className="absolute w-full max-w-lg -right-64">
            <div className="absolute -top-32 -right-0 w-[40rem] h-[40rem] bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
            <div className="absolute -top-0 -left-0 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>
          </div>

          <div className="relative">
            <div className="relative z-10 pt-5 pb-20">
              <div className="flex justify-center select-none">
                <img src={GeoGitIcon} alt="GeoGit Icon" className="max-w-smallish pb-3 select-none pointer-events-none" />
              </div>

              <div className="pt-10 max-w-[42rem] px-5">
                <h1 className="text-left font-Mona font-bold text-white text-4xl leading-20 pb-2  ">
                  <GoQuestion className="inline align-bottom text-4xl" /> About GeoGit
                </h1>
                <div className="  text-left font-Hublot text-gray-300 text-lg leading-20 pt-4 pb-4 ">
                  GeoGit is a tool designed to provide insights into the software developer community around the world. It allows users to rank the top software developers based on
                  location, offering both a global perspective and a more local viewpoint.{" "}
                  <p className="text-left font-Hublot text-gray-300 text-lg leading-20 pt-2">
                    This project was mainly built to improve my knowledge of React, Tailwind and API's as well as UI/UX.
                  </p>
                </div>

                <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <BsGear className="inline align-bottom " /> How It Works
                </h1>
                <div className="  text-left font-Hublot text-gray-300 text-lg  leading-20 pt-4 pb-4 ">
                  <h2 className="text-white font-bold text-xl pb-2">1 Choose a Location</h2>
                  Start by entering your desired location into the search box. For now, it just includes cities. Keep in mind, the results reflect the location users have entered
                  themselves.
                  <h2 className="text-white font-bold text-xl pb-2 pt-4">2 Fetch and Display</h2>
                  Using the relavent API's, the top developers are compiled across GitHub, GitLab and BitBucket The ranking is based on followers, public repositories and public
                  commits this year.
                  <h2 className="text-white font-bold text-xl pb-2 pt-4">3 User Insights</h2>
                  Each user has their profile picture, username, full name, followers, public commits this year and number of public repositories displayed, as well as a link to
                  either their GitHub, GitLab or BitBucket profile.
                </div>
                <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <GoGraph className="inline align-bottom" /> Future Updates
                </h1>
                <p className="  text-left font-Hublot text-gray-300 text-lg leading-20 pt-4 pb-4 ">
                  • Add pageination to display more users at a time
                  <br /> • Add more locations. <br /> • Add public repositories to ranking criteria.
                </p>
              </div>
            </div>
          </div>

          <a href="https://github.com/sheeehy" target="_blank" rel="noopener noreferrer" className="text-white font-Hublot leading-5 tracking-wider pb-2 jack-sheehy">
            Jack Sheehy :) <br />
            ©2023
          </a>
        </div>
      </main>
    </>
  );
}
export default About;
