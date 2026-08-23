const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:8000';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Amberwood-Voter');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const voterId = req.headers['x-amberwood-voter'];
  if (!voterId) {
    return res.status(400).json({ error: 'Anonymous voter ID is required' });
  }

  const searchParams = new URLSearchParams();
  if (req.method === 'GET') {
    searchParams.set('league_id', req.query.league_id || '');
    searchParams.set('week', req.query.week || '');
  }

  const queryString = searchParams.toString();
  const endpoint = `${MCP_SERVER_URL}/api/votes${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(endpoint, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'X-Amberwood-Voter': voterId,
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });
    const payload = await response.json();
    return res.status(response.status).json(payload);
  } catch (error) {
    console.error('Matchup voting proxy error:', error);
    return res.status(503).json({ error: 'Voting is temporarily unavailable' });
  }
}
