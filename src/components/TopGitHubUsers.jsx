import React, { useState, useEffect } from "react";
import { GoPeople, GoRepo, GoGitPullRequest,  } from "react-icons/go";
import { request, gql } from "graphql-request";

const BLANK_USERS = [...Array(10)].map(() => ({}));

async function getPublicCommits(username) {
  const query = gql`
    {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const endpoint = "https://api.github.com/graphql";
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = {
      Authorization: `bearer ${token}`,
    };
    const data = await request(endpoint, query, {}, headers);
    return data.user.contributionsCollection.contributionCalendar
      .totalContributions;
  } catch (error) {
    console.error(`Failed to get commit count for ${username}`, error);
    return 0;
  }
}

export default function TopGitHubUsers({ city }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!city) {
      setUsers(BLANK_USERS);
      return;
    }

    async function fetchTopUsers() {
      const base_url = `https://api.github.com/search/users?q=location:${city}&sort=followers&order=desc&per_page=10`;
      const response = await fetch(base_url, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });
      const data = await response.json();
      const usersList = data.items;

      const usersWithDetails = await Promise.allSettled(
        usersList.map(async (user) => {
          const userDetailsPromise = fetch(
            `https://api.github.com/users/${user.login}`,
            {
              headers: {
                Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
              },
            }
          ).then((res) => res.json());

          const publicCommitsPromise = getPublicCommits(user.login);

          const [userDetails, publicCommits] = await Promise.all([
            userDetailsPromise,
            publicCommitsPromise,
          ]);

          return {
            ...user,
            name: userDetails.name,
            reposCount: userDetails.public_repos,
            followers: userDetails.followers,
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
    }

    fetchTopUsers();
  }, [city]);



return (
  <div>
    <ul>
      {users.length > 0 &&
        users.map((user, index) => (
            <li
              key={user.id || index}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="github-user"
            >
              {user.id ? (
                <>
                  <div className="flex items-center ">
                    <strong>{index + 1}</strong>
                    <a
                      href={user.html_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pl-3 "
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
                      className="font-Mona whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[10rem] pl-3 font-bold"
                    >
                      {user.login}
                    </a>
                    {user.name && (
                      <div className="hidden md:block max-w-[8rem] whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-300 pl-2">
                        {user.name}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
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
                <div className="flex  items-center ">
                  <div                     
                        className="w-12 h-12"
                      />
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
              }