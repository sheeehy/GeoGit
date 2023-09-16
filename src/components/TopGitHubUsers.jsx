import React, { useState, useEffect } from "react";
import { GoPeople } from "react-icons/go";
import { GoRepo } from "react-icons/go";
import GeoGitIcon from "../assets/GeoGitIcon.png";

const BLANK_USERS = [...Array(10)].map((_, idx) => ({
  id: -idx - 1,
  avatar_url: "https://avatars.githubusercontent.com/u/9919?s=80&v=4",
  login: "Github User",
  name: "Name Name",
  followers: "0",
  reposCount: "0",
}));

export default function TopGitHubUsers(props) {
  const [users, setUsers] = useState(BLANK_USERS);

  useEffect(() => {
    async function fetchTopUsers() {
      let url;
      if (props.city) {
        url = `https://api.github.com/search/users?q=location:${props.city}&sort=followers&order=desc&per_page=10`;
      } else {
        url = `https://api.github.com/users?sort=followers&order=desc&per_page=10`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      const data = await response.json();
      const usersList = props.city ? data.items : data;
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

      setUsers(usersWithDetails.sort((a, b) => b.followers - a.followers));
    }

    // Check if props.city is not set, then return early
    if (!props.city) {
      return;
    }

    fetchTopUsers();
  }, [props.city]);

  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={user.id} style={{}} className="github-user ">
            <div className="flex items-center gap-6">
              <strong>#{index + 1}</strong>

              <a
                href={user.html_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-12 h-12 rounded-full "
                />
              </a>

              <a
                href={user.html_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className=" font-Mona whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[15rem] "
              >
                {user.login}
              </a>

              {user.name && (
                <div className="hidden md:block max-w-[8rem] whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-300">
                  <span>{user.name}</span>
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
