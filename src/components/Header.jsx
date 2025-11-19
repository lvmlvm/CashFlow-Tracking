import React from "react";

export default function Header() {
  return (
    <header className="h-16 bg-[#dce9c4] flex items-center justify-between px-8 border-b border-[#d0ddbc]">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#1b1d12] flex items-center justify-center text-white font-bold text-sm">
          FP
        </div>
        <span className="text-xl font-semibold tracking-tight">CashFlow</span>
      </div>

      <div className="flex items-center gap-5 text-[#1b1d12]">
        <HeaderIcon label="Account" />
        <HeaderIcon label="Settings" />
        <HeaderIcon label="Logout" />
      </div>
    </header>
  );
}

function HeaderIcon({ label }) {
  return (
    <button
      className="w-9 h-9 rounded-full border border-[#b2bba0] bg-[#e6f0cd] flex items-center justify-center text-xs font-semibold hover:bg-[#dde8c3] transition"
      aria-label={label}
    >
      <span>•</span>
    </button>
  );
}
