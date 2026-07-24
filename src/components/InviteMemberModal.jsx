import { useState } from 'react';
import StickerButton from './StickerButton';

function InviteMemberModal({ open, onClose, inviteCode, onJoin }) {
  const [inviteInput, setInviteInput] = useState('');

  if (!open) return null;

  const handleJoin = () => {
    if (!inviteInput.trim()) return;
    onJoin(inviteInput.trim().toUpperCase());
    setInviteInput('');
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-softBlack/25 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-[360px] -translate-y-1/2 rounded-[30px] border-[3px] border-white bg-cream p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-softBlack/45">
              Invite Members
            </p>
            <h3 className="mt-1 font-handwriting text-2xl">邀请好友进入空间</h3>
          </div>
          <StickerButton className="rounded-full px-3 py-2 text-xs" onClick={onClose}>
            关闭
          </StickerButton>
        </div>

        <div className="mt-4 space-y-4">
          <div className="rounded-[22px] border-[3px] border-white bg-peach/25 p-4">
            <p className="text-sm font-semibold">当前邀请码</p>
            <p className="mt-2 font-handwriting text-3xl">{inviteCode}</p>
            <p className="mt-2 text-xs leading-5 text-softBlack/60">
              未来可扩展为邀请链接、复制按钮与有效期控制。
            </p>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">输入邀请码加入空间</span>
            <input
              type="text"
              value={inviteInput}
              onChange={(event) => setInviteInput(event.target.value)}
              placeholder="例如：LOVE520"
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm uppercase outline-none"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end">
          <StickerButton className="rounded-full px-5 py-3" tone="bg-mint" onClick={handleJoin}>
            Join Space
          </StickerButton>
        </div>
      </div>
    </>
  );
}

export default InviteMemberModal;
