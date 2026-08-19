import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArchiveEntry,
  lastSeasonEntries,
  lastSeasonSnapshot,
} from '../data/lastSeasonArchive';

const normalize = (value: string) => value.toLowerCase();

const getSearchText = (entry: ArchiveEntry, loadedText: string) =>
  normalize(
    [
      entry.type,
      entry.title,
      entry.date,
      entry.summary,
      entry.tags.join(' '),
      entry.content,
      loadedText,
    ].join(' ')
  );

const buildSnippet = (entry: ArchiveEntry, loadedText: string, query: string) => {
  const source = loadedText || entry.content || entry.summary;
  const trimmedQuery = query.trim().toLowerCase();

  if (!trimmedQuery) {
    return entry.summary;
  }

  const lowerSource = source.toLowerCase();
  const firstTerm = trimmedQuery.split(/\s+/).find(Boolean) || trimmedQuery;
  const matchIndex = lowerSource.indexOf(firstTerm);

  if (matchIndex === -1) {
    return entry.summary;
  }

  const start = Math.max(0, matchIndex - 120);
  const end = Math.min(source.length, matchIndex + firstTerm.length + 220);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < source.length ? '...' : '';

  return `${prefix}${source.slice(start, end).trim()}${suffix}`;
};

const LastSeasonArchive: React.FC = () => {
  const [query, setQuery] = useState('');
  const [archiveText, setArchiveText] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;

    const loadArchiveText = async () => {
      const textEntries = await Promise.all(
        lastSeasonEntries.map(async (entry) => {
          if (!entry.textUrl) {
            return [entry.id, ''] as const;
          }

          try {
            const response = await fetch(entry.textUrl);
            if (!response.ok) {
              return [entry.id, ''] as const;
            }

            return [entry.id, await response.text()] as const;
          } catch {
            return [entry.id, ''] as const;
          }
        })
      );

      if (mounted) {
        setArchiveText(Object.fromEntries(textEntries));
      }
    };

    loadArchiveText();

    return () => {
      mounted = false;
    };
  }, []);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    if (terms.length === 0) {
      return lastSeasonEntries;
    }

    return lastSeasonEntries.filter((entry) => {
      const searchText = getSearchText(entry, archiveText[entry.id] || '');
      return terms.every((term) => searchText.includes(term));
    });
  }, [archiveText, query]);

  return (
    <div className="last-season-page">
      <section className="last-season-hero">
        <div className="last-season-hero-content">
          <div className="archive-kicker">2025 Season Archive</div>
          <h1>{lastSeasonSnapshot.season} Amberwood Football League</h1>
          <p>
            The full 2025 record is preserved here: newsletters, playoff drama,
            awards, keeper notes, draft setup, and offseason context.
          </p>

          <div className="last-season-stats">
            <div>
              <span>Champion</span>
              <strong>{lastSeasonSnapshot.champion}</strong>
            </div>
            <div>
              <span>Runner-Up</span>
              <strong>{lastSeasonSnapshot.runnerUp}</strong>
            </div>
            <div>
              <span>Toilet Bowl</span>
              <strong>{lastSeasonSnapshot.toiletBowlChampion}</strong>
            </div>
            <div>
              <span>2026 First Pick</span>
              <strong>{lastSeasonSnapshot.topDraftPick2026}</strong>
            </div>
          </div>
        </div>
      </section>

      <main className="last-season-content">
        <section className="archive-search-band">
          <label htmlFor="last-season-search">Search 2025 Season</label>
          <div className="archive-search-row">
            <input
              id="last-season-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Puka, toilet bowl, Week 13, CMC, keeper, playoffs..."
            />
            {query && (
              <button type="button" onClick={() => setQuery('')}>
                Clear
              </button>
            )}
          </div>
          <p>
            {results.length} result{results.length === 1 ? '' : 's'} across the
            archived season.
          </p>
        </section>

        <section className="archive-results">
          {results.length === 0 ? (
            <div className="archive-empty">
              No 2025 archive matches found.
            </div>
          ) : (
            results.map((entry) => (
              <article key={entry.id} className="archive-result-card">
                <div className="archive-result-meta">
                  <span>{entry.type}</span>
                  <span>{entry.date}</span>
                </div>
                <h2>{entry.title}</h2>
                <p>{buildSnippet(entry, archiveText[entry.id] || '', query)}</p>
                <div className="archive-tags">
                  {entry.tags.slice(0, 5).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {entry.path && (
                  <Link className="archive-open-link" to={entry.path}>
                    Open
                  </Link>
                )}
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default LastSeasonArchive;
