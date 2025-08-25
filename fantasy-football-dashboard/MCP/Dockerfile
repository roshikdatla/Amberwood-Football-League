FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY *.py ./
COPY config.py ./

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "api_server.py"]