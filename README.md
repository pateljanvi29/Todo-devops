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

## Auto-deploy with GitHub Actions + Render

This repository includes a GitHub Actions workflow that can automatically build and trigger deploys on Render whenever you push to the `main` branch.

What to configure in the GitHub repository settings (Settings → Secrets → Actions):

- `RENDER_API_KEY` — a Render API key (create one in your Render account).
- `RENDER_BACKEND_SERVICE_ID` — the Render service ID for the backend web service.
- `RENDER_FRONTEND_SERVICE_ID` — the Render service ID for the frontend static site.

How it works:

1. The workflow runs on `push` to `main`.
2. It installs dependencies and builds the frontend.
3. It triggers a deploy on Render for the backend and frontend by calling the Render Deploy API (so Render pulls the latest commit and runs its build/start commands).

How to get the Render service IDs:

- After creating services on Render (or linking the repo), open the service's dashboard and note the service ID from the URL or API settings. You can also use the Render API to list services.

Verify:

- Push any change to `main`. The workflow `Auto Deploy to Render` (in `.github/workflows/auto-deploy.yml`) should run and show the API calls to Render in the `Trigger Render deploys` job.

Notes and assumptions:

- This workflow assumes you want Render to perform the actual builds/start (Render's `render.yaml` is present). The workflow triggers Render deploys via the Deploy API.
- If you prefer, you can configure Render to enable automatic deploys directly (Render can auto-deploy on push without a GitHub Action). This Action is useful when you also want the repo to run a build/test step before asking Render to deploy.

## Quick test change

This small line was added as a test change so you can verify the GitHub Actions workflow triggers and (if configured) Render deploys are requested.

Test change added on 2025-11-10.
>>>>>>> 8b9829f (working project)
