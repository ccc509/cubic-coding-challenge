# Cubic Coding Challenge

Repository Analyser – a React + TypeScript + Vite app that analyses public GitHub repositories using OpenAI.

**Live demo:** [https://cubic-coding-challenge.vercel.app/](https://cubic-coding-challenge.vercel.app/)

## Getting Started

1. Install dependencies: `yarn` or `npm install`
2. Create a `.env` file with `VITE_OPENAI_API_KEY=your-openai-api-key`
3. Run the dev server: `yarn dev` or `npm run dev`

## If I Had More Time

- **React Error Boundary** – Add an error boundary to catch rendering errors and display a fallback UI instead of a white screen

- **Unit tests** – Create unit tests for each component to ensure reliability, catch regressions, and document expected behaviour. Testing key flows (GitHub URL validation, analysis fetching, error states) would improve maintainability and confidence when refactoring.

- **Backend API** – Move the logic in `DefaultService` (OpenAI calls, GitHub API, analysis parsing) to a backend server. Benefits:
  - **Security** – Keep the OpenAI API key on the server instead of exposing it in client-side code (Vite env vars are bundled and visible to users)
  - **Rate limiting & abuse prevention** – Control and throttle requests per user
  - **Cost control** – Centralise usage tracking and spending limits
  - **Reliability** – Add retries, circuit breakers, and logging without increasing client bundle size
  - **Flexibility** – Swap providers, add caching, or change prompts without redeploying the frontend

- **Database** – Add a database to persist prompts and search history. This would enable:
  - **Prompt versioning** – Track and roll back prompt changes, A/B test variants, and compare performance
  - **Caching** – Store analysis results to avoid redundant OpenAI calls for previously analysed repos
  - **Search history persistence** – Keep history across sessions and devices instead of in-memory storage
