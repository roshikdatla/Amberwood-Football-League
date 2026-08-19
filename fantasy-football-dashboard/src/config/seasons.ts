export type SeasonKey = '2026' | '2025';

export interface SeasonConfig {
  key: SeasonKey;
  label: string;
  shortLabel: string;
  leagueId: string;
  status: 'active' | 'archived';
  newsletterBasePath: string;
  latestNewsletterPath: string;
  latestNewsletterLabel: string;
  isLeagueIdConfigured: boolean;
  currentWeekOverride?: number;
}

const configuredActiveLeagueId =
  process.env.REACT_APP_ACTIVE_LEAGUE_ID || process.env.REACT_APP_2026_LEAGUE_ID || '';

const defaultActiveLeagueId = '1354521952483573760';
const archivedLeagueId = '1240124901977759744';

export const activeSeasonKey: SeasonKey = '2026';
export const archivedSeasonKey: SeasonKey = '2025';

export const seasons: Record<SeasonKey, SeasonConfig> = {
  '2026': {
    key: '2026',
    label: '2026 Season',
    shortLabel: '2026',
    leagueId: configuredActiveLeagueId || defaultActiveLeagueId,
    status: 'active',
    newsletterBasePath: '/newsletters',
    latestNewsletterPath: '/newsletters',
    latestNewsletterLabel: 'Draft Newsletter',
    isLeagueIdConfigured: Boolean(configuredActiveLeagueId || defaultActiveLeagueId),
    currentWeekOverride: 1,
  },
  '2025': {
    key: '2025',
    label: '2025 Season',
    shortLabel: '2025',
    leagueId: archivedLeagueId,
    status: 'archived',
    newsletterBasePath: '/last-season/newsletters',
    latestNewsletterPath: '/last-season/newsletters/finale',
    latestNewsletterLabel: '2025 Season Finale',
    isLeagueIdConfigured: true,
  },
};

export const activeSeason = seasons[activeSeasonKey];
export const archivedSeason = seasons[archivedSeasonKey];
