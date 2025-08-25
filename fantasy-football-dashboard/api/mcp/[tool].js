// External MCP server URL - replace with your deployed Railway/Render URL
const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:8000';

async function callExternalMCP(endpoint, data = {}) {
  try {
    const response = await fetch(`${MCP_SERVER_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`MCP server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling external MCP:', error);
    throw error;
  }
}

async function callMCPTool(toolName, args = {}) {
  try {
    // Call the external MCP server
    const response = await callExternalMCP(`/api/mcp/${toolName}`, {
      tool: toolName,
      arguments: args
    });
    
    return response.result;
  } catch (error) {
    console.error(`Error calling MCP tool ${toolName}:`, error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tool } = req.query;
    const args = req.body;
    
    console.log(`Calling MCP tool: ${tool} with args:`, args);
    
    const result = callMCPTool(tool, args);
    
    res.status(200).json({
      tool,
      result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('MCP API error:', error);
    res.status(500).json({ 
      error: 'Failed to call MCP tool',
      details: error.message 
    });
  }
}