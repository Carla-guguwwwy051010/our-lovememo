import { classNames } from '../utils/helpers';

function StickerButton({
  children,
  className,
  tone = 'bg-white/90',
  active = false,
  ...props
}) {
  return (
    <button
      type="button"
      className={classNames(
        'sticker border-[3px] border-white px-4 py-2 text-sm font-semibold text-softBlack transition duration-300 hover:-translate-y-0.5 active:translate-y-0',
        tone,
        active && 'ring-2 ring-white/80',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default StickerButton;
