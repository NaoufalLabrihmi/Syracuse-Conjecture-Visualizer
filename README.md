# Syracuse Conjecture Visualizer

A modern web application that visualizes the Syracuse (Collatz) conjecture using both 2D and 3D representations. Built with FastAPI, Next.js, and Three.js.

## Features

- Interactive 2D line chart visualization
- 3D visualization with rotation and zoom
- Real-time sequence calculation
- Modern UI with Chakra UI
- Responsive design
- Statistics display (steps, max value, final value)

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Project Structure

```
syracuse-conjecture/
├── backend/             # FastAPI backend
│   ├── app/
│   │   └── main.py     # API endpoints
│   └── requirements.txt # Python dependencies
└── frontend/           # Next.js frontend
    ├── src/
    │   ├── components/ # React components
    │   └── pages/      # Next.js pages
    └── package.json    # Node.js dependencies
```

## Setup and Running

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - Unix/MacOS:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend will be running at http://localhost:8000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be running at http://localhost:3000

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Enter a positive integer in the input field
3. Click "Calculate Sequence" to generate the Syracuse sequence
4. View the sequence in both 2D and 3D visualizations
5. Interact with the 3D visualization using:
   - Left mouse button: Rotate
   - Right mouse button: Pan
   - Mouse wheel: Zoom

## API Endpoints

- `POST /sequence`: Calculate Syracuse sequence
  - Request body: `{ "start_number": number }`
  - Response: Sequence data with statistics

## Technologies Used

- Backend:
  - FastAPI
  - Pydantic
  - NumPy
  - Uvicorn

- Frontend:
  - Next.js
  - React
  - Chakra UI
  - Three.js
  - Recharts
  - Axios

## License

MIT 