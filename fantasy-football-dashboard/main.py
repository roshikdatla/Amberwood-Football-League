#!/usr/bin/env python3
"""
Railway entry point for MCP server
"""
import os
import sys
import subprocess

# Add MCP directory to path
mcp_dir = os.path.join(os.path.dirname(__file__), 'MCP')
sys.path.insert(0, mcp_dir)

# Change to MCP directory and run the server
os.chdir(mcp_dir)

# Import and run the API server
from api_server import app
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)