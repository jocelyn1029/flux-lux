import { useMemo, useState } from 'react'

type PatternItem = {
  id: string
  name: string
  avatarSrc: string
  badge?: string
  insight: string
  suggestion: string
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      {dir === 'left' ? (
        <path d="M14 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M10 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function PatternCard({ item }: { item: PatternItem }) {
  return (
    <article className="rounded-[24px] bg-[#1A1A1A] px-4 py-4">
      <div className="flex items-center gap-4">
        <img
          src={item.avatarSrc}
          alt=""
          className="h-[56px] w-[56px] shrink-0 rounded-[16px] object-cover"
          width={56}
          height={56}
          draggable={false}
        />

        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold leading-none text-white">{item.name}</span>
            {item.badge ? (
              <span className="rounded-full bg-[#FFD84D] px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-black">
                {item.badge}
              </span>
            ) : null}
          </div>
          <p className="text-[14px] font-semibold leading-snug text-white">{item.insight}</p>
          <p className="text-[12px] leading-relaxed text-[#888]">{item.suggestion}</p>
        </div>
      </div>
    </article>
  )
}

type TimelinePerson = {
  id: 'ernst' | 'helen' | 'sophie' | 'theo'
  name: string
  points: Array<{ t: number; intensity: number; emotion: keyof typeof EMOTION_COLORS }>
}

const EMOTION_COLORS = {
  happy: '#F5C842',
  angry: '#E05A4E',
  stressful: '#E8873A',
  relax: '#8CBF5A',
  sad: '#6AACE0',
} as const

function EmotionTimelineCard() {
  const w = 335
  const h = 270
  const padLeft = 94
  const padRight = 12
  const padTop = 12
  const padBottom = 62

  const tMin = 0
  const tMax = 24

  const [scrubT, setScrubT] = useState<number | null>(19.25) // 19:15

  const xAt = (t: number) => padLeft + ((t - tMin) / (tMax - tMin)) * (w - padLeft - padRight)

  const rowY = (rowIdx: number) => {
    const innerH = h - padTop - padBottom
    const step = innerH / 3
    return padTop + step * rowIdx + step / 2
  }

  const radiusAt = (v01: number) => 5 + v01 * 12

  const people: TimelinePerson[] = [
    {
      id: 'ernst',
      name: 'Ernst',
      points: [
        { t: 0, intensity: 0.35, emotion: 'relax' },
        { t: 2, intensity: 0.48, emotion: 'relax' },
        { t: 4.5, intensity: 0.44, emotion: 'happy' },
        { t: 8, intensity: 0.58, emotion: 'relax' },
        { t: 12, intensity: 0.66, emotion: 'stressful' },
        { t: 16, intensity: 0.52, emotion: 'angry' },
        { t: 19.25, intensity: 0.58, emotion: 'relax' },
        { t: 22, intensity: 0.46, emotion: 'relax' },
      ],
    },
    {
      id: 'helen',
      name: 'Helen',
      points: [
        { t: 0, intensity: 0.55, emotion: 'angry' },
        { t: 2, intensity: 0.62, emotion: 'angry' },
        { t: 4.5, intensity: 0.52, emotion: 'stressful' },
        { t: 8, intensity: 0.68, emotion: 'relax' },
        { t: 12, intensity: 0.78, emotion: 'angry' },
        { t: 16, intensity: 0.6, emotion: 'angry' },
        { t: 19.25, intensity: 0.72, emotion: 'stressful' },
        { t: 22, intensity: 0.56, emotion: 'angry' },
      ],
    },
    {
      id: 'sophie',
      name: 'Sophie',
      points: [
        { t: 0, intensity: 0.42, emotion: 'happy' },
        { t: 2, intensity: 0.5, emotion: 'happy' },
        { t: 4.5, intensity: 0.56, emotion: 'stressful' },
        { t: 8, intensity: 0.6, emotion: 'happy' },
        { t: 12, intensity: 0.62, emotion: 'happy' },
        { t: 16, intensity: 0.58, emotion: 'stressful' },
        { t: 19.25, intensity: 0.6, emotion: 'happy' },
        { t: 22, intensity: 0.5, emotion: 'happy' },
      ],
    },
    {
      id: 'theo',
      name: 'Theo',
      points: [
        { t: 0, intensity: 0.3, emotion: 'relax' },
        { t: 2, intensity: 0.36, emotion: 'sad' },
        { t: 4.5, intensity: 0.34, emotion: 'relax' },
        { t: 8, intensity: 0.46, emotion: 'relax' },
        { t: 12, intensity: 0.52, emotion: 'sad' },
        { t: 16, intensity: 0.4, emotion: 'relax' },
        { t: 19.25, intensity: 0.48, emotion: 'relax' },
        { t: 22, intensity: 0.36, emotion: 'relax' },
      ],
    },
  ]

  const scrubX = scrubT == null ? null : xAt(scrubT)
  const axisLabels = [
    { t: 0, label: '0:00' },
    { t: 8, label: '8:00' },
    { t: 16, label: '16:00' },
    { t: 24, label: '24:00' },
  ]

  return (
    <section className="rounded-[16px] bg-[#1E1E1E] px-4 py-4">
      <div className="text-[14px] font-bold text-white">Family Emotion Timeline</div>
      <div className="relative mt-3">
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="block w-full [overflow:visible]"
          onClick={(e) => {
            const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
            const x = e.clientX - rect.left
            const t = tMin + ((x - padLeft) / (w - padLeft - padRight)) * (tMax - tMin)
            const clamped = Math.max(tMin, Math.min(tMax, t))
            setScrubT(clamped)
          }}
          aria-label="Emotion bubble timeline"
        >
          <defs>
            <filter id="bubbleSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          {[0, 1, 2, 3].map((i) => {
            const y = padTop + ((h - padTop - padBottom) / 3) * i
            return <line key={i} x1={0} x2={w} y1={y} y2={y} stroke="#2A2A2A" strokeWidth="1" />
          })}

          {people.map((p, idx) => (
            <text
              key={p.id + '-label'}
              x={4}
              y={rowY(idx) + 4}
              fill="#FFFFFF"
              opacity="0.9"
              fontSize="12"
              fontWeight="600"
            >
              {p.name}
            </text>
          ))}

          {scrubX != null ? (
            <line
              x1={scrubX}
              x2={scrubX}
              y1={padTop - 2}
              y2={h - padBottom + 2}
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.2"
            />
          ) : null}

          {people.map((p, idx) => {
            const y = rowY(idx)
            return p.points.map((pt, j) => {
              const x = xAt(pt.t)
              const r = radiusAt(pt.intensity)
              const isScrub = scrubT != null && Math.abs(pt.t - scrubT) < 0.6
              const fill = EMOTION_COLORS[pt.emotion]
              return (
                <g key={`${p.id}-${j}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill={fill}
                    opacity={isScrub ? 0.9 : 0.65}
                    filter="url(#bubbleSoft)"
                  />
                </g>
              )
            })
          })}

          {axisLabels.map((a) => (
            <text
              key={a.t}
              x={xAt(a.t)}
              y={h - 6}
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontWeight="600"
            >
              {a.label}
            </text>
          ))}
        </svg>

        {scrubT != null ? (
          <div className="mt-2 text-center text-[12px] font-semibold text-white/75">
            {`${String(Math.floor(scrubT)).padStart(2, '0')}:${String(Math.round((scrubT % 1) * 60))
              .padStart(2, '0')
              .replace('60', '00')} — Dinner`}
          </div>
        ) : null}
      </div>
    </section>
  )
}

type KeyMoment = {
  id: string
  time: string
  person: 'ernst' | 'helen' | 'sophie' | 'theo'
  emotion: keyof typeof EMOTION_COLORS
  desc: string
  hint: string
}

function KeyMomentsList({ moments }: { moments: KeyMoment[] }) {
  return (
    <section className="mt-5">
      <div className="text-[10px] font-semibold tracking-[0.22em] text-white/55">KEY MOMENTS</div>
      <div className="mt-3 space-y-3">
        {moments.map((m) => (
          <article key={m.id} className="rounded-[16px] bg-[#1E1E1E] px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[12px] font-bold text-white/85">{m.time}</div>
              <div
                className="mt-1 h-2 w-2 shrink-0 rounded-full"
                style={{ background: EMOTION_COLORS[m.emotion], opacity: 0.65 }}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold leading-snug text-white">{m.desc}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-[#888]">{m.hint}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ConversationAnalysisScreen() {
  const [tab, setTab] = useState<'overview' | 'timeline'>(() => {
    if (typeof window === 'undefined') return 'overview'
    const p = new URLSearchParams(window.location.search)
    return p.get('tab') === 'timeline' ? 'timeline' : 'overview'
  })

  const patterns: PatternItem[] = useMemo(
    () => [
      {
        id: 'helen',
        name: 'Helen',
        avatarSrc: '/photo-helen.png',
        insight: 'Interrupted others 4 times',
        suggestion: 'Try giving each person space to finish.',
      },
      {
        id: 'theo',
        name: 'Theo',
        avatarSrc: '/photo-theo.png',
        insight: 'Spoke only 12% of conversation',
        suggestion: 'May feel unheard — worth checking in.',
      },
      {
        id: 'sophie',
        name: 'Sophie',
        avatarSrc: '/photo-sophie.png',
        badge: 'DOING WELL',
        insight: 'Most balanced contributor',
        suggestion: 'Great emotional engagement',
      },
      {
        id: 'ernst',
        name: 'Ernst',
        avatarSrc: '/photo-ernst.png',
        insight: 'Tone shifted to tense at 8:15 PM',
        suggestion: 'Coincided with school schedule topic.',
      },
    ],
    []
  )

  const moments = useMemo(
    () => [
      {
        id: 'dinner',
        time: '19:15',
        person: 'helen',
        emotion: 'angry',
        desc: "Helen's tone shifted — possible tension",
        hint: 'Pause and reflect before responding; invite a calmer turn-taking moment.',
      },
      {
        id: 'balance',
        time: '20:05',
        person: 'sophie',
        emotion: 'happy',
        desc: 'Sophie helped rebalance the conversation',
        hint: 'Reinforce supportive behavior; acknowledge her effort to include others.',
      },
      {
        id: 'quiet',
        time: '20:22',
        person: 'theo',
        emotion: 'sad',
        desc: 'Theo became quieter after a topic change',
        hint: 'Check in gently and ask an open question to bring him back in.',
      },
    ] as const,
    []
  )

  return (
    <div className="mx-auto flex h-[812px] w-full max-w-[375px] flex-col overflow-hidden bg-[#111111] font-sans text-white">
      <header className="px-5 pt-14">
        <div className="flex items-center gap-3">
          <a href="/conversation-history" className="-ml-2 rounded-full p-2 text-white/90">
            <BackIcon />
          </a>
          <div className="text-[22px] font-bold tracking-tight text-white">Conversation Analysis</div>
        </div>

        <div className="mt-5 rounded-full bg-[#222] p-1">
          <div className="grid grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setTab('overview')
                if (typeof window !== 'undefined') {
                  const url = new URL(window.location.href)
                  url.searchParams.delete('tab')
                  window.history.replaceState({}, '', url.toString())
                }
              }}
              className={[
                'h-10 rounded-full text-[14px] font-semibold transition-colors',
                tab === 'overview' ? 'bg-[#C9A84C] text-[#1A1A1A]' : 'text-white/35',
              ].join(' ')}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('timeline')
                if (typeof window !== 'undefined') {
                  const url = new URL(window.location.href)
                  url.searchParams.set('tab', 'timeline')
                  window.history.replaceState({}, '', url.toString())
                }
              }}
              className={[
                'h-10 rounded-full text-[14px] font-semibold transition-colors',
                tab === 'timeline' ? 'bg-[#C9A84C] text-[#1A1A1A]' : 'text-white/35',
              ].join(' ')}
            >
              Timeline
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pb-10 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tab === 'overview' ? (
          <>
            <section className="px-0 py-0">
              <img
                src="/conversation-analysis-radar.png"
                alt=""
                className="mx-auto block w-full max-w-[335px] rounded-[20px] object-contain"
                draggable={false}
              />
            </section>

            <div className="mt-6 text-[10px] font-semibold tracking-[0.22em] text-white/55">KEY PATTERNS</div>

            <section className="mt-3 space-y-3">
              {patterns.map((p) => (
                <PatternCard key={p.id} item={p} />
              ))}
            </section>
          </>
        ) : (
          <>
            <section className="flex items-center justify-between rounded-[16px] bg-[#111111] px-1 py-1">
              <button type="button" className="rounded-full p-2 text-white/75 hover:text-white">
                <ChevronIcon dir="left" />
              </button>
              <div className="text-[16px] font-bold text-white">Today, Nov 12</div>
              <button type="button" className="rounded-full p-2 text-white/75 hover:text-white">
                <ChevronIcon dir="right" />
              </button>
            </section>

            <div className="mt-3">
              <EmotionTimelineCard />
            </div>

            <KeyMomentsList moments={moments as any} />
          </>
        )}
      </main>
    </div>
  )
}
