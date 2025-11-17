import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import CalendarPage from "./pages/CalendarPage";
import ReportsPage from "./pages/ReportsPage";
import CompanyAndUsersPage from "./pages/CompanyAndUsersPage";


export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f2] text-[#1b1d12]">
      <Header />

      <div className="flex flex-1">
        <Sidebar activePage={activePage} onChangePage={setActivePage} />

        <main className="flex-1 px-10 py-8 overflow-auto">
          {activePage === "dashboard" && <DashboardPage />}
          {activePage === "transactions" && <TransactionsPage />}
          {activePage === "calendar" && <CalendarPage />}
          {activePage === "reports" && <ReportsPage />}
          {activePage === "company" && <CompanyAndUsersPage />}
        </main>
      </div>
    </div>
  );
}

