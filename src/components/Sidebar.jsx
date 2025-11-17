import React from "react";

export default function Sidebar({ activePage, onChangePage }) {
  return (
    <aside className="w-72 bg-white border-r border-[#e2e4db] flex flex-col justify-between">
      <nav className="px-8 pt-8 space-y-2">
        <SidebarItem
          label="Dashboard"
          icon="🏠"
          active={activePage === "dashboard"}
          onClick={() => onChangePage("dashboard")}
          variant="pill"
        />
        <SidebarItem
          label="Transactions"
          icon="€"
          active={activePage === "transactions"}
          onClick={() => onChangePage("transactions")}
          variant="block"
        />
        <SidebarItem label="Invoices" icon="🧾" />
        <SidebarItem
          label="Reports"
          icon="📊"
          active={activePage === "reports"}
          onClick={() => onChangePage("reports")}
          variant="block"
        />
        <SidebarItem
          label="Calendar"
          icon="📅"
          active={activePage === "calendar"}
          onClick={() => onChangePage("calendar")}
          variant="block"
        />
        <SidebarItem
          label="Company and users"
          icon="🏢"
          active={activePage === "company"}
          onClick={() => onChangePage("company")}
          variant="block"
        />
      </nav>

      <div className="px-8 pb-10 mt-8">
        <div className="border-t border-[#e2e4db] pt-6">
          <p className="text-sm text-gray-500 mb-1">Total on your accounts</p>
          <p className="text-3xl font-extrabold tracking-tight">€35.927</p>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ label, icon, active, onClick, variant = "pill" }) {
  const base =
    "w-full flex items-center gap-3 text-sm font-medium rounded-full px-3 py-2 transition cursor-pointer";
  const pillActive = "bg-[#1b1d12] text-white shadow-sm";
  const blockActive =
    "bg-[#e2f0c8] text-[#1b1d12] shadow-sm border border-[#cfdfae]";
  const inactive = "text-[#1b1d12] hover:bg-[#f2f4ea]";

  const activeClass = variant === "block" ? blockActive : pillActive;

  return (
    <button
      onClick={onClick}
      className={`${base} ${active ? activeClass : inactive}`}
    >
      <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#e7efcf] text-base">
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
