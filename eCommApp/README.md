```md
# The Daily Harvest

A shopping website built with React, TypeScript, and Vite.

## Quick Start Guide

### Prerequisites

- Node.js 18 or newer
- npm

### Set up and run locally

From the repository root, run:

```bash
cd eCommApp
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Vite is configured to open the browser automatically.

Product information is loaded from local JSON files in `public/products/`; no separate API server is needed for the product catalog.

## Key commands

Run these commands from the `eCommApp` directory:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Type-check the project and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally; run `npm run build` first |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run all tests once |
| `npm run test:ui` | Open the Vitest UI |
| `npm run test:coverage` | Run tests and generate coverage reports |

## Tests

Tests use Vitest, jsdom, and React Testing Library. The shared test setup is in `src/test/setup.ts`. To run the suite once:

```bash
npm run test:run
```

To run tests while developing:

```bash
npm run test
```

Test files use the `*.test.ts` or `*.test.tsx` naming pattern. For example, `src/components/CartPage.test.tsx` covers cart page rendering.

## Important files

```text
eCommApp/
├── public/
│   ├── products/              # Product JSON data
│   └── products/productImages/ # Product images
├── src/
│   ├── components/            # Pages and reusable UI components
│   ├── context/CartContext.tsx # Shared shopping cart state
│   ├── test/                  # Test setup and test utilities
│   ├── types/                 # Shared TypeScript types
│   ├── utils/                 # Helper functions
│   ├── App.tsx                 # Routes and app-level providers
│   └── main.tsx                # React entry point and router
├── index.html                  # Vite HTML entry point
├── package.json                # Scripts and dependencies
├── vite.config.ts              # Vite server and Vitest configuration
└── README.md
```

## Application routes

- `/` — Home page
- `/products` — Product catalog
- `/cart` — Shopping cart
- `/login` — Login page
- `/admin` — Admin page
```