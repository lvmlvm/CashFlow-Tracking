import React, { useState } from "react";

const transactionRows = [
  { date: "14/11/23", amount: "+€2.011", positive: true, account: "Cash",         counterparty: "Company Co.",   tag: "Stocks" },
  { date: "14/11/23", amount: "+€198",   positive: true, account: "Vault",        counterparty: "Acme",          tag: "Subscription" },
  { date: "15/11/23", amount: "-€690",   positive: false, account: "Bank Account", counterparty: "Streamio",      tag: "Supplier" },
  { date: "15/11/23", amount: "+€1.380", positive: true, account: "Bank Account", counterparty: "Cafio",         tag: "Supplier" },
  { date: "15/11/23", amount: "-€8.900", positive: false, account: "Vault",       counterparty: "Insurance Co.", tag: "Investment" },
  { date: "16/11/23", amount: "+€5.931", positive: true, account: "Cash",         counterparty: "-",             tag: "Savings" },
  { date: "16/11/23", amount: "-€340",   positive: false, account: "Vault",       counterparty: "-",             tag: "Savings" },
  { date: "17/11/23", amount: "-€1.200", positive: false, account: "Bank Account", counterparty: "Supply Co.",    tag: "Supplier" },
  { date: "17/11/23", amount: "+€8.305", positive: true, account: "Bank Account", counterparty: "Insurance Co.", tag: "Client" },
  { date: "17/11/23", amount: "-€450",   positive: false, account: "Cash",        counterparty: "Post Office",   tag: "Admin" },
  { date: "18/11/23", amount: "-€250",   positive: false, account: "Bank Account", counterparty: "Client",        tag: "Supplier" },
  { date: "18/11/23", amount: "+€1.380", positive: true, account: "Bank Account", counterparty: "Cafio",         tag: "Supplier" },
  { date: "18/11/23", amount: "-€460",   positive: false, account: "Cash",        counterparty: "Insurance Co.", tag: "Investment" },
];

export default function TransactionsPage() {
  const [modalType, setModalType] = useState(null); // "income" | "expense" | null

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Transactions</h1>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#525b39] text-white text-sm font-semibold">
            <span>All time</span>
            <span className="text-xs">▾</span>
          </button>

          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#dde1d0] text-sm">
              <span className="text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search transactions and actions"
                className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            onClick={() => setModalType("income")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dbe8c4] text-sm font-semibold border border-[#c5d5a4]"
          >
            <span>+ Add income</span>
          </button>
          <button
            onClick={() => setModalType("expense")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-sm font-semibold border border-[#dde1d0]"
          >
            <span>− Add expense</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#525b39] text-white text-sm font-semibold">
            <span>Filter</span>
            <span className="text-xs">⚲</span>
          </button>
        </div>
      </div>

      <section className="bg-white rounded-2xl shadow-sm border border-[#eceee4] overflow-hidden">
        <div className="px-6 pt-3 pb-2 border-b border-[#f0f1ea]">
          <div className="grid grid-cols-[32px,110px,140px,1fr,1.2fr,140px] text-xs font-semibold text-gray-500 items-center">
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
            </div>
            <div>Date</div>
            <div>Amount</div>
            <div>Account</div>
            <div>Counterparty</div>
            <div>Tag</div>
          </div>
        </div>

        <div className="divide-y divide-[#f3f4ec]">
          {transactionRows.map((row, idx) => (
            <div
              key={idx}
              className="px-6 py-2 text-sm hover:bg-[#f7f8f3] transition"
            >
              <div className="grid grid-cols-[32px,110px,140px,1fr,1.2fr,140px] items-center">
                <div>
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                </div>
                <div className="text-gray-700">{row.date}</div>
                <div
                  className={`font-semibold ${
                    row.positive ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {row.amount}
                </div>
                <div>{row.account}</div>
                <div>{row.counterparty}</div>
                <div className="flex justify-start">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs bg-[#e4efcf] text-[#424633]">
                    {row.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalType && (
        <TransactionModal
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}

function TransactionModal({ type, onClose }) {
  const isIncome = type === "income";

  const title = isIncome ? "New income" : "New expense";
  const accountLabel = isIncome ? "To account" : "From account";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-xl px-10 py-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-3xl font-extrabold tracking-tight mb-6">
          {title}
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              {accountLabel}
            </label>
            <select className="w-full rounded-xl border border-[#dde1d0] bg-[#fafbf7] px-4 py-2 outline-none">
              <option>Choose account</option>
              <option>Bank Account</option>
              <option>Vault</option>
              <option>Cash</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Tag
            </label>
            <select className="w-full rounded-xl border border-[#dde1d0] bg-[#fafbf7] px-4 py-2 outline-none">
              <option>Choose tag</option>
              <option>Supplier</option>
              <option>Client</option>
              <option>Investment</option>
              <option>Savings</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Counterparty
            </label>
            <input
              type="text"
              placeholder="Counterparty"
              className="w-full rounded-xl border border-[#dde1d0] bg-[#fafbf7] px-4 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full rounded-xl border border-[#dde1d0] bg-[#fafbf7] px-4 py-2 outline-none"
            />
          </div>

          <div className="grid grid-cols-[2fr,1fr] gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Amount
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-xl border border-[#dde1d0] bg-[#fafbf7] px-4 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Currency
              </label>
              <select className="w-full rounded-xl border border-[#dde1d0] bg-[#fafbf7] px-4 py-2 outline-none">
                <option>EUR</option>
                <option>USD</option>
                <option>GBP</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#dbe8c4] hover:bg-[#cfddb4] text-sm font-semibold py-3"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
