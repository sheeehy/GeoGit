import React, { useState, useEffect } from "react";
import { GoPeople } from "react-icons/go";
import { GoRepo } from "react-icons/go";

export default function TopGitHubUsers(props) {
  const [users, setUsers] = useState([]);

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
      const usersWithDetails = await Promise.all(
        data.items.map(async (user) => {
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

    fetchTopUsers();
  }, [props.city]);

  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li
            key={user.id}
            style={{
              marginBottom: "1.5rem", // Vertical gap between user cards
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
            className="github-user"
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              <strong>#{index + 1}</strong>
              <img
                src={user.avatar_url}
                alt={user.login}
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  filter: "grayscale(0%)",
                }}
              />
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "Mona-sans, sans-serif",
                  maxWidth: "15rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.login}
              </a>
              <div
                style={{
                  maxWidth: "10rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span>{user.name}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  minWidth: "60px",
                }}
              >
                <GoPeople /> {user.followers}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  minWidth: "3rem",
                }}
              >
                <GoRepo /> {user.reposCount}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
