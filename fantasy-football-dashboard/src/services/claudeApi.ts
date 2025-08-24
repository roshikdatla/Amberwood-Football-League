import { TeamStanding } from '../types/sleeper';

interface ClaudeApiResponse {
  content: Array<{
    text: string;
  }>;
}

interface TeamAnalysis {
  teamName: string;
  record: string;
  overallGrade: string;
  gradeExplanation: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
  outlook: string;
  upcomingMatchup: {
    opponent: string;
    prediction: string;
    keyFactors: string[];
    confidence: string;
  };
  rosterAnalysis: {
    qb: string;
    rb: string;
    wr: string;
    te: string;
    flex: string;
    defense: string;
  };
  recentTrends: string[];
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
    const upcomingOpponent = this.getUpcomingOpponent(team, allTeams, currentWeek);
    
    const prompt = `Provide a comprehensive fantasy football analysis for this team:

LEAGUE CONTEXT:
${leagueContext}

TEAM TO ANALYZE:
${team.display_name}
Record: ${team.wins}-${team.losses}
Points For: ${team.points_for.toFixed(1)}
League Rank: ${team.rank} out of ${allTeams.length}

PERFORMANCE CONTEXT:
${teamContext}

UPCOMING MATCHUP:
Next opponent: ${upcomingOpponent}

Provide a detailed analysis in JSON format:
{
  "overallGrade": "A+/A/A-/B+/B/B-/C+/C/C-/D+/D/F",
  "gradeExplanation": "2-3 sentence explanation of the grade",
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"], 
  "advice": "Specific actionable advice for upcoming games",
  "outlook": "Rest of season and playoff outlook",
  "upcomingMatchup": {
    "opponent": "${upcomingOpponent}",
    "prediction": "Win/Loss prediction with score estimate",
    "keyFactors": ["factor1", "factor2", "factor3"],
    "confidence": "High/Medium/Low confidence level"
  },
  "rosterAnalysis": {
    "qb": "QB position strength assessment",
    "rb": "RB position strength assessment", 
    "wr": "WR position strength assessment",
    "te": "TE position strength assessment",
    "flex": "FLEX position depth assessment",
    "defense": "K/DST strength assessment"
  },
  "recentTrends": ["trend1", "trend2", "trend3"]
}

Focus on fantasy football strategy, performance trends, and actionable insights.`;

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
        overallGrade: analysisData.overallGrade || 'B',
        gradeExplanation: analysisData.gradeExplanation || 'Standard performance assessment.',
        strengths: analysisData.strengths || [],
        weaknesses: analysisData.weaknesses || [],
        advice: analysisData.advice || 'No specific advice available.',
        outlook: analysisData.outlook || 'Outlook not available.',
        upcomingMatchup: analysisData.upcomingMatchup || {
          opponent: upcomingOpponent,
          prediction: 'Competitive matchup expected',
          keyFactors: ['Player availability', 'Recent form', 'Matchup history'],
          confidence: 'Medium'
        },
        rosterAnalysis: analysisData.rosterAnalysis || {
          qb: 'QB assessment not available',
          rb: 'RB assessment not available', 
          wr: 'WR assessment not available',
          te: 'TE assessment not available',
          flex: 'Flex assessment not available',
          defense: 'K/DST assessment not available'
        },
        recentTrends: analysisData.recentTrends || ['Performance trends not available']
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

  private getUpcomingOpponent(team: TeamStanding, allTeams: TeamStanding[], currentWeek: number): string {
    // Simple logic to find next opponent (would need matchup data for accuracy)
    const otherTeams = allTeams.filter(t => t.roster_id !== team.roster_id);
    const randomOpponent = otherTeams[Math.floor(Math.random() * otherTeams.length)];
    return randomOpponent?.display_name || 'TBD';
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
      overallGrade: isTopHalf ? (highScoring ? 'B+' : 'B') : (highScoring ? 'B-' : 'C+'),
      gradeExplanation: `${isTopHalf ? 'Above average' : 'Below average'} performance with ${highScoring ? 'strong' : 'weak'} scoring output.`,
      strengths,
      weaknesses,
      advice,
      outlook,
      upcomingMatchup: {
        opponent: this.getUpcomingOpponent(team, allTeams, 1),
        prediction: 'Competitive matchup expected',
        keyFactors: ['Recent performance', 'Team health', 'Matchup advantages'],
        confidence: 'Medium'
      },
      rosterAnalysis: {
        qb: 'QB analysis not available without roster data',
        rb: 'RB analysis not available without roster data',
        wr: 'WR analysis not available without roster data', 
        te: 'TE analysis not available without roster data',
        flex: 'Flex depth analysis not available without roster data',
        defense: 'K/DST analysis not available without roster data'
      },
      recentTrends: [
        highScoring ? 'Strong offensive output' : 'Offensive struggles',
        isTopHalf ? 'Competitive standings position' : 'Fighting for playoff position',
        'Performance trending based on current metrics'
      ]
    };
  }
}

export const claudeApi = new ClaudeApiService();