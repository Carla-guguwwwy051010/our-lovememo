export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const createPlaceholderPromise = (seed) => ({
  id: `promise-${seed}-${Date.now()}`,
  title: ['一起去看夜景', '做一顿双人早餐', '拍一张新拍立得', '去海边写愿望'][seed % 4],
  category: ['旅游', '美食', '事件', '旅游'][seed % 4],
  date: ['本周末', '下周三', '天气晴朗时', '下个月'][seed % 4],
  place: ['江边', '家里', '小馆子', '海边'][seed % 4],
  done: false,
});

export const getAvatarLabel = (name = 'LM', index = 0) =>
  name.slice(0, 2).toUpperCase() || `A${index + 1}`;

export const getPolaroidRotation = (index = 0) => {
  const values = [-4, 3, -2, 5, -3, 2];
  return values[index % values.length];
};

export const calculateDaysTogether = (startDate) => {
  if (!startDate) return 0;

  const start = new Date(startDate);

  if (Number.isNaN(start.getTime())) {
    return 0;
  }

  const today = new Date();
  const startAtMidnight = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const todayAtMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const diff = todayAtMidnight.getTime() - startAtMidnight.getTime();

  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

export const formatFriendlyDate = (dateString) => {
  if (!dateString) return '未设置';

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return '未设置';
  }

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
    date.getDate(),
  ).padStart(2, '0')}`;
};

export const createInviteCode = () =>
  `LM${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

export const getRelationIcon = (relationType) => {
  const map = {
    Couple: '❤️',
    Friends: '👭',
    Family: '👨‍👩‍👧',
    'Travel Partner': '🌍',
  };

  return map[relationType] || '✨';
};
