import PolaroidCard from '../components/PolaroidCard';
import StickerButton from '../components/StickerButton';

const detailMap = {
  city: {
    title: '城市足迹',
    subtitle: '把一起走过的街道贴成小小地图。',
  },
  anniversary: {
    title: '纪念事件',
    subtitle: '每个特别日子都值得认真收藏。',
  },
  food: {
    title: '美食地图',
    subtitle: '想把你喜欢的味道都记住。',
  },
  daily: {
    title: '日常片段',
    subtitle: '那些平凡却会反复想起的小瞬间。',
  },
};

function MemoryDetailPage({ category, onBack, items = [], onEdit, onDelete }) {
  const detail = detailMap[category];

  if (!detail) return null;

  const renderTimelineItems = items.map((item) => ({
    ...item,
    note: item.note || item.description,
    date: item.date,
  }));

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <div className="flex items-center justify-between">
        <StickerButton className="rounded-full px-4 py-2" onClick={onBack}>
          返回回忆
        </StickerButton>
        <div className="rounded-full bg-white/75 px-3 py-1 text-xs text-softBlack/55">
          收藏夹子页
        </div>
      </div>

      <section className="rounded-[30px] border-[3px] border-white bg-white/70 p-4 shadow-sticker">
        <h2 className="font-handwriting text-[1.8rem]">{detail.title}</h2>
        <p className="mt-1 text-sm text-softBlack/65">{detail.subtitle}</p>
      </section>

      {category === 'anniversary' ? (
        <div className="timeline-shell relative rounded-[30px] border-[3px] border-white bg-peach/30 p-5 shadow-sticker">
          {renderTimelineItems.map((item, index) => (
            <div key={item.title} className="timeline-item relative pl-8">
              <span className="timeline-dot" />
              {index !== renderTimelineItems.length - 1 ? <span className="timeline-connector" /> : null}
              <div className="mb-6 rounded-[24px] bg-white/85 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-softBlack/55">{item.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="rounded-full border-[3px] border-white bg-baby/35 px-3 py-1 text-[11px] font-semibold text-softBlack"
                    >
                      编辑
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="rounded-full border-[3px] border-white bg-white px-3 py-1 text-[11px] font-semibold text-softBlack/65"
                    >
                      删除
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-5">
          {items.map((item, index) => (
            <div key={item.id || item.title} className="relative">
              <div className="absolute right-4 top-10 z-10 flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="rounded-full border-[3px] border-white bg-baby/45 px-3 py-1 text-[11px] font-semibold text-softBlack shadow-sticker"
                >
                  编辑
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="rounded-full border-[3px] border-white bg-white/92 px-3 py-1 text-[11px] font-semibold text-softBlack/65 shadow-sticker"
                >
                  删除
                </button>
              </div>
              <PolaroidCard item={item} index={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MemoryDetailPage;
