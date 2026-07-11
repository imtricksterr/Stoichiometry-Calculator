# Ratio

A web app for stoichiometry calculations, mole conversions, and example problems.

## Tech Stack

- **React + TypeScript** (Vite)
- **Tailwind CSS** for styling

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS version)
- [VS Code](https://code.visualstudio.com)

### Installation

```bash
git clone https://github.com/imtricksterr/Stoichiometry-Calculator.git
cd stoichiometry-calculator/frontend
npm install
npm run dev
```

## Important Note: Frontend and Backend are ran separately

### Run Frontend:

```bash
cd stoichiometry-calulator/frontend
npm run dev
```

### Run Backend:

```bash
cd stoichiometry-calulator/backend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
frontend/
  src/
    components/       # Reusable UI components
    pages/            # Main sections of the app
    utils/            # Math/logic functions (conversions, balancing)
    data/             # Example problems and sample data
    App.tsx           # Root component
    main.tsx          # Entry point (don't touch)
backend/
  src/
    config/       # Database connection + env variables
    routes/       # API route definitions
    models/       # Mongoose schemas
    controllers/  # Route handler
    app.js       # Express App
```

## Recommended VS Code Extensions

- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
