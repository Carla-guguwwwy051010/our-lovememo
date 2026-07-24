import { useEffect, useState } from 'react';
import AvatarPicker from './AvatarPicker';
import StickerButton from './StickerButton';
import {
  companionCharacters,
  relationshipTypeOptions,
} from '../data/mock';

function DrawerMenu({
  open,
  onClose,
  userProfile,
  spaces,
  activeSpaceId,
  onSwitchSpace,
  onCreateSpace,
  relationshipDate,
  onRelationshipDateChange,
  relationshipType,
  onRelationshipTypeChange,
  companionId,
  onCompanionChange,
  members,
  partnerName,
  preferences,
  onSavePreference,
  inviteCode,
  onOpenInvite,
  avatarOptions,
  selectedAvatar,
  onSelectAvatar,
  onRenameSelectedAvatar,
  onAddAvatar,
  onUpdateUserProfile,
}) {
  const currentCompanion =
    companionCharacters.find((character) => character.id === companionId) ||
    companionCharacters[0];
  const currentSpace = spaces.find((space) => space.id === activeSpaceId);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState(userProfile);
  const [preferenceOpen, setPreferenceOpen] = useState(false);
  const [preferenceDraft, setPreferenceDraft] = useState(null);
  const [selectedAvatarName, setSelectedAvatarName] = useState(selectedAvatar?.name || '');
  const [newAvatarName, setNewAvatarName] = useState('');
  const [newAvatarSrc, setNewAvatarSrc] = useState('');

  useEffect(() => {
    setProfileDraft(userProfile);
  }, [userProfile]);

  useEffect(() => {
    setSelectedAvatarName(selectedAvatar?.name || '');
  }, [selectedAvatar]);

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-softBlack/20 transition ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-[86%] max-w-sm flex-col gap-4 overflow-y-auto rounded-r-[32px] border-r-[3px] border-white bg-cream p-5 shadow-2xl transition duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-softBlack/50">space menu</p>
            <h2 className="font-handwriting text-2xl">我的 Lovememo 空间</h2>
          </div>
          <StickerButton className="rounded-full px-3 py-2 text-xs" onClick={onClose}>
            关闭
          </StickerButton>
        </div>

        <section className="sticker rounded-[24px] border-[3px] border-white bg-white/80 p-4">
          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="w-full text-left"
          >
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-full border-[3px] border-white bg-peach/30">
              <img
                src={selectedAvatar?.src}
                alt={selectedAvatar?.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold">{userProfile.name}</p>
              <p className="mt-1 text-xs text-softBlack/60">{userProfile.nickname}</p>
              <p className="mt-1 text-[11px] text-softBlack/45">
                {userProfile.birthday || '生日待填写'} · {userProfile.zodiac || '星座待填写'}
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-[18px] bg-peach/20 px-3 py-3 text-sm leading-6 text-softBlack/65">
            {userProfile.bio || `写一点关于“我”的描述，对 ${partnerName} 可见。`}
          </div>
          <p className="mt-2 text-xs text-softBlack/45">点击编辑名字、生日、星座和个人描述</p>
          </button>
        </section>

        <section className="sticker rounded-[24px] border-[3px] border-white bg-peach/40 p-4">
          <p className="text-sm font-semibold">当前空间</p>
          <p className="mt-2 font-handwriting text-xl">
            {currentSpace?.icon}{' '}
            {currentSpace?.name}
          </p>
          <p className="mt-1 text-xs text-softBlack/60">
            {currentSpace?.subtitle}
          </p>
        </section>

        <section className="sticker rounded-[24px] border-[3px] border-white bg-white/80 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">我的空间列表</p>
            <StickerButton
              className="rounded-full px-3 py-2 text-xs"
              tone="bg-mint"
              onClick={onCreateSpace}
            >
              Create New Space
            </StickerButton>
          </div>
          <div className="mt-3 space-y-2">
            {spaces.map((space) => (
              <button
                key={space.id}
                type="button"
                onClick={() => onSwitchSpace(space.id)}
                className={`flex w-full items-center justify-between rounded-[20px] border-[3px] border-white px-3 py-3 text-left shadow-sticker transition ${space.id === activeSpaceId ? 'bg-baby/60' : 'bg-white/75'}`}
              >
                <div>
                  <p className="text-sm font-semibold">
                    {space.icon} {space.name}
                  </p>
                  <p className="mt-1 text-xs text-softBlack/55">{space.subtitle}</p>
                </div>
                <span className="text-xs text-softBlack/45">
                  {space.id === activeSpaceId ? '当前空间' : '切换'}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="sticker rounded-[24px] border-[3px] border-white bg-baby/35 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Space Settings</p>
            <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] text-softBlack/60">
              for future Supabase
            </span>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-softBlack/45">
                Relationship Date
              </p>
              <input
                type="date"
                value={relationshipDate}
                onChange={(event) => onRelationshipDateChange(event.target.value)}
                className="mt-2 w-full rounded-[18px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-softBlack/45">
                Relationship Type
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {relationshipTypeOptions.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => onRelationshipTypeChange(item.value)}
                    className={`rounded-full border-[3px] border-white px-3 py-2 text-xs transition ${relationshipType === item.value ? 'bg-peach/70 shadow-sticker' : 'bg-white/80'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-softBlack/45">
                  Companion Character
                </p>
                <span className="text-xs text-softBlack/55">{currentCompanion.label}</span>
              </div>
              <div className="mt-2 flex items-center gap-3 rounded-[18px] border-[3px] border-white bg-white/75 p-3">
                <div className="h-16 w-16 overflow-hidden rounded-[16px] border-[3px] border-white bg-peach/20 shadow-sticker">
                  {currentCompanion.image ? (
                    <img
                      src={currentCompanion.image}
                      alt={currentCompanion.label}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl">
                      {currentCompanion.emoji}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 text-sm leading-6 text-softBlack/65">
                  {currentCompanion.note}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {companionCharacters.map((character) => (
                  <button
                    key={character.id}
                    type="button"
                    onClick={() => onCompanionChange(character.id)}
                    className={`rounded-[18px] border-[3px] border-white px-3 py-3 text-left text-xs shadow-sticker transition ${character.id === companionId ? 'bg-peach/55' : 'bg-white/80'}`}
                  >
                    <div className="h-20 w-full overflow-hidden rounded-[14px] border-[3px] border-white bg-white/85">
                      {character.image ? (
                        <img
                          src={character.image}
                          alt={character.label}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl">
                          {character.emoji}
                        </div>
                      )}
                    </div>
                    <p className="mt-1 font-semibold">{character.label}</p>
                    <p className="mt-1 text-[11px] leading-5 text-softBlack/55">{character.note}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sticker rounded-[24px] border-[3px] border-white bg-white/80 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Members</p>
            <StickerButton
              className="rounded-full px-3 py-2 text-xs"
              tone="bg-mint"
              onClick={onOpenInvite}
            >
              Invite Friend
            </StickerButton>
          </div>
          <div className="mt-3 space-y-2">
            {members.map((member, index) => (
              <div
                key={member.id}
                className={`relative overflow-hidden rounded-[20px] border-[3px] border-white px-3 py-3 shadow-sticker ${index === 0 ? 'bg-peach/28' : 'bg-baby/28'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-[3px] border-white bg-white/90 shadow-sticker">
                      {member.avatarSrc ? (
                        <img
                          src={member.avatarSrc}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-lg">
                          {member.avatar}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="relative inline-flex items-center gap-2 px-2 py-1">
                        <span
                          className={`absolute inset-0 rounded-[12px] border border-white/55 ${index === 0 ? 'bg-peach/55' : 'bg-baby/55'}`}
                        />
                        <span
                          className={`relative rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-softBlack/65 ${index === 0 ? 'bg-white/90' : 'bg-white/80'}`}
                        >
                          {index === 0 ? 'ME' : 'YOU'}
                        </span>
                        <span className="relative truncate text-sm font-semibold">{member.name}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-softBlack/45">
                        {index === 0 ? '我的贴纸卡' : '对方的贴纸卡'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-softBlack/55">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-[18px] bg-mint/35 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-softBlack/45">Invite Members</p>
            <p className="mt-2 text-sm font-semibold">邀请码：{inviteCode}</p>
            <p className="mt-1 text-xs text-softBlack/60">未来可扩展为邀请链接与多人协作。</p>
          </div>
        </section>

        <section className="sticker rounded-[24px] border-[3px] border-white bg-peach/35 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">偏好存档</p>
            <StickerButton
              className="rounded-full px-3 py-2 text-xs"
              tone="bg-white/90"
              onClick={() => {
                setPreferenceDraft({
                  id: `pref-${Date.now()}`,
                  title: '',
                  myNote: '',
                });
                setPreferenceOpen(true);
              }}
            >
              添加偏好
            </StickerButton>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            {preferences.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPreferenceDraft(item);
                  setPreferenceOpen(true);
                }}
                className="w-full rounded-2xl bg-white/75 px-3 py-3 text-left"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-xs text-softBlack/55">
                  {item.myNote ? item.myNote : '点击写下“我的”偏好内容'}
                </p>
                <p className="mt-2 text-[11px] text-softBlack/45">对 {partnerName} 可见</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border-[3px] border-white bg-white/75 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">头像选择</p>
            <span className="text-[11px] text-softBlack/45">可新增并改当前头像名</span>
          </div>
          <AvatarPicker
            options={avatarOptions}
            selectedAvatar={selectedAvatar}
            onSelect={onSelectAvatar}
          />
          <div className="mt-4 rounded-[20px] border-[3px] border-white bg-peach/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-softBlack/45">当前头像名称</p>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={selectedAvatarName}
                onChange={(event) => setSelectedAvatarName(event.target.value)}
                className="min-w-0 flex-1 rounded-[14px] border-[3px] border-white bg-white/90 px-3 py-2 text-sm outline-none"
              />
              <StickerButton
                className="rounded-full px-3 py-2 text-xs"
                tone="bg-mint"
                onClick={() => onRenameSelectedAvatar(selectedAvatarName.trim() || selectedAvatar?.name)}
              >
                保存
              </StickerButton>
            </div>
          </div>
          <div className="mt-4 rounded-[20px] border-[3px] border-white bg-baby/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-softBlack/45">添加新头像</p>
            <div className="mt-2 space-y-2">
              <input
                type="text"
                value={newAvatarName}
                onChange={(event) => setNewAvatarName(event.target.value)}
                placeholder="头像名字"
                className="w-full rounded-[14px] border-[3px] border-white bg-white/90 px-3 py-2 text-sm outline-none"
              />
              <input
                type="text"
                value={newAvatarSrc}
                onChange={(event) => setNewAvatarSrc(event.target.value)}
                placeholder="图片地址（可留空，留空则显示字母头像）"
                className="w-full rounded-[14px] border-[3px] border-white bg-white/90 px-3 py-2 text-sm outline-none"
              />
              <div className="flex justify-end">
                <StickerButton
                  className="rounded-full px-3 py-2 text-xs"
                  tone="bg-mint"
                  onClick={() => {
                    if (!newAvatarName.trim()) return;
                    onAddAvatar({
                      name: newAvatarName.trim(),
                      src: newAvatarSrc.trim(),
                    });
                    setNewAvatarName('');
                    setNewAvatarSrc('');
                  }}
                >
                  添加头像
                </StickerButton>
              </div>
            </div>
          </div>
        </section>
      </aside>

      {profileOpen ? (
        <>
          <div
            className="fixed inset-0 z-50 bg-softBlack/25"
            onClick={() => setProfileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-4 top-1/2 z-[60] mx-auto max-w-[360px] -translate-y-1/2 rounded-[30px] border-[3px] border-white bg-cream p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-softBlack/45">Profile</p>
                <h3 className="mt-1 font-handwriting text-2xl">编辑我的资料</h3>
              </div>
              <StickerButton className="rounded-full px-3 py-2 text-xs" onClick={() => setProfileOpen(false)}>
                关闭
              </StickerButton>
            </div>
            <div className="mt-4 space-y-3">
              <input
                type="text"
                value={profileDraft.name || ''}
                onChange={(event) => setProfileDraft((current) => ({ ...current, name: event.target.value }))}
                placeholder="名字"
                className="w-full rounded-[16px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
              />
              <input
                type="text"
                value={profileDraft.nickname || ''}
                onChange={(event) => setProfileDraft((current) => ({ ...current, nickname: event.target.value }))}
                placeholder="当前昵称"
                className="w-full rounded-[16px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
              />
              <input
                type="date"
                value={profileDraft.birthday || ''}
                onChange={(event) => setProfileDraft((current) => ({ ...current, birthday: event.target.value }))}
                className="w-full rounded-[16px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
              />
              <input
                type="text"
                value={profileDraft.zodiac || ''}
                onChange={(event) => setProfileDraft((current) => ({ ...current, zodiac: event.target.value }))}
                placeholder="星座"
                className="w-full rounded-[16px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
              />
              <textarea
                rows={4}
                value={profileDraft.bio || ''}
                onChange={(event) => setProfileDraft((current) => ({ ...current, bio: event.target.value }))}
                placeholder={`写一点关于自己的介绍，${partnerName} 可见`}
                className="w-full rounded-[16px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
              />
            </div>
            <div className="mt-5 flex justify-end">
              <StickerButton
                className="rounded-full px-5 py-3"
                tone="bg-mint"
                onClick={() => {
                  onUpdateUserProfile(profileDraft);
                  setProfileOpen(false);
                }}
              >
                保存资料
              </StickerButton>
            </div>
          </div>
        </>
      ) : null}

      {preferenceOpen ? (
        <>
          <div
            className="fixed inset-0 z-50 bg-softBlack/25"
            onClick={() => setPreferenceOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-4 top-1/2 z-[60] mx-auto max-w-[360px] -translate-y-1/2 rounded-[30px] border-[3px] border-white bg-cream p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-softBlack/45">Preference</p>
                <h3 className="mt-1 font-handwriting text-2xl">书写我的偏好</h3>
              </div>
              <StickerButton className="rounded-full px-3 py-2 text-xs" onClick={() => setPreferenceOpen(false)}>
                关闭
              </StickerButton>
            </div>
            <div className="mt-4 space-y-3">
              <input
                type="text"
                value={preferenceDraft?.title || ''}
                onChange={(event) =>
                  setPreferenceDraft((current) => ({ ...current, title: event.target.value }))
                }
                placeholder="偏好标题"
                className="w-full rounded-[16px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
              />
              <textarea
                rows={5}
                value={preferenceDraft?.myNote || ''}
                onChange={(event) =>
                  setPreferenceDraft((current) => ({ ...current, myNote: event.target.value }))
                }
                placeholder={`写下“我的”偏好内容，${partnerName} 可以看见`}
                className="w-full rounded-[16px] border-[3px] border-white bg-white/90 px-4 py-3 text-sm outline-none"
              />
            </div>
            <div className="mt-5 flex justify-end">
              <StickerButton
                className="rounded-full px-5 py-3"
                tone="bg-mint"
                onClick={() => {
                  if (!preferenceDraft?.title?.trim()) return;
                  onSavePreference({
                    ...preferenceDraft,
                    title: preferenceDraft.title.trim(),
                    myNote: preferenceDraft.myNote || '',
                  });
                  setPreferenceOpen(false);
                }}
              >
                保存偏好
              </StickerButton>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default DrawerMenu;
