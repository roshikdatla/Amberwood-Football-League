// External MCP server URL - replace with your deployed Railway/Render URL
const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:8000';

async function callExternalMCP(endpoint, data = {}) {
  const fullUrl = `${MCP_SERVER_URL}${endpoint}`;
  console.log('🔄 Calling External MCP:');
  console.log('  MCP_SERVER_URL:', MCP_SERVER_URL);
  console.log('  Full URL:', fullUrl);
  console.log('  Endpoint:', endpoint);
  console.log('  Data:', JSON.stringify(data, null, 2));
  
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('📡 MCP Response Status:', response.status);
    console.log('📡 MCP Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ MCP Server Error Response:', errorText);
      throw new Error(`MCP server error: ${response.status} - ${errorText}`);
    }

    const jsonResponse = await response.json();
    console.log('✅ MCP Success Response:', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error('💥 Error calling external MCP:', error);
    console.error('💥 Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
}

async function processLeagueQuestion(question) {
  try {
    console.log('🏈 Processing league question:', question);
    
    // Simple response for now - you can enhance this later
    return `Hello! I received your message: "${question}"\n\nI'm your fantasy football assistant! I can help you with:\n\n• Current standings\n• Team rosters and analysis  \n• League information\n• Recent transactions\n• Player searches\n\nWhat would you like to know about your league?`;
    
  } catch (error) {
    console.error('Error processing question:', error);
    return `Sorry, I encountered an error processing your request: ${error.message}`;
  }
}

export default async function handler(req, res) {
  console.log('🌐 API Chat Handler Called:');
  console.log('  Method:', req.method);
  console.log('  URL:', req.url);
  console.log('  Headers:', req.headers);
  console.log('  Body:', req.body);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('📋 OPTIONS request - returning CORS headers');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      console.log('❌ No message provided in request body');
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('✅ Processing chat message:', message);
    
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