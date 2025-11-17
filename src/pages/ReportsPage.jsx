import React from "react";

const reportingBars = [
  { label: "HR",       value: 8 },
  { label: "Sales",    value: 8 },
  { label: "Supplier", value: 8 },
  { label: "Admin",    value: 8 },
  { label: "Finance",  value: 7.5 },
  { label: "IT",       value: 7.8 },
];

const recentActivity = [
  {
    time: "10:40 AM, Fri., Sept. 10, 2021",
    title: "New Invoice Created",
    body: "Check the invoice details and ensure accuracy.",
  },
  {
    time: "10:40 AM, Fri., Sept. 10, 2021",
    title: "New Invoice Created",
    body: "Check the invoice and set up a payment.",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Reporting</h1>

      <div className="flex flex-wrap gap-3">
        <ReportTab label="Cashflow" active />
        <ReportTab label="Profit & Loss" />
        <ReportTab label="Statements" />
        <ReportTab label="Receivables" />
        <ReportTab label="Project" />
        <ReportTab label="Archive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <MetricCard
          title="Invoicing Rate"
          main="9%"
          trend="↑"
          isPositive
          subtitle="vs. previous month"
        />
        <MetricCard
          title="Forecasted Revenue"
          main="$1.432"
          trend="↓"
          isPositive={false}
          subtitle="vs. previous month"
        />
        <MetricCard
          title="Projected Profits"
          main="$2.971"
          trend="↑"
          isPositive
          subtitle="vs. previous month"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-5">
        <section className="bg-white rounded-2xl shadow-sm border border-[#eceee4] px-8 py-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>

          <div className="flex-1 flex flex-col justify-end">
            <div className="flex items-end gap-6 h-56">
              {reportingBars.map((bar) => (
                <div key={bar.label} className="flex flex-col items-center flex-1">
                  <div className="w-6 flex flex-col justify-end gap-1">
                    <div
                      className="rounded-full bg-[#525b39] opacity-80"
                      style={{ height: `${bar.value * 6}px` }}
                    />
                    <div
                      className="rounded-full bg-[#a4bc7a]"
                      style={{ height: `${bar.value * 4}px` }}
                    />
                  </div>
                  <span className="mt-2 text-xs text-gray-600">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#4f5f3b] text-white rounded-2xl shadow-sm px-6 py-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-6 text-sm">
            {recentActivity.map((item, idx) => (
              <div key={idx} className={idx === 0 ? "border-b border-white/20 pb-4" : ""}>
                <p className="text-xs text-white/70">{item.time}</p>
                <div className="flex items-center gap-1 mt-1 font-semibold">
                  <span>{item.title}</span>
                  <span className="text-xs">↗</span>
                </div>
                <p className="mt-1 text-xs text-white/80">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <MetricCard
          title="Total Expenses"
          main="$34.566"
          trend="↑"
          isPositive
          subtitle="vs. previous month"
          icon="👜"
        />
        <MetricCard
          title="Forecasted Expenses"
          main="$11.290"
          trend="↻"
          isPositive
          subtitle="vs. previous month"
          icon="📎"
        />
        <MetricCard
          title="Projected Expenses"
          main="$9.870"
          trend="↓"
          isPositive={false}
          subtitle="vs. previous month"
          icon="🧮"
        />
      </div>
    </div>
  );
}

function ReportTab({ label, active }) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${
        active
          ? "bg-[#dbe8c4] border-[#c5d5a4] text-[#1b1d12]"
          : "bg-white border-[#dde1d0] text-[#424633]"
      }`}
    >
      {label}
    </button>
  );
}

function MetricCard({ title, main, trend, isPositive, subtitle, icon }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#eceee4] px-6 py-5 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-gray-700 font-medium">{title}</p>
        {icon && (
          <div className="w-8 h-8 rounded-full bg-[#f1f4e5] flex items-center justify-center text-lg">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight">{main}</span>
          <span
            className={`text-sm font-semibold ${
              isPositive ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {trend}
          </span>
        </div>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </section>
  );
}
