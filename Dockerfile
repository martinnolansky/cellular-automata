# Dockerfile
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/ .

# Expose the port for the FastAPI app
EXPOSE 8000

# Command to run the backend
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
