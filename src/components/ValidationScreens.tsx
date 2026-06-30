'use client'
import React from 'react'
import {
  StatusBar, NavBar, DebitCard, Btn, SectionLabel
} from './ui'
import type { ScreenProps, Screen } from './UserScreens'

const TEAL = '#0D9488'

// Lab note: explains the method + what is measured (the validation device)
const ExperimentNote: React.FC<{ method: string; measures: string }> = ({ method, measures }) => (
  <div className="rounded-2xl p-3 border mt-4" style={{ background: '#ECFEFF', borderColor: '#A5F3FC' }}>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-sm">🧪</span>
      <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#0E7490' }}>{method}</span>
    </div>
    <p className="text-[11px] leading-relaxed" style={{ color: '#155E75' }}>{measures}</p>
  </div>
)

const Chip: React.FC<{ emoji: string; label: string; on?: boolean }> = ({ emoji, label, on }) => (
  <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[12px] font-bold ${on ? 'text-white' : 'text-slate-600 bg-white border-slate-200'}`}
    style={on ? { background: TEAL, borderColor: TEAL } : undefined}>
    <span>{emoji}</span>{label}{on && <span className="ml-0.5">✓</span>}
  </div>
)

// ─── V1: Demand — fake-door test ─────────────────────────────────────────────
const V1_FakeDoor: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Family Hub" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="text-center py-4">
        <div className="text-6xl mb-3">🚧</div>
        <h2 className="text-2xl font-black text-slate-900 mb-1">Coming soon!</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Family Hub lets you give your family their own Optimus cards - with limits and controls you set.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
        <div className="text-sm font-black text-slate-900 mb-3">Who would you add?</div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Chip emoji="🧒" label="Child" on />
          <Chip emoji="💑" label="Spouse" />
          <Chip emoji="👴" label="Parent" on />
        </div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Their age (optional)</div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900">14</div>
      </div>

      <Btn onClick={onNext} variant="success">Notify me when it&apos;s ready</Btn>

      <ExperimentNote
        method="Fake-door test · Demand"
        measures="Tap-through as % of active users + which member types they pick. No backend - pure frontend. Directly tests the ~13% reach assumption and the member-type mix."
      />
    </div>
  </div>
)

// ─── V2: Reach — in-app survey + data signals ────────────────────────────────
const V2_Survey: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Quick question" onBack={onBack} step="1 of 2" />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 mt-1"
        style={{ background: '#CCFBF1', color: '#0F766E' }}>⏱️ 10-second survey</div>

      <h3 className="text-lg font-black text-slate-900 mb-4">Do you regularly send money to family members?</h3>

      <div className="space-y-2.5">
        {[
          { label: 'Yes - my children', on: true },
          { label: 'Yes - my parents / elders', on: false },
          { label: 'Yes - my spouse', on: false },
          { label: 'No, not really', on: false },
        ].map(o => (
          <div key={o.label}
            className={`flex items-center gap-3 rounded-2xl p-4 border text-sm font-bold ${o.on ? 'text-slate-900' : 'bg-white border-slate-200 text-slate-700'}`}
            style={o.on ? { background: '#F0FDFA', borderColor: TEAL } : undefined}>
            <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              style={{ borderColor: o.on ? TEAL : '#CBD5E1' }}>
              {o.on && <span className="w-2.5 h-2.5 rounded-full" style={{ background: TEAL }} />}
            </span>
            {o.label}
          </div>
        ))}
      </div>

      <div className="mt-5"><Btn onClick={onNext} variant="success">Next →</Btn></div>

      <ExperimentNote
        method="In-app survey + data · Reach"
        measures="Sampled survey, plus analysis of family-tagged transfers and support tickets mentioning a child's card. Refines the ~13% reach guesstimate with real signals."
      />
    </div>
  </div>
)

// ─── V3: Onboarding & usage — concierge pilot ────────────────────────────────
const V3_Pilot: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="text-center py-3">
        <div className="text-5xl mb-2">🤝</div>
        <h2 className="text-xl font-black text-slate-900 mb-1">You&apos;re in the Family Hub pilot</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          We&apos;re rolling out to the first 50 families. Our team will personally help you set up your first card.
        </p>
      </div>

      <div className="my-4">
        <DebitCard name="AARAV SHARMA" last4="••••" label="Pilot">
          <div className="text-xs opacity-60 mb-2">Manually issued · Concierge setup</div>
        </DebitCard>
      </div>

      <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
        {[
          { icon: '📞', label: 'A specialist calls to complete setup' },
          { icon: '💳', label: 'Virtual card issued for your child' },
          { icon: '🛟', label: 'Direct line for any friction' },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
            <span className="text-lg">{s.icon}</span>
            <span className="text-sm font-semibold text-slate-700">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-5"><Btn onClick={onNext} variant="success">Book my setup call</Btn></div>

      <ExperimentNote
        method="Concierge pilot · Onboarding & usage"
        measures="Manual onboarding for 20-50 families with an ops-run controls dashboard. Measures guardian-linked onboarding completion, first-transaction rate, and qualitative friction before automating."
      />
    </div>
  </div>
)

// ─── V4: Economics — beta cohort vs matched control ──────────────────────────
const V4_Economics: React.FC<ScreenProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Beta Results" onBack={onBack}
      right={<span className="text-[10px] text-slate-400">90 days</span>} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2 mt-1">Beta cohort vs matched control</div>

      {/* Hero metric - the #1 KPI */}
      <div className="rounded-2xl p-4 text-white mb-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F766E, #14B8A6)', boxShadow: '0 8px 24px rgba(13,148,136,0.3)' }}>
        <div className="absolute -right-5 -top-5 w-24 h-24 rounded-full bg-white/10" />
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-black uppercase tracking-wider opacity-80">Primary-user churn</span>
          <span className="text-[9px] bg-white/20 rounded-full px-2 py-0.5 font-bold">#1 KPI</span>
        </div>
        <div className="text-4xl font-black">-3.2 pp</div>
        <p className="text-[11px] opacity-80 mt-1">Family Hub users churn far less than matched non-users.</p>
      </div>

      {/* Supporting metrics */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {[
          { l: 'Incremental txns', v: '+18 / mo', s: 'per household' },
          { l: 'Interchange', v: '+₹240', s: 'per household / mo' },
          { l: 'Avg balance lift', v: '+₹12,400', s: 'float per household' },
          { l: 'Member activation', v: '71%', s: 'reached first spend' },
        ].map(m => (
          <div key={m.l} className="bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-[10px] text-slate-400 font-semibold">{m.l}</div>
            <div className="text-lg font-black text-slate-900">{m.v}</div>
            <div className="text-[9px] text-slate-400">{m.s}</div>
          </div>
        ))}
      </div>

      {/* Churn comparison bars */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <SectionLabel className="mt-0">Monthly churn</SectionLabel>
        {[
          { label: 'Control', pct: 81, val: '8.1%', color: '#EF4444' },
          { label: 'Family Hub beta', pct: 49, val: '4.9%', color: TEAL },
        ].map(b => (
          <div key={b.label} className="mb-3 last:mb-0">
            <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
              <span>{b.label}</span><span>{b.val}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }} />
            </div>
          </div>
        ))}
      </div>

      <ExperimentNote
        method="Instrumented beta vs control · Economics"
        measures="60-90 day cohort vs a matched control. The churn delta on the primary user is decisive - it is the #1 KPI and the whole retention thesis behind Family Hub."
      />
    </div>
  </div>
)

// ─── V5: Discovery — hook A/B test results ───────────────────────────────────
const V5_HookAB: React.FC<ScreenProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Hook A/B Test" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2 mt-1">Add-member conversion by hook</div>

      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        {[
          { label: 'After a family transfer', pct: 4.8, w: 100, win: true },
          { label: 'Post salary credit', pct: 3.1, w: 65 },
          { label: 'Spend-category insight', pct: 2.6, w: 54 },
          { label: 'Onboarding checklist', pct: 2.4, w: 50 },
          { label: 'Card screenshot', pct: 1.9, w: 40 },
        ].map(h => (
          <div key={h.label} className="mb-3 last:mb-0">
            <div className="flex justify-between items-center text-[11px] font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                {h.label}
                {h.win && <span className="text-[8px] text-white px-1.5 py-0.5 rounded-full font-black" style={{ background: TEAL }}>WINNER</span>}
              </span>
              <span>{h.pct}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${h.w}%`, background: h.win ? TEAL : '#94A3B8' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-3 border" style={{ background: '#F0FDFA', borderColor: '#99F6E4' }}>
        <p className="text-[12px] leading-relaxed" style={{ color: '#0F766E' }}>
          🏆 <strong>Winner: the post-transfer prompt.</strong> It fires at the highest-intent moment, so discovery investment concentrates here.
        </p>
      </div>

      <a href="/discovery"
        className="mt-3 block text-center text-[12px] font-black py-3 rounded-2xl border"
        style={{ color: TEAL, borderColor: '#99F6E4', background: 'white' }}>
        See all 7 discovery hooks →
      </a>

      <ExperimentNote
        method="A/B test · Discovery"
        measures="Test the contextual hooks head-to-head; pick the winner to focus discovery investment. The hook with the highest qualified add-member rate wins."
      />
    </div>
  </div>
)

// ─── Export ───────────────────────────────────────────────────────────────────
export const validationScreens: Screen[] = [
  { id: 'v-demand',      label: 'Demand · Fake-door test',    component: V1_FakeDoor },
  { id: 'v-reach',       label: 'Reach · In-app survey',      component: V2_Survey },
  { id: 'v-onboarding',  label: 'Onboarding · Concierge pilot', component: V3_Pilot },
  { id: 'v-economics',   label: 'Economics · Beta vs control', component: V4_Economics },
  { id: 'v-discovery',   label: 'Discovery · Hook A/B test',  component: V5_HookAB },
]
