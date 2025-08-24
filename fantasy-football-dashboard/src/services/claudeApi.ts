import { TeamStanding } from '../types/sleeper';

interface ClaudeApiResponse {
  content: Array<{
    text: string;
  }>;
}

interface TeamAnalysis {
  teamName: string;
  record: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
  outlook: string;
}

export class ClaudeApiService {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor() {
    this.apiKey = process.env.REACT_APP_CLAUDE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Claude API key not found. Set REACT_APP_CLAUDE_API_KEY environment variable.');
    }
  }

  async analyzeTeam(
    team: TeamStanding, 
    allTeams: TeamStanding[], 
    leagueName: string,
    currentWeek: number
  ): Promise<TeamAnalysis> {
    if (!this.apiKey) {
      throw new Error('Claude API key not configured');
    }

    const leagueContext = this.buildLeagueContext(allTeams, leagueName, currentWeek);
    const teamContext = this.buildTeamContext(team, allTeams);
    
    const prompt = `Analyze this fantasy football team in the context of their league:

${leagueContext}

Focus on: ${team.display_name}
Record: ${team.wins}-${team.losses}
Points For: ${team.points_for.toFixed(1)}
League Rank: ${team.rank} out of ${allTeams.length}

${teamContext}

Please provide a comprehensive analysis in the following JSON format:
{
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "advice": "Specific actionable advice for this week and upcoming games",
  "outlook": "Rest of season outlook and playoff chances"
}

Keep each point concise (1-2 sentences max). Focus on fantasy football strategy, not real NFL analysis.`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
      }

      const data: ClaudeApiResponse = await response.json();
      const analysisText = data.content[0]?.text || '';
      
      // Parse the JSON response from Claude
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Claude API');
      }

      const analysisData = JSON.parse(jsonMatch[0]);
      
      return {
        teamName: team.display_name,
        record: `${team.wins}-${team.losses}`,
        strengths: analysisData.strengths || [],
        weaknesses: analysisData.weaknesses || [],
        advice: analysisData.advice || 'No specific advice available.',
        outlook: analysisData.outlook || 'Outlook not available.'
      };

    } catch (error) {
      console.error('Claude API error:', error);
      
      // Fallback analysis if API fails
      return this.getFallbackAnalysis(team, allTeams);
    }
  }

  private buildLeagueContext(teams: TeamStanding[], leagueName: string, currentWeek: number): string {
    const topTeams = teams.slice(0, 3);
    const bottomTeams = teams.slice(-3);
    
    return `League: ${leagueName}
Current Week: ${currentWeek}
League Size: ${teams.length} teams

Top 3 Teams:
${topTeams.map(t => `${t.rank}. ${t.display_name} (${t.wins}-${t.losses}, ${t.points_for.toFixed(1)} PF)`).join('\n')}

Bottom 3 Teams:
${bottomTeams.map(t => `${t.rank}. ${t.display_name} (${t.wins}-${t.losses}, ${t.points_for.toFixed(1)} PF)`).join('\n')}`;
  }

  private buildTeamContext(team: TeamStanding, allTeams: TeamStanding[]): string {
    const avgPoints = allTeams.reduce((sum, t) => sum + t.points_for, 0) / allTeams.length;
    const avgPointsAgainst = allTeams.reduce((sum, t) => sum + t.points_against, 0) / allTeams.length;
    
    return `Team Performance vs League Average:
Points For: ${team.points_for.toFixed(1)} (league avg: ${avgPoints.toFixed(1)})
Points Against: ${team.points_against.toFixed(1)} (league avg: ${avgPointsAgainst.toFixed(1)})
Point Differential: ${(team.points_for - team.points_against).toFixed(1)}`;
  }

  private getFallbackAnalysis(team: TeamStanding, allTeams: TeamStanding[]): TeamAnalysis {
    const avgPoints = allTeams.reduce((sum, t) => sum + t.points_for, 0) / allTeams.length;
    const isTopHalf = team.rank <= Math.ceil(allTeams.length / 2);
    const highScoring = team.points_for > avgPoints;
    
    let strengths = [];
    let weaknesses = [];
    let advice = '';
    let outlook = '';

    if (highScoring) {
      strengths.push('Strong offensive production');
      strengths.push('Consistently high scoring potential');
    } else {
      weaknesses.push('Below average scoring output');
      weaknesses.push('Need to improve roster productivity');
    }

    if (isTopHalf) {
      strengths.push('Currently in playoff contention');
      outlook = 'Good position for playoff push with consistent performance.';
    } else {
      weaknesses.push('Currently outside playoff picture');
      outlook = 'Need strong finish to make playoffs. Focus on high-upside plays.';
    }

    advice = highScoring 
      ? 'Maintain consistent lineup choices and avoid risky plays.'
      : 'Look for waiver wire pickups and consider bold lineup moves.';

    return {
      teamName: team.display_name,
      record: `${team.wins}-${team.losses}`,
      strengths,
      weaknesses,
      advice,
      outlook
    };
  }
}

export const claudeApi = new ClaudeApiService();