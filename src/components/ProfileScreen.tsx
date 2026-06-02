function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M12 22a2.3 2.3 0 0 0 2.2-1.6M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3M6.5 11h11A1.5 1.5 0 0 1 19 12.5v7A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5v-7A1.5 1.5 0 0 1 6.5 11z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M12 18.2h.01M9.4 9.6a2.9 2.9 0 1 1 4.5 2.4c-.9.6-1.4 1.1-1.4 2.1v.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

function LampIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 3h12" strokeLinecap="round" />
      <path d="M12 3v4" strokeLinecap="round" />
      <path d="M7.5 13h9L12 7.5 7.5 13z" strokeLinejoin="round" />
      <path d="M9 21h6" strokeLinecap="round" />
      <path d="M12 13v8" strokeLinecap="round" />
    </svg>
  )
}

function AvatarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" strokeLinecap="round" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M10 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12H3" strokeLinecap="round" />
      <path d="M21 4v16a2 2 0 0 1-2 2h-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill={active ? 'currentColor' : 'none'}
      stroke={active ? 'none' : 'currentColor'}
      strokeWidth={active ? 0 : 1.5}
      aria-hidden="true"
    >
      <path
        d="M5 10.5 12 4l7 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5H10.5V20H6a1 1 0 0 1-1-1v-8.5z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ConversationIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill={active ? 'currentColor' : 'none'}
      stroke={active ? 'none' : 'currentColor'}
      strokeWidth={active ? 0 : 1.5}
      aria-hidden="true"
    >
      <path
        d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 4v-4H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EmotionIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill={active ? 'currentColor' : 'none'}
      stroke={active ? 'none' : 'currentColor'}
      strokeWidth={active ? 0 : 1.5}
      aria-hidden="true"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProfileIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill={active ? 'currentColor' : 'none'}
      stroke={active ? 'none' : 'currentColor'}
      strokeWidth={active ? 0 : 1.5}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" strokeLinecap="round" />
    </svg>
  )
}

function Row({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <div className="flex items-center gap-3 bg-[#2A2A2A] px-4 py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-[#C9A84C]">{icon}</div>
      <div className="text-[14px] font-semibold text-white">{label}</div>
    </div>
  )
}

export function ProfileScreen() {
  return (
    <div className="mx-auto flex h-[812px] w-full max-w-[375px] flex-col overflow-hidden bg-[#111111] font-sans text-white">
      <main className="flex-1 overflow-y-auto px-5 pb-24 pt-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="text-[28px] font-bold tracking-tight text-white">Profile</div>

        <section className="mt-5 rounded-[16px] bg-[#2A2A2A] px-4 py-4">
          <div className="flex items-center gap-4">
            <img
              src="/photo-sophie.png"
              alt=""
              className="h-12 w-12 rounded-full object-cover"
              width={48}
              height={48}
              draggable={false}
            />
            <div className="min-w-0">
              <div className="text-[16px] font-bold text-white">Sophie</div>
              <div className="mt-1 text-[13px] font-medium text-[#888888]">Sophie@email.com</div>
            </div>
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-[16px] bg-[#2A2A2A]">
          <Row icon={<BellIcon />} label="Notifications" />
          <div className="h-px bg-white/5" />
          <Row icon={<LockIcon />} label="Privacy & Security" />
          <div className="h-px bg-white/5" />
          <Row icon={<HelpIcon />} label="Help & Support" />
        </section>

        <section className="mt-4 rounded-[16px] bg-[#2A2A2A] px-4 py-4">
          <div className="text-[14px] font-semibold text-white">Data Connections</div>

          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between rounded-[14px] bg-[#2F2F2F] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-[#C9A84C]">
                  <LampIcon />
                </div>
                <div className="text-[14px] font-semibold text-white">Lamp</div>
              </div>
              <div className="text-[13px] font-semibold text-[#4CAF50]">Connected</div>
            </div>

            <div className="flex items-center justify-between rounded-[14px] bg-[#2F2F2F] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-[#C9A84C]">
                  <AvatarIcon />
                </div>
                <div className="text-[14px] font-semibold text-white">Avatar</div>
              </div>
              <div className="text-[13px] font-semibold text-[#888888]">Not connected</div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[16px] bg-[#2A2A2A] px-4 py-4">
          <button type="button" className="mx-auto flex items-center gap-2 text-[14px] font-semibold text-[#E05555]">
            <LogoutIcon />
            Log out
          </button>
        </section>
      </main>

      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[375px] -translate-x-1/2 border-t border-white/5 bg-[#111111]/90 backdrop-blur pointer-events-auto">
        <div className="grid grid-cols-4 px-2 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2">
          <a href="/lux-dashboard.html" className="flex flex-col items-center gap-1 py-1 text-[11px] font-medium text-[#5C5C5C]">
            <HomeIcon />
            Home
          </a>
          <a href="/conversation-history" className="flex flex-col items-center gap-1 py-1 text-[11px] font-medium text-[#5C5C5C]">
            <ConversationIcon />
            Conversation
          </a>
          <a href="/lux-emotion.html" className="flex flex-col items-center gap-1 py-1 text-[11px] font-medium text-[#5C5C5C]">
            <EmotionIcon />
            Emotion
          </a>
          <span className="flex flex-col items-center gap-1 py-1 text-[11px] font-medium text-[#C9A84C]" aria-current="page">
            <ProfileIcon active />
            Profile
          </span>
        </div>
      </nav>
    </div>
  )
}

