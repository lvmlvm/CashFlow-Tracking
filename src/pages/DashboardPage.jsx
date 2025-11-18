import React from "react";

const accounts = [
  { label: "Main Wallet", icon: "🧱", value: "€23.826" },
  { label: "PayPal Wallet", icon: "💳", value: "€34.109" },
  { label: "Cash", icon: "💷", value: "€10.320" },
];

const upcoming = [
  { date: "14/11/23", amount: "+€2.011", positive: true, company: "Company Co.", tag: "Stocks" },
  { date: "14/11/23", amount: "+€198", positive: true, company: "Acme", tag: "Subscription" },
  { date: "15/11/23", amount: "-€690", positive: false, company: "Streamio", tag: "Supplier" },
  { date: "15/11/23", amount: "+€1.380", positive: true, company: "Company Co.", tag: "Supplier" },
  { date: "15/11/23", amount: "-€8.900", positive: false, company: "Company Co.", tag: "Investment" },
];

const quickAccess = ["Account", "Projects", "Forecast", "Money & Cashflow"];

const inflowData = [40, 65, 80, 90, 100, 70, 50, 85, 60, 55, 70, 65];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Welcome!</h1>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)] gap-6">
        <MyAccounts />
        <UpcomingTransactions />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-6">
        <InflowIncome />
        <QuickAccess />
      </div>
    </div>
  );
}

function MyAccounts() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#eceee4] px-8 py-7 flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-4">My wallets</h2>

      <div className="space-y-3">
        {accounts.map((a) => (
          <div key={a.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#e7efcf] text-base">
                {a.icon}
              </span>
              <span>{a.label}</span>
            </div>
            <span className="font-semibold tracking-tight">{a.value}</span>
          </div>
        ))}

        <div className="pt-3 mt-2 border-t border-[#f0f1ea] flex items-center justify-between text-sm">
          <span className="font-semibold">Total</span>
          <span className="font-extrabold tracking-tight">€68.255</span>
        </div>
      </div>
    </section>
  );
}

function UpcomingTransactions() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#eceee4] px-8 py-7">
      <h2 className="text-xl font-bold mb-4">Upcoming transactions</h2>

      <div className="space-y-3 text-sm">
        {upcoming.map((t, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <span className="w-20 text-gray-500">{t.date}</span>

            <span
              className={`w-20 font-semibold ${
                t.positive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {t.amount}
            </span>

            <span className="flex-1">{t.company}</span>

            <span className="px-3 py-1 rounded-full text-xs bg-[#e4efcf] text-[#424633]">
              {t.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function InflowIncome() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#eceee4] px-8 py-7 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Inflow &amp; Income</h2>
        <div className="flex items-center gap-4 text-xs">
          <LegendDot label="Income" />
          <LegendDot label="Expenses" light />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className="flex items-end gap-2 h-48">
          {inflowData.map((height, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="w-4 flex flex-col justify-end gap-1">
                <div
                  className="rounded-full bg-[#a4bc7a]"
                  style={{ height: `${height}%` }}
                />
                <div
                  className="rounded-full bg-[#525b39] opacity-80"
                  style={{ height: `${height * 0.6}%` }}
                />
              </div>
              <span className="mt-1 text-[10px] text-gray-400">
                {i + 1}/23
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-px bg-[#eceee4]" />
      </div>
    </section>
  );
}

function LegendDot({ label, light }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`w-3 h-3 rounded-full ${
          light ? "bg-[#c7d9a6]" : "bg-[#525b39]"
        }`}
      />
      <span className="text-gray-500">{label}</span>
    </span>
  );
}

function QuickAccess() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#eceee4] px-8 py-7">
      <h2 className="text-xl font-bold mb-4">Quick access</h2>

      <div className="space-y-3 text-sm">
        {quickAccess.map((item) => (
          <button
            key={item}
            className="w-full flex items-center justify-between gap-4 px-3 py-2 rounded-xl hover:bg-[#f3f5eb] transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-[#dde1d0] flex items-center justify-center text-lg">
                €
              </div>
              <span>{item}</span>
            </div>
            <span className="text-xs text-gray-400">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}
