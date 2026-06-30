'use client'
import React from 'react'
import {
  StatusBar, NavBar, DebitCard, TxnItem, Btn, SectionLabel, InfoBox
} from './ui'
import type { ScreenProps, Screen } from './UserScreens'

const NAVY = '#1B2A6B'

// Shared: a dimmed context + bottom-sheet discovery prompt
const Sheet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <div className="absolute inset-0 bg-black/40 z-10" />
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl p-5 shadow-2xl">
      <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
      {children}
    </div>
  </>
)

// Shared: inline contextual banner (brand gradient)
const HookBanner: React.FC<{ emoji: string; title: string; body: string; cta: string; onClick?: () => void }> = ({ emoji, title, body, cta, onClick }) => (
  <button onClick={onClick}
    className="w-full text-left rounded-2xl p-4 relative overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #1B2A6B 0%, #4361EE 100%)', boxShadow: '0 8px 24px rgba(67,97,238,0.3)' }}>
    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5" />
    <div className="flex items-start gap-3">
      <span className="text-3xl flex-shrink-0">{emoji}</span>
      <div className="flex-1">
        <p className="text-white font-black text-[14px] mb-1">{title}</p>
        <p className="text-blue-200 text-[11px] leading-relaxed mb-2">{body}</p>
        <span className="inline-block text-[11px] bg-white font-black px-3 py-1.5 rounded-xl" style={{ color: NAVY }}>{cta}</span>
      </div>
    </div>
  </button>
)

// ─── D1: After a transfer to family (highest-intent moment) ──────────────────
const D1_PostTransfer: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Money Sent" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="text-center py-5">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">✅</div>
        <h2 className="text-2xl font-black text-slate-900">₹3,000 sent</h2>
        <p className="text-sm text-slate-500">to Aarav Sharma (Son)</p>
      </div>

      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
        {[
          { l: 'To', v: 'Aarav Sharma' },
          { l: 'UPI ID', v: 'aarav@okaxis' },
          { l: 'Note', v: '“Pocket money”' },
          { l: 'Date', v: 'Today, 9:12 AM' },
        ].map(r => (
          <div key={r.l} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
            <span className="text-slate-400">{r.l}</span>
            <span className="font-bold text-slate-900">{r.v}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center text-[11px] text-slate-400">
        You’ve sent ₹14,500 to Aarav over 6 transfers this month.
      </div>
    </div>

    {/* Discovery prompt */}
    <Sheet>
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">💡</span>
        <div>
          <h3 className="text-base font-black text-slate-900">Sending to Aarav often?</h3>
          <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
            That’s your 6th transfer this month. Give Aarav their own card with limits you control — no more one-off transfers.
          </p>
        </div>
      </div>
      <Btn onClick={onNext}>Set up Family Hub →</Btn>
      <button onClick={onNext} className="w-full text-center text-[13px] font-bold text-slate-400 mt-2 py-2">Not now</button>
    </Sheet>
  </div>
)

// ─── D2: Onboarding / home-screen setup checklist ────────────────────────────
const D2_Checklist: React.FC<ScreenProps> = ({ onNext }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <div className="mt-2 mb-4">
        <p className="text-xs text-slate-400 font-medium">Welcome to Optimus,</p>
        <h2 className="text-xl font-black text-slate-900">Akash 👋</h2>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-black text-slate-900">Finish setting up</span>
          <span className="text-[11px] font-bold text-[#4361EE]">2 of 4 done</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full mb-4">
          <div className="h-full rounded-full" style={{ width: '50%', background: '#4361EE' }} />
        </div>

        {[
          { icon: '✅', title: 'Verify your identity (KYC)', done: true },
          { icon: '✅', title: 'Add money to your account', done: true },
        ].map(s => (
          <div key={s.title} className="flex items-center gap-3 py-2.5 border-b border-slate-100">
            <span className="text-lg">{s.icon}</span>
            <span className="text-sm font-semibold text-slate-400 line-through">{s.title}</span>
          </div>
        ))}

        {/* Highlighted Family Hub step */}
        <div className="flex items-center gap-3 py-3 border-b border-slate-100 -mx-2 px-2 rounded-xl" style={{ background: '#EEF2FF' }}>
          <span className="text-lg">👨‍👩‍👧</span>
          <div className="flex-1">
            <div className="text-sm font-black text-slate-900">Set up your Family Hub</div>
            <div className="text-[10px] text-slate-500">Give your family their own cards</div>
          </div>
          <button onClick={onNext} className="text-[11px] font-black text-white px-3 py-1.5 rounded-xl" style={{ background: NAVY }}>Set up</button>
        </div>

        <div className="flex items-center gap-3 py-2.5">
          <span className="w-5 h-5 rounded-full border-2 border-slate-200 flex-shrink-0" />
          <span className="text-sm font-semibold text-slate-600">Activate UPI</span>
        </div>
      </div>

      <SectionLabel>Quick Actions</SectionLabel>
      <div className="grid grid-cols-4 gap-2.5">
        {[{ i: '💸', l: 'Send' }, { i: '⬇️', l: 'Receive' }, { i: '📊', l: 'Spends' }, { i: '💳', l: 'Cards' }].map(a => (
          <div key={a.l} className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <div className="text-2xl mb-1">{a.i}</div>
            <div className="text-[10px] font-semibold text-slate-500">{a.l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ─── D3: Incentive nudge — reward on member's first spend ─────────────────────
const D3_Incentive: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Family Hub" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      {/* Reward hero */}
      <div className="rounded-2xl p-5 text-white text-center mb-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1B2A6B, #4361EE)', boxShadow: '0 8px 24px rgba(67,97,238,0.3)' }}>
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/5" />
        <div className="text-5xl mb-2">🎁</div>
        <div className="text-[11px] uppercase tracking-wider opacity-75 font-bold mb-1">First-spend reward</div>
        <div className="text-3xl font-black mb-1">₹200 cashback</div>
        <p className="text-blue-200 text-xs leading-relaxed">When Aarav makes their first purchase, you’ll both get ₹200 — instantly.</p>
      </div>

      {/* Progress */}
      <SectionLabel>Almost there</SectionLabel>
      <div className="bg-white rounded-2xl px-4 py-2 shadow-sm mb-5">
        {[
          { icon: '✅', label: 'Invite sent to Aarav', done: true },
          { icon: '✅', label: 'Card activated', done: true },
          { icon: '⏳', label: 'First spend — reward unlocks', done: false },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
            <span className="text-lg">{s.icon}</span>
            <span className={`text-sm font-semibold ${s.done ? 'text-slate-400' : 'text-slate-900'}`}>{s.label}</span>
            {!s.done && <span className="ml-auto text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pending</span>}
          </div>
        ))}
      </div>

      <InfoBox color="emerald">
        🎉 The reward turns an activated card into a <strong>transacting</strong> card — the moment that actually drives retention.
      </InfoBox>

      <div className="mt-5">
        <Btn onClick={onNext}>Remind Aarav to make a purchase</Btn>
      </div>
    </div>
  </div>
)

// ─── D4: New payee added with a family keyword ───────────────────────────────
const D4_PayeeAdded: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Add Payee" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="text-center py-5">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">✅</div>
        <h2 className="text-xl font-black text-slate-900">Payee added</h2>
        <p className="text-sm text-slate-500">You can now pay them anytime</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm mb-5 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">👵</div>
        <div className="flex-1">
          <div className="text-sm font-black text-slate-900">Lakshmi Sharma</div>
          <div className="text-[11px] text-slate-400">lakshmi@okhdfc</div>
        </div>
        <span className="text-[10px] font-bold text-[#4361EE] bg-blue-50 px-2.5 py-1 rounded-full">Tagged: Mother</span>
      </div>

      {/* Contextual discovery banner — triggered by the "Mother" tag */}
      <HookBanner
        emoji="👵"
        title="Adding family to pay them often?"
        body="Give Mom her own Optimus card — set limits, track spends, and skip the repeat transfers."
        cta="Learn about Family Hub →"
        onClick={onNext}
      />

      <p className="text-center text-[10px] text-slate-400 mt-3">
        Shown because the payee was tagged with a family keyword (“mother”).
      </p>
    </div>
  </div>
)

// ─── D5: Post salary credit ──────────────────────────────────────────────────
const D5_Salary: React.FC<ScreenProps> = ({ onNext }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <div className="mt-2 mb-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400 font-medium">Good morning,</p>
          <h2 className="text-xl font-black text-slate-900">Akash 👋</h2>
        </div>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl">🔔</button>
      </div>

      {/* Salary credit highlight */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 border-l-4" style={{ borderColor: '#10B981' }}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-xl flex-shrink-0">🎉</div>
          <div className="flex-1">
            <div className="text-sm font-black text-slate-900">Salary credited · ₹1,85,000</div>
            <div className="text-[11px] text-slate-400">Today · 9:00 AM · from EMPLOYER PVT LTD</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between">
          <span className="text-[11px] text-slate-400">Available balance</span>
          <span className="text-sm font-black text-slate-900">₹2,33,250</span>
        </div>
      </div>

      {/* Family Hub nudge */}
      <div className="mb-5">
        <HookBanner
          emoji="💰"
          title="Planning this month’s budget?"
          body="Set aside family spending — give your kids and parents their own cards with monthly limits you control."
          cta="Set up Family Hub →"
          onClick={onNext}
        />
      </div>

      <SectionLabel>Recent Transactions</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm">
        <TxnItem icon="🏦" name="Salary Credit" sub="Today · Income" amount="+₹1,85,000" green />
        <TxnItem icon="🏠" name="HDFC Home Loan EMI" sub="Yesterday · EMI" amount="−₹42,000" />
        <TxnItem icon="🛒" name="BigBasket" sub="2 days ago · Groceries" amount="−₹3,400" />
      </div>
    </div>
  </div>
)

// ─── D6: Card-number screenshot / copy detected ──────────────────────────────
const D6_Screenshot: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Card Details" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="mb-4">
        <DebitCard name="AKASH SHARMA" last4="4821" label="Primary">
          <div className="text-[13px] font-mono tracking-[2px] opacity-90 mb-2 mt-1">4829 1042 7731 4821</div>
        </DebitCard>
      </div>

      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
        {[
          { l: 'Card number', v: '4829 1042 7731 4821', copy: true },
          { l: 'Valid thru', v: '08 / 29' },
          { l: 'CVV', v: '•••' },
        ].map(r => (
          <div key={r.l} className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0 text-sm">
            <span className="text-slate-400">{r.l}</span>
            <span className="font-bold text-slate-900 flex items-center gap-2">
              {r.v}
              {r.copy && <span className="text-[10px] font-black text-[#4361EE] bg-blue-50 px-2 py-0.5 rounded-md">COPY</span>}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Discovery prompt triggered by screenshot/copy */}
    <Sheet>
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">📸</span>
        <div>
          <h3 className="text-base font-black text-slate-900">Screenshot detected</h3>
          <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
            Sharing your card number with family? It’s safer to give them their own card with their own limits — your card stays private.
          </p>
        </div>
      </div>
      <Btn onClick={onNext}>Create a card for family →</Btn>
      <button onClick={onNext} className="w-full text-center text-[13px] font-bold text-slate-400 mt-2 py-2">I’ll be careful</button>
    </Sheet>
  </div>
)

// ─── D7: Spend-category identification ───────────────────────────────────────
const D7_Categories: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Spend Insights" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <div className="rounded-2xl p-4 mb-4 text-white"
        style={{ background: 'linear-gradient(135deg, #1B2A6B, #4361EE)', boxShadow: '0 8px 24px rgba(67,97,238,0.3)' }}>
        <div className="text-[10px] opacity-75 font-semibold uppercase tracking-wider mb-1">Family-related spending · June</div>
        <div className="text-3xl font-black">₹38,600</div>
        <div className="text-[11px] opacity-75 mt-1">Across groceries, food, kids & school</div>
      </div>

      <SectionLabel>Where it’s going</SectionLabel>
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
        {[
          { emoji: '🛒', label: 'Groceries', amount: '₹15,200', pct: 40, color: '#4361EE' },
          { emoji: '🍔', label: 'Food delivery', amount: '₹9,800', pct: 25, color: '#10B981' },
          { emoji: '🧸', label: 'Kids & toys', amount: '₹7,600', pct: 20, color: '#F59E0B' },
          { emoji: '✏️', label: 'Stationery & school', amount: '₹6,000', pct: 15, color: '#8B5CF6' },
        ].map(c => (
          <div key={c.label} className="flex items-center gap-3 mb-3 last:mb-0">
            <span className="text-lg w-6 flex-shrink-0">{c.emoji}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-semibold text-slate-700">{c.label}</span>
                <span className="text-xs font-black text-slate-900">{c.amount}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <HookBanner
        emoji="🛒"
        title="Lots of family spending lately"
        body="A Family Hub card for Aarav could handle groceries, food & school runs — on a budget you set."
        cta="Explore Family Hub →"
        onClick={onNext}
      />
    </div>
  </div>
)

// ─── Export ───────────────────────────────────────────────────────────────────
export const discoveryScreens: Screen[] = [
  { id: 'd-transfer',   label: 'After a family transfer',   component: D1_PostTransfer },
  { id: 'd-checklist',  label: 'Onboarding checklist',      component: D2_Checklist },
  { id: 'd-incentive',  label: 'First-spend reward',        component: D3_Incentive },
  { id: 'd-payee',      label: 'New family payee added',    component: D4_PayeeAdded },
  { id: 'd-salary',     label: 'Post salary credit',        component: D5_Salary },
  { id: 'd-screenshot', label: 'Card screenshot / copy',    component: D6_Screenshot },
  { id: 'd-categories', label: 'Spend-category insight',    component: D7_Categories },
]
