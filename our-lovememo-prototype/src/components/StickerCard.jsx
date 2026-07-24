import { classNames } from '../utils/helpers';

function StickerCard({ children, className, tone = 'bg-white/90' }) {
  return (
    <section
      className={classNames(
        'sticker relative rounded-[28px] border-[3px] border-white p-4 text-softBlack shadow-sticker',
        tone,
        className,
      )}
    >
      {children}
    </section>
  );
}

export default StickerCard;
