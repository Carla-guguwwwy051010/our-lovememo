import { useMemo, useState } from 'react';
import BottomNav from './BottomNav';
import DrawerMenu from './DrawerMenu';
import StickerButton from './StickerButton';
import { getAvatarLabel } from '../utils/helpers';

function AppShell({
  currentTab,
  onChangeTab,
  avatarOptions,
  selectedAvatar,
  onSelectAvatar,
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
  onRenameSelectedAvatar,
  onAddAvatar,
  onUpdateUserProfile,
  children,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const avatarLabel = useMemo(
    () => getAvatarLabel(selectedAvatar?.name, selectedAvatar?.id || 0),
    [selectedAvatar],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,209,220,0.55),_transparent_40%),linear-gradient(180deg,_#fffef0,_#fff8ec)] px-4 py-6 text-softBlack">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center">
        <div className="device-shell relative w-full max-w-[400px] overflow-hidden rounded-[40px] border-[3px] border-white bg-cream/90 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
          <div className="doodle-bg absolute inset-0 opacity-60" />
          <header className="relative z-10 flex items-center justify-between px-4 pb-2 pt-4">
            <StickerButton
              className="h-14 w-14 rounded-full p-0"
              tone="bg-white/85"
              onClick={() => setDrawerOpen(true)}
              aria-label="打开菜单"
            >
              <div className="mx-auto flex h-full w-full items-center justify-center overflow-hidden rounded-full">
                {!avatarFailed && selectedAvatar?.src ? (
                  <img
                    src={selectedAvatar.src}
                    alt={selectedAvatar.name}
                    className="h-full w-full object-cover"
                    onError={() => setAvatarFailed(true)}
                  />
                ) : (
                  <span className="doodle-avatar text-sm">{avatarLabel}</span>
                )}
              </div>
            </StickerButton>

            <div className="rounded-full bg-white/70 px-3 py-1 text-xs text-softBlack/65">
              {spaces.find((space) => space.id === activeSpaceId)?.icon} 当前空间
            </div>
          </header>

          <main className="relative z-10 flex min-h-[760px] flex-col px-4 pb-4">
            {children}
            <BottomNav currentTab={currentTab} onChange={onChangeTab} />
          </main>
        </div>
      </div>

      <DrawerMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userProfile={userProfile}
        spaces={spaces}
        activeSpaceId={activeSpaceId}
        onSwitchSpace={(spaceId) => {
          onSwitchSpace(spaceId);
          setDrawerOpen(false);
        }}
        onCreateSpace={onCreateSpace}
        relationshipDate={relationshipDate}
        onRelationshipDateChange={onRelationshipDateChange}
        relationshipType={relationshipType}
        onRelationshipTypeChange={onRelationshipTypeChange}
        companionId={companionId}
        onCompanionChange={onCompanionChange}
        members={members}
        partnerName={partnerName}
        preferences={preferences}
        onSavePreference={onSavePreference}
        inviteCode={inviteCode}
        onOpenInvite={onOpenInvite}
        avatarOptions={avatarOptions}
        selectedAvatar={selectedAvatar}
        onSelectAvatar={(avatar) => {
          setAvatarFailed(false);
          onSelectAvatar(avatar);
        }}
        onRenameSelectedAvatar={onRenameSelectedAvatar}
        onAddAvatar={onAddAvatar}
        onUpdateUserProfile={onUpdateUserProfile}
      />
    </div>
  );
}

export default AppShell;
