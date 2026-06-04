# Password Strength Checker Web App

A modern, minimalist, and secure password strength analyzer built with Flask and React.

## Prerequisites

- Python 3.8+
- Node.js & npm

## Setup & Running

### 1. Backend (Flask)

The backend runs the password analysis logic.

```bash
# Navigate to root directory
# Create virtual environment (if not already done)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Run the server
python backend/server.py
```
The server will start at `http://localhost:5000`.

### 2. Frontend (React)

The frontend provides the interactive user interface.

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```
Open your browser at the URL shown (usually `http://localhost:5173`).

## Features
- Real-time strength analysis
- Breach database check simulation
- Intelligent password suggestions
- Modern glassmorphism design


Open the folder to see all files and guidlines.
