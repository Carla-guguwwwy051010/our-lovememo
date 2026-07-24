import { useEffect, useState } from 'react';
import { wishCategoryOptions } from '../data/mock';
import StickerButton from './StickerButton';

const initialForm = {
  title: '',
  category: '美食',
  description: '',
};

function AddWishModal({ open, onClose, onSubmit, initialWish = null }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;

    if (initialWish) {
      setForm({
        title: initialWish.title || '',
        category: initialWish.category || '美食',
        description: initialWish.description || '',
      });
      return;
    }

    setForm(initialForm);
  }, [initialWish, open]);

  if (!open) return null;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.description.trim()) return;

    onSubmit({
      id: initialWish?.id,
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
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
              {initialWish ? 'Edit Wish' : 'Add Wish'}
            </p>
            <h3 className="mt-1 font-handwriting text-2xl">
              {initialWish ? '修改这颗星愿' : '写下一颗新的星愿'}
            </h3>
          </div>
          <StickerButton className="rounded-full px-3 py-2 text-xs" onClick={onClose}>
            关闭
          </StickerButton>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Wish Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="例如：一起去看海边日落"
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Category</span>
            <select
              value={form.category}
              onChange={(event) => updateField('category', event.target.value)}
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            >
              {wishCategoryOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Description</span>
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="写下你们想一起完成的事"
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end">
          <StickerButton className="rounded-full px-5 py-3" tone="bg-mint" onClick={handleSubmit}>
            {initialWish ? '保存修改' : 'Add Wish'}
          </StickerButton>
        </div>
      </div>
    </>
  );
}

export default AddWishModal;
