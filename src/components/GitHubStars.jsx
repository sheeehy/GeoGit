import React, { useState } from "react";

const GitHubStars = () => {
  const [username, setUsername] = useState("");
  const [mostStarredRepo, setMostStarredRepo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMostStarredRepo = async () => {
    setLoading(true);
    setMostStarredRepo(null);
    try {
      let highestStars = 0;
      let mostStarred = {};
      let page = 1;
      let repos;

      do {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`);
        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`);
        }
        repos = await response.json();

        repos.forEach((repo) => {
          if (repo.stargazers_count > highestStars) {
            highestStars = repo.stargazers_count;
            mostStarred = { name: repo.name, stars: repo.stargazers_count };
          }
        });

        page++;
      } while (repos.length === 100);

      setMostStarredRepo(mostStarred);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMostStarredRepo();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="GitHub Username" />
        <button type="submit">Find Most Starred Repo</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : mostStarredRepo ? (
        <p>
          The most starred repo of {username} is {mostStarredRepo.name} with {mostStarredRepo.stars} stars.
        </p>
      ) : null}
    </div>
  );
};

export default GitHubStars;
