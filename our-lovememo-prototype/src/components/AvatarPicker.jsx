import { useMemo, useState } from 'react';
import { classNames, getAvatarLabel } from '../utils/helpers';

function AvatarThumb({ option, selected, onSelect }) {
  const [failed, setFailed] = useState(false);
  const label = useMemo(
    () => getAvatarLabel(option.name, option.id),
    [option.id, option.name],
  );

  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className={classNames(
        'sticker flex flex-col items-center gap-2 rounded-[22px] border-[3px] border-white p-2 text-xs shadow-sticker transition hover:-translate-y-1',
        selected ? 'bg-peach/80' : 'bg-white/90',
      )}
    >
      <div
        className={classNames(
          'relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-[3px] border-white text-lg font-bold text-softBlack',
          option.tone,
        )}
      >
        {!failed ? (
          <img
            src={option.src}
            alt={option.name}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="doodle-avatar">{label}</span>
        )}
      </div>
      <span>{option.name}</span>
    </button>
  );
}

function AvatarPicker({ options, selectedAvatar, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <AvatarThumb
          key={option.id}
          option={option}
          selected={selectedAvatar?.id === option.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default AvatarPicker;
