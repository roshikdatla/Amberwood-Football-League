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
  console.log('🔧 MCP Tool Handler Called:');
  console.log('  Method:', req.method);
  console.log('  URL:', req.url);
  console.log('  Query:', req.query);
  console.log('  Body:', req.body);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('📋 OPTIONS request for MCP tool');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('❌ MCP Tool: Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tool } = req.query;
    const args = req.body;
    
    console.log(`🔧 Calling MCP tool: ${tool} with args:`, args);
    
    const result = await callMCPTool(tool, args);
    
    const response = {
      tool,
      result,
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ MCP Tool Success:', response);
    res.status(200).json(response);
    
  } catch (error) {
    console.error('💥 MCP API error:', error);
    res.status(500).json({ 
      error: 'Failed to call MCP tool',
      details: error.message 
    });
  }
}