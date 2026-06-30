'use client'
import React from 'react'
import {
  StatusBar, NavBar, DebitCard, TxnItem, LimitBar,
  SectionLabel, InfoBox
} from './ui'
import type { ScreenProps, Screen } from './UserScreens'

const VIOLET = '#7C3AED'

// Adult-app bottom nav (violet accent to distinguish from child's emerald)
const AdultBottomNav = ({ active }: { active: 'home' | 'household' | 'spends' | 'me' }) => (
  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around pt-2 pb-5">
    {[
      { id: 'home', emoji: '🏠', label: 'Home' },
      { id: 'household', emoji: '🏡', label: 'Household' },
      { id: 'spends', emoji: '📊', label: 'Spends' },
      { id: 'me', emoji: '👤', label: 'Me' },
    ].map(item => (
      <div key={item.id} className="flex flex-col items-center gap-0.5"
        style={{ color: active === item.id ? VIOLET : '#94A3B8' }}>
        <span className="text-[22px]">{item.emoji}</span>
        <span className="text-[9px] font-semibold">{item.label}</span>
      </div>
    ))}
  </div>
)

// ─── Screen A1: Adult Invite ─────────────────────────────────────────────────
const A1_Invite: React.FC<ScreenProps> = ({ onNext }) => (
  <div className="flex flex-col h-full"
    style={{ background: 'linear-gradient(160deg, #1E1B3A 0%, #2E1065 55%, #4C1D95 100%)' }}>
    <StatusBar light />

    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-6">💞</div>
      <h1 className="text-2xl font-black text-white mb-3 leading-tight">
        Akash Sharma added you<br />as a cardholder
      </h1>
      <div className="text-4xl font-black mb-1" style={{ color: '#A78BFA', letterSpacing: '-1px' }}>
        Optimus
      </div>
      <p className="text-violet-300 text-sm mb-8 leading-relaxed">
        Get your own card on Akash's Optimus<br />account - set up in 2 minutes.
      </p>

      <div className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 mb-6 text-left">
        <div className="text-[10px] text-violet-300 font-bold uppercase tracking-wider mb-3">What you get</div>
        {[
          { icon: '💳', text: 'Your own supplementary card' },
          { icon: '🔄', text: 'Instant UPI · rahul@optimus' },
          { icon: '🪪', text: 'Quick identity check (KYC)' },
          { icon: '👁️', text: 'Shared household spend visibility' },
        ].map(f => (
          <div key={f.text} className="flex items-center gap-3 mb-2.5 last:mb-0">
            <span className="text-lg">{f.icon}</span>
            <span className="text-white/80 text-sm">{f.text}</span>
          </div>
        ))}
      </div>

      <button onClick={onNext}
        className="w-full py-3.5 rounded-2xl font-bold text-[14px] text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)' }}>
        Accept &amp; Set Up My Card
      </button>
      <p className="text-violet-400 text-[11px] mt-3">Invite from +91 98765 43210 · Expires in 48 hrs</p>
    </div>
  </div>
)

// ─── Screen A2: Adult Welcome ────────────────────────────────────────────────
const A2_Welcome: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full"
    style={{ background: 'linear-gradient(160deg, #1E1B3A 0%, #2E1065 100%)' }}>
    <StatusBar light />
    <NavBar title="" onBack={onBack} light />

    <div className="flex-1 flex flex-col px-6 py-4">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 text-5xl"
          style={{ background: 'rgba(255,255,255,0.1)' }}>
          🧑‍🤝‍🧑
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Welcome,<br />Rahul!</h1>
        <p className="text-violet-300 text-sm leading-relaxed mb-8">
          You get your own <strong className="text-white">supplementary card</strong> on Akash's Optimus account. He funds it, sets your limits, and can manage it anytime.
        </p>

        <div className="w-full space-y-3 mb-8">
          {[
            { icon: '💳', title: 'Your supplementary card', sub: 'Spends from Akash’s Optimus account' },
            { icon: '🪪', title: 'Quick identity check', sub: 'Verify yourself once to activate' },
            { icon: '👁️', title: 'Shared household visibility', sub: 'Track rent, groceries & bills together' },
          ].map(f => (
            <div key={f.title}
              className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl p-4 text-left">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <div className="text-white font-bold text-sm">{f.title}</div>
                <div className="text-violet-300 text-[11px]">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onNext}
        className="w-full py-3.5 rounded-2xl font-bold text-[14px] text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)' }}>
        Verify My Identity →
      </button>
    </div>
  </div>
)

// ─── Screen A3: Identity check + PIN (supplementary cardholder) ───────────────
const A3_KYC: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Verify Your Identity" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <p className="text-xs text-slate-500 mt-1 mb-5">
        A quick identity check (KYC) activates your <strong>supplementary card</strong> on Akash's account.
      </p>

      {/* KYC steps */}
      <div className="bg-white rounded-2xl px-4 py-1 shadow-sm mb-4">
        <SectionLabel className="mt-3">Identity Verification</SectionLabel>
        {[
          { label: 'Aadhaar', value: 'XXXX XXXX 7421', done: true },
          { label: 'PAN', value: 'ABCPS••••K', done: true },
          { label: 'Video KYC (Live)', value: 'In progress…', done: false },
        ].map(r => (
          <div key={r.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
            <div>
              <div className="text-sm font-semibold text-slate-900">{r.label}</div>
              <div className="text-[10px] text-slate-400">{r.value}</div>
            </div>
            {r.done
              ? <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">✓ Verified</span>
              : <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: VIOLET, background: '#F3E8FF' }}>⏳ Live</span>}
          </div>
        ))}
      </div>

      {/* PIN entry */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="text-[12px] font-bold text-slate-700 mb-1">Set your 4-digit card PIN</div>
        <div className="text-[10px] text-slate-400 mb-4">Used to unlock and authorise your card.</div>
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i}
              className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl"
              style={{ borderColor: i <= 3 ? VIOLET : '#E2E8F0', background: i <= 3 ? '#F3E8FF' : 'white' }}>
              {i <= 3 && <span style={{ color: VIOLET, fontSize: 24 }}>●</span>}
            </div>
          ))}
        </div>
      </div>

      <InfoBox color="blue">
        🪪 <strong>How it works.</strong> This is a supplementary card on Akash's Optimus account. Akash funds it, sets your spending limits, and can freeze it anytime. Your identity verification stays your own.
      </InfoBox>

      <div className="mt-5">
        <button onClick={onNext}
          className="w-full py-3.5 rounded-2xl font-bold text-[14px] text-white shadow-lg"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)' }}>
          Confirm &amp; Activate Card →
        </button>
      </div>
    </div>
  </div>
)

// ─── Screen A4: Card Activated ───────────────────────────────────────────────
const A4_Activated: React.FC<ScreenProps> = ({ onNext }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="text-center py-6">
        <div className="text-6xl mb-3">🎉</div>
        <h2 className="text-2xl font-black text-slate-900 mb-1">Card Activated!</h2>
        <p className="text-sm text-slate-500">Your supplementary card is live and ready.</p>
      </div>

      <div className="mb-5">
        <DebitCard name="RAHUL SHARMA" balance="₹50,000" balanceLabel="Monthly limit · spends from Akash’s account" last4="5530" label="Supplementary" />
      </div>

      {/* UPI chip */}
      <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: '#F3E8FF' }}>🔄</div>
        <div>
          <div className="text-xs text-slate-400 font-semibold mb-0.5">Your UPI ID is live</div>
          <div className="text-base font-black text-slate-900">rahul@optimus</div>
        </div>
        <button className="ml-auto text-[11px] font-bold px-3 py-1.5 rounded-xl"
          style={{ color: VIOLET, background: '#F3E8FF' }}>Copy</button>
      </div>

      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm mb-4">
        {[
          { l: 'Per transaction', v: '₹25,000' },
          { l: 'Daily limit', v: '₹25,000' },
          { l: 'Monthly limit', v: '₹50,000' },
          { l: 'Approval needed above', v: '₹10,000' },
          { l: 'Funded by', v: 'Akash Sharma' },
        ].map(r => (
          <div key={r.l} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
            <span className="text-slate-400">{r.l}</span>
            <span className="font-bold text-slate-900">{r.v}</span>
          </div>
        ))}
      </div>

      <InfoBox color="blue">
        ℹ️ Your card spends from Akash's Optimus account within these limits. Akash can adjust limits, set category controls, or freeze the card anytime from his app.
      </InfoBox>

      <div className="space-y-2.5 mt-5">
        <button onClick={onNext}
          className="w-full py-3.5 rounded-2xl font-bold text-[14px] text-white shadow-lg"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)' }}>
          Go to My Home →
        </button>
        <button className="w-full py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 flex items-center justify-center gap-2">
          <span>🏦</span> Add to Google Pay
        </button>
      </div>
    </div>
  </div>
)

// ─── Screen A5: Adult Home ───────────────────────────────────────────────────
const A5_Home: React.FC<ScreenProps> = ({ goTo }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />

    <div className="flex-1 overflow-y-auto px-4 pb-28">
      <div className="flex justify-between items-center mt-1 mb-4">
        <div>
          <p className="text-xs text-slate-400 font-medium">Welcome back,</p>
          <h2 className="text-xl font-black text-slate-900">Rahul 👋</h2>
        </div>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl">🔔</button>
      </div>

      <div className="mb-4">
        <DebitCard name="RAHUL SHARMA" balance="₹37,600" balanceLabel="left this month of ₹50,000" last4="5530" label="Supplementary">
          <div className="mt-3 mb-2">
            <LimitBar pct={25} color="#A78BFA" />
            <div className="flex justify-between text-[9px] opacity-60 mt-1">
              <span>₹12,400 spent</span>
              <span>spends from Akash’s account</span>
            </div>
          </div>
        </DebitCard>
      </div>

      {/* Two info chips */}
      <div className="flex gap-2.5 mb-5">
        <button className="flex-1 bg-white rounded-2xl p-3 flex items-center gap-2 shadow-sm border border-slate-100">
          <span className="text-xl">🔄</span>
          <div className="text-left">
            <div className="text-[9px] text-slate-400 font-semibold">UPI ID</div>
            <div className="text-[11px] font-black text-slate-900">rahul@optimus</div>
          </div>
        </button>
        <button onClick={() => goTo('adult-household')}
          className="flex-1 rounded-2xl p-3 flex items-center gap-2 shadow-sm text-white"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)' }}>
          <span className="text-xl">🏡</span>
          <div className="text-left">
            <div className="text-[9px] opacity-75 font-semibold">Household</div>
            <div className="text-[11px] font-black">₹34.2k / ₹60k</div>
          </div>
        </button>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        {[
          { icon: '💸', label: 'Pay' },
          { icon: '🙋', label: 'Request', go: 'adult-request' },
          { icon: '📊', label: 'Spends', go: 'adult-household' },
          { icon: '🏡', label: 'Household', go: 'adult-household' },
        ].map(a => (
          <button key={a.label} onClick={() => a.go && goTo(a.go)}
            className="bg-white rounded-2xl p-3 text-center shadow-sm border border-slate-100">
            <div className="text-2xl mb-1">{a.icon}</div>
            <div className="text-[10px] font-semibold text-slate-500">{a.label}</div>
          </button>
        ))}
      </div>

      <SectionLabel>Recent Transactions</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm">
        <TxnItem icon="🛒" name="BigBasket" sub="Today · Groceries · Shared" amount="−₹2,400" />
        <TxnItem icon="⛽" name="HP Petrol" sub="Today · Fuel" amount="−₹1,800" />
        <TxnItem icon="🍽️" name="Barbeque Nation" sub="Yesterday · Dining" amount="−₹3,200" />
        <TxnItem icon="💡" name="BESCOM Electricity" sub="28 Jun · Utilities · Shared" amount="−₹2,100" />
      </div>
    </div>

    <AdultBottomNav active="home" />
  </div>
)

// ─── Screen A6: Shared Household (household spend visibility) ──────────────────
const A6_Household: React.FC<ScreenProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Household" onBack={onBack}
      right={<span className="text-xs text-slate-400">June 2026</span>} />

    <div className="flex-1 overflow-y-auto px-4 pb-28">
      {/* Budget summary */}
      <div className="rounded-2xl p-4 mb-5 text-white"
        style={{ background: 'linear-gradient(135deg, #4C1D95, #7C3AED)', boxShadow: '0 8px 24px rgba(124,58,237,0.3)' }}>
        <div className="text-[10px] opacity-75 font-semibold uppercase tracking-wider mb-1">Household Spending</div>
        <div className="text-3xl font-black mb-2">₹34,200 <span className="text-sm opacity-60 font-bold">/ ₹60,000</span></div>
        <div className="h-1.5 bg-white/20 rounded-full mb-1">
          <div className="h-full bg-white rounded-full" style={{ width: '57%' }} />
        </div>
        <div className="flex justify-between text-[10px] opacity-75">
          <span>57% used</span>
          <span>₹25,800 left this month</span>
        </div>
      </div>

      {/* Spend by member */}
      <SectionLabel>Spending by Member</SectionLabel>
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
        {[
          { initials: 'P', name: 'Akash Sharma', tag: 'Account holder', amount: '₹21,800', pct: 64, color: 'linear-gradient(135deg, #1B2A6B, #4361EE)' },
          { initials: 'R', name: 'Rahul Sharma (You)', tag: 'Spouse · supplementary card', amount: '₹12,400', pct: 36, color: 'linear-gradient(135deg, #7C3AED, #4C1D95)' },
        ].map(c => (
          <div key={c.name} className="flex items-center gap-3 mb-4 last:mb-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
              style={{ background: c.color }}>{c.initials}</div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-bold text-slate-900">{c.name}</span>
                <span className="text-sm font-black text-slate-900">{c.amount}</span>
              </div>
              <LimitBar pct={c.pct} color={VIOLET} />
              <div className="text-[10px] text-slate-400 mt-1">{c.tag} · {c.pct}% of household spend</div>
            </div>
          </div>
        ))}
      </div>

      {/* Shared categories */}
      <SectionLabel>Shared Expenses</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm">
        <TxnItem icon="🏠" name="Rent" sub="Akash’s card · 1 Jun" amount="−₹18,000" />
        <TxnItem icon="🛒" name="Groceries" sub="You + Akash · this month" amount="−₹8,400" />
        <TxnItem icon="💡" name="Utilities" sub="Electricity, water, gas" amount="−₹3,800" />
        <TxnItem icon="🍽️" name="Dining out" sub="Family meals" amount="−₹4,000" />
      </div>
    </div>

    <AdultBottomNav active="household" />
  </div>
)

// ─── Screen A7: Requests & Approvals (User funds / approves) ──────────────────
const A7_Request: React.FC<ScreenProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Requests & Approvals" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <p className="text-xs text-slate-500 mt-1 mb-4">
        Need more room to spend? Ask Akash to raise your limit or approve a large purchase.
      </p>

      {/* Limit increase request */}
      <div className="rounded-2xl p-4 mb-4 text-white"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)' }}>
        <div className="text-[11px] opacity-80 font-semibold mb-1">Request a monthly limit increase</div>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-3xl font-black">₹50,000</span>
          <span className="text-lg font-black opacity-70 mb-0.5">→ ₹65,000</span>
        </div>
        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">P</div>
          <span className="text-sm font-semibold">Sent to Akash for approval</span>
          <span className="ml-auto text-[10px] bg-amber-300 text-amber-900 px-2 py-0.5 rounded-full font-bold">⏳ Pending</span>
        </div>
      </div>

      {/* Transaction needing approval (approval-above-threshold rule) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 border border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">⏳</span>
          <span className="text-sm font-bold text-slate-900">Purchase awaiting Akash’s approval</span>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-slate-100">
          <span className="text-sm text-slate-600">Croma · Electronics</span>
          <span className="text-sm font-bold text-slate-900">₹18,000</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-1">
          Above your ₹10,000 approval limit - Akash gets a notification to approve or decline.
        </div>
      </div>

      <SectionLabel>Recent Requests</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm">
        <TxnItem icon="📈" name="Limit increase → ₹65,000" sub="Today · Pending Akash" amount="₹15,000" faded />
        <TxnItem icon="✅" name="Croma purchase approved" sub="by Akash · just now" amount="₹18,000" green />
        <TxnItem icon="✅" name="One-off top-up to limit" sub="26 Jun · by Akash" amount="₹10,000" green />
      </div>

      <InfoBox color="blue">
        💡 Akash funds and manages this card. He can raise your limits or approve large purchases instantly from his app.
      </InfoBox>
    </div>
  </div>
)

// ─── Screen A8: Profile (supplementary card + elder-care) ─────────────────────
const A8_Profile: React.FC<ScreenProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Me" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-28">
      {/* Profile header */}
      <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)' }}>R</div>
        <div>
          <div className="text-base font-black text-slate-900">Rahul Sharma</div>
          <div className="text-[11px] text-slate-400">Spouse · Supplementary card on Akash’s account</div>
          <div className="text-[11px] font-bold text-emerald-600 mt-0.5">✓ Identity verified</div>
        </div>
      </div>

      {/* Elder-care upsell - nods to the "parent" persona */}
      <div className="rounded-2xl p-4 mb-4 border"
        style={{ background: '#FFF7ED', borderColor: '#FED7AA' }}>
        <div className="flex items-start gap-3">
          <span className="text-3xl flex-shrink-0">👴</span>
          <div>
            <div className="text-sm font-black text-slate-900 mb-0.5">Caring for an elderly parent?</div>
            <div className="text-[11px] text-slate-500 leading-relaxed mb-2.5">
              Add them as a <strong>Parent / Elder</strong> member - large-text card, scam-alert protection, and you monitor their spends to keep them safe from fraud.
            </div>
            <button className="text-[12px] font-bold px-3 py-1.5 rounded-xl text-white"
              style={{ background: '#EA580C' }}>Set up Elder Care →</button>
          </div>
        </div>
      </div>

      {/* Optional physical card (doc: optional physical card) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📮</span>
          <div className="flex-1">
            <div className="text-sm font-bold text-slate-900">Order a physical card</div>
            <div className="text-[11px] text-slate-400">Optional · linked to the same supplementary card</div>
          </div>
          <span className="text-slate-300 text-xl">›</span>
        </div>
      </div>

      <SectionLabel>Settings</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm">
        {[
          { icon: '🏦', label: 'Funded by', sub: 'Akash’s Optimus account', val: 'Linked' },
          { icon: '⚙️', label: 'Card limits', sub: 'Set & managed by Akash', val: 'View' },
          { icon: '👁️', label: 'Monitoring', sub: 'Akash monitors this card', val: 'On' },
          { icon: '🪪', label: 'Identity & documents', sub: 'Aadhaar, PAN verified', val: '✓' },
        ].map(r => (
          <div key={r.label} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
            <span className="text-lg w-6">{r.icon}</span>
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">{r.label}</div>
              <div className="text-[10px] text-slate-400">{r.sub}</div>
            </div>
            <span className="text-[12px] font-bold text-slate-400">{r.val}</span>
          </div>
        ))}
      </div>
    </div>

    <AdultBottomNav active="me" />
  </div>
)

// ─── Export ───────────────────────────────────────────────────────────────────
export const adultScreens: Screen[] = [
  { id: 'adult-invite',    label: 'Cardholder Invite',      component: A1_Invite },
  { id: 'adult-welcome',   label: 'Welcome Screen',         component: A2_Welcome },
  { id: 'adult-kyc',       label: 'Identity + PIN',         component: A3_KYC },
  { id: 'adult-activated', label: 'Card Activated 🎉',      component: A4_Activated },
  { id: 'adult-home',      label: 'Member Home',            component: A5_Home },
  { id: 'adult-household', label: 'Shared Household',       component: A6_Household },
  { id: 'adult-request',   label: 'Requests & Approvals',   component: A7_Request },
  { id: 'adult-profile',   label: 'Profile & Elder Care',   component: A8_Profile },
]
