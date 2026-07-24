import { useMemo, useState } from 'react';
import AppShell from './components/AppShell';
import CreateSpaceModal from './components/CreateSpaceModal';
import InviteMemberModal from './components/InviteMemberModal';
import HomePage from './pages/HomePage';
import MemoriesPage from './pages/MemoriesPage';
import WishJarPage from './pages/WishJarPage';
import {
  archivePreferences,
  avatarOptions,
  companionCharacters,
  defaultSpaceId,
  spaces as initialSpaces,
} from './data/mock';
import { createInviteCode, getRelationIcon } from './utils/helpers';

function App() {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [avatarLibrary, setAvatarLibrary] = useState(avatarOptions);
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedAvatarId, setSelectedAvatarId] = useState(avatarOptions[0].id);
  const [activeSpaceId, setActiveSpaceId] = useState(defaultSpaceId);
  const [selectedMemoryCategory, setSelectedMemoryCategory] = useState(null);
  const [createSpaceOpen, setCreateSpaceOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    id: 'alice',
    name: '我',
    nickname: '当前使用者',
    birthday: '',
    zodiac: '',
    bio: '',
  });
  const [spacePreferences, setSpacePreferences] = useState(() =>
    initialSpaces.reduce((acc, space) => {
      acc[space.id] = archivePreferences.map((title, index) => ({
        id: `${space.id}-pref-${index}`,
        title,
        myNote: '',
      }));
      return acc;
    }, {}),
  );

  const selectedAvatar = useMemo(
    () => avatarLibrary.find((avatar) => avatar.id === selectedAvatarId) || avatarLibrary[0],
    [avatarLibrary, selectedAvatarId],
  );
  const activeSpace = useMemo(
    () => spaces.find((space) => space.id === activeSpaceId) || spaces[0],
    [activeSpaceId, spaces],
  );

  const currentCompanion = useMemo(
    () =>
      companionCharacters.find((character) => character.id === activeSpace?.companionId) ||
      companionCharacters[0],
    [activeSpace?.companionId],
  );

  const enrichedMembers = useMemo(
    () =>
      (activeSpace?.members || []).map((member) => {
        const memberAvatar = avatarLibrary.find((avatar) => avatar.id === member.avatarId);
        return {
          ...member,
          name: member.id === userProfile.id ? userProfile.name : member.name,
          avatar: member.id === userProfile.id ? '👩' : '👨',
          avatarSrc: memberAvatar?.src || selectedAvatar?.src,
        };
      }),
    [activeSpace?.members, avatarLibrary, selectedAvatar?.src, userProfile.id, userProfile.name],
  );

  const partner = useMemo(
    () => enrichedMembers.find((member) => member.id !== userProfile.id) || enrichedMembers[0],
    [enrichedMembers, userProfile.id],
  );

  const content = useMemo(() => {
    if (currentTab === 'memories') {
      return (
        <MemoriesPage
          selectedCategory={selectedMemoryCategory}
          onSelectCategory={setSelectedMemoryCategory}
          onBack={() => setSelectedMemoryCategory(null)}
        />
      );
    }

    if (currentTab === 'wishes') {
      return (
        <WishJarPage
          spaceId={activeSpace?.id}
          onJumpMemories={() => {
            setCurrentTab('memories');
            setSelectedMemoryCategory('anniversary');
          }}
        />
      );
    }

    return (
      <HomePage
        currentSpace={activeSpace}
        currentCompanion={currentCompanion}
        members={enrichedMembers}
        partnerName={partner?.name}
      />
    );
  }, [
    activeSpace,
    currentCompanion,
    currentTab,
    enrichedMembers,
    partner?.name,
    selectedMemoryCategory,
  ]);

  return (
    <>
      <AppShell
        currentTab={currentTab}
        onChangeTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'memories') {
            setSelectedMemoryCategory(null);
          }
        }}
        userProfile={userProfile}
        spaces={spaces}
        activeSpaceId={activeSpaceId}
        onSwitchSpace={(spaceId) => {
          setActiveSpaceId(spaceId);
          setCurrentTab('home');
        }}
        onCreateSpace={() => setCreateSpaceOpen(true)}
        relationshipDate={activeSpace?.startDate || ''}
        onRelationshipDateChange={(value) => {
          setSpaces((current) =>
            current.map((space) =>
              space.id === activeSpaceId ? { ...space, startDate: value } : space,
            ),
          );
        }}
        relationshipType={activeSpace?.relationType}
        onRelationshipTypeChange={(value) => {
          const subtitleMap = {
            Couple: '我和恋人',
            Friends: '我和朋友',
            Family: '我的家人',
            'Travel Partner': '旅行搭子',
          };
          setSpaces((current) =>
            current.map((space) =>
              space.id === activeSpaceId
                ? {
                    ...space,
                    relationType: value,
                    icon: getRelationIcon(value),
                    subtitle: subtitleMap[value] || space.subtitle,
                  }
                : space,
            ),
          );
        }}
        companionId={activeSpace?.companionId}
        onCompanionChange={(companionId) => {
          setSpaces((current) =>
            current.map((space) =>
              space.id === activeSpaceId ? { ...space, companionId } : space,
            ),
          );
        }}
        members={enrichedMembers}
        partnerName={partner?.name || '对方'}
        preferences={spacePreferences[activeSpaceId] || []}
        onSavePreference={(preference) => {
          setSpacePreferences((current) => {
            const currentList = current[activeSpaceId] || [];
            const exists = currentList.some((item) => item.id === preference.id);
            return {
              ...current,
              [activeSpaceId]: exists
                ? currentList.map((item) => (item.id === preference.id ? preference : item))
                : [...currentList, preference],
            };
          });
        }}
        inviteCode={activeSpace?.inviteCode}
        onOpenInvite={() => setInviteOpen(true)}
        avatarOptions={avatarLibrary}
        selectedAvatar={selectedAvatar}
        onSelectAvatar={(avatar) => {
          setSelectedAvatarId(avatar.id);
          setSpaces((current) =>
            current.map((space) => ({
              ...space,
              members: space.members.map((member) =>
                member.id === userProfile.id ? { ...member, avatarId: avatar.id } : member,
              ),
            })),
          );
        }}
        onRenameSelectedAvatar={(name) => {
          setAvatarLibrary((current) =>
            current.map((avatar) =>
              avatar.id === selectedAvatarId ? { ...avatar, name } : avatar,
            ),
          );
        }}
        onAddAvatar={(avatar) => {
          const newAvatar = {
            id: Date.now(),
            name: avatar.name,
            src: avatar.src,
            tone: avatar.tone || 'bg-baby/50',
          };
          setAvatarLibrary((current) => [...current, newAvatar]);
        }}
        onUpdateUserProfile={(profile) => setUserProfile(profile)}
      >
        {content}
      </AppShell>
      <CreateSpaceModal
        open={createSpaceOpen}
        onClose={() => setCreateSpaceOpen(false)}
        onSubmit={(spaceForm) => {
          const icon = getRelationIcon(spaceForm.relationType);
          const newSpace = {
            id: `space-${Date.now()}`,
            icon,
            name: spaceForm.name,
            subtitle:
              spaceForm.relationType === 'Couple'
                ? '新的双人关系空间'
                : spaceForm.relationType === 'Friends'
                  ? '新的朋友空间'
                  : spaceForm.relationType === 'Family'
                    ? '新的家人空间'
                    : '新的旅行搭子空间',
            relationType: spaceForm.relationType,
            startDate: spaceForm.startDate,
            members: [
              {
                id: 'alice',
                name: '我',
                role: 'Owner',
                avatarId: selectedAvatar.id,
              },
            ],
            companionId: spaceForm.companionId,
            inviteCode: createInviteCode(),
            recentInteractions: ['空间创建成功，接下来邀请成员一起写下第一条回忆吧。'],
          };

          setSpaces((current) => [newSpace, ...current]);
          setActiveSpaceId(newSpace.id);
          setCurrentTab('home');
        }}
      />
      <InviteMemberModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        inviteCode={activeSpace?.inviteCode}
        onJoin={(inputCode) => {
          setSpaces((current) =>
            current.map((space) => {
              if (space.id !== activeSpaceId) return space;

              if (
                inputCode === (space.inviteCode || '').toUpperCase() &&
                !space.members.some((member) => member.id === 'guest')
              ) {
                return {
                  ...space,
                  members: [
                    ...space.members,
                    {
                      id: 'guest',
                      name: 'New Friend',
                      role: 'Joined',
                      avatarId: 4,
                    },
                  ],
                  recentInteractions: [
                    '一位新成员已通过邀请码加入空间',
                    ...(space.recentInteractions || []),
                  ],
                };
              }

              return space;
            }),
          );
          setInviteOpen(false);
        }}
      />
    </>
  );
}

export default App;
