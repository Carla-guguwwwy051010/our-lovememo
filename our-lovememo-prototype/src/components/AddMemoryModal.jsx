import { useEffect, useMemo, useState } from 'react';
import { memoryCategoryOptions } from '../data/mock';
import StickerButton from './StickerButton';

const initialForm = {
  title: '',
  date: '',
  category: 'anniversary',
  description: '',
  place: '',
};

const getDateValue = (value) => {
  if (!value) return '';
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
};

function AddMemoryModal({ open, onClose, onSubmit, defaultCategory, initialMemory = null }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;

    if (initialMemory) {
      setForm({
        title: initialMemory.title || '',
        date: getDateValue(initialMemory.date),
        category: initialMemory.category || defaultCategory || 'anniversary',
        description: initialMemory.note || initialMemory.description || '',
        place: initialMemory.place || '',
      });
      return;
    }

    setForm({
      ...initialForm,
      category: defaultCategory || initialForm.category,
    });
  }, [defaultCategory, initialMemory, open]);

  const categoryValue = useMemo(() => {
    if (!initialMemory && defaultCategory && ['city', 'food', 'anniversary', 'daily'].includes(defaultCategory)) {
      return defaultCategory;
    }
    return form.category;
  }, [defaultCategory, form.category, initialMemory]);

  if (!open) return null;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.date || !form.description.trim()) return;

    onSubmit({
      id: initialMemory?.id || `memory-${Date.now()}`,
      title: form.title.trim(),
      date: form.date,
      category: categoryValue,
      note: form.description.trim(),
      place: form.place.trim() || '待补充地点',
      image: initialMemory?.image || '/images/avatar-1.jpg',
      isNew: !initialMemory,
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
      <div className="fixed inset-x-4 top-1/2 z-50 mx-auto w-auto max-w-[360px] -translate-y-1/2 rounded-[30px] border-[3px] border-white bg-cream p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-softBlack/45">
              {initialMemory ? 'Edit Memory' : 'Add Memory'}
            </p>
            <h3 className="mt-1 font-handwriting text-2xl">
              {initialMemory ? '编辑这条回忆' : '创建新的回忆'}
            </h3>
          </div>
          <StickerButton className="rounded-full px-3 py-2 text-xs" onClick={onClose}>
            关闭
          </StickerButton>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="标题"
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Date</span>
            <input
              type="date"
              value={form.date}
              onChange={(event) => updateField('date', event.target.value)}
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Category</span>
            <select
              value={categoryValue}
              onChange={(event) => updateField('category', event.target.value)}
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            >
              {memoryCategoryOptions.map((item) => (
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
              placeholder="文字记录"
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Photo</span>
            <div className="rounded-[20px] border-[3px] border-dashed border-white bg-peach/20 px-4 py-5 text-center text-sm text-softBlack/60">
              图片上传占位，后续可接真实上传
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Place</span>
            <input
              type="text"
              value={form.place}
              onChange={(event) => updateField('place', event.target.value)}
              placeholder="地点"
              className="w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end">
          <StickerButton className="rounded-full px-5 py-3" tone="bg-mint" onClick={handleSubmit}>
            {initialMemory ? '保存修改' : '保存到回忆'}
          </StickerButton>
        </div>
      </div>
    </>
  );
}

export default AddMemoryModal;
