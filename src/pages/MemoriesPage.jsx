import { useMemo, useState } from 'react';
import AddMemoryModal from '../components/AddMemoryModal';
import StickerButton from '../components/StickerButton';
import {
  anniversaryTimeline,
  cityFootprints,
  dailyMoments,
  foodMoments,
  memorySections,
} from '../data/mock';
import MemoryDetailPage from './MemoryDetailPage';

function MemoriesPage({ selectedCategory, onSelectCategory, onBack }) {
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [memoryLibrary, setMemoryLibrary] = useState(() => ({
    city: cityFootprints.map((item, index) => ({ ...item, id: `city-${index}` })),
    anniversary: anniversaryTimeline.map((item, index) => ({ ...item, id: `anniversary-${index}` })),
    food: foodMoments.map((item, index) => ({ ...item, id: `food-${index}` })),
    daily: dailyMoments.map((item, index) => ({ ...item, id: `daily-${index}` })),
  }));

  const memoryCountMap = useMemo(() => {
    const counts = {
      city: 0,
      anniversary: 0,
      food: 0,
      daily: 0,
    };

    Object.entries(memoryLibrary).forEach(([category, items]) => {
      if (counts[category] !== undefined) {
        counts[category] = items.length;
      }
    });

    return counts;
  }, [memoryLibrary]);

  const closeModal = () => {
    setMemoryModalOpen(false);
    setEditingMemory(null);
  };

  if (selectedCategory) {
    return (
      <>
        <MemoryDetailPage
          category={selectedCategory}
          onBack={onBack}
          items={memoryLibrary[selectedCategory] || []}
          onEdit={(memory) => {
            setEditingMemory(memory);
            setMemoryModalOpen(true);
          }}
          onDelete={(memoryId) => {
            setMemoryLibrary((current) => ({
              ...current,
              [selectedCategory]: (current[selectedCategory] || []).filter((item) => item.id !== memoryId),
            }));
          }}
        />
        <AddMemoryModal
          open={memoryModalOpen}
          onClose={closeModal}
          onSubmit={(memory) => {
            setMemoryLibrary((current) => {
              const targetCategory = memory.category;
              const next = { ...current };

              Object.keys(next).forEach((key) => {
                next[key] = next[key].filter((item) => item.id !== memory.id);
              });

              next[targetCategory] = [memory, ...(next[targetCategory] || [])];
              return next;
            });
            setEditingMemory(null);
          }}
          defaultCategory={selectedCategory}
          initialMemory={editingMemory}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 pb-4">
        <div className="pt-2">
          <p className="font-handwriting text-[1.9rem]">回忆收集册</p>
          <p className="mt-2 text-sm leading-6 text-softBlack/65">
            轻点一张拍立得，翻开属于你们的小章节，也可以继续补写新的共同经历。
          </p>
        </div>

        <div className="grid gap-4">
          {memorySections.map((section, index) => (
            <button
              key={section.key}
              type="button"
              onClick={() => onSelectCategory(section.key)}
              className="group relative overflow-hidden rounded-[30px] border-[3px] border-white bg-white/75 p-5 text-left shadow-sticker transition hover:-translate-y-1"
              style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
            >
              <span className="tape-piece" />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-80 transition group-hover:opacity-100`}
              />
              <div className="relative z-10 min-h-[150px] rounded-[24px] border border-white/60 bg-white/30 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-softBlack/50">
                    memory
                  </p>
                  {memoryCountMap[section.key] > 0 ? (
                    <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] text-softBlack/60">
                      共 {memoryCountMap[section.key]} 条
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-3 font-handwriting text-3xl">{section.label}</h2>
                <p className="mt-3 max-w-[220px] text-sm leading-6 text-softBlack/70">
                  {section.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMemoryModalOpen(true)}
          className="fixed bottom-24 right-6 z-20 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white bg-peach text-2xl shadow-[0_12px_20px_rgba(0,0,0,0.14)] transition hover:-translate-y-1"
          aria-label="新增回忆"
        >
          +
        </button>

        <div className="flex justify-end">
          <StickerButton
            className="rounded-full px-4 py-3"
            tone="bg-mint"
            onClick={() => setMemoryModalOpen(true)}
          >
            Add Memory
          </StickerButton>
        </div>
      </div>

      <AddMemoryModal
        open={memoryModalOpen}
        onClose={closeModal}
        onSubmit={(memory) =>
          setMemoryLibrary((current) => ({
            ...current,
            [memory.category]: [memory, ...(current[memory.category] || [])],
          }))
        }
      />
    </>
  );
}

export default MemoriesPage;
