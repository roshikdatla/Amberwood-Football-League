import React from 'react';

const StrengthOfSchedule: React.FC = () => {
  const scheduleData = [
    {
      team: 'pranavj20',
      displayName: 'Pranav Jain',
      record: '7-3',
      opponents: ['audumula (6-4)', 'SahitReddi (7-3)', 'abhiu (2-8)', 'ankithe (6-4)'],
      avgOppWins: 5.25,
      difficulty: 'Hard',
      color: '#F44336',
      outlook: 'Strong playoff positioning with favorable schedule—only Week 12 vs. SahitReddi poses real threat. Weeks 13-14 against struggling teams offer cushion to secure first-round bye.'
    },
    {
      team: 'SahitReddi',
      displayName: 'Sahit Reddi',
      record: '7-3',
      opponents: ['kulkdaddy47 (6-4)', 'pranavj20 (7-3)', 'ankithe (6-4)', 'abhiu (2-8)'],
      avgOppWins: 5.25,
      difficulty: 'Medium',
      color: '#FF9800',
      outlook: 'SahitReddi faces a brutal gauntlet of winning teams that will define playoff seeding—the Week 12 showdown against fellow 7-3 pranavj20 is pivotal for securing a first-round bye.'
    },
    {
      team: 'ankithe',
      displayName: 'Ankith',
      record: '6-4',
      opponents: ['swahili28 (5-5)', 'abhiu (2-8)', 'SahitReddi (7-3)', 'pranavj20 (7-3)'],
      avgOppWins: 5.25,
      difficulty: 'Medium',
      color: '#FF9800',
      outlook: 'ankithe faces a split schedule with two winnable games (Weeks 11-12) before brutal playoff-clinching battles against top contenders—must capitalize early to secure wild card position.'
    },
    {
      team: 'audumula',
      displayName: 'Anudeep',
      record: '6-4',
      opponents: ['pranavj20 (7-3)', 'kulkdaddy47 (6-4)', 'abhishekD (6-4)', 'pranav4789 (5-5)'],
      avgOppWins: 6.0,
      difficulty: 'Hard',
      color: '#F44336',
      outlook: 'Brutal stretch ahead facing all playoff contenders. Week 11 vs pranavj20 and Week 13 vs abhishekD are must-win games to secure top-5 spot in tight 6-4 logjam.'
    },
    {
      team: 'abhishekD',
      displayName: 'Abhishek',
      record: '6-4',
      opponents: ['akhilmetukuru (3-7)', 'pranav4789 (5-5)', 'audumula (6-4)', 'kulkdaddy47 (6-4)'],
      avgOppWins: 5.0,
      difficulty: 'Medium',
      color: '#FF9800',
      outlook: 'Favorable schedule with beatable 3-7 and 5-5 opponents, but must capitalize—low PF means you need wins, not wild card hopes. Every game is must-win.'
    },
    {
      team: 'kulkdaddy47',
      displayName: 'Aditya',
      record: '6-4',
      opponents: ['SahitReddi (7-3)', 'audumula (6-4)', 'pranav4789 (5-5)', 'abhishekD (6-4)'],
      avgOppWins: 6.0,
      difficulty: 'Hard',
      color: '#F44336',
      outlook: 'Tough bounce-back after disaster week. Opening SahitReddi matchup crucial—win there and three winnable games follow to secure playoffs at 9-5 or better.'
    },
    {
      team: 'pranav4789',
      displayName: 'Pranav P',
      record: '5-5',
      opponents: ['roshik (4-6)', 'abhishekD (6-4)', 'kulkdaddy47 (6-4)', 'audumula (6-4)'],
      avgOppWins: 5.5,
      difficulty: 'Medium',
      color: '#FF9800',
      outlook: 'Favorable Week 11 matchup against struggling roshik, then three tough tests against winning teams. Must capitalize early—high scoring gives edge in tight wild card race.'
    },
    {
      team: 'swahili28',
      displayName: 'Sahil',
      record: '5-5',
      opponents: ['ankithe (6-4)', 'taahakm (3-7)', 'akhilmetukuru (3-7)', 'roshik (4-6)'],
      avgOppWins: 4.0,
      difficulty: 'Easy',
      color: '#4CAF50',
      outlook: 'Favorable schedule ahead with three sub-.500 opponents offers clear playoff path, but Week 11 vs. ankithe (6-4) is a must-win to control destiny.'
    },
    {
      team: 'roshik',
      displayName: 'Roshik',
      record: '4-6',
      opponents: ['pranav4789 (5-5)', 'akhilmetukuru (3-7)', 'taahakm (3-7)', 'swahili28 (5-5)'],
      avgOppWins: 4.0,
      difficulty: 'Easy',
      color: '#4CAF50',
      outlook: 'Playoff lifeline hinges on beating struggling taahakm in Week 13; losses to kulkdaddy47 or .500 teams likely end the season.'
    },
    {
      team: 'akhilmetukuru',
      displayName: 'Akhil',
      record: '3-7',
      opponents: ['abhishekD (6-4)', 'roshik (4-6)', 'swahili28 (5-5)', 'taahakm (3-7)'],
      avgOppWins: 4.5,
      difficulty: 'Medium',
      color: '#FF9800',
      outlook: 'Mixed schedule against playoff bubble teams. Focus on spoiler role—upsetting abhishekD or swahili28 could reshape playoff seeding significantly.'
    },
    {
      team: 'taahakm',
      displayName: 'Taaha',
      record: '3-7',
      opponents: ['abhiu (2-8)', 'swahili28 (5-5)', 'roshik (4-6)', 'akhilmetukuru (3-7)'],
      avgOppWins: 3.5,
      difficulty: 'Easy',
      color: '#4CAF50',
      outlook: 'Despite elimination, taahakm faces the league\'s easiest closing stretch—prime opportunity to play spoiler and build momentum against struggling opponents averaging just 3.5 wins.'
    },
    {
      team: 'abhiu',
      displayName: 'Abhiram',
      record: '2-8',
      opponents: ['taahakm (3-7)', 'ankithe (6-4)', 'pranavj20 (7-3)', 'SahitReddi (7-3)'],
      avgOppWins: 5.75,
      difficulty: 'Hard',
      color: '#F44336',
      outlook: 'With playoffs out of reach, abhiu faces an uphill schedule averaging 5.75 wins. Week 11 against struggling taahakm offers the only realistic victory chance.'
    }
  ];

  // Group by difficulty and sort by avgOppWins (descending)
  const veryHard = scheduleData.filter(t => t.difficulty === 'Very Hard').sort((a, b) => b.avgOppWins - a.avgOppWins);
  const hard = scheduleData.filter(t => t.difficulty === 'Hard').sort((a, b) => b.avgOppWins - a.avgOppWins);
  const medium = scheduleData.filter(t => t.difficulty === 'Medium').sort((a, b) => b.avgOppWins - a.avgOppWins);
  const easy = scheduleData.filter(t => t.difficulty === 'Easy').sort((a, b) => b.avgOppWins - a.avgOppWins);

  const renderTeams = (teams: typeof scheduleData) => (
    teams.map((team) => (
      <div key={team.team} className="sos-item">
        <div className="sos-header">
          <div className="sos-team-info">
            <div className="sos-team-name">{team.displayName}</div>
            <div className="sos-record">{team.record}</div>
          </div>
          <div
            className="sos-difficulty-badge"
            style={{ backgroundColor: team.color }}
          >
            {team.difficulty}
          </div>
        </div>
        <div className="sos-opponents">
          <strong>Remaining:</strong> {team.opponents.join(', ')}
        </div>
        <div className="sos-stats">
          <span className="sos-avg">Avg Opp Wins: {team.avgOppWins.toFixed(2)}</span>
        </div>
        <div className="sos-outlook">
          {team.outlook}
        </div>
      </div>
    ))
  );

  return (
    <div className="activity-feed-container">
      <h3>Strength of Schedule (Weeks 11-14)</h3>
      <div className="sos-description">
        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>
          Remaining schedule difficulty based on opponents' current records. Analysis done using GPT-5.
        </p>
      </div>

      {veryHard.length > 0 && (
        <div className="sos-list">
          {renderTeams(veryHard)}
        </div>
      )}

      {hard.length > 0 && (
        <div className="sos-list">
          {renderTeams(hard)}
        </div>
      )}

      {medium.length > 0 && (
        <div className="sos-list">
          {renderTeams(medium)}
        </div>
      )}

      {easy.length > 0 && (
        <div className="sos-list">
          {renderTeams(easy)}
        </div>
      )}
    </div>
  );
};

export default StrengthOfSchedule;
