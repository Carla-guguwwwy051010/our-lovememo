import { useState } from 'react';
import BlindBoxNotes from '../components/BlindBoxNotes';
import ParticleBackdrop from '../components/ParticleBackdrop';
import StickerCard from '../components/StickerCard';
import { calculateDaysTogether, formatFriendlyDate } from '../utils/helpers';

function HomePage({ currentSpace, currentCompanion, members = [], partnerName }) {
  const daysTogether = calculateDaysTogether(currentSpace?.startDate);
  const [swapped, setSwapped] = useState(false);

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <section className="pt-2">
        <p className="text-xs uppercase tracking-[0.28em] text-softBlack/45">Our Home</p>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-handwriting text-[2rem] leading-none text-softBlack">
              Our Lovememo
            </p>
            <p className="mt-2 text-sm leading-6 text-softBlack/65">
              ✎ where our little stories live
            </p>
          </div>
          <div className="rounded-[24px] border-[3px] border-white bg-white/75 px-4 py-3 text-center shadow-sticker">
            <p className="text-[11px] uppercase tracking-[0.25em] text-softBlack/45">Together</p>
            <p className="mt-1 text-3xl font-bold leading-none text-softBlack">{daysTogether}</p>
            <p className="mt-1 text-xs text-softBlack/60">Days</p>
          </div>
        </div>
      </section>

      <StickerCard
        tone="bg-gradient-to-br from-peach/60 via-white to-baby/55"
        className="relative overflow-hidden p-5"
      >
        <ParticleBackdrop />
        <div className="relative z-10 flex min-h-[280px] flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="rounded-full bg-white/80 px-3 py-1 text-xs tracking-[0.2em] text-softBlack/60">
              {currentSpace?.subtitle}
            </div>
            <div className="rounded-full bg-white/70 px-3 py-1 text-xs text-softBlack/60">
              Start Date · {formatFriendlyDate(currentSpace?.startDate)}
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between gap-3">
            <div className="relative flex h-40 flex-1 items-end justify-center">
              {members.slice(0, 2).map((member, index) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setSwapped((value) => !value)}
                  className={`character-card ${swapped ? (index === 0 ? 'right-character' : 'left-character') : index === 0 ? 'left-character' : 'right-character'} overflow-hidden cursor-pointer`}
                  aria-label={`切换${member.name}卡片位置`}
                >
                  {member.avatarSrc ? (
                    <img
                      src={member.avatarSrc}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <span className="bean-eye left-3" />
                      <span className="bean-eye right-3" />
                      <span
                        className={`absolute bottom-6 h-10 w-16 rounded-[40px] ${index === 0 ? 'bg-peach/70' : 'bg-baby/70'}`}
                      />
                    </>
                  )}
                </button>
              ))}
            </div>

            <div className="relative w-[42%] max-w-[128px] rounded-[28px] bg-white/80 p-2 shadow-sticker animate-floaty">
              <span className="tape-piece" />
              {currentCompanion?.image ? (
                <img
                  src={currentCompanion.image}
                  alt={currentCompanion.label}
                  className="h-36 w-full rounded-[22px] object-cover"
                />
              ) : (
                <div className="flex h-36 w-full flex-col items-center justify-center rounded-[22px] bg-white/90">
                  <span className="text-4xl">{currentCompanion?.emoji}</span>
                  <span className="mt-2 text-xs text-softBlack/65">{currentCompanion?.label}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 rounded-[24px] bg-white/70 p-4">
            <p className="font-handwriting text-xl">把“我们”贴在今天这一页</p>
            <p className="mt-2 text-sm leading-6 text-softBlack/70">
              {currentCompanion?.emoji} {currentCompanion?.label}
              会陪你们一起收藏日常情绪、重要纪念日和每一次认真互动。
            </p>
          </div>
        </div>
      </StickerCard>

      <StickerCard tone="bg-white/85">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-softBlack/45">Companion</p>
            <h3 className="mt-1 font-handwriting text-xl">陪伴角色档案</h3>
          </div>
          <span className="rounded-full bg-peach/35 px-3 py-1 text-xs text-softBlack/65">
            当前同步中
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4 rounded-[24px] border-[3px] border-white bg-baby/20 p-4">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-white/85 shadow-sticker">
            {currentCompanion?.image ? (
              <img
                src={currentCompanion.image}
                alt={currentCompanion.label}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-4xl">{currentCompanion?.emoji}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              {currentCompanion?.emoji} {currentCompanion?.label}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-softBlack/45">
              {currentCompanion?.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-softBlack/70">
              {currentCompanion?.note}
            </p>
          </div>
        </div>
      </StickerCard>

      <StickerCard tone="bg-white/85">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-softBlack/45">Recent Moments</p>
            <h3 className="mt-1 font-handwriting text-xl">最近互动</h3>
          </div>
          <span className="rounded-full bg-mint/45 px-3 py-1 text-xs text-softBlack/65">
            Members {members.length}
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {(currentSpace?.recentInteractions || []).map((item) => (
            <div
              key={item}
              className="rounded-[20px] border-[3px] border-white bg-peach/20 px-4 py-3 text-sm text-softBlack/75"
            >
              {item}
            </div>
          ))}
        </div>
      </StickerCard>

      <BlindBoxNotes partnerName={partnerName} />
    </div>
  );
}

export default HomePage;
