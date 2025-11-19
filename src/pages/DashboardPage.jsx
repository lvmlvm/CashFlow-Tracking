import React, { useState, useMemo } from "react";

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

// Chart colors
const CHART_COLORS = {
  income: "#0ffa0fff",
  expenses: "#eb1515ff"
};

// Generate data for the current month up to today
function generateMonthData() {
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  const income = [];
  const expenses = [];
  
  for (let i = 1; i <= daysInMonth; i++) {
    if (i <= currentDay) {
      // Generate realistic fluctuating data
      income.push(2000 + Math.sin(i / 3) * 800 + Math.random() * 500);
      expenses.push(1200 + Math.cos(i / 4) * 600 + Math.random() * 400);
    } else {
      income.push(null);
      expenses.push(null);
    }
  }
  
  return { income, expenses, currentDay, daysInMonth };
}

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
  // Use useMemo to generate data only once
  const { income, expenses, currentDay, daysInMonth } = useMemo(() => generateMonthData(), []);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  // Find max value for scaling
  const maxValue = Math.max(...income.filter(v => v !== null), ...expenses.filter(v => v !== null));
  
  // Convert values to SVG coordinates
  const toY = (value) => {
    if (value === null) return null;
    return 180 - (value / maxValue) * 160; // 180 is height, leaving 20px padding
  };
  
  // Create path data
  const createPath = (data) => {
    const points = data
      .map((value, i) => {
        if (value === null) return null;
        const x = (i / (daysInMonth - 1)) * 100; // percentage
        const y = toY(value);
        return `${x},${y}`;
      })
      .filter(p => p !== null);
    
    return points.length > 0 ? `M${points.join(' L')}` : '';
  };
  
  const incomePath = createPath(income);
  const expensesPath = createPath(expenses);
  
  // Get last valid point for each line
  const lastIncomeIndex = income.findLastIndex(v => v !== null);
  const lastExpenseIndex = expenses.findLastIndex(v => v !== null);
  
  const lastIncomeX = (lastIncomeIndex / (daysInMonth - 1)) * 100;
  const lastIncomeY = toY(income[lastIncomeIndex]);
  
  const lastExpenseX = (lastExpenseIndex / (daysInMonth - 1)) * 100;
  const lastExpenseY = toY(expenses[lastExpenseIndex]);
  
  // Handle mouse move to find closest point
  const handleMouseMove = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    
    // Find closest day
    const day = Math.round((x / 100) * (daysInMonth - 1));
    
    if (day >= 0 && day < currentDay && income[day] !== null) {
      setHoveredPoint({
        day: day + 1,
        x: (day / (daysInMonth - 1)) * 100,
        income: income[day],
        incomeY: toY(income[day]),
        expenses: expenses[day],
        expensesY: toY(expenses[day])
      });
    }
  };
  
  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#eceee4] px-8 py-7 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Inflow &amp; Income</h2>
        <div className="flex items-center gap-4 text-xs">
          <LegendDot label="Income" color={CHART_COLORS.income} />
          <LegendDot label="Expenses" color={CHART_COLORS.expenses} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end relative">
        <svg 
          viewBox="0 0 100 180" 
          className="w-full h-48" 
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y * 1.8}
              x2="100"
              y2={y * 1.8}
              stroke="#60615dff"
              strokeWidth="0.2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          
          {/* Expenses line */}
          <path
            d={expensesPath}
            fill="none"
            stroke={CHART_COLORS.expenses}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Income line */}
          <path
            d={incomePath}
            fill="none"
            stroke={CHART_COLORS.income}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* End point circles - using ellipse to prevent squashing */}
          <ellipse
            cx={lastIncomeX}
            cy={lastIncomeY}
            rx="0.4"
            ry="2"
            fill="white"
            stroke={CHART_COLORS.income}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
          
          <ellipse
            cx={lastExpenseX}
            cy={lastExpenseY}
            rx="0.4"
            ry="2"
            fill="white"
            stroke={CHART_COLORS.expenses}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Current day indicator */}
          <line
            x1={(currentDay / daysInMonth) * 100}
            y1="0"
            x2={(currentDay / daysInMonth) * 100}
            y2="180"
            stroke="#a4bc7a"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="2,2"
          />
          
          {/* Hover indicators */}
          {hoveredPoint && (
            <g>
              {/* Income hover point */}
              <ellipse
                cx={hoveredPoint.x}
                cy={hoveredPoint.incomeY}
                rx="0.3"
                ry="1.5"
                fill={CHART_COLORS.income}
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Expenses hover point */}
              <ellipse
                cx={hoveredPoint.x}
                cy={hoveredPoint.expensesY}
                rx="0.3"
                ry="1.5"
                fill={CHART_COLORS.expenses}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )}
        </svg>
        
        {/* Hover tooltip */}
        {hoveredPoint && (
          <div 
            className="absolute bg-white border border-[#e2e4db] rounded-lg shadow-lg px-3 py-2 text-xs pointer-events-none z-10"
            style={{
              left: `${hoveredPoint.x}%`,
              top: `${Math.min(hoveredPoint.incomeY, hoveredPoint.expensesY) / 180 * 100}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <div className="font-semibold mb-1">Day {hoveredPoint.day}</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS.income }} />
                <span>Income: €{Math.round(hoveredPoint.income).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS.expenses }} />
                <span>Expenses: €{Math.round(hoveredPoint.expenses).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-[10px] text-gray-400">
          {[1, 5, 10, 15, 20, 25, daysInMonth].map(day => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function LegendDot({ label, color }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
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
