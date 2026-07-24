export const avatarOptions = [
  { id: 1, name: 'Luna', src: '/images/avatar-1.jpg', tone: 'bg-peach/70' },
  { id: 2, name: 'Memo', src: '/images/avatar-2.jpg', tone: 'bg-baby/70' },
  { id: 3, name: 'Coco', src: '/images/avatar-3.jpg', tone: 'bg-mint/70' },
  { id: 4, name: 'Mori', src: '/images/avatar-4.jpg', tone: 'bg-peach/50' },
];

export const navItems = [
  { key: 'memories', label: '回忆' },
  { key: 'home', label: '我们的家' },
  { key: 'wishes', label: '星愿瓶' },
];

export const defaultSpaceId = 'space-love';

export const companionCharacters = [
  {
    id: 'samoyed',
    name: 'Samoyed',
    label: '萨摩耶',
    emoji: '🐶',
    image: '/images/samoyed.jpg',
    note: '白白软软，像会陪你们一起贴贴过日子。',
  },
  {
    id: 'cat',
    name: 'Cat',
    label: '猫咪',
    emoji: '🐱',
    image: '/images/companion-cat.jpg',
    note: '安静又黏人，适合窝在回忆角落里打呼噜。',
  },
  {
    id: 'rabbit',
    name: 'Rabbit',
    label: '兔兔',
    emoji: '🐰',
    image: '/images/companion-rabbit.jpg',
    note: '轻盈软萌，像一本被风翻开的糖霜手账。',
  },
  {
    id: 'bear',
    name: 'Bear',
    label: '小熊',
    emoji: '🐻',
    image: '/images/companion-bear.jpg',
    note: '圆圆厚厚的安全感，适合收藏很多拥抱。',
  },
];

export const spaces = [
  {
    id: 'space-love',
    icon: '❤️',
    name: 'Our Love Space',
    subtitle: '我和恋人',
    relationType: 'Couple',
    startDate: '2025-02-19',
    members: [
      {
        id: 'alice',
        name: '我',
        role: 'Owner',
        avatarId: 1,
      },
      {
        id: 'bob',
        name: 'Bob',
        role: 'Member',
        avatarId: 2,
      },
    ],
    companionId: 'samoyed',
    inviteCode: 'LOVE520',
    recentInteractions: [
      'Bob 刚刚解锁了一张双人留言纸条',
      '你们一起把「春日野餐」收藏进回忆',
      '新的愿望「海边看日落」已加入星愿瓶',
    ],
  },
  {
    id: 'space-bestie',
    icon: '👭',
    name: 'Bestie Notes',
    subtitle: '我和闺蜜',
    relationType: 'Friends',
    startDate: '2024-09-01',
    members: [
      {
        id: 'alice',
        name: '我',
        role: 'Owner',
        avatarId: 1,
      },
      {
        id: 'momo',
        name: 'Momo',
        role: 'Member',
        avatarId: 4,
      },
    ],
    companionId: 'rabbit',
    inviteCode: 'BFF888',
    recentInteractions: [
      'Momo 更新了毕业旅行相册封面',
      '你们一起写下新的周末计划',
    ],
  },
  {
    id: 'space-travel',
    icon: '🌍',
    name: 'Travel Stories',
    subtitle: '毕业旅行',
    relationType: 'Travel Partner',
    startDate: '2025-06-01',
    members: [
      {
        id: 'alice',
        name: '我',
        role: 'Owner',
        avatarId: 3,
      },
      {
        id: 'lin',
        name: 'Lin',
        role: 'Member',
        avatarId: 4,
      },
    ],
    companionId: 'bear',
    inviteCode: 'TRIP2026',
    recentInteractions: [
      '下一站路线被保存到回忆清单',
      'Lin 上传了一张山顶合照占位图',
    ],
  },
];

export const memorySections = [
  {
    key: 'city',
    label: '城市足迹',
    subtitle: '把每次一起走过的路贴成地图',
    color: 'from-baby/70 to-white',
  },
  {
    key: 'anniversary',
    label: '纪念事件',
    subtitle: '沿着时间线翻看心动时刻',
    color: 'from-peach/70 to-white',
  },
  {
    key: 'food',
    label: '美食地图',
    subtitle: '每一道喜欢的味道都留在这里',
    color: 'from-mint/70 to-white',
  },
];

export const memoryCategoryOptions = [
  { value: 'food', label: '🍜 Food' },
  { value: 'city', label: '📍 Travel' },
  { value: 'anniversary', label: '💗 Anniversary' },
  { value: 'daily', label: '🎬 Daily' },
];

export const cityFootprints = [
  {
    title: '落日江边散步',
    note: '风很轻，你把奶茶递给我时像电影暂停。',
    place: '滨江步道',
    date: '2025.02.14',
    image: '/images/avatar-1.jpg',
  },
  {
    title: '下雨天共撑一把伞',
    note: '鞋边都湿了，但一路笑个不停。',
    place: '老城区小路',
    date: '2025.05.20',
    image: '/images/avatar-2.jpg',
  },
  {
    title: '夜市小灯牌合照',
    note: '每个霓虹都像给我们写了注脚。',
    place: '河畔夜市',
    date: '2025.06.06',
    image: '/images/avatar-3.jpg',
  },
];

export const anniversaryTimeline = [
  {
    title: '第一次一起做饭',
    date: '第 88 天',
    note: '锅里冒泡的时候，我们偷偷许愿要一直好好吃饭。',
  },
  {
    title: '把钥匙放进同一个小盒子',
    date: '第 233 天',
    note: '从那天起，“我们的家”有了真实的声音。',
  },
  {
    title: '陪彼此走过低气压',
    date: '第 365 天',
    note: '难过被认真接住之后，爱会变得更柔软。',
  },
  {
    title: '520 Days Together',
    date: '第 520 天',
    note: '想把今天写成闪闪发光的书签，夹在以后每一天。',
  },
];

export const dailyMoments = [
  {
    title: '一起窝在沙发追剧',
    note: '明明剧情一般，但因为你在旁边，整晚都变得很好看。',
    place: '客厅角落',
    date: '2025.07.05',
    image: '/images/avatar-2.jpg',
  },
  {
    title: '下班后一起买热面包',
    note: '纸袋暖暖的，像一天结束时被轻轻抱了一下。',
    place: '街口面包房',
    date: '2025.07.18',
    image: '/images/avatar-1.jpg',
  },
];

export const foodMoments = [
  {
    title: '奶油草莓华夫饼',
    note: '你把最大颗草莓留给我。',
    place: '巷口甜品店',
    date: '2025.03.09',
    image: '/images/avatar-4.jpg',
  },
  {
    title: '深夜热汤面',
    note: '雨夜里的热气，好像把疲惫都吹散了。',
    place: '24h 小馆',
    date: '2025.04.12',
    image: '/images/avatar-5.jpg',
  },
  {
    title: '白白软软的萨摩耶咖啡厅',
    note: '它冲过来蹭你腿的那瞬间，全场最可爱。',
    place: '宠物主题咖啡店',
    date: '2025.06.18',
    image: '/images/samoyed.jpg',
  },
];

export const wishTabs = ['全部', '美食', '约会', '旅行', '惊喜', '其他'];

export const wishCategoryOptions = [
  { value: '美食', label: '🍜 Food' },
  { value: '约会', label: '🎬 Date' },
  { value: '旅行', label: '✈️ Travel' },
  { value: '惊喜', label: '🎁 Surprise' },
  { value: '其他', label: '⭐ Other' },
];

export const initialPromises = [
  {
    id: 'wish-1',
    spaceId: 'space-love',
    title: '一起做一锅韩式部队锅',
    category: '美食',
    description: '想在下雨晚上一起煮热腾腾的锅物，把厨房变成小小约会现场。',
    status: 'Pending',
    createdAt: '2026-07-20T20:00:00.000Z',
    completedAt: null,
  },
  {
    id: 'wish-2',
    spaceId: 'space-love',
    title: '拍一组胶片风合照',
    category: '约会',
    description: '去街角相馆留下一组会被很多年后重新翻出来的双人照片。',
    status: 'Pending',
    createdAt: '2026-07-21T19:20:00.000Z',
    completedAt: null,
  },
  {
    id: 'wish-3',
    spaceId: 'space-love',
    title: '带萨摩耶去草地奔跑',
    category: '旅行',
    description: '挑一个好天气，去城市边缘的草地跑到日落。',
    status: 'Completed',
    createdAt: '2026-07-11T15:00:00.000Z',
    completedAt: '2026-07-22T18:40:00.000Z',
  },
];

export const archivePreferences = [
  '晚安语音收藏夹',
  '一起看过的电影清单',
  '约会穿搭速记',
];

export const relationshipTypeOptions = [
  { value: 'Couple', label: '❤️ Couple' },
  { value: 'Friends', label: '👭 Friends' },
  { value: 'Family', label: '👨‍👩‍👧 Family' },
  { value: 'Travel Partner', label: '🌍 Travel Partner' },
];
