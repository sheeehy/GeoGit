import React, { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { GoPeople, GoRepo, GoGitPullRequest } from "react-icons/go";
import { request, gql } from "graphql-request";
import { useNavigate } from "react-router-dom";

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
            score: 0.7 * userDetails.followers + 0.3 * publicCommits,
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
                    <a href={user.html_url || "#"} target="_blank" rel="noopener noreferrer" className="pl-3">
                      <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
                    </a>
                    <a
                      href={user.html_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-Mona md:whitespace-nowrap md:overflow-hidden md:overflow-ellipsis md:max-w-[10rem] pl-3 font-bold"
                    >
                      {user.login}
                    </a>
                    {user.name && <div className="hidden md:block max-w-[8rem] md:whitespace-nowrap md:overflow-hidden md:overflow-ellipsis text-gray-300 pl-2">{user.name}</div>}
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
