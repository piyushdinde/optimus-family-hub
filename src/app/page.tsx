'use client'
import { useState } from 'react'
import PhoneFrame from '@/components/PhoneFrame'
import { userScreens } from '@/components/UserScreens'
import { memberScreens } from '@/components/MemberScreens'
import { adultScreens } from '@/components/AdultScreens'
import type { ScreenProps, Screen } from '@/components/UserScreens'

type AppType = 'user' | 'child' | 'adult'

const APPS: { id: AppType; icon: string; label: string; sub: string; journey: string; screens: Screen[] }[] = [
  { id: 'user',  icon: '👨‍👩‍👧', label: 'Main User App',  sub: 'Account Holder App',          journey: 'Account Holder Journey', screens: userScreens },
  { id: 'child', icon: '🧒',     label: 'Children App',    sub: 'Child (Aarav)',               journey: 'Child Journey',          screens: memberScreens },
  { id: 'adult', icon: '🧑‍🤝‍🧑', label: 'Family Member',   sub: 'Spouse · Parent (Rahul)',     journey: 'Family Member Journey',  screens: adultScreens },
]

export default function Page() {
  const [app, setApp] = useState<AppType>('user')
  const [idx, setIdx] = useState(0)
  const [showGrid, setShowGrid] = useState(false)

  const current = APPS.find(a => a.id === app)!
  const screens = current.screens
  const CurrentScreen = screens[idx].component

  const switchApp = (a: AppType) => { setApp(a); setIdx(0); setShowGrid(false) }
  const next = () => { if (idx < screens.length - 1) setIdx(i => i + 1) }
  const back = () => { if (idx > 0) setIdx(i => i - 1) }
  const goTo = (id: string) => {
    const i = screens.findIndex(s => s.id === id)
    if (i >= 0) { setIdx(i); setShowGrid(false) }
  }

  const props: ScreenProps = { onNext: next, onBack: back, goTo }

  return (
    <div className="min-h-screen lg:h-[100dvh] lg:overflow-hidden bg-gradient-to-br from-slate-900 via-[#0f1729] to-slate-900 flex flex-col items-center">

      {/* ── Top bar: brand (far left) · app switcher (top-centre) ─────────── */}
      <div className="w-full flex flex-wrap items-center gap-x-6 gap-y-3 px-5 pt-3 pb-2">
        {/* Left: brand, pinned to the far-left edge */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-xl tracking-tight">Optimus</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white/70 border border-white/20">
              Family Hub
            </span>
          </div>
          <p className="text-slate-400 text-[11px]">Interactive Prototype</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
            <a href="/discovery" className="text-[11px] font-bold text-[#8aa0ff] hover:text-white transition-colors">
              7 discovery hooks →
            </a>
            <a href="/validation" className="text-[11px] font-bold text-[#5eead4] hover:text-white transition-colors">
              5 validation experiments →
            </a>
          </div>
        </div>

        {/* Centre: app switcher, pulled up into the top bar */}
        <div className="order-last w-full md:order-none md:w-auto md:mx-auto flex flex-wrap justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5">
          {APPS.map(a => (
            <button key={a.id}
              onClick={() => switchApp(a.id)}
              className={`px-4 py-1.5 rounded-xl text-left transition-all ${
                app === a.id ? 'bg-white shadow-lg' : 'hover:bg-white/5'
              }`}>
              <div className={`flex items-center gap-1.5 text-[13px] font-bold ${
                app === a.id ? 'text-slate-900' : 'text-slate-300'
              }`}>
                <span>{a.icon}</span>{a.label}
              </div>
              <div className={`text-[10px] font-medium ${
                app === a.id ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {a.sub}
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* ── Main layout: screen label + phone + screen list ─────────────── */}
      <div className="flex items-start justify-center gap-6 px-4 mt-1 pb-6 lg:pb-0 lg:flex-1 lg:min-h-0 w-full">

        {/* Left: nav column */}
        <div className="hidden lg:flex flex-col gap-1 w-48 pt-1 flex-shrink-0 self-center max-h-full overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
            {current.journey}
          </p>
          {screens.map((s, i) => (
            <button key={s.id}
              onClick={() => goTo(s.id)}
              className={`text-left px-3 py-2 rounded-xl text-[12px] font-semibold transition-all ${
                i === idx
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}>
              <span className="text-slate-500 text-[10px] mr-1.5">{i + 1}.</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Centre: phone */}
        <div className="flex flex-col items-center gap-3 lg:h-full lg:justify-center lg:gap-2">
          {/* Screen label */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-semibold">
              {idx + 1} / {screens.length}
            </span>
            <span className="text-[13px] font-bold text-white">{screens[idx].label}</span>
          </div>

          {/* Height-responsive scaler: shrinks the 740px frame so the whole
              phone fits in the first fold on short laptops (e.g. 13" MacBook Air).
              Negative bottom margin compensates the scaled-away layout box so the
              dot-nav flows right under the visual phone. */}
          <div className="origin-top transition-transform
            lg:[@media(max-height:900px)]:scale-[0.9]  lg:[@media(max-height:900px)]:-mb-[74px]
            lg:[@media(max-height:840px)]:scale-[0.82] lg:[@media(max-height:840px)]:-mb-[133px]
            lg:[@media(max-height:780px)]:scale-[0.74] lg:[@media(max-height:780px)]:-mb-[192px]
            lg:[@media(max-height:700px)]:scale-[0.66] lg:[@media(max-height:700px)]:-mb-[252px]">
            <PhoneFrame>
              <CurrentScreen {...props} />
            </PhoneFrame>
          </div>

          {/* Dot nav */}
          <div className="flex items-center gap-3">
            <button onClick={back} disabled={idx === 0}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white disabled:opacity-20 hover:bg-white/20 transition-all text-base font-bold">
              ‹
            </button>

            <div className="flex gap-1.5">
              {screens.map((_, i) => (
                <button key={i} onClick={() => goTo(screens[i].id)}
                  className={`rounded-full transition-all ${
                    i === idx ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                  }`} />
              ))}
            </div>

            <button onClick={next} disabled={idx === screens.length - 1}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white disabled:opacity-20 hover:bg-white/20 transition-all text-base font-bold">
              ›
            </button>
          </div>

          {/* Grid toggle (mobile) */}
          <button onClick={() => setShowGrid(v => !v)}
            className="lg:hidden text-[11px] font-semibold text-slate-400 border border-white/10 px-3 py-1.5 rounded-lg hover:text-white transition-colors">
            {showGrid ? '✕ Close' : '☰ All Screens'}
          </button>
        </div>

        {/* Right: empty spacer to balance left column on large screens */}
        <div className="hidden lg:block w-48 flex-shrink-0" />
      </div>

      {/* ── Mobile grid (toggled) ──────────────────────────────────────── */}
      {showGrid && (
        <div className="lg:hidden w-full max-w-sm px-4 pb-8">
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-3 text-center">
            {current.journey}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {screens.map((s, i) => (
              <button key={s.id}
                onClick={() => goTo(s.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-all border ${
                  i === idx
                    ? 'bg-white/15 text-white border-white/20'
                    : 'text-slate-400 border-white/5 hover:bg-white/5'
                }`}>
                <span className="text-slate-500 text-[10px] mr-1">{i + 1}.</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
