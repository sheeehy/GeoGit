# GeoGit
GeoGit is a React-based web application designed to rank the top GitHub users by location. Users can search by city and view a ranked list of GitHub users based on their follower count.



# Features

 Allows users to search for top GitHub users by city. Results are then displayed with their respective GitHub statistics.
 Provides detailed information about GeoGit and explains how the application works.
# Tech Stack
React
Vite
Tailwind CSS
Components Overview
Home Component: The main landing page with descriptive text and a call-to-action button.
Search Component: Page where users can search for GitHub users by city. Integrates with the LocationAutosuggest component to provide location suggestions and the TopGithubUsers component to display the ranked list.
About Component: Contains detailed information about the app and its functionality.
GlobeComponent: A visual representation of the globe, used as a background element.
LocationAutosuggest: Autocomplete component for suggesting cities as users type.
TopGithubUsers: Displays the top GitHub users for the selected city.
# How It Works
Choose a City: Users can enter a city into the search box to view the top GitHub users from that location. Note: The displayed results are based on the location provided by the users themselves on their GitHub profiles.
Fetch and Display: GeoGit interfaces with the GitHub API to fetch the top users for the specified location. The primary metric for ranking is the number of followers, but this may change in future iterations.
User Insights: The app displays profile details of each ranked user, such as their profile picture, username, full name, follower count, number of public repositories, and a direct link to their GitHub profile. Due to API usage restrictions, only 10 users are displayed at a time.
# Setup and Installation
Make sure you have Node.js and npm installed.


# Clone the repository
```
git clone https://github.com/sheeehy/Geo-Git-v2.git
```
# Navigate to the project directory
```
cd Geo-Git-v2
```
# Install dependencies
```
npm install
```
# Run the app in development mode
```
npm run dev
```
Open http://localhost:3000 to view it in the browser.

# Contributions
Contributions are welcome! Please refer to the project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

Fork the repo on GitHub.
Clone the project to your machine.
Commit changes to your own branch.
Push your work back up to your fork.
Submit a Pull request so that we can review your changes.
NOTE: Be sure to merge the latest changes from "upstream" before making a pull request.
