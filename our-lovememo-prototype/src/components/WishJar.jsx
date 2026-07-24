function WishJar({ stars, onAnimationEnd, completedCount = 0 }) {
  const settledStars = Array.from({ length: Math.min(Math.max(completedCount * 4, 8), 28) }, (_, index) => ({
    id: `settled-${index}`,
    left: `${10 + ((index * 11) % 78)}%`,
    bottom: `${8 + ((index * 7) % 26)}%`,
    size: index % 3 === 0 ? 'text-[10px]' : 'text-xs',
    opacity: 0.45 + (index % 4) * 0.1,
  }));

  return (
    <div className="wish-jar-scene relative mt-4 h-64 overflow-hidden rounded-[30px] border-[3px] border-white bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,244,250,0.9))]">
      <div className="absolute inset-0 opacity-55">
        {Array.from({ length: 36 }, (_, index) => (
          <span
            key={`scene-star-${index}`}
            className="absolute text-white/75 animate-soft-twinkle"
            style={{
              left: `${4 + ((index * 9) % 92)}%`,
              top: `${6 + ((index * 7) % 86)}%`,
              fontSize: index % 4 === 0 ? '10px' : '8px',
              animationDelay: `${index * 0.2}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="absolute inset-x-1/2 bottom-5 h-40 w-40 -translate-x-1/2 rounded-b-[46px] rounded-t-[24px] border-[4px] border-[#dac9df] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,248,227,0.96))] shadow-[0_12px_30px_rgba(255,226,128,0.18)]">
        <div className="absolute left-1/2 top-[-16px] h-7 w-20 -translate-x-1/2 rounded-[12px] border-[3px] border-[#f8efe1] bg-[#c69067] shadow-sm" />
        <div className="absolute inset-3 rounded-b-[36px] rounded-t-[18px] border border-white/45 border-dashed" />
        <div
          className="absolute inset-x-5 bottom-4 rounded-b-[26px] rounded-t-[16px] bg-[linear-gradient(180deg,rgba(255,239,172,0.3),rgba(255,232,137,0.88))] shadow-[0_0_30px_rgba(255,229,137,0.45)] transition-all duration-500"
          style={{ height: `${Math.min(20 + completedCount * 14, 88)}px` }}
        >
          {settledStars.map((star) => (
            <span
              key={star.id}
              className={`absolute text-[#fff6c2] drop-shadow-[0_0_8px_rgba(255,239,172,0.85)] ${star.size}`}
              style={{ left: star.left, bottom: star.bottom, opacity: star.opacity }}
            >
              ✦
            </span>
          ))}
        </div>
        <div className="absolute bottom-5 left-1/2 w-[104px] -translate-x-1/2 rounded-full bg-white/45 px-3 py-2 text-center text-xs text-softBlack/70">
          ✨ {completedCount} wishes fulfilled
        </div>
      </div>

      <div className="absolute inset-x-1/2 bottom-7 h-10 w-32 -translate-x-1/2 rounded-full border border-white/50 bg-white/25 blur-sm" />

      {stars.map((star) => (
        <span
          key={star.id}
          className="wish-star"
          style={
            {
              '--start-x': `${star.startX}px`,
              '--start-y': `${star.startY}px`,
            }
          }
          onAnimationEnd={() => onAnimationEnd(star.id)}
        >
          ✦
        </span>
      ))}

      <p className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/70 px-3 py-1 text-xs text-softBlack/70">
        完成愿望后，星星会像流沙一样落进这里
      </p>
    </div>
  );
}

export default WishJar;
