export default async (req, res) => {
  const { location } = req.query;

  const response = await fetch(
    `https://api.github.com/search/users?q=location:${location}&sort=followers&order=desc&per_page=10`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    res.status(200).json(data);
  } else {
    res.status(response.status).json(data);
  }
};
