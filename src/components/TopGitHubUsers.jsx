import React, { useState, useEffect } from "react";
import { GoPeople, GoRepo } from "react-icons/go";

// Placeholder users for initial render
const BLANK_USERS = [...Array(10)].map((_, idx) => ({
  id: -idx - 1,
  avatar_url:
    "https://raw.githubusercontent.com/sheeehy/Geo-Git-v2/main/src/assets/GeoGitIcon.png",
  login: "Github User",
  name: " ",
  followers: "0",
  reposCount: "0",
}));

export default function TopGitHubUsers({ city }) {
  const [users, setUsers] = useState(BLANK_USERS);

  useEffect(() => {
    async function fetchTopUsers() {
      const base_url = city
        ? `https://api.github.com/search/users?q=location:${city}&sort=followers&order=desc&per_page=10`
        : `https://api.github.com/users?sort=followers&order=desc&per_page=10`;

      const response = await fetch(base_url, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      const data = await response.json();
      const usersList = city ? data.items : data;
      const usersWithDetails = await Promise.all(
        usersList.map(async (user) => {
          const userDetailsResponse = await fetch(
            `https://api.github.com/users/${user.login}`,
            {
              headers: {
                Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
              },
            }
          );
          const userDetails = await userDetailsResponse.json();

          return {
            ...user,
            name: userDetails.name,
            reposCount: userDetails.public_repos,
            followers: userDetails.followers,
          };
        })
      );
      // Sort users by followers and update the state
      setUsers(usersWithDetails.sort((a, b) => b.followers - a.followers));
    }
    // Fetch data only if city prop is passed
    if (city) {
      fetchTopUsers();
    }
  }, [city]); // Dependency array for useEffect

  // Render the list of users
  return (
    // change to return elements.
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={user.id} className="github-user">
            <div className="flex items-center gap-6">
              <strong>#{index + 1}</strong>
              <a
                href={user.html_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-12 h-12 rounded-full"
                />
              </a>
              <a
                href={user.html_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-Mona whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[11rem]" // Was 8rem.
              >
                {user.login}
              </a>
              {user.name && (
                <div className="hidden md:block max-w-[8rem] whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-300">
                  {user.name}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 min-w-[60px]">
                <GoPeople /> {user.followers}
              </div>
              <div className="flex items-center gap-2 min-w-[3rem]">
                <GoRepo /> {user.reposCount}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
