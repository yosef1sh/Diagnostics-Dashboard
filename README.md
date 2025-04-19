# Diagnostics Dashboard

A full-stack application for managing and visualizing diagnostics insights, built with FastAPI (Python) for the backend and React (Vite + TypeScript + TailwindCSS) for the frontend.

---

## Project Structure

```
Diagnostics-Dashboard/
│
├── client/   # Frontend (React + Vite)
└── server/   # Backend (FastAPI)
```

---

## Prerequisites

- **Node.js** (v18+ recommended) and npm
- **Python** (v3.10+ recommended)

---

## Backend (FastAPI)

### 1. Install dependencies

Navigate to the backend directory:

```powershell
cd server
pip install fastapi uvicorn pytest
```

### 2. Run the backend server

From `server`:

```powershell
uvicorn app.main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000).

### 3. Run backend tests

From `server`:

```powershell
pytest app/test_routers.py
```

---

## Frontend (React + Vite)

### 1. Install dependencies

Navigate to the frontend directory:

```powershell
cd client
npm install
```

### 2. Run the frontend development server

```powershell
npm run dev
```

The app will be available at the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

### 3. Lint and build

- Lint: `npm run lint`
- Build: `npm run build`
- Preview production build: `npm run preview`

---

## Usage

- The frontend expects the backend API to be running at `http://localhost:8000`.
- You can add, view, and visualize diagnostics data through the dashboard UI.

---

## Project Scripts

### Backend

- `uvicorn app.main:app --reload` — Start FastAPI server
- `pytest app/test_routers.py` — Run backend tests

### Frontend

- `npm run dev` — Start React dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code

---

## Notes

- Data is stored in JSON files under `server/app/data/`.
- You can customize the API endpoints in `server/app/routers/routers.py`.
- The frontend uses TailwindCSS for styling and Recharts for data visualization.

---

## License

MIT
