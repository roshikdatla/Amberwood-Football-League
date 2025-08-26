const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:8000';

async function checkMCPConnection() {
  try {
    console.log('🏥 Checking MCP connection to:', MCP_SERVER_URL);
    const response = await fetch(`${MCP_SERVER_URL}/health`, { 
      method: 'GET',
      timeout: 5000 
    });
    console.log('🏥 MCP Health Response Status:', response.status);
    return response.ok;
  } catch (error) {
    console.error('🏥 MCP Connection Check Failed:', error.message);
    return false;
  }
}

export default async function handler(req, res) {
  console.log('🏥 Health Check Called:');
  console.log('  Method:', req.method);
  console.log('  URL:', req.url);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    console.log('❌ Health Check: Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const mcpConnected = await checkMCPConnection();
  
  const healthStatus = {
    status: 'ok',
    mcpConnected,
    mcpServerUrl: MCP_SERVER_URL,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown'
  };
  
  console.log('🏥 Health Status:', healthStatus);
  res.status(200).json(healthStatus);
}