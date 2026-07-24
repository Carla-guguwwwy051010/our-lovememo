import { useState } from 'react';
import { classNames, getPolaroidRotation } from '../utils/helpers';

function PolaroidCard({ item, index = 0, className }) {
  const [failed, setFailed] = useState(false);
  const rotation = getPolaroidRotation(index);

  return (
    <article
      tabIndex={0}
      className={classNames(
        'polaroid-card group relative rounded-[26px] bg-white p-3 pb-5 shadow-sticker outline-none transition duration-300 hover:rotate-0 hover:-translate-y-1 focus-visible:rotate-0 focus-visible:-translate-y-1',
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span className="tape-piece" />
      <div className="overflow-hidden rounded-[20px] bg-cream">
        {!failed && item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-44 w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-44 items-center justify-center bg-gradient-to-br from-peach/50 via-white to-baby/50 text-4xl">
            <span className="bean-face" />
          </div>
        )}
      </div>
      <div className="px-2 pt-4">
        <p className="font-handwriting text-lg">{item.title}</p>
        <p className="mt-1 text-xs text-softBlack/60">
          {item.place} · {item.date}
        </p>
        <p className="mt-2 text-sm leading-6">{item.note}</p>
      </div>
    </article>
  );
}

export default PolaroidCard;
