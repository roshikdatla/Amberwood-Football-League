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
  private apiBaseUrl: string;

  constructor() {
    // Use our own chat API instead of calling Anthropic directly
    this.apiBaseUrl = process.env.REACT_APP_API_URL || 
      (process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:8000');
  }

  async analyzeTeam(
    team: TeamStanding, 
    allTeams: TeamStanding[], 
    leagueName: string,
    currentWeek: number
  ): Promise<TeamAnalysis> {
    // Use our chat API instead of calling Anthropic directly
    const question = `Analyze ${team.display_name}'s team in detail. They have a ${team.wins}-${team.losses} record with ${team.points_for.toFixed(1)} points for, currently ranked #${team.rank} out of ${allTeams.length} teams in ${leagueName}. Provide a comprehensive analysis including overall grade, strengths, weaknesses, advice, and outlook.`;

    try {
      const response = await fetch(`${this.apiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: question })
      });

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.status}`);
      }

      const data = await response.json();
      const analysisText = data.response || '';
      
      // Parse the response and structure it for the UI
      // Since we're getting unstructured text from the AI, we'll format it appropriately
      return {
        teamName: team.display_name,
        record: `${team.wins}-${team.losses}`,
        overallGrade: this.extractGradeFromAnalysis(analysisText),
        gradeExplanation: this.extractSectionFromAnalysis(analysisText, 'explanation'),
        strengths: this.extractBulletPoints(analysisText, 'strength'),
        weaknesses: this.extractBulletPoints(analysisText, 'weakness'),
        advice: this.extractSectionFromAnalysis(analysisText, 'advice') || 'No specific advice available.',
        outlook: this.extractSectionFromAnalysis(analysisText, 'outlook') || 'Outlook not available.',
        upcomingMatchup: {
          opponent: 'League opponent',
          prediction: this.extractSectionFromAnalysis(analysisText, 'prediction') || 'Competitive matchup expected',
          keyFactors: this.extractBulletPoints(analysisText, 'factor'),
          confidence: 'Medium'
        },
        rosterAnalysis: {
          qb: this.extractSectionFromAnalysis(analysisText, 'qb') || 'QB assessment not available',
          rb: this.extractSectionFromAnalysis(analysisText, 'rb') || 'RB assessment not available',
          wr: this.extractSectionFromAnalysis(analysisText, 'wr') || 'WR assessment not available',
          te: this.extractSectionFromAnalysis(analysisText, 'te') || 'TE assessment not available',
          flex: 'Flex depth assessment based on available players',
          defense: 'K/DST assessment based on league performance'
        },
        recentTrends: this.extractBulletPoints(analysisText, 'trend')
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

  private extractGradeFromAnalysis(text: string): string {
    // Look for grade patterns like A+, B-, C+, etc.
    const gradeMatch = text.match(/\b([ABCDF][+-]?)\b/);
    return gradeMatch ? gradeMatch[1] : 'B';
  }

  private extractSectionFromAnalysis(text: string, section: string): string {
    // Look for sections by keyword
    const sectionRegex = new RegExp(`${section}[:\\-]?\\s*(.{1,200})`, 'i');
    const match = text.match(sectionRegex);
    if (match) {
      return match[1].split('\n')[0].trim();
    }
    return '';
  }

  private extractBulletPoints(text: string, keyword: string): string[] {
    // Look for bullet points containing the keyword
    const lines = text.split('\n');
    const points = lines
      .filter(line => line.includes('•') || line.includes('-') || line.includes('*'))
      .filter(line => line.toLowerCase().includes(keyword.toLowerCase()))
      .map(line => line.replace(/[•\-*]\s*/, '').trim())
      .slice(0, 3); // Limit to 3 items
    
    return points.length > 0 ? points : [`${keyword.charAt(0).toUpperCase() + keyword.slice(1)} analysis from AI`];
  }
}

export const claudeApi = new ClaudeApiService();