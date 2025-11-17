import React from "react";

const companyInfo = {
  name: "Cat Company Ltd.",
  totalBalance1: "€34.500",
  totalBalance2: "€34.500",
  totalBalance3: "€34.500",
};

const users = [
  {
    name: "Ben German",
    employmentType: "Full-Time",
    position: "CFO",
    access: "Full",
  },
  {
    name: "Phillipa Jones",
    employmentType: "Full-Time",
    position: "Operations",
    access: "Full",
  },
  {
    name: "Dan Brown",
    employmentType: "Full-Time",
    position: "Finance",
    access: "Full",
  },
];

export default function CompanyAndUsersPage() {
  return (
    <div className="space-y-7">
      <h1 className="text-3xl font-extrabold tracking-tight">Company and users</h1>

      {/* Company section */}
      <div className="space-y-4">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dbe8c4] border border-[#c5d5a4] text-sm font-semibold">
          <span>+ Add company</span>
        </button>

        <section className="bg-[#fafbf7] rounded-2xl border border-[#eceee4] px-6 py-4 flex items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-[#dbe8c4] flex items-center justify-center text-xl">
            🐱
          </div>
          <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
            <div className="font-semibold text-gray-800">{companyInfo.name}</div>
            <div className="flex flex-wrap gap-8 text-xs md:text-sm text-gray-700">
              <div>
                <p className="font-semibold text-[11px] uppercase text-gray-500 tracking-wide">
                  Total balance
                </p>
                <p>{companyInfo.totalBalance1}</p>
              </div>
              <div>
                <p className="font-semibold text-[11px] uppercase text-gray-500 tracking-wide">
                  Total balance
                </p>
                <p>{companyInfo.totalBalance2}</p>
              </div>
              <div>
                <p className="font-semibold text-[11px] uppercase text-gray-500 tracking-wide">
                  Total balance
                </p>
                <p>{companyInfo.totalBalance3}</p>
              </div>
            </div>
          </div>
          <button className="text-gray-500 text-sm">✎</button>
        </section>
      </div>

      {/* Users section */}
      <div className="space-y-4">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dbe8c4] border border-[#c5d5a4] text-sm font-semibold">
          <span>+ Add company</span>
        </button>

        <div className="space-y-3">
          {users.map((user) => (
            <section
              key={user.name}
              className="bg-[#fafbf7] rounded-2xl border border-[#eceee4] px-6 py-4 flex items-center gap-6"
            >
              <div className="w-12 h-12 rounded-full bg-[#dbe8c4] flex items-center justify-center text-lg font-semibold">
                {user.name.charAt(0)}
              </div>

              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
                <div className="font-semibold text-gray-800">{user.name}</div>

                <div className="flex flex-wrap gap-8 text-xs md:text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-[11px] uppercase text-gray-500 tracking-wide">
                      Employment Type
                    </p>
                    <p>{user.employmentType}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[11px] uppercase text-gray-500 tracking-wide">
                      Position
                    </p>
                    <p>{user.position}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[11px] uppercase text-gray-500 tracking-wide">
                      Access
                    </p>
                    <p>{user.access}</p>
                  </div>
                </div>
              </div>

              <button className="text-gray-500 text-sm">✎</button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
