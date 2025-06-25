
# NASA Visualization Website

This is a website which leverages NASAs free APIs in order to create a space data exploration experience. The project features a React frotend paired with a Node.js and Express backend, and offers offers users interactive access to diverse space data - including NASA’s Astronomy Picture of the Day (APOD), recent natural events, earth imagery data, and near-Earth object near-miss information.

## Live Demo
The application is deployed and running live here:

[https://nasa-explorer-eta.vercel.app/](https://nasa-explorer-eta.vercel.app/)
## Features

- View the NASA Astronomy Picture of the Day (APOD)
    - Displays NASA's daily astronomy image along with its title and description.
- Browse Natural Events (EONET API)
    - View all reported natural events from the past 3 months.
    - Filter events by:
        - Status (open/closed)
        - Event category (e.g. wildfire, severe storm, volanic activity)
        - Custom date range
    - View detailed information for each event, including its location and a satellite map preview wherever possible.
- Explore Near-Earth Object (NEO) Data
    - View recent near-Earth asteroid approaches.
    - Details include:
        - Asteroid name
        - Average estimated diameter
        - Speed and miss distance
        - Date, time, and potential hazard Status
    - Retrieve a timeline of past and future approaches for a selected asteroid
- Responsive, Cross-Platform Design
    - Works smoothly on desktops, tablets, and mobile devices


## Tech Stack

**Frontend:** React

**Backend:** Node.js, Express

**Deployment:** Vercel (frontend), Render (backend)

**Testing:** Jest, React Testing Library


## Run Locally

The project is already deployed live, however you may run it locally using the following steps:

*NOTE: Both the frontend and backend must be running in order for the data fetched from the APIs to work.*

Clone the project

```bash
  git clone https://github.com/handsansanhand/NASAExplorer.git
```


**Frontend**

Go to the forntend directory

```bash
  cd NASAExplorer/frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

**Backend**
Go to the backend directory

```bash
  cd NASAExplorer/backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Running Tests

You can run tests for both frontend and backend by navigating to either directory.

Then, run:
```bash
  npm test
```


## Authors

- [@handsansanhand](https://www.github.com/handsansanhand)

