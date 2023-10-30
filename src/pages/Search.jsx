import React, { useState, useEffect } from "react";
import TopGithubUsers from "../components/TopGitHubUsers";
import LocationAutosuggest from "../components/LocationAutosuggest";
import Cobe from "../components/AutoGlobe";
import { GoPeople, GoRepo, GoGitPullRequest } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";

function Search() {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState([45, 10]);
  const navigate = useNavigate(); // <-- Changed this line
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityFromURL = params.get("city");
    if (cityFromURL) {
      setCity(cityFromURL);
      // Set coordinates if needed
    }
  }, [location]);

  const handleCityChange = (selectedCity, coords) => {
    setCity(selectedCity);
    setCoordinates(coords);
    navigate(`?city=${selectedCity}`);
  };

  return (
    <>
      <main className="bg-thegray relative">
        <div className="fixed w-full max-w-lg right-64">
          <div className="absolute top-16 -right-12 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>{" "}
          <div className="absolute top-64 right-20 w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>{" "}
        </div>

        <div className="hidden lg:block">
          <Cobe coordinates={coordinates} />
        </div>
        <div className="flex flex-col items-start justify-center relative pb-0 px-4 md:px-8 lg:px-32">
          <div className="pt-10 pb-6">
            <h1 className="font-Mona select-none font-bold text-white text-5xl leading-20 pb-2 fade-in1">Search</h1>
            <div className="flex select-none">
              <p className="font-Hublot select-none text-gray-300 mr-4 max-w-[24rem] leading-[1.7rem] fade-in2">
                Start by entering the city you want to rank developers from. Keep in mind, the results reflect the location users have entered themselves.
              </p>
              <p className="font-Hublot text-gray-300 hidden md:block fade-in3">
                <span className="flex items-center mr-4 mb-1">
                  <GoPeople className="text-white" />
                  <span className="ml-2">Followers</span>
                </span>

                <span className="flex items-center mb-1">
                  <GoGitPullRequest className="text-white" />
                  <span className="ml-2">Public Commits</span>
                </span>

                <span className="flex items-center">
                  <GoRepo className="text-white" />
                  <span className="ml-2">Public Repos</span>
                </span>
              </p>
            </div>
          </div>

          <LocationAutosuggest
            selectedCity={city}
            onCityChange={(selectedCity, coords) => {
              handleCityChange(selectedCity, coords);
            }}
          />
        </div>

        <div className=" pt-2 "></div>

        <div className="flex flex-col items-start justify-center relative pb-32 px-4 md:px-8 lg:px-32">
          <div className="relative z-1000 pt-0 pb-0">
            <TopGithubUsers city={city} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Search;
