'use client'
import React from 'react'
import {
  StatusBar, NavBar, MemberBottomNav, DebitCard, TxnItem, LimitBar,
  Btn, SectionLabel, InfoBox
} from './ui'
import type { ScreenProps, Screen } from './UserScreens'

// ─── Screen M1: Claim Invite ─────────────────────────────────────────────────
const M1_ClaimInvite: React.FC<ScreenProps> = ({ onNext }) => (
  <div className="flex flex-col h-full"
    style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1B2A6B 60%, #1a3a5c 100%)' }}>
    <StatusBar light />

    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-6">💌</div>
      <h1 className="text-2xl font-black text-white mb-3 leading-tight">
        Akash Sharma has<br />invited you to join
      </h1>
      <div className="text-4xl font-black mb-1" style={{ color: '#4361EE', letterSpacing: '-1px' }}>
        Optimus
      </div>
      <p className="text-blue-300 text-sm mb-8 leading-relaxed">
        You've been added to the Family Hub.<br />Set up your card in under 2 minutes.
      </p>

      <div className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 mb-6 text-left">
        <div className="text-[10px] text-blue-300 font-bold uppercase tracking-wider mb-3">What you get</div>
        {[
          { icon: '💳', text: 'Your own debit card' },
          { icon: '🔄', text: 'Instant UPI payments · aarav@optimus' },
          { icon: '📊', text: 'Track your own spending' },
          { icon: '🛡️', text: 'Guardian-protected, RBI compliant' },
        ].map(f => (
          <div key={f.text} className="flex items-center gap-3 mb-2.5 last:mb-0">
            <span className="text-lg">{f.icon}</span>
            <span className="text-white/80 text-sm">{f.text}</span>
          </div>
        ))}
      </div>

      <Btn onClick={onNext} variant="success" className="mb-3">Accept Invite & Set Up Card</Btn>
      <p className="text-blue-400 text-[11px]">Invite from +91 98765 43210 · Expires in 48 hrs</p>
    </div>
  </div>
)

// ─── Screen M2: Member Welcome ────────────────────────────────────────────────
const M2_Welcome: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full"
    style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1B2A6B 100%)' }}>
    <StatusBar light />
    <NavBar title="" onBack={onBack} light />

    <div className="flex-1 flex flex-col px-6 py-4">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 text-5xl"
          style={{ background: 'rgba(255,255,255,0.1)' }}>
          💎
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Welcome,<br />Aarav!</h1>
        <p className="text-blue-300 text-sm leading-relaxed mb-8">
          Your personal Optimus card is ready to activate. It'll be linked to your dad's account for safety.
        </p>

        <div className="w-full space-y-3 mb-8">
          {[
            { icon: '💳', title: 'Virtual RuPay card', sub: 'Works everywhere UPI is accepted' },
            { icon: '📱', title: 'Add to Google Pay', sub: 'Tap & pay at any store' },
            { icon: '🔒', title: 'Spend controls', sub: 'Limits set by Akash to keep you safe' },
          ].map(f => (
            <div key={f.title}
              className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl p-4 text-left">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <div className="text-white font-bold text-sm">{f.title}</div>
                <div className="text-blue-300 text-[11px]">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Btn onClick={onNext} variant="success">Set Up My Card →</Btn>
    </div>
  </div>
)

// ─── Screen M3: Identity & PIN ────────────────────────────────────────────────
const M3_Pin: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Verify Identity" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <p className="text-xs text-slate-500 mt-1 mb-5">Your details were pre-filled by Akash (guardian). Please confirm and set your 4-digit PIN.</p>

      {/* Pre-filled details */}
      <div className="bg-white rounded-2xl px-4 py-1 shadow-sm mb-4">
        <SectionLabel className="mt-3">Your Details</SectionLabel>
        {[
          { label: 'Name', value: 'Aarav Sharma' },
          { label: 'Date of Birth', value: '15 March 2012 (Age 13)' },
          { label: 'Guardian', value: 'Akash Sharma' },
          { label: 'Mobile', value: '+91 98765 43210' },
        ].map(r => (
          <div key={r.label} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
            <span className="text-[11px] text-slate-400 font-semibold">{r.label}</span>
            <span className="text-[13px] font-bold text-slate-900">{r.value}</span>
          </div>
        ))}
      </div>

      {/* PIN entry */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="text-[12px] font-bold text-slate-700 mb-1">Create a 4-digit PIN</div>
        <div className="text-[10px] text-slate-400 mb-4">You'll use this to unlock your card in the app.</div>
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i}
              className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl"
              style={{ borderColor: i <= 2 ? '#4361EE' : '#E2E8F0', background: i <= 2 ? '#EEF2FF' : 'white' }}>
              {i <= 2 && <span style={{ color: '#4361EE', fontSize: 24 }}>●</span>}
            </div>
          ))}
        </div>
      </div>

      <InfoBox color="blue">
        🛡️ Your PIN is stored securely on your device and is never shared with Akash or Optimus staff.
      </InfoBox>

      <div className="mt-5">
        <Btn onClick={onNext}>Confirm & Activate Card →</Btn>
      </div>
    </div>
  </div>
)

// ─── Screen M4: Card Activated ────────────────────────────────────────────────
const M4_Activated: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      {/* Celebration */}
      <div className="text-center py-6">
        <div className="text-6xl mb-3">🎉</div>
        <h2 className="text-2xl font-black text-slate-900 mb-1">Card Activated!</h2>
        <p className="text-sm text-slate-500">Your Optimus card is live and ready to use.</p>
      </div>

      {/* Card display */}
      <div className="mb-5">
        <DebitCard name="AARAV SHARMA" balance="₹2,000" balanceLabel="Daily limit set by guardian" last4="7291" label="Child" />
      </div>

      {/* UPI chip */}
      <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm mb-4">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🔄</div>
        <div>
          <div className="text-xs text-slate-400 font-semibold mb-0.5">Your UPI ID is live</div>
          <div className="text-base font-black text-slate-900">aarav@optimus</div>
        </div>
        <button className="ml-auto text-[11px] font-bold text-[#4361EE] bg-blue-50 px-3 py-1.5 rounded-xl">Copy</button>
      </div>

      {/* Limits reminder */}
      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm mb-4">
        {[
          { l: 'Daily spend limit', v: '₹2,000' },
          { l: 'Per transaction', v: '₹500' },
          { l: 'Monthly limit', v: '₹15,000' },
          { l: 'Set by', v: 'Akash Sharma' },
        ].map(r => (
          <div key={r.l} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
            <span className="text-slate-400">{r.l}</span>
            <span className="font-bold text-slate-900">{r.v}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        <Btn onClick={onNext}>Go to My Home →</Btn>
        <button className="w-full py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 flex items-center justify-center gap-2">
          <span>🏦</span> Add to Google Pay
        </button>
      </div>
    </div>
  </div>
)

// ─── Screen M5: Member Home ───────────────────────────────────────────────────
const M5_MemberHome: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />

    <div className="flex-1 overflow-y-auto px-4 pb-28">
      <div className="flex justify-between items-center mt-1 mb-4">
        <div>
          <p className="text-xs text-slate-400 font-medium">Welcome back,</p>
          <h2 className="text-xl font-black text-slate-900">Aarav 👋</h2>
        </div>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl">🔔</button>
      </div>

      {/* Card with limit bar */}
      <div className="mb-4">
        <DebitCard name="AARAV SHARMA" balance="₹760" balanceLabel="left today of ₹2,000" last4="7291" label="Child">
          <div className="mt-3 mb-2">
            <LimitBar pct={62} color="#10B981" />
            <div className="flex justify-between text-[9px] opacity-60 mt-1">
              <span>₹1,240 spent today</span>
              <span>₹760 remaining</span>
            </div>
          </div>
        </DebitCard>
      </div>

      {/* UPI quick chip */}
      <div className="flex gap-2.5 mb-5">
        <button className="flex-1 bg-white rounded-2xl p-3 flex items-center gap-2 shadow-sm border border-slate-100">
          <span className="text-xl">🔄</span>
          <div className="text-left">
            <div className="text-[9px] text-slate-400 font-semibold">UPI ID</div>
            <div className="text-[11px] font-black text-slate-900">aarav@optimus</div>
          </div>
        </button>
        <button className="flex-1 bg-white rounded-2xl p-3 flex items-center gap-2 shadow-sm border border-slate-100">
          <span className="text-xl">📊</span>
          <div className="text-left">
            <div className="text-[9px] text-slate-400 font-semibold">This month</div>
            <div className="text-[11px] font-black text-slate-900">₹8,420 / ₹15k</div>
          </div>
        </button>
      </div>

      <SectionLabel>Today's Spending</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm mb-4">
        <TxnItem icon="🍕" name="Zomato" sub="1:34 PM · Food" amount="−₹280" />
        <TxnItem icon="🚇" name="Delhi Metro" sub="8:12 AM · Transport" amount="−₹40" />
        <TxnItem icon="📚" name="Vedantu" sub="7:55 AM · Education" amount="−₹920" />
      </div>

      <button onClick={onNext}
        className="w-full text-center text-sm font-bold py-3 rounded-2xl border border-dashed border-slate-200 text-slate-400 hover:border-slate-300 transition-colors">
        See Steam gaming decline →
      </button>
    </div>

    <MemberBottomNav active="home" />
  </div>
)

// ─── Screen M6: Declined Transaction ─────────────────────────────────────────
const M6_Declined: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Payment Declined" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">⛔</div>
        <h2 className="text-xl font-black text-slate-900 mb-2">Payment Blocked</h2>
        <p className="text-xs text-slate-400">Steam · Gaming Store · Just now</p>
      </div>

      {/* Txn detail */}
      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm mb-4">
        {[
          { l: 'Merchant', v: 'Steam Gaming Store' },
          { l: 'Amount', v: '₹850' },
          { l: 'Time', v: 'Today, 3:45 PM' },
          { l: 'Category', v: '🎮 Gaming & In-App' },
          { l: 'Status', v: '🔴 Blocked' },
        ].map(r => (
          <div key={r.l} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0 text-sm">
            <span className="text-slate-400">{r.l}</span>
            <span className="font-bold text-slate-900">{r.v}</span>
          </div>
        ))}
      </div>

      <InfoBox color="red">
        🛡️ <strong>Why was this blocked?</strong> Akash has blocked the <strong>Gaming &amp; In-App</strong> category on your card. Payments to game stores, app credits, and in-app purchases are not allowed.
      </InfoBox>

      <div className="bg-white rounded-2xl p-4 mt-4 shadow-sm mb-4">
        <div className="text-sm font-bold text-slate-900 mb-1">Want to unblock gaming?</div>
        <div className="text-xs text-slate-500 leading-relaxed">Ask Akash to update your category controls in the Family Hub. He can allow gaming for specific days or amounts.</div>
      </div>

      <div className="mt-2 space-y-2.5">
        <Btn onClick={onBack} variant="secondary">View My Card</Btn>
      </div>
    </div>
  </div>
)

// ─── Screen M7: Frozen Card ───────────────────────────────────────────────────
const M7_Frozen: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="My Card" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-28">
      <div className="mb-5">
        <DebitCard name="AARAV SHARMA" last4="7291" label="Child" frozen>
          <div className="text-base font-black text-white mb-1 mt-1">Card Paused</div>
          <div className="text-xs text-white/60 mb-3">Your card has been temporarily paused.</div>
        </DebitCard>
      </div>

      <InfoBox color="amber">
        ❄️ <strong>Your card is paused.</strong> All payments are declined until Akash unpauses it. You can still view your balance and transaction history below.
      </InfoBox>

      <div className="bg-white rounded-2xl p-4 mt-4 shadow-sm mb-4">
        <div className="text-sm font-bold text-slate-900 mb-1">💬 Need it unpaused?</div>
        <div className="text-xs text-slate-500 leading-relaxed">Contact Akash to resume your card. He can unpause it instantly from the Family Hub in his Optimus app.</div>
        <button className="mt-3 w-full py-2.5 rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
          📲 Message Akash
        </button>
      </div>

      <div className="bg-white rounded-2xl px-4 py-1 shadow-sm">
        <SectionLabel>Your Balance (read-only)</SectionLabel>
        <div className="pb-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Available today</span>
            <span className="font-bold text-slate-400">₹760 (paused)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Spent today</span>
            <span className="font-bold text-slate-900">₹1,240</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Monthly spent</span>
            <span className="font-bold text-slate-900">₹8,420 / ₹15,000</span>
          </div>
        </div>
      </div>
    </div>

    <MemberBottomNav active="card" />
  </div>
)

// ─── Screen M8: Transaction History ──────────────────────────────────────────
const M8_History: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="My Spends" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-28">
      {/* Month summary */}
      <div className="rounded-2xl p-4 mb-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1B2A6B, #4361EE)', boxShadow: '0 8px 24px rgba(67,97,238,0.3)' }}>
        <div className="text-[10px] opacity-70 font-semibold uppercase tracking-wider mb-1">June 2026</div>
        <div className="text-3xl font-black mb-2">₹8,420</div>
        <div className="h-1.5 bg-white/20 rounded-full mb-1">
          <div className="h-full bg-white rounded-full" style={{ width: '56%' }} />
        </div>
        <div className="flex justify-between text-[10px] opacity-70">
          <span>56% of monthly limit</span>
          <span>₹6,580 left</span>
        </div>
      </div>

      {/* Category breakdown */}
      <SectionLabel>By Category</SectionLabel>
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
        {[
          { emoji: '📚', label: 'Education', amount: '₹4,100', pct: 49, color: '#4361EE' },
          { emoji: '🍔', label: 'Food', amount: '₹2,340', pct: 28, color: '#10B981' },
          { emoji: '🚇', label: 'Transport', amount: '₹980', pct: 12, color: '#F59E0B' },
          { emoji: '🛒', label: 'Shopping', amount: '₹1,000', pct: 11, color: '#8B5CF6' },
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

      <SectionLabel>This Month</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm">
        <TxnItem icon="🍕" name="Zomato" sub="Today · Food" amount="−₹280" />
        <TxnItem icon="🚇" name="Delhi Metro" sub="Today · Transport" amount="−₹40" />
        <TxnItem icon="📚" name="Vedantu" sub="Today · Education" amount="−₹920" />
        <TxnItem icon="🛒" name="Amazon" sub="Yesterday · Shopping" amount="−₹1,000" />
        <TxnItem icon="📚" name="Books · Flipkart" sub="28 Jun · Education" amount="−₹850" />
        <TxnItem icon="🍔" name="McDonald's" sub="27 Jun · Food" amount="−₹340" />
        <TxnItem icon="⛔" name="Steam Gaming" sub="27 Jun · Blocked" amount="₹850" faded />
      </div>
    </div>

    <MemberBottomNav active="spends" />
  </div>
)

// ─── Export ───────────────────────────────────────────────────────────────────
export const memberScreens: Screen[] = [
  { id: 'claim-invite',   label: 'Claim Invite',           component: M1_ClaimInvite },
  { id: 'member-welcome', label: 'Welcome Screen',         component: M2_Welcome },
  { id: 'identity-pin',   label: 'Identity & PIN',         component: M3_Pin },
  { id: 'card-activated', label: 'Card Activated 🎉',      component: M4_Activated },
  { id: 'member-home',    label: 'Member Home',            component: M5_MemberHome },
  { id: 'declined-txn',   label: 'Declined Transaction',   component: M6_Declined },
  { id: 'frozen-member',  label: 'Card Frozen',            component: M7_Frozen },
  { id: 'txn-history',    label: 'Transaction History',    component: M8_History },
]
