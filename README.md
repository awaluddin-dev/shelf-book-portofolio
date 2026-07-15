# Shelf Book Portfolio

A highly interactive, modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion. 
Features live GitHub API integration, P5.js interactive animations, and a sleek glassmorphism aesthetic.

## Tech Stack
- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS v4, PostCSS
- **Animation:** Motion (Framer Motion)
- **Visuals:** P5.js for generative background effects
- **Data:** Live GitHub GraphQL API

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization
- The timeline and work experience can be modified in `src/entities/experience/model/experience-data.ts`.
- GitHub Integration leverages GraphQL. Configure your GitHub token in the backend to pull live data.
