import React from 'react';

interface Newsletter {
  id: string;
  week: number;
  title: string;
  date: string;
  excerpt: string;
  published: boolean;
}

const NewsletterArchive: React.FC = () => {
  // Mock newsletter data - this would come from your API/database
  const newsletters: Newsletter[] = [
    {
      id: 'week-4-2025',
      week: 4,
      title: 'Week 4 Recap: Chaos and Comebacks',
      date: '2025-01-15',
      excerpt: 'Another wild week in the books! From miracle Monday night comebacks to devastating injuries, Week 4 had it all. Plus, who\'s emerging as this season\'s sleeper pick?',
      published: true
    },
    {
      id: 'week-3-2025',
      week: 3,
      title: 'Week 3 Analysis: The Rise of the Underdogs',
      date: '2025-01-08',
      excerpt: 'The league standings got a major shake-up this week. Find out which teams are quietly climbing the ranks and which "sure things" are falling apart.',
      published: true
    },
    {
      id: 'week-2-2025',
      week: 2,
      title: 'Week 2 Roundup: Early Season Surprises',
      date: '2025-01-01',
      excerpt: 'Just two weeks in and we\'re already seeing some shocking performances. Who\'s the early favorite for league champion, and who might be in for a long season?',
      published: true
    },
    {
      id: 'week-1-2025',
      week: 1,
      title: 'Season Kickoff: 2025 Predictions and Power Rankings',
      date: '2024-12-25',
      excerpt: 'Welcome to the 2025 season! Our annual preview breaks down each team\'s chances, bold predictions, and why this might be the most competitive year yet.',
      published: true
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="newsletter-archive">
      <div className="archive-header">
        <h1>📰 Weekly Newsletter Archive</h1>
        <p className="archive-subtitle">
          Stay up to date with all the league drama, analysis, and hot takes
        </p>
      </div>

      <div className="newsletter-grid">
        {newsletters.map((newsletter) => (
          <div key={newsletter.id} className="newsletter-card">
            <div className="newsletter-week-badge">Week {newsletter.week}</div>
            
            <div className="newsletter-content">
              <h2 className="newsletter-title">{newsletter.title}</h2>
              <div className="newsletter-date">{formatDate(newsletter.date)}</div>
              <p className="newsletter-excerpt">{newsletter.excerpt}</p>
              
              <div className="newsletter-actions">
                <button 
                  className="read-newsletter-btn"
                  onClick={() => {
                    // This would navigate to the individual newsletter
                    alert(`Newsletter for Week ${newsletter.week} - Coming Soon! 📰`);
                  }}
                >
                  Read Newsletter →
                </button>
              </div>
            </div>

            <div className="newsletter-status">
              {newsletter.published ? (
                <span className="status-published">📝 Published</span>
              ) : (
                <span className="status-draft">✏️ Draft</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="coming-soon-notice">
        <div className="notice-content">
          <h3>🚧 Newsletter System Coming Soon!</h3>
          <p>
            We're working on building out the full newsletter experience. 
            Soon you'll be able to read detailed weekly recaps, analysis, 
            and all the league drama you can handle!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterArchive;