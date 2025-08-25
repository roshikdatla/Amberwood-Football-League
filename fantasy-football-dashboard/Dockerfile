FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY fantasy-football-dashboard/MCP/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy MCP application files
COPY fantasy-football-dashboard/MCP/ ./

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "api_server.py"]