import { useMemo, useState } from 'react';
import StickerButton from './StickerButton';
import StickerCard from './StickerCard';

function BlindBoxNotes({ partnerName = '对方' }) {
  const [myNote, setMyNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [partnerReady, setPartnerReady] = useState(false);

  const partnerMessage = useMemo(
    () => '今天想抱抱你，然后一起把普通的一天过成值得收藏的一页。',
    [],
  );

  const locked = !submitted || !partnerReady;

  const handleSubmit = () => {
    if (!myNote.trim()) return;
    setSubmitted(true);
    window.setTimeout(() => setPartnerReady(true), 900);
  };

  return (
    <StickerCard tone="bg-white/85" className="overflow-hidden">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-softBlack/40">
            blind box
          </p>
          <h3 className="font-handwriting text-xl">双向心事盲盒</h3>
        </div>
        <span className="rounded-full bg-peach/70 px-3 py-1 text-xs">
          {locked ? '等待解锁' : '已解锁'}
        </span>
      </div>

      <div className="grid gap-3">
        <div className="rounded-[22px] bg-peach/30 p-3">
          <p className="mb-2 text-sm font-semibold">我想悄悄说给 {partnerName}</p>
          <textarea
            value={myNote}
            onChange={(event) => setMyNote(event.target.value)}
            rows={3}
            placeholder="写下只给对方看的甜甜小字条..."
            className="w-full rounded-[18px] border-[3px] border-white bg-white/85 p-3 text-sm outline-none placeholder:text-softBlack/35"
          />
          <StickerButton
            className="mt-3 rounded-full px-4 py-2"
            tone="bg-mint"
            onClick={handleSubmit}
          >
            {submitted ? '已投递给对方' : '投入盲盒'}
          </StickerButton>
        </div>

        <div className="rounded-[24px] bg-baby/30 p-4">
          <p className="mb-2 text-sm font-semibold">来自 {partnerName} 的小纸条</p>
          <div
            className={`rounded-[18px] border-[3px] border-white bg-white/85 p-4 text-sm leading-7 transition ${locked ? 'select-none blur-[5px]' : ''}`}
          >
            {locked ? '对方纸条尚未解锁，请先完成你们的双向投递。' : partnerMessage}
          </div>
          <p className="mt-3 text-xs text-softBlack/55">
            {submitted && !partnerReady
              ? '对方正在打开盲盒中...'
              : locked
                ? '需要双方都完成提交后才会显示明文。'
                : '盲盒已同步开启。'}
          </p>
        </div>
      </div>
    </StickerCard>
  );
}

export default BlindBoxNotes;
