import React, { useState, useEffect } from "react";
import { GoPeople, GoRepo, GoGitPullRequest } from "react-icons/go";
import { request, gql } from "graphql-request";

const BLANK_USERS = [...Array(10)].map((_, idx) => ({
  id: -idx - 1,
  avatar_url: "https://raw.githubusercontent.com/sheeehy/Geo-Git-v2/main/src/assets/GeoGitIcon.png",
  login: "GeoGit User",
  name: "",
  followers: "0",
  reposCount: "0",
  publicCommits: "0",
  score: "0",
}));

const fetchPublicCommits = async (username) => {
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

export default function TopGitHubUsers({ city }) {
  const [users, setUsers] = useState(BLANK_USERS);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchTopUsers = async () => {
      setDataLoaded(false);
      if (!city) {
        setUsers(BLANK_USERS);
        return;
      }
      const baseUrl = `https://api.github.com/search/users?q=location:${city}&sort=followers&order=desc&per_page=10`;
      const headers = {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      };

      const response = await fetch(baseUrl, { headers });
      const data = await response.json();
      const usersList = data.items || [];

      const usersWithDetails = await Promise.allSettled(
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

      setUsers(
        usersWithDetails
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value)
          .sort((a, b) => b.score - a.score)
      );
      setDataLoaded(true);
    };

    fetchTopUsers();
  }, [city]);

  return (
    <div className="px-4 md:px-0">
      <ul>
        {dataLoaded && users.length === 0 ? (
          <div className="font-Hublot text-gray-300 leading-[1.7rem] center-div">No users found :(</div>
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
    </div>
  );
}
