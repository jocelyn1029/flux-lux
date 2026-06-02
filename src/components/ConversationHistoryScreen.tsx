import { useMemo } from 'react'

type ConversationItem = {
  id: string
  meta: string
  title: string
  description: string
  avatars: string[]
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" strokeLinecap="round" />
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

function AvatarStack({ avatars }: { avatars: string[] }) {
  const shown = avatars.slice(0, 4)
  return (
    <div className="flex items-center">
      {shown.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt=""
          className={['h-9 w-9 rounded-full object-cover ring-2 ring-[#1A1A1A]', i ? '-ml-3' : ''].join(' ')}
          width={36}
          height={36}
          draggable={false}
        />
      ))}
    </div>
  )
}

export function ConversationHistoryScreen() {
  const items: ConversationItem[] = useMemo(
    () => [
      {
        id: 'dinner',
        meta: 'May 29 · 7:30 PM · 45 min',
        title: 'Dinner conversation',
        description:
          'A gentle conversation with moments of deep connection. You both felt heard, though there were a few interruptions near the end.',
        avatars: ['/photo-helen.png', '/photo-ernst.png', '/photo-ernst.png', '/photo-theo.png'],
      },
      {
        id: 'afternoon',
        meta: 'May 28 · 2:15 PM · 28 min',
        title: 'Afternoon chat',
        description:
          'A quick catch-up with good energy throughout. Both maintained attention and the tone remained warm and supportive.',
        avatars: ['/photo-helen.png', '/photo-ernst.png', '/photo-theo.png'],
      },
      {
        id: 'evening',
        meta: 'May 27 · 6:45 PM · 52 min',
        title: 'Evening discussion',
        description:
          'A longer conversation with multiple participants. Good balance overall, though one person dominated slightly in the second half.',
        avatars: ['/photo-theo.png', '/photo-ernst.png', '/photo-helen.png'],
      },
    ],
    []
  )

  return (
    <div className="mx-auto flex h-[812px] w-full max-w-[375px] flex-col overflow-hidden bg-[#0D0D0D] font-sans text-white">
      <main className="flex-1 overflow-y-auto px-5 pb-24 pt-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="mb-5 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-medium tracking-[0.14em] text-[#5C5C5C]">
              CONVERSATION HISTORY
            </div>
            <div className="mt-1 font-serif text-[22px] font-semibold leading-tight text-white">May 26, 2026</div>
          </div>
          <button type="button" className="mt-1 text-white/90">
            <SearchIcon />
          </button>
        </header>

        <section className="space-y-4">
          {items.map((c) => (
            <article
              key={c.id}
              className="rounded-[24px] border border-black/20 bg-[#1A1A1A] px-5 py-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-[12px] font-medium text-[#8C8C8C]">{c.meta}</div>
                <AvatarStack avatars={c.avatars} />
              </div>

              <h3 className="mt-2 text-[18px] font-semibold leading-snug text-white">{c.title}</h3>

              <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-[#8C8C8C]">{c.description}</p>

              <a href="/conversation-analysis" className="mt-3 inline-block text-[14px] font-semibold text-[#EAB308]">
                See details →
              </a>
            </article>
          ))}
        </section>
      </main>

      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[375px] -translate-x-1/2 border-t border-white/5 bg-[#0D0D0D]/85 backdrop-blur pointer-events-auto">
        <div className="grid grid-cols-4 px-2 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2">
          <a
            href="/lux-dashboard.html"
            className="flex flex-col items-center gap-1 py-1 text-[11px] font-medium text-[#5C5C5C]"
          >
            <HomeIcon />
            Home
          </a>
          <span className="flex flex-col items-center gap-1 py-1 text-[11px] font-medium text-[#EAB308]" aria-current="page">
            <ConversationIcon active />
            Conversation
          </span>
          <a
            href="/lux-emotion.html"
            className="flex flex-col items-center gap-1 py-1 text-[11px] font-medium text-[#5C5C5C]"
          >
            <EmotionIcon />
            Emotion
          </a>
          <a href="/profile" className="flex flex-col items-center gap-1 py-1 text-[11px] font-medium text-[#5C5C5C]">
            <ProfileIcon />
            Profile
          </a>
        </div>
      </nav>
    </div>
  )
}

