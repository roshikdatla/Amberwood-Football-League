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

async function processLeagueQuestion(question) {
  try {
    // Call external MCP server chat endpoint
    const response = await callExternalMCP('/api/chat', { message: question });
    return response.response;
    
  } catch (error) {
    console.error('Error processing question:', error);
    
    // Fallback response if MCP server is unavailable
    return `I'm having trouble connecting to the league data server right now. Please try again in a moment.\n\nIn the meantime, I can help you with:\n\n• Current standings\n• Team rosters and analysis  \n• League information\n• Recent transactions\n• Player searches\n\nError: ${error.message}`;
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
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Processing chat message:', message);
    
    const response = await processLeagueQuestion(message);
    
    res.status(200).json({ 
      response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
}