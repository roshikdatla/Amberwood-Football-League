import React, { useEffect, useMemo, useState } from 'react';
import { SeasonConfig } from '../config/seasons';
import { sleeperApi } from '../services/sleeperApi';
import { Roster, User } from '../types/sleeper';

type Player = {
  player_id?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  position?: string;
  team?: string;
};

type Matchup = {
  roster_id: number;
  points?: number;
  starters?: string[];
  players?: string[];
  players_points?: Record<string, number>;
};

type WeekData = { week: number; matchups: Matchup[] };

type Draft = { draft_id: string; status?: string };
type DraftPick = { player_id: string; pick_no?: number; round?: number; draft_slot?: number };

type PlayerLine = {
  id: string;
  name: string;
  position: string;
  points: number;
  starts: number;
  bestWeek: number;
  bestWeekNumber: number;
  weeklyPoints: number[];
  draftPick?: number;
  valueAboveAverage?: number;
};

type PositionLine = { position: string; points: number; averagePerWeek: number; rank: number };

type TeamAnalytics = {
  rosterId: number;
  name: string;
  manager: string;
  points: number;
  leagueRank: number;
  bestWeek: number;
  bestWeekNumber: number;
  consistency: number;
  lineupEfficiency: number;
  mvp?: PlayerLine;
  bum?: PlayerLine;
  positions: PositionLine[];
};

type TeamWithCandidates = TeamAnalytics & { awardLines: PlayerLine[] };

const positionOrder = ['QB', 'RB', 'WR', 'TE', 'FLEX', 'K', 'DEF'];
const fantasyPositions = new Set(positionOrder);
const awardPositions = new Set(['QB', 'RB', 'WR', 'TE']);
const points = (value = 0) => value.toFixed(1);
const signedPoints = (value = 0) => `${value >= 0 ? '+' : ''}${points(value)}`;
const getPlayerName = (player: Player | undefined, id: string) =>
  player?.full_name || [player?.first_name, player?.last_name].filter(Boolean).join(' ') || id;

const standardDeviation = (values: number[]) => {
  if (!values.length) return 0;
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.sqrt(values.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) / values.length);
};

const buildAnalytics = (
  rosters: Roster[],
  users: User[],
  weeks: WeekData[],
  players: Record<string, Player>,
  draftPicks: DraftPick[],
  rosterPositions: string[]
): TeamAnalytics[] => {
  const userMap = new Map(users.map((user) => [user.user_id, user]));
  const completedWeeks = weeks.filter(({ matchups }) => matchups.some((matchup) =>
    typeof matchup.points === 'number' && (matchup.points !== 0 || Object.keys(matchup.players_points || {}).length > 0)
  ));

  const teams: TeamWithCandidates[] = rosters.map((roster) => {
    const user = userMap.get(roster.owner_id);
    const manager = user?.display_name || user?.username || `Team ${roster.roster_id}`;
    const name = user?.metadata?.team_name?.trim() || manager;
    const playerLines = new Map<string, PlayerLine>();
    const weeklyScores: { week: number; points: number }[] = [];
    const positionTotals = new Map(positionOrder.map((position) => [position, 0]));
    let actualPoints = 0;
    let optimalPoints = 0;
    const draftPickMap = new Map(draftPicks.map((pick) => [pick.player_id, pick.pick_no]));

    completedWeeks.forEach(({ week, matchups }) => {
      const matchup = matchups.find((entry) => entry.roster_id === roster.roster_id);
      if (!matchup) return;
      const starterEntries = (matchup.starters || [])
        .map((id, index) => ({ id, slot: rosterPositions[index] || players[id]?.position || 'N/A' }))
        .filter(({ id }) => id && id !== '0');
      const starterIds = starterEntries.map(({ id }) => id);
      const score = starterIds.reduce((sum, id) => sum + (matchup.players_points?.[id] || 0), 0);
      const reportedScore = typeof matchup.points === 'number' ? matchup.points : score;
      weeklyScores.push({ week, points: reportedScore });
      actualPoints += reportedScore;

      starterEntries.forEach(({ id, slot }) => {
        const scoringPosition = slot.includes('FLEX') ? 'FLEX' : (players[id]?.position || slot);
        if (positionTotals.has(scoringPosition)) {
          positionTotals.set(scoringPosition, (positionTotals.get(scoringPosition) || 0) + (matchup.players_points?.[id] || 0));
        }
      });

      starterIds.forEach((id) => {
        const player = players[id];
        const scored = matchup.players_points?.[id] || 0;
        const previous = playerLines.get(id) || {
          id,
          name: getPlayerName(player, id),
          position: player?.position || 'N/A',
          points: 0,
          starts: 0,
          bestWeek: -Infinity,
          bestWeekNumber: week,
          weeklyPoints: [],
          draftPick: draftPickMap.get(id),
        };
        previous.points += scored;
        previous.starts += 1;
        previous.weeklyPoints.push(scored);
        if (scored > previous.bestWeek) {
          previous.bestWeek = scored;
          previous.bestWeekNumber = week;
        }
        playerLines.set(id, previous);
      });

      // A transparent approximation of the best legal lineup: compare the same
      // number of starters at each actual position, then fill remaining flex spots.
      const starterPositionCounts = starterIds.reduce<Record<string, number>>((counts, id) => {
        const position = players[id]?.position || 'N/A';
        counts[position] = (counts[position] || 0) + 1;
        return counts;
      }, {});
      const available = (matchup.players || []).map((id) => ({
        id,
        position: players[id]?.position || 'N/A',
        points: matchup.players_points?.[id] || 0,
      }));
      const selected = new Set<string>();
      Object.entries(starterPositionCounts).forEach(([position, count]) => {
        available.filter((entry) => entry.position === position)
          .sort((a, b) => b.points - a.points)
          .slice(0, count)
          .forEach((entry) => selected.add(entry.id));
      });
      optimalPoints += available.filter((entry) => selected.has(entry.id))
        .reduce((sum, entry) => sum + entry.points, 0);
    });

    const lines = Array.from(playerLines.values()).filter((line) => fantasyPositions.has(line.position));
    const awardLines = lines.filter((line) => awardPositions.has(line.position));
    const bestWeek = weeklyScores.reduce((best, entry) => entry.points > best.points ? entry : best, { week: 0, points: 0 });
    const positionPoints = positionOrder.map((position) => ({
      position,
      points: positionTotals.get(position) || 0,
      averagePerWeek: completedWeeks.length
        ? (positionTotals.get(position) || 0) / completedWeeks.length
        : 0,
      rank: 0,
    }));

    return {
      rosterId: roster.roster_id,
      name,
      manager,
      points: actualPoints,
      leagueRank: 0,
      bestWeek: bestWeek.points,
      bestWeekNumber: bestWeek.week,
      consistency: standardDeviation(weeklyScores.map((entry) => entry.points)),
      lineupEfficiency: optimalPoints > 0 ? Math.min(100, (actualPoints / optimalPoints) * 100) : 0,
      positions: positionPoints,
      awardLines,
    };
  });

  // Awards use a fixed four-start minimum. Per-start position baselines and draft-vs-
  // production ranks are league-wide so players at scarce positions are judged
  // against appropriate peers rather than raw cross-position point totals.
  const eligibleLines = teams.flatMap((team) => team.awardLines.filter((line) => line.starts >= 4));
  const positionAverages = new Map(positionOrder.map((position) => {
    const positionLines = eligibleLines.filter((line) => line.position === position);
    const totalStarts = positionLines.reduce((sum, line) => sum + line.starts, 0);
    const totalPoints = positionLines.reduce((sum, line) => sum + line.points, 0);
    return [position, totalStarts ? totalPoints / totalStarts : 0];
  }));
  eligibleLines.forEach((line) => {
    const positionAverage = positionAverages.get(line.position) || 0;
    line.valueAboveAverage = (line.points / line.starts) - positionAverage;
  });

  const draftedEligible = eligibleLines.filter((line) => typeof line.draftPick === 'number');
  const draftRanks = new Map(
    [...draftedEligible].sort((a, b) => (a.draftPick || Infinity) - (b.draftPick || Infinity))
      .map((line, index) => [line.id, index + 1])
  );
  const productionRanks = new Map(
    [...draftedEligible].sort((a, b) => (b.valueAboveAverage || 0) - (a.valueAboveAverage || 0))
      .map((line, index) => [line.id, index + 1])
  );
  teams.forEach((team) => {
    const candidates = team.awardLines.filter((line) => line.starts >= 4);
    team.mvp = [...candidates].sort((a, b) =>
      (b.valueAboveAverage || 0) - (a.valueAboveAverage || 0) || b.points - a.points
    )[0];

    team.bum = [...candidates]
      .filter((line) => typeof line.draftPick === 'number')
      .sort((a, b) => {
        const aGap = (productionRanks.get(a.id) || 0) - (draftRanks.get(a.id) || 0);
        const bGap = (productionRanks.get(b.id) || 0) - (draftRanks.get(b.id) || 0);
        return bGap - aGap || (a.valueAboveAverage || 0) - (b.valueAboveAverage || 0);
      })[0];

  });

  [...teams].sort((a, b) => b.points - a.points).forEach((team, index) => { team.leagueRank = index + 1; });
  positionOrder.forEach((position) => {
    [...teams].sort((a, b) =>
      (b.positions.find((line) => line.position === position)?.points || 0) -
      (a.positions.find((line) => line.position === position)?.points || 0)
    ).forEach((team, index) => {
      const line = team.positions.find((entry) => entry.position === position);
      if (line) line.rank = index + 1;
    });
  });
  return teams.sort((a, b) => a.leagueRank - b.leagueRank);
};

const PlayerSpotlight = ({ label, icon, player, detail }: {
  label: string; icon: string; player?: PlayerLine; detail: (player: PlayerLine) => string;
}) => (
  <div className="beyond-spotlight">
    <span className="beyond-spotlight-icon">{icon}</span>
    <div><small>{label}</small><strong>{player?.name || 'TBD'}</strong><span>{player ? detail(player) : 'Waiting for regular-season data'}</span></div>
  </div>
);

interface BeyondTheBoxscoreProps {
  seasonConfig: SeasonConfig;
}

const BeyondTheBoxscore: React.FC<BeyondTheBoxscoreProps> = ({ seasonConfig }) => {
  const [teams, setTeams] = useState<TeamAnalytics[]>([]);
  const [selectedRosterId, setSelectedRosterId] = useState<number | 'all'>('all');
  const [completedWeekCount, setCompletedWeekCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const nflWeek = seasonConfig.status === 'archived'
          ? 18
          : await sleeperApi.getCurrentWeek();
        const throughWeek = Math.min(18, Math.max(1, nflWeek || 1));
        const [rosters, users, weekData, players, drafts, league] = await Promise.all([
          sleeperApi.getLeagueRosters(seasonConfig.leagueId),
          sleeperApi.getLeagueUsers(seasonConfig.leagueId),
          sleeperApi.getSeasonMatchups(seasonConfig.leagueId, throughWeek),
          sleeperApi.getAllPlayers(),
          sleeperApi.getLeagueDrafts(seasonConfig.leagueId),
          sleeperApi.getLeague(seasonConfig.leagueId),
        ]);
        if (!mounted) return;
        const draftList = drafts as Draft[];
        const selectedDraft = draftList.find((draft) => draft.status === 'complete') || draftList[0];
        const draftPicks = selectedDraft ? await sleeperApi.getDraftPicks(selectedDraft.draft_id) : [];
        if (!mounted) return;
        const completed = weekData.filter(({ matchups }: WeekData) => matchups.some((matchup) =>
          typeof matchup.points === 'number' && (matchup.points !== 0 || Object.keys(matchup.players_points || {}).length > 0)
        ));
        setCompletedWeekCount(completed.length);
        setTeams(buildAnalytics(rosters, users, weekData, players, draftPicks, league.roster_positions || []));
      } catch (caught) {
        console.error('Failed to load Beyond the Boxscore:', caught);
        if (mounted) setError('Advanced stats could not be loaded from Sleeper. Please try again shortly.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [seasonConfig.leagueId, seasonConfig.status]);

  const displayedTeams = useMemo(() => selectedRosterId === 'all'
    ? teams
    : teams.filter((team) => team.rosterId === selectedRosterId), [selectedRosterId, teams]);

  return (
    <div className="beyond-page">
      <section className="beyond-hero">
        <div className="beyond-kicker">Amberwood Analytics Lab</div>
        <h1>Beyond the Boxscore</h1>
        <p>Who is carrying, who is coasting, and where every team creates its points. All numbers update cumulatively from Sleeper throughout the season.</p>
        <div className="beyond-hero-meta"><span>{seasonConfig.key} season</span><span>{completedWeekCount} week{completedWeekCount === 1 ? '' : 's'} charted</span><span>{teams.length} teams</span></div>
      </section>

      <main className="beyond-content">
        <div className="beyond-toolbar">
          <div><strong>Team intelligence reports</strong><span>Rankings compare every Amberwood roster.</span></div>
          <label>View team<select value={selectedRosterId} onChange={(event) => setSelectedRosterId(event.target.value === 'all' ? 'all' : Number(event.target.value))}>
            <option value="all">All teams</option>
            {teams.map((team) => <option key={team.rosterId} value={team.rosterId}>{team.name}</option>)}
          </select></label>
        </div>

        {loading && <div className="beyond-state">Building the analytics board…</div>}
        {error && <div className="beyond-state beyond-error">{error}</div>}
        {!loading && !error && completedWeekCount === 0 && <div className="beyond-state">The dashboard is ready. Player awards and position rankings will populate automatically after Week 1 scores arrive.</div>}

        <div className="beyond-team-grid">
          {displayedTeams.map((team) => (
            <article className="beyond-team-card" key={team.rosterId}>
              <header><div><span className="beyond-rank">#{team.leagueRank} in scoring</span><h2>{team.name}</h2>{team.manager !== team.name && <p>Managed by {team.manager}</p>}</div><div className="beyond-total"><strong>{points(team.points)}</strong><span>starter points</span></div></header>

              <div className="beyond-spotlight-grid">
                <PlayerSpotlight label="Team MVP" icon="👑" player={team.mvp} detail={(player) => `${signedPoints(player.valueAboveAverage)} points/start vs average ${player.position}`} />
                <PlayerSpotlight label="Biggest Disappointment" icon="🧱" player={team.bum} detail={(player) => `Pick ${player.draftPick} · ${points(player.points / player.starts)} points/start (injuries included)`} />
              </div>

              <div className="beyond-position-section"><h3>Points by position</h3><div className="beyond-position-table">
                {team.positions.map((line) => <div className="beyond-position-row" key={line.position}><strong>{line.position}</strong><div><i style={{ width: team.points > 0 ? `${Math.max(2, (line.points / team.points) * 100)}%` : '0%' }} /></div><span>{points(line.points)}</span><span className="beyond-position-average">{points(line.averagePerWeek)}/wk</span><em>#{line.rank}</em></div>)}
              </div></div>

              <footer>
                <div><span>Best week</span><strong>{team.bestWeekNumber ? `${points(team.bestWeek)} · Wk ${team.bestWeekNumber}` : 'TBD'}</strong></div>
                <div><span>Consistency</span><strong>{completedWeekCount ? `±${points(team.consistency)}` : 'TBD'}</strong></div>
                <div><span>Lineup efficiency</span><strong>{completedWeekCount ? `${points(team.lineupEfficiency)}%` : 'TBD'}</strong></div>
              </footer>
            </article>
          ))}
        </div>

        <aside className="beyond-methodology"><strong>How the awards work</strong><p>Both awards require at least four starts and include QB, RB, WR, and TE only. MVP is the player with the largest points-per-start advantage over the league's average starter at his position. Biggest Disappointment is the largest league-wide gap between Amberwood draft-capital rank and per-start value-above-average production rank; injuries are included. Position averages show each team's combined starter points at that position per completed week. Bench points do not count.</p></aside>
      </main>
    </div>
  );
};

export default BeyondTheBoxscore;
