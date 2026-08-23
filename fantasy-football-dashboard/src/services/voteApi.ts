const VOTER_STORAGE_KEY = 'amberwood-anonymous-voter-id';
const API_BASE_URL = process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:8000');

let memoryVoterId = '';

export interface VoteResults {
  matchups: Record<string, Record<string, number>>;
  selections: Record<string, number>;
}

export interface MatchupVote {
  league_id: string;
  week: number;
  matchup_id: number;
  roster_id: number;
}

const createVoterId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  const randomPart = Math.random().toString(36).slice(2);
  return `visitor-${Date.now().toString(36)}-${randomPart}-${randomPart}`;
};

export const getAnonymousVoterId = (): string => {
  if (memoryVoterId) return memoryVoterId;

  try {
    const storedId = window.localStorage.getItem(VOTER_STORAGE_KEY);
    if (storedId) {
      memoryVoterId = storedId;
      return memoryVoterId;
    }

    memoryVoterId = createVoterId();
    window.localStorage.setItem(VOTER_STORAGE_KEY, memoryVoterId);
    return memoryVoterId;
  } catch {
    memoryVoterId = createVoterId();
    return memoryVoterId;
  }
};

const requestVotes = async (url: string, init?: RequestInit): Promise<VoteResults> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Amberwood-Voter': getAnonymousVoterId(),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail?.message || error.detail || error.error || 'Voting request failed');
  }

  return response.json();
};

export const getMatchupVotes = (leagueId: string, week: number) => {
  const query = new URLSearchParams({ league_id: leagueId, week: String(week) });
  return requestVotes(`${API_BASE_URL}/api/votes?${query.toString()}`);
};

export const castMatchupVote = (vote: MatchupVote) => requestVotes(
  `${API_BASE_URL}/api/votes`,
  { method: 'POST', body: JSON.stringify(vote) },
);
