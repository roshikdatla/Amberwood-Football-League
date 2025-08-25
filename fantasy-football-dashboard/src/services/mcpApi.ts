// Use the current domain for production, localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000');

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
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw new Error('Failed to get response from league assistant. Please make sure the API server is running.');
    }
  }

  async callMCPTool(toolName: string, args: any = {}): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mcp/${toolName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      if (!response.ok) {
        throw new Error(`MCP tool error: ${response.status}`);
      }

      const data: MCPToolResponse = await response.json();
      return data.result;
    } catch (error) {
      console.error(`Error calling MCP tool ${toolName}:`, error);
      throw error;
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const data = await response.json();
      return data.status === 'ok' && data.mcpConnected;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const mcpApi = new MCPApiService();