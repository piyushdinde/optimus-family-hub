'use client'
import React from 'react'

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-shrink-0"
      style={{ width: 360, height: 740 }}>
      {/* Outer shell */}
      <div className="absolute inset-0 rounded-[48px] shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #2D2D3A 0%, #1A1A28 50%, #111118 100%)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset, 0 40px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)'
        }} />

      {/* Side buttons */}
      <div className="absolute -right-1 top-28 w-1 h-16 rounded-r-sm"
        style={{ background: 'linear-gradient(180deg, #2a2a38, #1a1a26)' }} />
      <div className="absolute -left-1 top-24 w-1 h-10 rounded-l-sm"
        style={{ background: 'linear-gradient(180deg, #2a2a38, #1a1a26)' }} />
      <div className="absolute -left-1 top-40 w-1 h-10 rounded-l-sm"
        style={{ background: 'linear-gradient(180deg, #2a2a38, #1a1a26)' }} />
      <div className="absolute -left-1 top-56 w-1 h-10 rounded-l-sm"
        style={{ background: 'linear-gradient(180deg, #2a2a38, #1a1a26)' }} />

      {/* Screen area */}
      <div className="absolute rounded-[40px] overflow-hidden bg-white"
        style={{ inset: 10 }}>

        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50"
          style={{ width: 120, height: 34, background: '#111118', borderRadius: 20 }} />

        {/* Actual screen content */}
        <div className="absolute inset-0 overflow-hidden bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  )
}
