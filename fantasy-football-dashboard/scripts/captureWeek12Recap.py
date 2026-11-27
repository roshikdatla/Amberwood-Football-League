"""Capture one dated Week 12 edition and future fixtures from Sleeper."""
import concurrent.futures
import datetime
import json
import pathlib
import urllib.request

BASE = 'https://api.sleeper.app/v1'
LEAGUE = '1354521952483573760'
URLS = {k: f'{BASE}/league/{LEAGUE}{s}' for k, s in {
    'league': '', 'rosters': '/rosters', 'users': '/users', **{f'w{w}': f'/matchups/{w}' for w in (12, 13, 14)}
}.items()}
URLS['players'] = f'{BASE}/players/nfl'
URLS['nfl'] = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2026&seasontype=2&week=12'

def download(url):
    with urllib.request.urlopen(url, timeout=35) as response:
        return json.load(response)

with concurrent.futures.ThreadPoolExecutor() as pool:
    data = dict(zip(URLS, pool.map(download, URLS.values())))
assert data['league']['season'] == '2026'
last = data['league']['settings']['last_scored_leg']
assert last in (11, 12), 'Unexpected completed week'
played = sorted(c['team']['abbreviation'] for e in data['nfl']['events']
                if e['status']['type']['completed'] for c in e['competitions'][0]['competitors'])
assert len(played) == 32 if last == 12 else len(played) < 32
teams = []
users = {u['user_id']: u for u in data['users']}
players = data['players']
for r in data['rosters']:
    a = next(x for x in data['w12'] if x['roster_id'] == r['roster_id'])
    s = r['settings']
    points = a['points'] if a['custom_points'] is None else a['custom_points']
    starters = []
    assert len(a['starters']) == len(a['starters_points']) == 10
    if a['custom_points'] is None:
        assert abs(sum(a['starters_points']) - points) < .011
    for pid, val in zip(a['starters'], a['starters_points']):
        p = players.get(pid, {})
        name = p.get('full_name') or ' '.join(x for x in [p.get('first_name'),p.get('last_name')] if x)
        starters.append({'id': pid, 'name': name or 'Empty slot', 'team': p.get('team'), 'points': val})
    u = users[r['owner_id']]
    teams.append(dict(id=r['roster_id'], teamName=u['metadata'].get('team_name', u['display_name']).strip(),
                      wins=s['wins'], losses=s['losses'], ties=s['ties'], pf=s['fpts']+s['fpts_decimal']/100,
                      matchupId=a['matchup_id'], points=points, starters=starters))
fixtures = {w: [sorted(x['roster_id'] for x in data[f'w{w}'] if x['matchup_id'] == m)
                for m in range(1,7)] for w in (12,13,14)}
assert all(sorted(sum(f, [])) == list(range(1,13)) and all(len(p)==2 for p in f) for f in fixtures.values())
out = dict(capturedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds'),
           completedWeek=last, teams=teams, fixtures=fixtures, nflTeamsFinal=played,
           sources={k:v for k,v in URLS.items() if k!='players'})
target=pathlib.Path('src/data/week12Recap2026Snapshot.json')
target.write_text(json.dumps(out, separators=(',', ':'), ensure_ascii=False)+'\n')
print(f'{target}: finalized through Week {last}; {len(played)//2} NFL games completed')
