import { useState } from 'react';
import {
  companionCharacters,
  relationshipTypeOptions,
} from '../data/mock';
import StickerButton from './StickerButton';

const initialForm = {
  name: '',
  relationType: 'Couple',
  startDate: new Date().toISOString().slice(0, 10),
  companionId: 'samoyed',
};

function CreateSpaceModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  if (!open) return null;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    onSubmit({
      name: form.name.trim(),
      relationType: form.relationType,
      startDate: form.startDate,
      companionId: form.companionId,
    });

    setForm(initialForm);
    onClose();
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
              Create Space
            </p>
            <h3 className="mt-1 font-handwriting text-2xl">Create Your Lovememo</h3>
          </div>
          <StickerButton className="rounded-full px-3 py-2 text-xs" onClick={onClose}>
            关闭
          </StickerButton>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Space Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="例如：Our Love Space"
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Relationship Type</span>
            <select
              value={form.relationType}
              onChange={(event) => updateField('relationType', event.target.value)}
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            >
              {relationshipTypeOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Start Date</span>
            <input
              type="date"
              value={form.startDate}
              onChange={(event) => updateField('startDate', event.target.value)}
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            />
          </label>

          <div>
            <span className="mb-2 block text-sm font-semibold">选择陪伴角色</span>
            <div className="grid grid-cols-2 gap-2">
              {companionCharacters.map((character) => (
                <button
                  key={character.id}
                  type="button"
                  onClick={() => updateField('companionId', character.id)}
                  className={`rounded-[18px] border-[3px] border-white px-3 py-3 text-left text-xs shadow-sticker transition ${form.companionId === character.id ? 'bg-peach/55' : 'bg-white/80'}`}
                >
                  <p className="text-base">{character.emoji}</p>
                  <p className="mt-1 font-semibold">{character.label}</p>
                  <p className="mt-1 text-[11px] leading-5 text-softBlack/55">{character.note}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <StickerButton className="rounded-full px-5 py-3" tone="bg-mint" onClick={handleSubmit}>
            创建空间
          </StickerButton>
        </div>
      </div>
    </>
  );
}

export default CreateSpaceModal;
