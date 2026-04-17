'use client';

const PETALS = [
  { left: '6%', top: '18%', size: '1.2rem', delay: '0s', duration: '15s' },
  { left: '14%', top: '52%', size: '0.9rem', delay: '2s', duration: '13s' },
  { left: '24%', top: '8%', size: '1.05rem', delay: '5s', duration: '16s' },
  { left: '36%', top: '30%', size: '1.15rem', delay: '1s', duration: '14s' },
  { left: '48%', top: '62%', size: '0.85rem', delay: '3s', duration: '17s' },
  { left: '58%', top: '16%', size: '1rem', delay: '6s', duration: '15s' },
  { left: '66%', top: '46%', size: '1.25rem', delay: '4s', duration: '18s' },
  { left: '74%', top: '10%', size: '0.95rem', delay: '7s', duration: '12s' },
  { left: '82%', top: '58%', size: '1.05rem', delay: '2.5s', duration: '16s' },
  { left: '91%', top: '22%', size: '0.8rem', delay: '5.5s', duration: '14s' }
] as const;

const SPARKLES = [
  { left: '10%', top: '12%', delay: '0s', duration: '4.6s' },
  { left: '28%', top: '26%', delay: '1.5s', duration: '5.2s' },
  { left: '44%', top: '14%', delay: '3s', duration: '4.8s' },
  { left: '63%', top: '32%', delay: '0.8s', duration: '5.4s' },
  { left: '78%', top: '18%', delay: '2.1s', duration: '4.4s' },
  { left: '88%', top: '38%', delay: '3.7s', duration: '5.8s' }
] as const;

export function AmbientOrnaments() {
  return (
    <div className="ambient-ornaments" aria-hidden="true">
      {PETALS.map((petal, index) => (
        <span
          key={`petal-${index}`}
          className="ambient-petal"
          style={{
            left: petal.left,
            top: petal.top,
            width: petal.size,
            height: `calc(${petal.size} * 1.35)`,
            animationDelay: petal.delay,
            animationDuration: petal.duration
          }}
        />
      ))}

      {SPARKLES.map((sparkle, index) => (
        <span
          key={`sparkle-${index}`}
          className="ambient-sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration
          }}
        />
      ))}
    </div>
  );
}