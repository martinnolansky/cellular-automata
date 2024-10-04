# Variables
PYTHON = python3
VENV = venv
PIP = $(VENV)/bin/pip
PYTHON_VENV = $(VENV)/bin/python
UVICORN = $(VENV)/bin/uvicorn

.PHONY: install run-backend run-frontend migrate clean help

install:
	@echo "Installing dependencies for backend and frontend..."
	$(PYTHON) -m venv $(VENV)
	$(PIP) install -r requirements.txt
	cd frontend && npm install

migrate:
	@echo "Running database migrations..."
	$(PYTHON_VENV) -m alembic upgrade head

run-backend:
	@echo "Starting backend..."
	PYTHONPATH=./backend $(UVICORN) app.main:app --reload &

run-frontend:
	@echo "Starting frontend..."
	cd frontend && npm run dev

run: migrate run-backend run-frontend

clean:
	@echo "Cleaning up..."
	rm -rf $(VENV)
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

help:
	@echo "Available commands:"
	@echo "  make install     - Install all dependencies"
	@echo "  make migrate     - Run database migrations"
	@echo "  make run-backend - Start the backend server"
	@echo "  make run-frontend - Start the frontend server"
	@echo "  make run         - Run migrations and start both backend and frontend"
	@echo "  make clean       - Clean up virtual environment and cache"
	@echo "  make help        - Show this help message"
