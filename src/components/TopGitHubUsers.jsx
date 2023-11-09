import React, { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { GoPeople, GoRepo, GoGitPullRequest } from "react-icons/go";
import { request, gql } from "graphql-request";
import { useNavigate } from "react-router-dom";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

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
                        <DialogHeader>
                          <DialogTitle className="text-white">User Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 p-4 text-white">
                          <div className="select-none pointer-events-none">
                            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full mx-auto " />
                          </div>
                          {user.name && (
                            <div>
                              <strong>Name:</strong> <span>{user.name}</span>
                            </div>
                          )}
                          <div>
                            <strong>Username:</strong> <span>{user.login}</span>
                          </div>
                          <div>
                            <strong>Bio:</strong> <span>{user.bio || "Not available"}</span>
                          </div>
                          <br></br>

                          <div>
                            <strong>Followers:</strong> <span>{user.followers}</span>
                          </div>

                          <div>
                            <strong>Public Repositories:</strong> <span>{user.public_repos}</span>
                          </div>
                          <div>
                            <strong>Public Commits:</strong> <span>{user.publicCommits}</span>
                          </div>
                          <div>
                            <strong>Location:</strong> <span>{user.location || "Not available"}</span>
                          </div>
                          <div>
                            <strong>Company:</strong> <span>{user.company || "Not available"}</span>
                          </div>
                          <div>
                            <br></br>
                            <strong>Personal Site:</strong> <span>{user.blog || "Not available"}</span>
                          </div>

                          <div>
                            <strong>Email:</strong> <span>{user.email || "Not available"}</span>
                          </div>
                          <div>
                            <strong>Twitter:</strong> <span>{user.twitter_username || "Not available"}</span>
                          </div>
                          <div>
                            <strong>GitHub Profile:</strong>
                            <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                              Visit Profile
                            </a>
                          </div>
                          {/* Any other user information you wish to include can be added here */}
                        </div>
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
