import "../App.css";
import GeoGitIcon from "../assets/GeoGitIcon.png";
import GlobeComponent from "../components/GlobeComponent";
import { Link } from "react-router-dom";
import { IoLogoOctocat, IoSparklesSharp } from "react-icons/io5";
import { GoPeople, GoOrganization, GoGitPullRequest } from "react-icons/go";

import TypingAnimation from "../components/TypingAnimation";

function Home() {
  return (
    <>
      <main className="bg-thegray home-no-scroll">
        <div className="min-h-screen flex items-center justify-center relative pb-20">
          {/*Background behind other elemetns */}
          <div className="absolute top-[24rem]  w-[45rem] h-[45rem] bg-blue-300 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
          <div className="absolute top-[24rem]  w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>

          <div className="relative">
            {/* Globe behind other elements*/}
            <div className="absolute flex justify-center globe-position pt-12">
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

              {/*Main content / Hero section */}
              <div className="HomeContainer">
                <h1 className="text-center font-Mona text-gray-100 leading-[1.1]  text-6xl leading-20 max-w-[48rem] ">
                  Rank the top GitHub users in <TypingAnimation />
                </h1>

                <h2 className=" h2text text-center font-Hublot text-gray-300 text-lg max-w-[30.5rem] leading-20 pt-4 pb-4 ">
                  Start by entering the city you want to rank{" "}
                  <IoLogoOctocat className="inline align-text-bottom" />{" "}
                  <span className="text-white">GitHub</span> users from, based
                  on{" "}
                  <span className="text-white">
                    <GoPeople className="inline align-text-bottom" /> followers
                  </span>{" "}
                  and
                  <span className="text-white">
                    {" "}
                    <GoGitPullRequest className="inline align-text-bottom" />{" "}
                    commits
                  </span>
                  . Leave a{" "}
                  <span className="text-white select-none transition-all duration-300 ease-in-out hover:text-yellow-500  ">
                    ★
                  </span>{" "}
                  on the{" "}
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
                  <IoSparklesSharp className="inline align-text-top" /> Get
                  Started
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
