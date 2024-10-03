# Variables
PYTHON = python3
VENV = venv
PIP = $(VENV)/bin/pip
PYTHON_VENV = $(VENV)/bin/python
UVICORN = $(VENV)/bin/uvicorn
DB_CONTAINER = cellular_automata_db

.PHONY: install run-backend run-frontend run db db-stop db-logs migrate clean help

# Install dependencies for both backend and frontend
install:
	@echo "Installing dependencies for backend and frontend..."
	# Backend
	$(PYTHON) -m venv $(VENV)
	$(PIP) install -r requirements.txt
	# Frontend
	cd frontend && npm install

# Start the database
db:
	@echo "Starting PostgreSQL database..."
	@if [ ! "$$(docker ps -q -f name=$(DB_CONTAINER))" ]; then \
		if [ "$$(docker ps -aq -f status=exited -f name=$(DB_CONTAINER))" ]; then \
			docker rm $(DB_CONTAINER); \
		fi; \
		docker run --name $(DB_CONTAINER) \
			-e POSTGRES_USER=postgres \
			-e POSTGRES_PASSWORD=postgres \
			-e POSTGRES_DB=automata_db \
			-p 5432:5432 \
			-v pgdata:/var/lib/postgresql/data \
			-d postgres:latest; \
		echo "Waiting for database to be ready..."; \
		sleep 5; \
	else \
		echo "Database is already running."; \
	fi

# Stop the database
db-stop:
	@echo "Stopping PostgreSQL database..."
	@docker stop $(DB_CONTAINER) || true
	@docker rm $(DB_CONTAINER) || true

# Show database logs
db-logs:
	@docker logs $(DB_CONTAINER)

# Run database migrations
migrate:
	@echo "Running database migrations..."
	$(PYTHON_VENV) -m alembic upgrade head

# Run the backend
run-backend:
	@echo "Starting backend..."
	PYTHONPATH=./backend $(UVICORN) app.main:app --reload

# Run the frontend
run-frontend:
	@echo "Starting frontend..."
	cd frontend && npm run dev

# Run both frontend and backend
run: db
	@echo "Starting both backend and frontend..."
	(make run-backend &) && (make run-frontend)

# Clean up
clean:
	@echo "Cleaning up..."
	make db-stop
	rm -rf $(VENV)
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

# Help
help:
	@echo "Available commands:"
	@echo "  make install     - Install all dependencies"
	@echo "  make db          - Start the PostgreSQL database"
	@echo "  make db-stop     - Stop the PostgreSQL database"
	@echo "  make db-logs     - Show database logs"
	@echo "  make migrate     - Run database migrations"
	@echo "  make run-backend - Start the backend server"
	@echo "  make run-frontend - Start the frontend server"
	@echo "  make run         - Start both backend and frontend"
	@echo "  make clean       - Clean up virtual environment and cache"
	@echo "  make help        - Show this help message"