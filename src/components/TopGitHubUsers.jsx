import React, { useState, useEffect } from "react";

function TopGithubUsers() {
  const [users, setUsers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const CITIES = [
    "san francisco",
    "new york",
    "seattle",
    "boston",
    "london",
    "bangalore",
    "berlin",
    "tel aviv",
    "toronto",
    "dublin",
  ];

  useEffect(() => {
    if (selectedLocation) {
      // Call the Vercel serverless function
      fetch(`/api/github?location=${selectedLocation}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch GitHub users");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.items) {
            const userPromises = data.items.map((user) =>
              fetch(`https://api.github.com/users/${user.login}/repos`)
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Failed to fetch user repos");
                  }
                  return response.json();
                })
                .then((repos) => ({
                  ...user,
                  totalStars: repos.reduce(
                    (acc, repo) => acc + repo.stargazers_count,
                    0
                  ),
                }))
            );
            return Promise.all(userPromises);
          }
          return [];
        })
        .then((results) => {
          results.sort((a, b) => b.totalStars - a.totalStars);
          setUsers(results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedLocation]);

  return (
    <div>
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="" disabled>
          Select a city
        </option>
        {CITIES.map((city) => (
          <option key={city} value={city}>
            {city.charAt(0).toUpperCase() + city.slice(1)}
          </option>
        ))}
      </select>

      {users.map((user, index) => (
        <div key={user.id}>
          <h3>
            {index + 1}. {user.login}
          </h3>
          <p>Total Stars: {user.totalStars}</p>
        </div>
      ))}
    </div>
  );
}

export default TopGithubUsers;
