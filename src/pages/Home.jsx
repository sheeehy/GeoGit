import "../App.css";
import GeoGitIcon from "../assets/GeoGitIcon.png";
import GlobeComponent from "../components/GlobeComponent";
import { Link } from "react-router-dom";
import { IoLogoOctocat, IoSparklesSharp } from "react-icons/io5";
import { GoPeople, GoGitPullRequest } from "react-icons/go";

import TypingAnimation from "../components/TypingAnimation";

function Home() {
  return (
    <>
      <main className="bg-thegray home-no-scroll fade-in1">
        <div className="min-h-screen flex items-center justify-center relative ">
          {/*Background behind other elemetns */}
          <div className="absolute top-[24rem]  w-[45rem] h-[45rem] bg-blue-300 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
          <div className="absolute top-[24rem]  w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>

          <div className="relative">
            {/* Globe behind other elements*/}
            <div className="absolute flex justify-center globe-position pt-10">
              <GlobeComponent />
            </div>
            <div className="relative z-10 pt-0 pb-20">
              {/* Other elements */}

              {/*Main content / Hero section */}
              <div className="HomeContainer ">
                <h1 className="text-center pb-1   lg:pl-6 pointer-events-none select-none customFont text-gray-100 leading-[1.1]  max-w-[53rem] ">
                  Rank the top <span className="pr-10">software</span> <span className="pl-5">developers</span> in <TypingAnimation />
                </h1>

                <h2 className="h2text pb-6  select-none  text-center font-Hublot text-gray-300 text-xl max-w-[36rem] leading-20 pt-4  ">
                  Start by entering the city you want to rank top developers from. Ranks are based on{" "}
                  <span className="text-white">
                    <GoPeople className="inline align-text-bottom" /> followers
                  </span>{" "}
                  and{" "}
                  <span className="text-white">
                    <GoGitPullRequest className="inline align-text-bottom" /> commits
                  </span>
                  . Leave a <span className="text-white  transition-all duration-300 ease-in-out hover:text-yellow-500  ">★</span> on the{" "}
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
                <Link to="/search" className="get-started-button font-mono select-none">
                  <IoSparklesSharp className="inline align-text-top" /> Get Started
                </Link>
              </div>
            </div>
          </div>

          <a href="https://github.com/sheeehy" target="_blank" rel="noopener noreferrer" className=" font-Hublot leading-12 tracking-wider pb-2 jack-sheehy">
            <span className="text-gray-300 font-bold">Jack Sheehy :) </span> <br />
            <span className="text-gray-400"> ©2023 </span>
          </a>
        </div>
      </main>
    </>
  );
}
export default Home;
