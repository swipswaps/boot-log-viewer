FEDORA BOOT LOG VIEWER
======================

This repo contains:
- Frontend: React + Vite + Three.js (deployed to GitHub Pages)
- Backend: FastAPI + Docker (runs on your Fedora server, serves journalctl logs)

SETUP
-----
1. Build and run the backend on your Fedora machine:
   cd backend
   docker build -t boot-log-api .
   docker run -d --name boot-log-api -p 8000:8000 -v /var/log/journal:/var/log/journal:ro boot-log-api

2. Update the frontend API URL:
   In frontend/src/App.jsx, change VITE_API_URL to your server's IP:port (or set it via .env).

3. (Optional) To rebuild and redeploy the frontend:
   cd frontend && npm run build
   # then copy dist/ contents to the root and push to gh-pages branch

The live site will be at: https://swipswaps.github.io/boot-log-viewer/
