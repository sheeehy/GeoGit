import React, { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { GoPeople, GoRepo, GoGitPullRequest, GoLocation, GoOrganization, GoMail, GoLink } from "react-icons/go";
import { FaXTwitter } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import { request, gql } from "graphql-request";
import { useNavigate } from "react-router-dom";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Separator } from "./Separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const BLANK_USERS = [];
const fetchPublicCommits = async (username) => {
  // GraphQL query for fetching public commits
  const query = gql`
    query ($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;
  const variables = { username };
  const headers = {
    Authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  };
  try {
    const data = await request("https://api.github.com/graphql", query, variables, headers);
    return data.user.contributionsCollection.contributionCalendar.totalContributions;
  } catch (error) {
    console.error(`Failed to get commit count for ${username}`, error);
    return 0;
  }
};

const fetchLanguagesInPinnedRepos = async (username, setLanguages, token) => {
  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          edges {
            node {
              ... on Repository {
                name
                owner {
                  login
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const { user } = await request("https://api.github.com/graphql", query, {}, { Authorization: `bearer ${token}` });
    const pinnedRepos = user.pinnedItems.edges.map((edge) => edge.node);

    let languages = {};
    for (const repo of pinnedRepos) {
      const repoLanguagesResponse = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`, { headers: { Authorization: `token ${token}` } });
      const repoLanguages = await repoLanguagesResponse.json();
      for (const [language, bytes] of Object.entries(repoLanguages)) {
        languages[language] = (languages[language] || 0) + bytes;
      }
    }

    setLanguages(languages);
  } catch (error) {
    console.error("Error fetching languages from pinned repos:", error);
    setLanguages({});
  }
};

export default function TopGitHubUsers({ city, isAuthenticated }) {
  const [users, setUsers] = useState(BLANK_USERS);
  const [prefetchedUsers, setPrefetchedUsers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchTopUsers = async (pageNumber, prefetch = false) => {
    if (!city) {
      setUsers(BLANK_USERS);
      setDataLoaded(true);
      return;
    }

    const baseUrl = `https://api.github.com/search/users?q=location:${city}&sort=followers&order=desc&per_page=10&page=${pageNumber}`;
    const headers = {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    };
    try {
      const response = await fetch(baseUrl, { headers });
      const data = await response.json();
      const usersList = data.items || [];

      const usersWithDetails = await Promise.all(
        usersList.map(async (user) => {
          const userDetailsPromise = fetch(`https://api.github.com/users/${user.login}`, { headers }).then((res) => res.json());
          const publicCommitsPromise = fetchPublicCommits(user.login);
          const [userDetails, publicCommits] = await Promise.all([userDetailsPromise, publicCommitsPromise]);
          return {
            ...user,
            ...userDetails,
            reposCount: userDetails.public_repos,
            publicCommits,
            score: 0.6 * userDetails.followers + 0.3 * publicCommits + userDetails.public_repos * 0.1,
          };
        })
      );

      if (prefetch) {
        // Background pre-fetching
        setPrefetchedUsers(usersWithDetails);
      } else {
        // Initial fetch or Load More clicked
        setUsers((prevUsers) => [...prevUsers.slice(0, (pageNumber - 1) * 10), ...usersWithDetails, ...prevUsers.slice(pageNumber * 10)]);
        // Trigger background pre-fetch for the next batch of users
        fetchTopUsers(pageNumber + 1, true);
      }
    } catch (error) {
      console.error("An error occurred while fetching data", error);
    } finally {
      if (!prefetch) {
        setDataLoaded(true);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    setUsers(BLANK_USERS);
    setDataLoaded(false); // Reset data loaded flag
    if (city) {
      setSearchAttempted(false); // Reset search attempted flag only when city is present
      fetchTopUsers(1).finally(() => setSearchAttempted(true)); // Set search attempted flag after fetch
    }
  }, [city]);
  const loadMoreUsers = () => {
    setPage((prevPage) => {
      if (isAuthenticated) {
        const newPage = prevPage + 1;
        setUsers((prevUsers) => [...prevUsers, ...prefetchedUsers]);
        // Fetch next set of users for future use
        fetchTopUsers(newPage + 1, true);
        return newPage;
      } else {
        navigate("/SignIn");
        return prevPage;
      }
    });
  };

  return (
    <div className="px-0 md:px-0">
      <ul>
        {dataLoaded && searchAttempted && users.length === 0 ? (
          <div className="font-Hublot text-gray-300 leading-[1.7rem] text-center">No users found :(</div>
        ) : (
          users.map((user, index) => (
            <li key={user.id || index} style={{ animationDelay: `${index * 0.1}s` }} className="github-user">
              {user.id ? (
                <>
                  <div className="flex items-center mb-2 md:mb-0">
                    <strong>{index + 1}</strong>
                    {/* Use DialogTrigger as the click target */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <a className="pl-3 flex items-center cursor-pointer">
                          <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
                          <div className="hidden md:block max-w-[12rem] md:whitespace-nowrap md:overflow-hidden md:overflow-ellipsis pl-3 font-bold">{user.name}</div>
                        </a>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="flex items-left  text-white">
                          <div className="">
                            <div className="select-none pointer-events-none">
                              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
                            </div>

                            <div className="flex justify-left pt-2  items-center">
                              {user.name && (
                                <div className="">
                                  <span className="font-bold text-xl font-Mona">{user.name}</span>
                                </div>
                              )}
                              <div className="px-2 pt-1 text-gray-500">•</div>
                              <div className="flex items-center">
                                <div className="text-gray-300 max-w-[19rem] text-xl truncate">{user.location}</div>
                              </div>
                            </div>

                            <div className=" pt-2 pb-2  text-md text-left justify-left">
                              <span className="text-left font-Hublot"> {user.bio || " "}</span>
                            </div>
                          </div>

                          <div className=" px-4  mt-2   h-[1px] bg-gray-500"></div>

                          <div className="text-lg font-Hublot pt-2 pb-2">
                            <div className="flex items-center " title="Company">
                              <GoOrganization className="inline-block font-bold mr-2" />
                              <div className="text-gray-300 max-w-[19rem]">{user.company || "Not Specified"}</div>
                            </div>

                            <div className="flex items-center">
                              <GoPeople className="inline-block font-bold mr-2" />
                              <div className="text-gray-300">{user.followers}</div>
                            </div>

                            <div className="flex items-center">
                              <GoGitPullRequest className="inline-block font-bold mr-2" />
                              <div className="text-gray-300">{user.publicCommits}</div>
                            </div>

                            <div className="flex items-center">
                              <GoRepo className="inline-block font-bold mr-2" />
                              <div className="text-gray-300">{user.public_repos}</div>
                            </div>
                          </div>

                          <div className="flex space-x-5 justify-center items-center pt-1 text-xl">
                            <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer" className="">
                              <BsGithub />
                            </a>
                            {user.blog && (
                              <a href={user.blog} target="_blank" rel="noopener noreferrer">
                                <GoLink className="" />
                              </a>
                            )}

                            {user.email && (
                              <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
                                <GoMail className="" />
                              </a>
                            )}

                            {user.twitter_username && (
                              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                                <FaXTwitter className="" />
                              </a>
                            )}
                          </div>
                          <div className="pt-4">
                            <UserLanguages username={user.login} token={import.meta.env.VITE_GITHUB_TOKEN} />
                          </div>
                        </DialogHeader>

                        {/* Maybe something with repos or languages? */}
                      </DialogContent>
                    </Dialog>

                    {user.login && <span className="font-Mona md:whitespace-nowrap md:overflow-hidden md:overflow-ellipsis md:max-w-[6rem] text-gray-300 pl-2">{user.login}</span>}
                  </div>
                  <div className="flex items-center gap-4 md:gap-2">
                    <div className="flex items-center gap-2 min-w-[3rem]">
                      <GoPeople /> {user.followers}
                    </div>
                    <div className="flex items-center gap-2 min-w-[3rem]">
                      <GoGitPullRequest /> {user.publicCommits}
                    </div>
                    <div className="flex items-center gap-2 min-w-[3rem]">
                      <GoRepo /> {user.reposCount}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center">
                  <div className="w-12 h-12" />
                </div>
              )}
            </li>
          ))
        )}
      </ul>
      {!dataLoaded ? (
        <div className="text-center width-1rem"></div>
      ) : (
        city &&
        users.length > 0 &&
        page < 10 && (
          <button onClick={loadMoreUsers} className="font-mono select-none show-more-button mx-auto block">
            Show More
          </button>
        )
      )}
    </div>
  );
}

function UserLanguages({ username, token }) {
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    fetchLanguagesInPinnedRepos(username, setLanguages, token);
  }, [username, token]);

  if (languages === null) return <PulseLoader />;

  return (
    <div>
      <h3 className="font-bold">Languages in Pinned Repositories:</h3>
      <ul>
        {Object.entries(languages).length === 0 ? (
          <li>No languages found.</li>
        ) : (
          Object.entries(languages).map(([language, bytes]) => (
            <li key={language}>
              {language}: {bytes.toLocaleString()} bytes
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
