function ParticleBackdrop() {
  const drizzle = Array.from({ length: 8 }, (_, index) => ({
    left: `${12 + index * 11}%`,
    delay: `${index * 0.6}s`,
    duration: `${6 + (index % 3)}s`,
  }));

  const stars = Array.from({ length: 7 }, (_, index) => ({
    left: `${8 + index * 13}%`,
    top: `${10 + (index % 4) * 16}%`,
    delay: `${index * 0.4}s`,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
      {drizzle.map((item, index) => (
        <span
          key={`rain-${index}`}
          className="absolute top-0 h-12 w-[2px] rounded-full bg-white/65 animate-drizzle"
          style={{ left: item.left, animationDelay: item.delay, animationDuration: item.duration }}
        />
      ))}
      {stars.map((item, index) => (
        <span
          key={`star-${index}`}
          className="absolute h-2.5 w-2.5 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.7)] animate-twinkle"
          style={{ left: item.left, top: item.top, animationDelay: item.delay }}
        />
      ))}
    </div>
  );
}

export default ParticleBackdrop;
