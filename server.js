import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const CLIENT_ID = "502ae01831b11391d1ee";
const CLIENT_SECRET = "fd7922e790404eaeea244d2acc78de329d07cb14";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async function (req, res) {
  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;

  const response = await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    res.json(data);
  } else {
    console.log(`Failed to fetch with status ${response.status}`);
    res.status(500).send("Server Error");
  }
});

app.get("/getGithubUserData", async function (req, res) {
  const accessToken = req.query.accessToken;

  const response = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    res.json(data);
  } else {
    console.log(`Failed to fetch with status ${response.status}`);
    res.status(500).send("Server Error");
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

export default app;
