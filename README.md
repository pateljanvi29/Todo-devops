<<<<<<< HEAD
# Todo-devops
=======
# Task Tracker (To-Do App)

Minimal fullstack Task Tracker with a React frontend and a Node/Express backend. Includes a GitHub Actions CI workflow and a `render.yaml` example for deploying to Render.

## What is included
- `backend/` — simple Express API storing tasks in `db.json` (file-based). Start script: `npm start`.
- `frontend/` — Vite + React app that calls the backend API and shows a simple progress chart.
- `.github/workflows/ci.yml` — CI that installs and builds frontend & backend (placeholder deploy step).
- `render.yaml` — example Render manifest to create a web service for backend and a static site for frontend.

## Run locally (quick)
Open a terminal and run these commands (Windows `cmd.exe`):

```cmd
cd "c:\Users\shris\Documents\College\Study\Fourth Year\Sem 7\Agile_Lab\Task-Tracker\backend"
npm install
npm start
```

In another terminal:

```cmd
cd "c:\Users\shris\Documents\College\Study\Fourth Year\Sem 7\Agile_Lab\Task-Tracker\frontend"
npm install
npm run dev
```

Open http://localhost:5173 and the backend runs on http://localhost:5000 by default.

## Build
To build the frontend for production:

```cmd
cd frontend
npm run build
```

## Push to GitHub
Create a repository on GitHub, then run (replace `<repo-url>`):

```cmd
git init
git add .
git commit -m "Initial Task Tracker scaffold"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

## Deploy to Render
1. Create a new GitHub repo and push your code.  
2. On Render, create two services (or use `render.yaml`): a Web Service for the backend (start command `node server.js`) and a Static Site for the frontend (publish `frontend/dist`).  
3. You can enable automatic deploys on Render by connecting the repo.

See `render.yaml` for an example manifest.
>>>>>>> 8b9829f (working project)
