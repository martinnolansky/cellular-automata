# Install dependencies for both backend and frontend
install:
	# Backend
	python3 -m venv venv
	venv/bin/pip install -r backend/requirements.txt
	# Frontend
	cd frontend && npm install

# Run the backend
run-backend:
	PYTHONPATH=./backend venv/bin/uvicorn app.main:app --reload


# Run the frontend
run-frontend:
	cd frontend && npm run dev

# Run both frontend and backend
run:
	make run-backend & make run-frontend
