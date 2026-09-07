import React from 'react';
import './Week1PreviewNewsletter.css';

// Frame each illustration from the supplied poster without changing the artwork.
// The six images share one small, cached asset; the newsletter supplies live text.
const artwork: Record<number, { x: number; y: number; width: number; height: number; alt: string }> = {
  1: {
    x: 28, y: 347, width: 476, height: 213,
    alt: 'Pranav P in orange overalls faces Pranav J in green, spiked football armor.',
  },
  2: {
    x: 524, y: 347, width: 474, height: 214,
    alt: 'Roshik serves breadsticks as Taaha raises a judge’s gavel across the rivalry table.',
  },
  3: {
    x: 28, y: 748, width: 476, height: 221,
    alt: 'Anudeep in green and gold faces defending champion Sahil, wearing a crown and holding a bowl of pico de gallo.',
  },
  4: {
    x: 524, y: 748, width: 474, height: 225,
    alt: 'Abhishek holds a breakfast sandwich opposite Gary and Naveen with their cannon.',
  },
  5: {
    x: 28, y: 1142, width: 476, height: 219,
    alt: 'Ankith carries a briefcase beside a city skyline as Sahit holds a football on a tropical island.',
  },
  6: {
    x: 524, y: 1142, width: 474, height: 219,
    alt: 'Aditya serves a steaming pot of biryani opposite Abhiram displaying a football jersey.',
  },
};

const RivalryMatchupArtwork: React.FC<{ matchupId: number }> = ({ matchupId }) => {
  const panel = artwork[matchupId];
  if (!panel) return null;

  return (
    <div
      className="rivalry-matchup-artwork"
      style={{ aspectRatio: `${panel.width} / ${panel.height}` }}
    >
      <img
        src="/rivalry-week-2026.webp"
        alt={panel.alt}
        width={1024}
        height={1536}
        loading="lazy"
        decoding="async"
        style={{
          width: `${(1024 / panel.width) * 100}%`,
          left: `${(-panel.x / panel.width) * 100}%`,
          top: `${(-panel.y / panel.height) * 100}%`,
        }}
      />
    </div>
  );
};

export default RivalryMatchupArtwork;
