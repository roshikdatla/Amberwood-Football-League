// Use the current domain for production, localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:8000');

export interface ChatResponse {
  response: string;
  timestamp: string;
}

export interface MCPToolResponse {
  tool: string;
  result: any;
  timestamp: string;
}

export class MCPApiService {
  async sendChatMessage(message: string): Promise<string> {
    const endpoint = `${API_BASE_URL}/api/chat`;
    console.log('🚀 MCP Chat Request:');
    console.log('  Endpoint:', endpoint);
    console.log('  Message:', message);
    console.log('  API_BASE_URL:', API_BASE_URL);
    console.log('  NODE_ENV:', process.env.NODE_ENV);
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      console.log('📡 Response Status:', response.status);
      console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`Chat API error: ${response.status} - ${errorText}`);
      }

      const data: ChatResponse = await response.json();
      console.log('✅ Success Response:', data);
      return data.response;
    } catch (error) {
      console.error('Error sending chat message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`I'm having trouble connecting to the league data server right now. Please try again in a moment.\n\nIn the meantime, I can help you with:\n\n• Current standings\n• Team rosters and analysis  \n• League information\n• Recent transactions\n• Player searches\n\nError: ${errorMessage}`);
    }
  }

  async callMCPTool(toolName: string, args: any = {}): Promise<any> {
    const endpoint = `${API_BASE_URL}/api/mcp/${toolName}`;
    console.log('🔧 MCP Tool Request:');
    console.log('  Endpoint:', endpoint);
    console.log('  Tool:', toolName);
    console.log('  Args:', args);
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      console.log('📡 Tool Response Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ MCP Tool Error Response:', errorText);
        throw new Error(`MCP tool error: ${response.status} - ${errorText}`);
      }

      const data: MCPToolResponse = await response.json();
      console.log('✅ Tool Success Response:', data);
      return data.result;
    } catch (error) {
      console.error(`Error calling MCP tool ${toolName}:`, error);
      throw error;
    }
  }

  async checkHealth(): Promise<boolean> {
    const endpoint = `${API_BASE_URL}/api/health`;
    console.log('🏥 Health Check Request:', endpoint);
    
    try {
      const response = await fetch(endpoint);
      console.log('🏥 Health Response Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Health Check Error:', errorText);
        return false;
      }
      
      const data = await response.json();
      console.log('🏥 Health Check Response:', data);
      return data.status === 'ok' && data.mcpConnected;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const mcpApi = new MCPApiService();