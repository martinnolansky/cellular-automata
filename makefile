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