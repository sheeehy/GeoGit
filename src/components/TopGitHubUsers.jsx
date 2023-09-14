import React, { useState, useEffect } from "react";

const CITIES = ["san francisco", "new york"];

export default function TopGitHubUsers() {
  const [city, setCity] = useState(CITIES[0]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchTopUsers() {
      const response = await fetch(
        `https://api.github.com/search/users?q=location:${city}&sort=followers&order=desc&per_page=10`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      const usersWithDetails = await Promise.all(
        data.items.map(async (user) => {
          const starCount = await fetchStarCount(user.login);
          const contributionCount = await fetchContributionCount(user.login);

          return {
            ...user,
            starCount,
            contributionCount,
            score: user.followers + starCount + contributionCount,
          };
        })
      );

      setUsers(usersWithDetails.sort((a, b) => b.score - a.score));
    }

    async function fetchStarCount(username) {
      // Fetch top 5 repos for user and sum their stars
      const repoResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stargazers_count&per_page=5`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      const repos = await repoResponse.json();
      return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    }

    async function fetchContributionCount(username) {
      const eventsResponse = await fetch(
        `https://api.github.com/users/${username}/events/public`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      const events = await eventsResponse.json();
      const pushEvents = events.filter((event) => event.type === "PushEvent");
      return pushEvents.length;
    }

    fetchTopUsers();
  }, [city]);

  return (
    <div>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        {CITIES.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <ul>
        {users.map((user, index) => (
          <li key={user.id} style={{ margin: "20px 0" }}>
            <strong>#{index + 1}</strong>
            <br />
            <span
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                display: "inline-block",
              }}
            >
              Username: {user.login}
              <br />
              Followers: {user.followers}
              <br />
              Star Count: {user.starCount}
              <br />
              Contribution Count: {user.contributionCount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
