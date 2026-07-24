import { useEffect, useMemo, useState } from 'react';
import AddWishModal from '../components/AddWishModal';
import StickerButton from '../components/StickerButton';
import WishJar from '../components/WishJar';
import Toast from '../components/Toast';
import { initialPromises, wishTabs } from '../data/mock';

function WishJarPage({ onJumpMemories, spaceId }) {
  const [activeTab, setActiveTab] = useState('全部');
  const [promises, setPromises] = useState(initialPromises);
  const [stars, setStars] = useState([]);
  const [toast, setToast] = useState('');
  const [wishModalOpen, setWishModalOpen] = useState(false);
  const [editingWish, setEditingWish] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const scopedWishes = useMemo(
    () => promises.filter((item) => item.spaceId === spaceId),
    [promises, spaceId],
  );

  const pendingWishes = useMemo(() => {
    const source = scopedWishes.filter((item) => item.status === 'Pending');
    if (activeTab === '全部') return source;
    return source.filter((item) => item.category === activeTab);
  }, [activeTab, scopedWishes]);

  const completedWishes = useMemo(() => {
    const source = scopedWishes.filter((item) => item.status === 'Completed');
    if (activeTab === '全部') return source;
    return source.filter((item) => item.category === activeTab);
  }, [activeTab, scopedWishes]);

  const completedCount = scopedWishes.filter((item) => item.status === 'Completed').length;

  const completePromise = (id, event) => {
    const targetWish = scopedWishes.find((item) => item.id === id);
    if (!targetWish || targetWish.status === 'Completed') return;

    const rect = event.currentTarget.getBoundingClientRect();
    setPromises((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: 'Completed', completedAt: new Date().toISOString() }
          : item,
      ),
    );
    const burstStars = Array.from({ length: 18 }).map((_, index) => ({
      id: `${id}-${Date.now()}-${index}`,
      startX: rect.left + 12 + (index % 6) * ((rect.width - 24) / 5),
      startY: rect.top + 12 + Math.floor(index / 6) * 18,
    }));
    setStars((current) => [...current, ...burstStars]);
    setToast('✨ Wish completed! 要不要顺手把这一刻存进回忆？');
  };

  const closeWishModal = () => {
    setWishModalOpen(false);
    setEditingWish(null);
  };

  const handleDeleteWish = (wishId) => {
    setPromises((current) => current.filter((item) => item.id !== wishId));
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 pb-4">
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="font-handwriting text-[1.9rem]">星愿瓶</p>
            <p className="mt-1 text-sm text-softBlack/65">把想一起完成的小事都存进来。</p>
          </div>
          <StickerButton
            className="rounded-full px-4 py-2"
            tone="bg-mint"
            onClick={() => {
              setEditingWish(null);
              setWishModalOpen(true);
            }}
          >
            Add Wish
          </StickerButton>
        </div>

        <section className="rounded-[30px] border-[3px] border-white bg-white/75 p-4 shadow-sticker">
          <div className="flex flex-wrap gap-2">
            {wishTabs.map((tab) => (
              <StickerButton
                key={tab}
                className="rounded-full px-4 py-2 text-xs"
                tone={activeTab === tab ? 'bg-peach' : 'bg-cream'}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </StickerButton>
            ))}
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold">Pending Wishes</p>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {pendingWishes.map((item) => (
                <article
                  key={item.id}
                  className="min-w-[240px] flex-shrink-0 rounded-[26px] border-[3px] border-white bg-peach/35 p-4 shadow-sticker transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-softBlack/45">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-semibold">{item.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingWish(item);
                          setWishModalOpen(true);
                        }}
                        className="rounded-full border-[3px] border-white bg-white/90 px-3 py-1 text-[11px] font-semibold text-softBlack"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteWish(item.id)}
                        className="rounded-full border-[3px] border-white bg-white/70 px-3 py-1 text-[11px] font-semibold text-softBlack/65"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-softBlack/65">{item.description}</p>
                  <button
                    type="button"
                    onClick={(event) => completePromise(item.id, event)}
                    className="mt-5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-softBlack transition hover:-translate-y-0.5"
                  >
                    Complete Wish
                  </button>
                </article>
              ))}
              {pendingWishes.length === 0 ? (
                <div className="rounded-[24px] border-[3px] border-white bg-white/75 px-4 py-6 text-sm text-softBlack/60">
                  当前分类下还没有待完成星愿。
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border-[3px] border-white bg-baby/30 p-4 shadow-sticker">
          <p className="text-sm font-semibold">透明手绘愿望瓶</p>
          <p className="mt-2 text-sm leading-6 text-softBlack/65">
            每完成一个愿望，都会有多颗星星沿着抛物线落进瓶子里。
          </p>
          <WishJar
            stars={stars}
            completedCount={completedCount}
            onAnimationEnd={(starId) =>
              setStars((current) => current.filter((star) => star.id !== starId))
            }
          />
        </section>

        <section className="rounded-[30px] border-[3px] border-white bg-white/75 p-4 shadow-sticker">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Completed Wishes</p>
            <span className="rounded-full bg-white px-3 py-1 text-xs text-softBlack/60">
              ✓ {completedCount}
            </span>
          </div>
          <div className="mt-3 space-y-3">
            {completedWishes.map((item) => (
              <article
                key={item.id}
                className="rounded-[24px] border-[3px] border-white bg-softBlack/5 p-4 opacity-70 grayscale"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-softBlack/45">
                      {item.category}
                    </p>
                    <h3 className="mt-2 font-semibold">{item.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingWish(item);
                        setWishModalOpen(true);
                      }}
                      className="rounded-full border-[3px] border-white bg-white px-3 py-1 text-[11px] font-semibold text-softBlack"
                    >
                      编辑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteWish(item.id)}
                      className="rounded-full border-[3px] border-white bg-white/80 px-3 py-1 text-[11px] font-semibold text-softBlack/65"
                    >
                      删除
                    </button>
                    <span className="rounded-full bg-white px-3 py-1 text-xs text-softBlack/60">
                      ✓ Completed
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-softBlack/65">{item.description}</p>
              </article>
            ))}
            {completedWishes.length === 0 ? (
              <div className="rounded-[22px] bg-white/75 px-4 py-4 text-sm text-softBlack/55">
                还没有完成的星愿，等第一颗星星落进瓶子里。
              </div>
            ) : null}
          </div>
        </section>

        <Toast message={toast} actionLabel="Add to Memories" onAction={onJumpMemories} />
      </div>

      <AddWishModal
        open={wishModalOpen}
        onClose={closeWishModal}
        initialWish={editingWish}
        onSubmit={(wish) => {
          if (wish.id) {
            setPromises((current) =>
              current.map((item) =>
                item.id === wish.id
                  ? {
                      ...item,
                      title: wish.title,
                      category: wish.category,
                      description: wish.description,
                    }
                  : item,
              ),
            );
            setEditingWish(null);
            return;
          }

          setPromises((current) => [
            {
              id: `wish-${Date.now()}`,
              spaceId,
              title: wish.title,
              category: wish.category,
              description: wish.description,
              status: 'Pending',
              createdAt: new Date().toISOString(),
              completedAt: null,
            },
            ...current,
          ]);
        }}
      />
    </>
  );
}

export default WishJarPage;
