import Anthropic from '@anthropic-ai/sdk';

interface PlayerInfo {
  name: string;
  position: string;
  team?: string;
  isStarter: boolean;
}

interface TeamAnalysisData {
  teamName: string;
  record: string;
  totalPoints: number;
  starters: PlayerInfo[];
  bench: PlayerInfo[];
  recentTransactions?: string[];
}

interface TeamAnalysis {
  strengths: string[];
  weaknesses: string[];
  startAdvice: string[];
  benchAdvice: string[];
  overallGrade: string;
  summary: string;
}

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY || '',
  dangerouslyAllowBrowser: true // Only for client-side usage
});

export const analyzeTeam = async (teamData: TeamAnalysisData): Promise<TeamAnalysis> => {
  // If no API key is provided, fall back to mock analysis
  if (!process.env.REACT_APP_ANTHROPIC_API_KEY) {
    console.warn('No Claude API key found - using mock analysis');
    return getMockAnalysis(teamData);
  }

  try {
    const prompt = createAnalysisPrompt(teamData);
    
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307', // Fast and cost-effective for this use case
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const contentBlock = message.content[0];
    if (contentBlock.type === 'text') {
      return parseClaudeResponse(contentBlock.text);
    } else {
      throw new Error('Unexpected response format from Claude');
    }
    
  } catch (error) {
    console.error('Error calling Claude API:', error);
    // Fall back to mock analysis if API fails
    return getMockAnalysis(teamData);
  }
};

const createAnalysisPrompt = (teamData: TeamAnalysisData): string => {
  const startersText = teamData.starters.map(p => `${p.position}: ${p.name} (${p.team || 'FA'})`).join('\n');
  const benchText = teamData.bench.slice(0, 6).map(p => `${p.position}: ${p.name} (${p.team || 'FA'})`).join('\n');
  
  return `You are a fantasy football expert analyzing a team for a weekly newsletter. Provide a detailed analysis of this team:

Team: ${teamData.teamName}
Record: ${teamData.record}
Total Points For: ${teamData.totalPoints}

STARTING LINEUP:
${startersText}

BENCH PLAYERS:
${benchText}

Please provide your analysis in this EXACT JSON format (no markdown, just raw JSON):

{
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "startAdvice": ["start advice 1", "start advice 2", "start advice 3"],
  "benchAdvice": ["bench advice 1", "bench advice 2"],
  "overallGrade": "A/B+/B/B-/C+/C",
  "summary": "2-3 sentence summary of the team's current state and outlook"
}

Focus on:
- Current player performance and matchups
- Roster construction strengths/weaknesses  
- Specific start/sit recommendations
- Overall team grade based on record and roster quality
- Be entertaining but informative for a fantasy football newsletter audience`;
};

const parseClaudeResponse = (response: string): TeamAnalysis => {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate the response structure
    if (!parsed.strengths || !parsed.weaknesses || !parsed.startAdvice || 
        !parsed.benchAdvice || !parsed.overallGrade || !parsed.summary) {
      throw new Error('Invalid response structure');
    }
    
    return {
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [parsed.strengths],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [parsed.weaknesses],
      startAdvice: Array.isArray(parsed.startAdvice) ? parsed.startAdvice : [parsed.startAdvice],
      benchAdvice: Array.isArray(parsed.benchAdvice) ? parsed.benchAdvice : [parsed.benchAdvice],
      overallGrade: parsed.overallGrade,
      summary: parsed.summary
    };
  } catch (error) {
    console.error('Error parsing Claude response:', error);
    throw new Error('Failed to parse AI response');
  }
};

// Fallback mock analysis (same as before)
const getMockAnalysis = (teamData: TeamAnalysisData): TeamAnalysis => {
  return {
    strengths: generateStrengths(teamData),
    weaknesses: generateWeaknesses(teamData),
    startAdvice: generateStartAdvice(teamData),
    benchAdvice: generateBenchAdvice(teamData),
    overallGrade: generateGrade(teamData),
    summary: generateSummary(teamData)
  };
};

const generateStrengths = (team: TeamAnalysisData): string[] => {
  const strengths = [];
  
  if (team.totalPoints > 100) {
    strengths.push("Strong offensive production with consistently high scoring");
  }
  
  const positions = team.starters.map(p => p.position);
  if (positions.includes('RB') && positions.filter(p => p === 'RB').length >= 2) {
    strengths.push("Solid running back depth providing reliable ground game");
  }
  
  if (positions.includes('WR') && positions.filter(p => p === 'WR').length >= 2) {
    strengths.push("Strong wide receiver corps offering multiple scoring options");
  }
  
  const [wins] = team.record.split('-').map(Number);
  if (wins >= 3) {
    strengths.push("Proven winning track record with strong game management");
  }
  
  return strengths.length > 0 ? strengths : ["Balanced roster with potential for improvement"];
};

const generateWeaknesses = (team: TeamAnalysisData): string[] => {
  const weaknesses = [];
  
  if (team.totalPoints < 80) {
    weaknesses.push("Inconsistent scoring output needs attention");
  }
  
  const positions = team.starters.map(p => p.position);
  if (!positions.includes('TE')) {
    weaknesses.push("Tight end position could use an upgrade");
  }
  
  const [wins, losses] = team.record.split('-').map(Number);
  if (losses >= wins) {
    weaknesses.push("Recent performance suggests need for strategic adjustments");
  }
  
  if (team.bench.length < 4) {
    weaknesses.push("Shallow bench depth limits flexibility and injury protection");
  }
  
  return weaknesses.length > 0 ? weaknesses : ["Minor areas for optimization"];
};

const generateStartAdvice = (team: TeamAnalysisData): string[] => {
  const advice = [];
  
  const rbs = team.starters.filter(p => p.position === 'RB');
  if (rbs.length > 0) {
    advice.push(`Start ${rbs[0].name} - reliable RB1 with consistent touches`);
  }
  
  const wrs = team.starters.filter(p => p.position === 'WR');
  if (wrs.length > 0) {
    advice.push(`${wrs[0].name} should be in your lineup - strong target share`);
  }
  
  const qb = team.starters.find(p => p.position === 'QB');
  if (qb) {
    advice.push(`${qb.name} offers solid QB production this week`);
  }
  
  return advice.length > 0 ? advice : ["Stick with your current starting lineup"];
};

const generateBenchAdvice = (team: TeamAnalysisData): string[] => {
  const advice = [];
  
  const benchPlayers = team.bench.slice(0, 2);
  benchPlayers.forEach(player => {
    advice.push(`Monitor ${player.name} - could be flex play depending on matchup`);
  });
  
  if (team.bench.length > 5) {
    advice.push("Consider dropping your lowest-upside bench player for waiver wire talent");
  }
  
  return advice.length > 0 ? advice : ["Bench looks solid - hold current players"];
};

const generateGrade = (team: TeamAnalysisData): string => {
  const [wins, losses] = team.record.split('-').map(Number);
  const winRate = wins / (wins + losses || 1);
  const avgPoints = team.totalPoints / (wins + losses || 1);
  
  if (winRate > 0.7 && avgPoints > 90) return "A";
  if (winRate > 0.6 && avgPoints > 80) return "B+";
  if (winRate > 0.5 && avgPoints > 70) return "B";
  if (winRate > 0.4 && avgPoints > 60) return "B-";
  if (winRate > 0.3) return "C+";
  return "C";
};

const generateSummary = (team: TeamAnalysisData): string => {
  const [wins, losses] = team.record.split('-').map(Number);
  const winRate = wins / (wins + losses || 1);
  
  if (winRate > 0.6) {
    return `${team.teamName} is performing well this season with a strong ${team.record} record. The team shows good balance and should continue competing for a playoff spot.`;
  } else if (winRate > 0.4) {
    return `${team.teamName} sits at ${team.record} with room for improvement. Some strategic moves could help push this team into contention.`;
  } else {
    return `${team.teamName} faces challenges at ${team.record} but has potential for a turnaround with the right adjustments and waiver wire pickups.`;
  }
};