# cellular-automata

Running the Application
Running When Everything is Already Installed
If you have already installed the necessary dependencies and set up the database, you can skip the installation steps and just run your application. Here’s how to do that:

1. Run the Database
   If the database is not already running, you can start it with:

bash
Copy code
make db 2. Run the Application
Then, run the application using:

bash
Copy code
make run
This command will:

Build the Docker containers if they are not built yet.
Start both the backend and frontend services.
Summary of Commands
From Scratch:

bash
Copy code
make all
When Everything is Already Installed:

bash
Copy code
make db # Only if the database is not running
make run

To use this Makefile effectively:

Start your development session:

bashCopymake db # Start the database
make install # Install dependencies (first time only)
make migrate # Run database migrations
make run # Start both frontend and backend

During development:

bashCopymake db-logs # Check database logs if needed

When you're done:

bashCopymake db-stop # Stop the database

If you need to start fresh:

bashCopymake clean # Clean up everything
A few important notes:

The db target uses Docker to run PostgreSQL. Make sure Docker is installed and running on your system.
The database starts with these default credentials:

User: postgres
Password: postgres
Database: automata_db
Port: 5432

The run target automatically ensures the database is running before starting the backend and frontend.
If you need to modify the database configuration, you'll want to update both the db target in the Makefile and your application's database connection settings.
