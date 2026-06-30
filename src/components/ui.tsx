'use client'
import React from 'react'

export const StatusBar = ({ light }: { light?: boolean }) => (
  <div className={`flex justify-between items-center px-5 pt-9 pb-1 text-[11px] font-semibold ${light ? 'text-white' : 'text-slate-800'}`}>
    <span>9:41</span>
    <div className="flex items-center gap-1.5">
      <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" opacity="0.8">
        <rect x="0" y="5" width="3" height="5" rx="1"/><rect x="4.5" y="3" width="3" height="7" rx="1"/>
        <rect x="9" y="1" width="3" height="9" rx="1"/><rect x="13.5" y="0" width="2.5" height="10" rx="1"/>
      </svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" opacity="0.8">
        <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5L14.5 3.7C12.7 1.9 10.2 0.8 7.5 0.8S2.3 1.9 0.5 3.7L1.8 5C3.2 3.5 5.2 2.5 7.5 2.5Z"/>
        <path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7.1L12.6 5.8C11.2 4.5 9.4 3.7 7.5 3.7S3.8 4.5 2.4 5.8L3.7 7.1C4.7 6.1 6 5.5 7.5 5.5Z"/>
        <circle cx="7.5" cy="9.5" r="1.5"/>
      </svg>
      <div className="flex items-center gap-0.5">
        <div className="w-5 h-2.5 border border-current rounded-sm relative">
          <div className="absolute inset-0.5 left-0.5 right-0.5 bg-current rounded-[1px]" style={{width:'70%'}}/>
        </div>
      </div>
    </div>
  </div>
)

export const NavBar = ({
  title, onBack, right, step, light
}: {
  title: string; onBack?: () => void; right?: React.ReactNode; step?: string; light?: boolean
}) => (
  <div className={`flex items-center px-4 py-2 gap-2 ${light ? 'text-white' : ''}`}>
    {onBack && (
      <button onClick={onBack} className={`text-2xl font-light mr-1 ${light ? 'text-white' : 'text-[#1B2A6B]'}`}>‹</button>
    )}
    <span className={`flex-1 text-[15px] font-bold ${light ? 'text-white' : 'text-slate-900'}`}>{title}</span>
    {step && <span className="text-[10px] text-slate-400 font-medium">{step}</span>}
    {right}
  </div>
)

export const BottomNav = ({
  active, onHubTab
}: {
  active: 'home' | 'cards' | 'hub' | 'profile'; onHubTab?: () => void
}) => (
  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around pt-2 pb-5">
    {[
      { id: 'home', emoji: '🏠', label: 'Home' },
      { id: 'cards', emoji: '💳', label: 'Cards' },
      { id: 'hub', emoji: '👨‍👩‍👧', label: 'Hub' },
      { id: 'profile', emoji: '👤', label: 'Profile' },
    ].map(item => (
      <button key={item.id}
        onClick={item.id === 'hub' ? onHubTab : undefined}
        className={`flex flex-col items-center gap-0.5 ${active === item.id ? 'text-[#4361EE]' : 'text-slate-400'}`}>
        <span className="text-[22px]">{item.emoji}</span>
        <span className="text-[9px] font-semibold">{item.label}</span>
      </button>
    ))}
  </div>
)

export const MemberBottomNav = ({ active }: { active: 'home' | 'card' | 'spends' | 'me' }) => (
  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around pt-2 pb-5">
    {[
      { id: 'home', emoji: '🏠', label: 'Home' },
      { id: 'card', emoji: '💳', label: 'Card' },
      { id: 'spends', emoji: '📊', label: 'Spends' },
      { id: 'me', emoji: '👤', label: 'Me' },
    ].map(item => (
      <div key={item.id} className={`flex flex-col items-center gap-0.5 ${active === item.id ? 'text-emerald-600' : 'text-slate-400'}`}>
        <span className="text-[22px]">{item.emoji}</span>
        <span className="text-[9px] font-semibold">{item.label}</span>
      </div>
    ))}
  </div>
)

export const DebitCard = ({
  name, balance, balanceLabel, last4, label, frozen, chip = true, children
}: {
  name: string; balance?: string; balanceLabel?: string; last4?: string
  label?: string; frozen?: boolean; chip?: boolean; children?: React.ReactNode
}) => (
  <div className="rounded-2xl p-4 text-white relative overflow-hidden select-none"
    style={{
      background: frozen
        ? 'linear-gradient(135deg, #475569 0%, #64748B 100%)'
        : 'linear-gradient(135deg, #1B2A6B 0%, #4361EE 100%)'
    }}>
    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
    <div className="absolute -bottom-14 -left-6 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
    {frozen && (
      <div className="absolute inset-0 pointer-events-none"
        style={{backgroundImage:'repeating-linear-gradient(45deg,transparent,transparent 12px,rgba(255,255,255,0.03) 12px,rgba(255,255,255,0.03) 24px)'}} />
    )}
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[11px] font-black tracking-[3px] opacity-80">OPTIMUS</span>
        {label && <span className="text-[9px] bg-white/20 rounded-full px-2.5 py-0.5 font-bold">{label}</span>}
        {frozen && <span className="text-[9px] bg-white/20 rounded-full px-2.5 py-0.5 font-bold">❄️ PAUSED</span>}
      </div>
      {chip && <div className="w-9 h-6 rounded bg-gradient-to-br from-yellow-300 to-amber-500 mb-3 shadow-sm" />}
      {balance && (
        <div>
          <div className="text-[26px] font-black leading-tight">{balance}</div>
          {balanceLabel && <div className="text-[10px] opacity-60 mb-2">{balanceLabel}</div>}
        </div>
      )}
      {children}
      <div className="text-[10px] font-mono tracking-[4px] opacity-75 mb-2 mt-1">•••• •••• •••• {last4 || '••••'}</div>
      <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">{name}</div>
    </div>
  </div>
)

export const TxnItem = ({
  icon, name, sub, amount, green, faded
}: {
  icon: string; name: string; sub: string; amount: string; green?: boolean; faded?: boolean
}) => (
  <div className={`flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0 ${faded ? 'opacity-40' : ''}`}>
    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-slate-100 flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-slate-900 truncate">{name}</div>
      <div className="text-[10px] text-slate-400">{sub}</div>
    </div>
    <div className={`text-sm font-bold flex-shrink-0 ${green ? 'text-emerald-600' : 'text-red-500'}`}>{amount}</div>
  </div>
)

export const LimitBar = ({ pct, color = '#10B981' }: { pct: number; color?: string }) => (
  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
  </div>
)

export const Toggle = ({ on }: { on: boolean }) => (
  <div className={`w-11 h-6 rounded-full relative flex-shrink-0 transition-colors duration-200 ${on ? 'bg-emerald-500' : 'bg-slate-200'}`}>
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 ${on ? 'right-1' : 'left-1'}`} />
  </div>
)

export const Btn = ({
  children, onClick, variant = 'primary', disabled, className = ''
}: {
  children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'success' | 'ghost'
  disabled?: boolean; className?: string
}) => {
  const base = 'w-full py-3.5 rounded-2xl font-bold text-[14px] text-center transition-all active:scale-98 disabled:opacity-40'
  const variants = {
    primary: { className: 'text-white shadow-lg', style: { background: 'linear-gradient(135deg, #1B2A6B, #4361EE)' } },
    secondary: { className: 'bg-slate-100 text-slate-700', style: undefined },
    success: { className: 'bg-emerald-500 text-white shadow-lg', style: undefined },
    ghost: { className: 'text-[#4361EE] font-semibold', style: undefined },
  }
  const v = variants[variant]
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${v.className} ${className}`} style={v.style}>
      {children}
    </button>
  )
}

export const SectionLabel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4 mb-2 ${className}`}>{children}</div>
)

export const InfoBox = ({
  children, color = 'blue'
}: {
  children: React.ReactNode; color?: 'blue' | 'amber' | 'emerald' | 'red'
}) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    red: 'bg-red-50 border-red-200 text-red-700',
  }
  return (
    <div className={`border rounded-2xl p-3 text-[11px] leading-relaxed ${colors[color]}`}>{children}</div>
  )
}

export const MemberCard = ({
  initials, name, tag, pct, left, today, color, onClick
}: {
  initials: string; name: string; tag: string; pct: number; left: string; today: string
  color: string; onClick?: () => void
}) => (
  <button onClick={onClick}
    className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all text-left mb-3">
    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base flex-shrink-0"
      style={{ background: color }}>{initials}</div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-bold text-slate-900">{name}</div>
      <div className="text-[10px] text-slate-400 mb-1.5">{tag}</div>
      <LimitBar pct={pct} color={pct > 80 ? '#EF4444' : '#10B981'} />
      <div className="text-[10px] text-slate-400 mt-1">{today} spent today</div>
    </div>
    <div className="text-right flex-shrink-0">
      <div className="text-sm font-black text-slate-900">{left}</div>
      <div className="text-[10px] text-slate-400">left today</div>
    </div>
  </button>
)

export const QuickAction = ({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) => (
  <button onClick={onClick}
    className="flex-1 bg-white border border-slate-100 rounded-2xl py-3 px-1 flex flex-col items-center gap-1.5 shadow-sm hover:shadow-md transition-all active:scale-95">
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-semibold text-slate-600">{label}</span>
  </button>
)

export const CatRow = ({ emoji, label, sub, on }: { emoji: string; label: string; sub: string; on: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
    <div className="flex items-center gap-3">
      <span className="text-xl">{emoji}</span>
      <div>
        <div className="text-sm font-semibold text-slate-900">{label}</div>
        <div className="text-[10px] text-slate-400">{sub}</div>
      </div>
    </div>
    <Toggle on={on} />
  </div>
)

export const InputField = ({ label, value, note }: { label: string; value: string; note?: string }) => (
  <div className="mb-4">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900">{value}</div>
    {note && <p className="text-[10px] text-slate-400 mt-1">{note}</p>}
  </div>
)

export const LimitBox = ({ label, sub, value }: { label: string; sub: string; value: string }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
    <div>
      <div className="text-sm font-semibold text-slate-900">{label}</div>
      <div className="text-[10px] text-slate-400">{sub}</div>
    </div>
    <div className="bg-blue-50 rounded-xl px-3 py-1.5 text-sm font-black text-[#1B2A6B]">{value}</div>
  </div>
)
