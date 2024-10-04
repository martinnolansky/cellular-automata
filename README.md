# Cellular Automata Project

This project is a web application that integrates a cellular automata model with a FastAPI backend and a Next.js frontend. The project includes a PostgreSQL database for storing simulation data.

## Features

- Cellular automata implementation with pattern generation.
- FastAPI backend for managing the cellular automata logic and API.
- Next.js frontend for user interaction and visualization.
- PostgreSQL database to store and retrieve simulation results.
- Modular codebase with unit testing.

## Requirements

Before starting, ensure you have the following installed:

- [Python 3.8+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (for local database management)

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/cellular-automata.git
   cd cellular-automata
   ```

2. **Install Backend and Frontend Dependencies**

   You can install all dependencies for the backend and frontend by running the following command:
   `make install`

   - This will create a Python virtual environment in the project and install the required backend packages from `requirements.txt`.
   - It will also install the necessary Node.js packages for the frontend.

## Database Management

The project uses PostgreSQL as its database. Ensure your PostgreSQL server is running and configured properly.

1.  **Run Database Migrations**

    After setting up the database, apply the necessary migrations with:
    `make migrate`

    This uses Alembic to handle database migrations.

## Running the Application

You can start both the backend and the frontend simultaneously or separately.

1.  **Run Both Backend and Frontend**

    To run both the backend (FastAPI) and the frontend (Next.js), execute:
    `make run`

2.  **Run Backend Only**

    To start just the FastAPI backend:

    `make run-backend`

3.  **Run Frontend Only**

    To start only the Next.js frontend:

    `make run-frontend`

## Clean Up

To clean up the project environment (remove virtual environment and clear cache files):

`make clean`

## License

This project is licensed under the MIT License.

## Contributors

Martin - Technology Graduate at Sky
