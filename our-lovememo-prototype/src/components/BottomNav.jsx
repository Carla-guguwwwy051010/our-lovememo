import { navItems } from '../data/mock';
import StickerButton from './StickerButton';

function BottomNav({ currentTab, onChange }) {
  return (
    <nav className="sticky bottom-3 z-20 mt-auto">
      <div className="mx-auto flex w-full max-w-[320px] items-center justify-between gap-2 rounded-full border-[3px] border-white bg-white/80 p-2 shadow-sticker backdrop-blur">
        {navItems.map((item) => (
          <StickerButton
            key={item.key}
            className="flex-1 rounded-full px-3 py-2"
            tone={currentTab === item.key ? 'bg-peach' : 'bg-cream'}
            active={currentTab === item.key}
            onClick={() => onChange(item.key)}
          >
            {item.label}
          </StickerButton>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
