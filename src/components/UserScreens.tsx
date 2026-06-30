'use client'
import React from 'react'
import {
  StatusBar, NavBar, BottomNav, DebitCard, TxnItem, LimitBar,
  Btn, SectionLabel, InfoBox, MemberCard, QuickAction, CatRow,
  InputField, LimitBox
} from './ui'

export type ScreenProps = {
  onNext: () => void
  onBack: () => void
  goTo: (id: string) => void
}

// ─── Screen 1: Home (Discovery Hook) ───────────────────────────────────────
const S1_Home: React.FC<ScreenProps> = ({ onNext, goTo }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <div className="flex-1 overflow-y-auto px-4 pb-28">
      {/* Greeting */}
      <div className="flex justify-between items-center mt-1 mb-4">
        <div>
          <p className="text-xs text-slate-400 font-medium">Good morning,</p>
          <h2 className="text-xl font-black text-slate-900">Priya Sharma 👋</h2>
        </div>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl">🔔</button>
      </div>

      {/* Balance Card */}
      <div className="mb-4">
        <DebitCard name="PRIYA SHARMA" balance="₹48,250" balanceLabel="Available Balance" last4="4821" />
      </div>

      {/* ★ DISCOVERY HOOK — Family Hub Banner */}
      <button onClick={onNext}
        className="w-full text-left rounded-2xl p-4 mb-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1B2A6B 0%, #4361EE 100%)', boxShadow: '0 8px 24px rgba(67,97,238,0.35)' }}>
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5" />
        <div className="flex items-start gap-3">
          <span className="text-4xl flex-shrink-0">👨‍👩‍👧</span>
          <div className="flex-1">
            <p className="text-white font-black text-[15px] mb-1">Family Hub is here! ✨</p>
            <p className="text-blue-200 text-xs leading-relaxed">Give your teen their own card with daily limits and controls you set.</p>
          </div>
          <span className="text-[11px] bg-white text-[#1B2A6B] font-black px-3 py-1.5 rounded-xl flex-shrink-0 self-center">
            Set up →
          </span>
        </div>
      </button>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        {[
          { icon: '💸', label: 'Send' },
          { icon: '⬇️', label: 'Receive' },
          { icon: '📋', label: 'History' },
          { icon: '📱', label: 'UPI' },
        ].map(a => (
          <div key={a.label} className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <div className="text-2xl mb-1">{a.icon}</div>
            <div className="text-[10px] font-semibold text-slate-500">{a.label}</div>
          </div>
        ))}
      </div>

      <SectionLabel>Recent Transactions</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm">
        <TxnItem icon="🛒" name="BigBasket" sub="Yesterday · Groceries" amount="−₹1,240" />
        <TxnItem icon="⛽" name="BPCL Fuel" sub="2 days ago · Fuel" amount="−₹800" />
        <TxnItem icon="🎬" name="Netflix" sub="3 Jun · Entertainment" amount="−₹649" />
      </div>
    </div>

    <BottomNav active="home" onHubTab={() => onNext()} />
  </div>
)

// ─── Screen 2: Family Hub Empty State ──────────────────────────────────────
const S2_HubEmpty: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <NavBar title="Family Hub" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-5 pb-10">
      <div className="text-center py-6">
        <div className="text-7xl mb-4">👨‍👩‍👧‍👦</div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">One family,<br />one bank</h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Give your family members their own Optimus card — with spending limits, category controls, and real-time visibility you set.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm space-y-4">
        {[
          { icon: '💳', title: 'Their card, your control', sub: 'Set per-transaction and daily spend limits for each member' },
          { icon: '🔔', title: 'Every spend, instantly', sub: 'Get notified the moment your family member transacts' },
          { icon: '🔒', title: 'Freeze anytime', sub: 'Pause any card in one tap — active immediately' },
          { icon: '📊', title: 'See the full picture', sub: 'Activity feed and spending breakdown by member' },
        ].map(f => (
          <div key={f.title} className="flex items-start gap-3.5">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{f.icon}</div>
            <div>
              <div className="text-sm font-bold text-slate-900">{f.title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{f.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <Btn onClick={onNext}>+ Add a family member</Btn>
    </div>
  </div>
)

// ─── Screen 3: Add Member — Choose Type ────────────────────────────────────
const S3_AddType: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Add Member" onBack={onBack} step="Step 1 / 3" />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <h3 className="text-[17px] font-black text-slate-900 mb-1 mt-1">Who are you adding?</h3>
      <p className="text-xs text-slate-500 mb-5">Each member gets their own card and personalised limits.</p>

      {/* Child — selected */}
      <button onClick={onNext}
        className="w-full bg-white border-2 rounded-2xl p-4 flex items-center gap-4 mb-3 text-left shadow-md"
        style={{ borderColor: '#4361EE', boxShadow: '0 4px 16px rgba(67,97,238,0.15)' }}>
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">👧</div>
        <div className="flex-1">
          <div className="text-sm font-black text-slate-900">Child / Teen</div>
          <div className="text-xs text-slate-500">Age 10–18 · Guardian-managed account</div>
        </div>
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: '#4361EE' }}>✓</div>
      </button>

      {/* Spouse */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 mb-3 opacity-70">
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl flex-shrink-0">💑</div>
        <div className="flex-1">
          <div className="text-sm font-bold text-slate-900">Spouse / Partner</div>
          <div className="text-xs text-slate-500">Shared spending, individual add-on card</div>
        </div>
      </div>

      {/* Parent — coming soon */}
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-4 flex items-center gap-4 mb-5 opacity-50">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl flex-shrink-0">👴</div>
        <div className="flex-1">
          <div className="text-sm font-bold text-slate-700">Parent / Elder</div>
          <div className="text-xs text-slate-400">Caregiver monitoring & controls</div>
        </div>
        <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-1 rounded-full font-bold">Soon</span>
      </div>

      <InfoBox color="amber">
        ℹ️ <strong>RBI guideline:</strong> Accounts for children under 18 are set up under your guardianship, with a re-KYC triggered automatically when they turn 18.
      </InfoBox>

      <div className="mt-5">
        <Btn onClick={onNext}>Continue with Child / Teen →</Btn>
      </div>
    </div>
  </div>
)

// ─── Screen 4: Add Member — Child Details ──────────────────────────────────
const S4_AddDetails: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Child Details" onBack={onBack} step="Step 2 / 3" />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <p className="text-xs text-slate-500 mb-5 mt-1">You'll be set as the guardian on this account.</p>

      <InputField label="Full Name" value="Aarav Sharma" />
      <InputField label="Date of Birth" value="15 March 2012  (Age 13)" note="Child must be 10–18 to be eligible for a Family Hub card." />
      <InputField label="Mobile Number (for invite)" value="+91 98765 43210" />

      <InfoBox color="blue">
        <strong>Guardian account:</strong> As Aarav is under 18, this savings account will be set up under your guardianship as required by the RBI's April 2025 circular. A re-KYC will be prompted automatically when Aarav turns 18.
      </InfoBox>

      <div className="mt-4 bg-white rounded-2xl p-4 flex items-center gap-3 border border-slate-100 shadow-sm mb-5">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg flex-shrink-0">👤</div>
        <div>
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">You as Guardian</div>
          <div className="text-sm font-black text-slate-900">Priya Sharma</div>
          <div className="text-[10px] text-[#4361EE] font-semibold">Fully KYC verified · Primary account holder</div>
        </div>
      </div>

      <Btn onClick={onNext}>Set Card Limits →</Btn>
    </div>
  </div>
)

// ─── Screen 5: Set Limits & Controls ───────────────────────────────────────
const S5_SetLimits: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Set Limits" onBack={onBack} step="Step 3 / 3" />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <p className="text-xs text-slate-500 mb-4 mt-1">You can update these anytime from Aarav's card settings.</p>

      <div className="bg-white rounded-2xl px-4 py-1 shadow-sm mb-4">
        <SectionLabel className="mt-3">Spending Limits</SectionLabel>
        <LimitBox label="Per Transaction" sub="Max single spend" value="₹500" />
        <LimitBox label="Daily Limit" sub="Total per day" value="₹2,000" />
        <LimitBox label="Monthly Limit" sub="Total per month" value="₹15,000" />
      </div>

      <div className="bg-white rounded-2xl px-4 py-1 shadow-sm mb-4">
        <SectionLabel className="mt-3">Category Controls</SectionLabel>
        <CatRow emoji="🍔" label="Food & Dining" sub="Restaurants, food delivery" on={true} />
        <CatRow emoji="🚇" label="Transport" sub="Metro, bus, cab, fuel" on={true} />
        <CatRow emoji="📚" label="Education" sub="Books, tuition, stationery" on={true} />
        <CatRow emoji="🎮" label="Gaming & In-App" sub="App stores, game credits" on={false} />
        <CatRow emoji="🎰" label="Gambling & Betting" sub="Fantasy sports, casino" on={false} />
      </div>

      <InfoBox color="emerald">
        ✅ <strong>Approval rule:</strong> Transactions above ₹1,000 will require your approval before going through.
      </InfoBox>

      <div className="mt-5">
        <Btn onClick={onNext}>Send Card Invite to Aarav →</Btn>
      </div>
    </div>
  </div>
)

// ─── Screen 6: Invite Sent ──────────────────────────────────────────────────
const S6_InviteSent: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">✅</div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Invite sent!</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Aarav will receive an SMS invite. Once they verify, their card activates instantly.
        </p>
      </div>

      <DebitCard name="AARAV SHARMA" last4="••••" label="Pending Activation">
        <div className="text-xs opacity-60 mb-2">Virtual Card · Awaiting activation</div>
      </DebitCard>

      <div className="bg-white rounded-2xl px-4 py-1 mt-4 shadow-sm">
        <SectionLabel>Card Summary</SectionLabel>
        <div className="space-y-2.5 pb-3">
          {[
            { label: 'Daily limit', value: '₹2,000' },
            { label: 'Monthly limit', value: '₹15,000' },
            { label: 'Gaming blocked', value: '✗ Yes' },
            { label: 'Gambling blocked', value: '✗ Yes' },
            { label: 'Invite sent to', value: '+91 98765 43210' },
            { label: 'Approval above', value: '₹1,000' },
          ].map(r => (
            <div key={r.label} className="flex justify-between text-sm">
              <span className="text-slate-500">{r.label}</span>
              <span className="font-bold text-slate-900">{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        <Btn onClick={onNext}>View Family Hub →</Btn>
        <Btn variant="secondary">Share invite link again</Btn>
      </div>
    </div>
  </div>
)

// ─── Screen 7: Family Hub Dashboard ────────────────────────────────────────
const S7_Dashboard: React.FC<ScreenProps> = ({ onNext, onBack, goTo }) => (
  <div className="flex flex-col h-full bg-slate-50 relative">
    <StatusBar />
    <div className="flex items-center px-4 py-2 gap-2">
      <span className="flex-1 text-[15px] font-bold text-slate-900">Family Hub</span>
      <button onClick={onNext}
        className="text-[12px] font-bold px-3 py-1.5 rounded-xl text-white"
        style={{ background: 'linear-gradient(135deg, #1B2A6B, #4361EE)' }}>
        + Add
      </button>
    </div>

    <div className="flex-1 overflow-y-auto px-4 pb-28">
      {/* Family stats strip */}
      <div className="rounded-2xl p-4 mb-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1B2A6B, #4361EE)', boxShadow: '0 8px 24px rgba(67,97,238,0.3)' }}>
        <div className="text-[10px] opacity-70 font-semibold uppercase tracking-wider mb-1">Family Spending Today</div>
        <div className="text-3xl font-black mb-1">₹1,240</div>
        <div className="flex gap-4 text-[11px] opacity-75">
          <span>1 member active</span>
          <span>·</span>
          <span>4 transactions</span>
        </div>
      </div>

      <SectionLabel>Your Members</SectionLabel>
      <MemberCard
        initials="A" name="Aarav Sharma" tag="Teen · 13 yrs · Active"
        pct={62} left="₹760" today="₹1,240"
        color="linear-gradient(135deg, #667EEA, #764BA2)"
        onClick={() => goTo('member-detail')}
      />

      <button onClick={onNext}
        className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center mb-5 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
        <div className="text-slate-400 text-sm font-semibold">+ Add another member</div>
        <div className="text-slate-300 text-xs mt-0.5">Spouse, parent, or another child</div>
      </button>

      <SectionLabel>Latest Activity</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm">
        <TxnItem icon="🍕" name="Zomato · Aarav" sub="Today · 1:34 PM · Food" amount="−₹280" />
        <TxnItem icon="🚇" name="Delhi Metro · Aarav" sub="Today · 8:12 AM · Transport" amount="−₹40" />
        <TxnItem icon="📚" name="Vedantu · Aarav" sub="Today · 7:55 AM · Education" amount="−₹920" />
      </div>
    </div>

    <BottomNav active="hub" />
  </div>
)

// ─── Screen 8: Member Detail ────────────────────────────────────────────────
const S8_MemberDetail: React.FC<ScreenProps> = ({ onNext, onBack, goTo }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Aarav's Card" onBack={onBack}
      right={<button className="text-[12px] text-red-500 font-bold">Remove</button>} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      {/* Compact card */}
      <div className="mb-4">
        <DebitCard name="AARAV SHARMA" balance="₹760" balanceLabel="remaining today of ₹2,000" last4="7291" label="Teen" chip={false}>
          <div className="mt-2 mb-3">
            <LimitBar pct={62} color="#10B981" />
            <div className="flex justify-between text-[9px] opacity-60 mt-1">
              <span>₹1,240 spent</span>
              <span>₹760 left</span>
            </div>
          </div>
        </DebitCard>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2.5 mb-5">
        <QuickAction icon="💰" label="Top Up" />
        <QuickAction icon="🔒" label="Freeze" onClick={() => goTo('freeze-card')} />
        <QuickAction icon="⚙️" label="Limits" />
        <QuickAction icon="🛡️" label="Controls" onClick={() => goTo('category-controls')} />
      </div>

      <SectionLabel>Today's Transactions</SectionLabel>
      <div className="bg-white rounded-2xl px-4 shadow-sm mb-4">
        <TxnItem icon="🍕" name="Zomato" sub="1:34 PM · Food" amount="−₹280" />
        <TxnItem icon="🚇" name="Delhi Metro" sub="8:12 AM · Transport" amount="−₹40" />
        <TxnItem icon="📚" name="Vedantu" sub="7:55 AM · Education" amount="−₹920" />
      </div>

      <SectionLabel>Card Details</SectionLabel>
      <div className="bg-white rounded-2xl px-4 py-1 shadow-sm">
        <div className="space-y-2.5 py-3">
          {[
            { l: 'Card type', v: 'Virtual · RuPay Debit' },
            { l: 'UPI ID', v: 'aarav@optimus' },
            { l: 'Monthly limit', v: '₹15,000' },
            { l: 'Guardian', v: 'Priya Sharma' },
            { l: 'Status', v: '🟢 Active' },
          ].map(r => (
            <div key={r.l} className="flex justify-between text-sm">
              <span className="text-slate-400">{r.l}</span>
              <span className="font-bold text-slate-900">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// ─── Screen 9: Category Controls ────────────────────────────────────────────
const S9_Controls: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Category Controls" onBack={onBack}
      right={<span className="text-xs text-slate-400">Aarav's card</span>} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
        Blocked categories decline automatically at those merchant types — no manual review needed.
      </p>

      <div className="bg-white rounded-2xl px-4 py-1 shadow-sm mb-4">
        <SectionLabel className="mt-3 text-emerald-600">✓ Allowed</SectionLabel>
        <CatRow emoji="🍔" label="Food & Dining" sub="Restaurants, Zomato, Swiggy" on={true} />
        <CatRow emoji="🚇" label="Transport" sub="Metro, bus, cab, fuel" on={true} />
        <CatRow emoji="📚" label="Education" sub="Books, Vedantu, BYJU'S" on={true} />
        <CatRow emoji="🛒" label="Groceries" sub="Supermarkets, kirana stores" on={true} />
        <CatRow emoji="💊" label="Medical" sub="Pharmacy, clinics" on={true} />
      </div>

      <div className="bg-white rounded-2xl px-4 py-1 shadow-sm mb-4">
        <SectionLabel className="mt-3 text-red-500">✗ Blocked</SectionLabel>
        <CatRow emoji="🎮" label="Gaming & In-App" sub="App stores, game credits" on={false} />
        <CatRow emoji="🎰" label="Gambling & Betting" sub="Fantasy sports, casino" on={false} />
        <CatRow emoji="🍺" label="Alcohol & Tobacco" sub="Liquor stores, pan shops" on={false} />
      </div>

      <InfoBox color="blue">
        Changes take effect immediately. Aarav will see a &quot;category blocked&quot; reason if a transaction is declined.
      </InfoBox>

      <div className="mt-5">
        <Btn onClick={onBack} variant="success">Save Controls</Btn>
      </div>
    </div>
  </div>
)

// ─── Screen 10: Freeze Card ──────────────────────────────────────────────────
const S10_Freeze: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full bg-slate-50">
    <StatusBar />
    <NavBar title="Aarav's Card" onBack={onBack} />

    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <div className="mb-4">
        <DebitCard name="AARAV SHARMA" last4="7291" label="Teen" frozen>
          <div className="text-sm font-black mb-1 mt-1">Card Paused</div>
          <div className="text-[10px] opacity-70 mb-3">All transactions are currently declined.</div>
        </DebitCard>
      </div>

      <InfoBox color="amber">
        🔒 <strong>Card is paused.</strong> All payments on Aarav's card are declined until you unfreeze. Aarav can still see their balance and transaction history in their app.
      </InfoBox>

      <div className="bg-white rounded-2xl px-4 py-3 mt-4 shadow-sm mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Paused on</span>
          <span className="font-bold text-slate-900">Today, 9:23 AM</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Paused by</span>
          <span className="font-bold text-slate-900">You (Guardian)</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm mb-5">
        <SectionLabel className="mt-0">Last Transactions Before Freeze</SectionLabel>
        <TxnItem icon="🍕" name="Zomato" sub="1:34 PM · Food" amount="−₹280" faded />
        <TxnItem icon="🚇" name="Delhi Metro" sub="8:12 AM · Transport" amount="−₹40" faded />
      </div>

      <Btn variant="success" onClick={onBack}>✅ Unfreeze Card</Btn>
      <p className="text-center text-xs text-slate-400 mt-2">Card will be active again immediately.</p>
    </div>
  </div>
)

// ─── Export ──────────────────────────────────────────────────────────────────
export type Screen = {
  id: string
  label: string
  component: React.FC<ScreenProps>
}

export const userScreens: Screen[] = [
  { id: 'home',               label: 'Home',                    component: S1_Home },
  { id: 'hub-empty',          label: 'Family Hub',              component: S2_HubEmpty },
  { id: 'add-type',           label: 'Add Member: Type',        component: S3_AddType },
  { id: 'add-details',        label: 'Add Member: Details',     component: S4_AddDetails },
  { id: 'set-limits',         label: 'Set Limits & Controls',   component: S5_SetLimits },
  { id: 'invite-sent',        label: 'Invite Sent ✓',           component: S6_InviteSent },
  { id: 'hub-dashboard',      label: 'Hub Dashboard',           component: S7_Dashboard },
  { id: 'member-detail',      label: 'Member Detail (Aarav)',   component: S8_MemberDetail },
  { id: 'category-controls',  label: 'Category Controls',       component: S9_Controls },
  { id: 'freeze-card',        label: 'Freeze Card',             component: S10_Freeze },
]
