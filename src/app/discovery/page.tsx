'use client'
import { useState } from 'react'
import Link from 'next/link'
import PhoneFrame from '@/components/PhoneFrame'
import { discoveryScreens } from '@/components/DiscoveryScreens'
import type { ScreenProps } from '@/components/UserScreens'

export default function DiscoveryPage() {
  const [idx, setIdx] = useState(0)
  const [showGrid, setShowGrid] = useState(false)

  const screens = discoveryScreens
  const CurrentScreen = screens[idx].component

  const next = () => { if (idx < screens.length - 1) setIdx(i => i + 1) }
  const back = () => { if (idx > 0) setIdx(i => i - 1) }
  const goTo = (id: string) => {
    const i = screens.findIndex(s => s.id === id)
    if (i >= 0) { setIdx(i); setShowGrid(false) }
  }
  const props: ScreenProps = { onNext: next, onBack: back, goTo }

  return (
    <div className="min-h-screen lg:h-[100dvh] lg:overflow-hidden bg-gradient-to-br from-slate-900 via-[#0f1729] to-slate-900 flex flex-col items-center">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="w-full flex flex-wrap items-center gap-x-6 gap-y-3 px-5 pt-3 pb-2">
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-xl tracking-tight">Optimus</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white/70 border border-white/20">
              Discovery Hooks
            </span>
          </div>
          <p className="text-slate-400 text-[11px]">7 contextual moments that surface Family Hub</p>
        </div>

        <Link href="/"
          className="md:ml-auto text-[12px] font-bold text-slate-300 border border-white/15 px-3 py-1.5 rounded-xl hover:bg-white/5 hover:text-white transition-all">
          ← Back to prototype
        </Link>
      </div>

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-center gap-6 px-4 mt-1 pb-6 lg:pb-0 lg:flex-1 lg:min-h-0 w-full">

        {/* Left: hook list */}
        <div className="hidden lg:flex flex-col gap-1 w-52 pt-1 flex-shrink-0 self-center max-h-full overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Discovery Hooks</p>
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
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-semibold">{idx + 1} / {screens.length}</span>
            <span className="text-[13px] font-bold text-white">{screens[idx].label}</span>
          </div>

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
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white disabled:opacity-20 hover:bg-white/20 transition-all text-base font-bold">‹</button>
            <div className="flex gap-1.5">
              {screens.map((_, i) => (
                <button key={i} onClick={() => goTo(screens[i].id)}
                  className={`rounded-full transition-all ${i === idx ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/25 hover:bg-white/50'}`} />
              ))}
            </div>
            <button onClick={next} disabled={idx === screens.length - 1}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white disabled:opacity-20 hover:bg-white/20 transition-all text-base font-bold">›</button>
          </div>

          <button onClick={() => setShowGrid(v => !v)}
            className="lg:hidden text-[11px] font-semibold text-slate-400 border border-white/10 px-3 py-1.5 rounded-lg hover:text-white transition-colors">
            {showGrid ? '✕ Close' : '☰ All Hooks'}
          </button>
        </div>

        <div className="hidden lg:block w-52 flex-shrink-0" />
      </div>

      {/* Mobile grid */}
      {showGrid && (
        <div className="lg:hidden w-full max-w-sm px-4 pb-8">
          <div className="grid grid-cols-1 gap-2">
            {screens.map((s, i) => (
              <button key={s.id}
                onClick={() => goTo(s.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-all border ${
                  i === idx ? 'bg-white/15 text-white border-white/20' : 'text-slate-400 border-white/5 hover:bg-white/5'
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
