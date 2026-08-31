# MySavings

MySavings is a savings-goal tracking web application built as a final project for a vocational school (TECHIN), by a team of 6 developers and 1 tester. Users can register and log in, manage a wallet, create and track savings goals, log deposits toward those goals, and view monthly statistics. The app also has an admin role and a logging dashboard for monitoring.

## Technologies

- **Backend:** C#, .NET 10, ASP.NET Core Web API, Clean Architecture (API / Data / Entities / Repositories / Services layers), Entity Framework Core, MySQL, JWT authentication, Swagger.
- **Frontend:** React 19, Vite, Tailwind CSS + daisyUI, Chart.js, React Router, React Hook Form, Axios.
- **Infrastructure & tools:** Docker (database + Seq logging containers), Seq, Git/GitHub.
- **Testing (QA):** Bruno (API tests), Selenium + JUnit 5 (UI tests) — see [`QA/README.md`](./QA/README.md) for the full testing stack and results.

This repository is split into two parts:

- **[`MySavingsApp/`](./MySavingsApp)** — the application source code (backend and frontend). See [`MySavingsApp/README.md`](./MySavingsApp/README.md) for setup and instructions on how to run the project locally.
- **[`QA/`](./QA)** — the full QA documentation for the project: requirements, test plans, test design, test execution results, and test automation (API and UI tests). See [`QA/README.md`](./QA/README.md) for details.

## My role

I was the tester on this project. I did not write any of the application code — my work was exclusively QA: requirements review, test planning, test design, manual and automated testing (Bruno for the API, Selenium for the UI), and reporting results. The `QA/` folder is where all of that work lives.
