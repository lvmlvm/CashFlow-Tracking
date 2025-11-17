import React from "react";

const calendarWeeks = [
  [
    { day: 27, isCurrentMonth: false, events: [] },
    { day: 28, isCurrentMonth: false, events: [] },
    { day: 29, isCurrentMonth: false, events: [] },
    { day: 30, isCurrentMonth: false, events: [{ amount: "+€3.400", positive: true }] },
    { day: 31, isCurrentMonth: false, events: [] },
    { day: 1,  isCurrentMonth: true,  events: [] },
    { day: 2,  isCurrentMonth: true,  events: [] },
  ],
  [
    { day: 3, isCurrentMonth: true, events: [] },
    { day: 4, isCurrentMonth: true, events: [{ amount: "-€4.500", positive: false }] },
    { day: 5, isCurrentMonth: true, events: [] },
    { day: 6, isCurrentMonth: true, events: [] },
    { day: 7, isCurrentMonth: true, events: [{ amount: "+€300", positive: true }, { amount: "+€450", positive: true }] },
    { day: 8, isCurrentMonth: true, events: [] },
    { day: 9, isCurrentMonth: true, events: [] },
  ],
  [
    { day: 10, isCurrentMonth: true, events: [{ amount: "+€13.500", positive: true }, { amount: "+€4.900", positive: true }] },
    { day: 11, isCurrentMonth: true, events: [] },
    { day: 12, isCurrentMonth: true, events: [{ amount: "+€19.000", positive: true }] },
    { day: 13, isCurrentMonth: true, events: [] },
    { day: 14, isCurrentMonth: true, events: [] },
    { day: 15, isCurrentMonth: true, events: [{ amount: "+€4.690", positive: true }, { amount: "-€3.500", positive: false }] },
    { day: 16, isCurrentMonth: true, events: [] },
  ],
  [
    { day: 17, isCurrentMonth: true, events: [{ amount: "-€3.200", positive: false }] },
    { day: 18, isCurrentMonth: true, events: [] },
    { day: 19, isCurrentMonth: true, events: [] },
    { day: 20, isCurrentMonth: true, events: [] },
    { day: 21, isCurrentMonth: true, events: [{ amount: "+€45.900", positive: true }, { amount: "+€11.230", positive: true }] },
    { day: 22, isCurrentMonth: true, events: [] },
    { day: 23, isCurrentMonth: true, events: [] },
  ],
  [
    { day: 24, isCurrentMonth: true, events: [] },
    { day: 25, isCurrentMonth: true, events: [{ amount: "-€23.500", positive: false }, { amount: "-€19.000", positive: false }] },
    { day: 26, isCurrentMonth: true, events: [] },
    { day: 27, isCurrentMonth: true, events: [{ amount: "+€12.300", positive: true }, { amount: "+€9.700", positive: true }] },
    { day: 28, isCurrentMonth: true, events: [] },
    { day: 29, isCurrentMonth: true, events: [] },
    { day: 30, isCurrentMonth: true, events: [] },
  ],
];

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Calendar</h1>

      <div>
        <button className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-[#dbe8c4] border border-[#c5d5a4] text-sm font-semibold">
          <span className="text-lg leading-none">‹</span>
          <span>March 2023</span>
          <span className="text-lg leading-none">›</span>
        </button>
      </div>

      <section className="bg-white rounded-2xl shadow-sm border border-[#eceee4] overflow-hidden">
        <div className="grid grid-cols-7 border-b border-[#f0f1ea] text-xs font-semibold text-gray-500">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div key={d} className="px-4 py-3 text-center">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 grid-rows-5 text-xs">
          {calendarWeeks.map((week, rowIdx) =>
            week.map((day, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="min-h-[110px] border-b border-[#f2f3ea] border-r last:border-r-0 px-3 py-2 bg-[#fafbf7]"
              >
                <div
                  className={`text-xs ${
                    day.isCurrentMonth ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {day.day}
                </div>
                <div className="mt-2 space-y-1">
                  {day.events.map((ev, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-1 text-[11px] ${
                        ev.positive ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          ev.positive ? "bg-emerald-600" : "bg-red-500"
                        }`}
                      />
                      <span>{ev.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
