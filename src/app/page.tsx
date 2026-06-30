'use client'
import { useState } from 'react'
import PhoneFrame from '@/components/PhoneFrame'
import { userScreens } from '@/components/UserScreens'
import { memberScreens } from '@/components/MemberScreens'
import type { ScreenProps } from '@/components/UserScreens'

type AppType = 'user' | 'member'

export default function Page() {
  const [app, setApp] = useState<AppType>('user')
  const [idx, setIdx] = useState(0)
  const [showGrid, setShowGrid] = useState(false)

  const screens = app === 'user' ? userScreens : memberScreens
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0f1729] to-slate-900 flex flex-col items-center">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="w-full max-w-4xl flex items-center justify-between px-6 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-white font-black text-xl tracking-tight">Optimus</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white/70 border border-white/20">
              Family Hub
            </span>
          </div>
          <p className="text-slate-400 text-[11px]">Interactive Prototype · Senior PM Case Study</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">By</p>
          <p className="text-white text-sm font-bold">Piyush Dinde</p>
        </div>
      </div>

      {/* ── App Switcher ────────────────────────────────────────────────── */}
      <div className="flex gap-2 mt-3 mb-4 bg-white/5 border border-white/10 rounded-2xl p-1">
        <button
          onClick={() => switchApp('user')}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
            app === 'user'
              ? 'bg-white text-slate-900 shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}>
          👨‍👩‍👧 Parent App
        </button>
        <button
          onClick={() => switchApp('member')}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
            app === 'member'
              ? 'bg-white text-slate-900 shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}>
          👦 Teen App (Aarav)
        </button>
      </div>

      {/* ── Main layout: screen label + phone + screen list ─────────────── */}
      <div className="flex items-start gap-6 pb-8 px-4">

        {/* Left: nav column */}
        <div className="hidden lg:flex flex-col gap-1.5 w-48 pt-6 flex-shrink-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
            {app === 'user' ? 'Parent Journey' : 'Teen Journey'}
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
        <div className="flex flex-col items-center gap-4">
          {/* Screen label */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-semibold">
              {idx + 1} / {screens.length}
            </span>
            <span className="text-[13px] font-bold text-white">{screens[idx].label}</span>
          </div>

          <PhoneFrame>
            <CurrentScreen {...props} />
          </PhoneFrame>

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
            {app === 'user' ? 'Parent Journey' : 'Teen Journey'}
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

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div className="pb-6 text-center">
        <p className="text-slate-600 text-[11px]">
          Optimus · Zeta Senior PM Assignment · 18 interactive screens · Built with Next.js
        </p>
      </div>
    </div>
  )
}
