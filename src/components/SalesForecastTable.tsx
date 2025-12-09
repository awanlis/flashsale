import React from "react";
import { Info } from "lucide-react";

const SalesForecastTable = () => {
  const data = [
    { month: "Jan", last: 5000, current: 8000, var: "+ 3%" },
    { month: "Feb", last: 1000, current: 5000, var: "+ 5%" },
    { month: "Mar", last: 4000, current: 6000, var: "- 8%" },
    { month: "Apr", last: 4000, current: 6000, var: "- 7%" },
    { month: "May", last: 4000, current: 6000, var: "+ 8%" },
    { month: "Jun", last: 6000, current: 7000, var: "+ 3%" },
    { month: "Jul", last: 4000, current: 6000, var: "+ 9%" },
  ];

  return (
    <div className="bg-white dark:bg-dashboard-card rounded-xl borderQX border-gray-200 dark:border-white/5 shadow-sm p-6 h-full border border-gray-200 dark:border-white/5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Sales Forecast</h3>
        <Info className="text-gray-400" size={20} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-[#1f2942] text-gray-900 dark:text-white font-semibold rounded-lg">
            <tr>
              <th className="px-4 py-3 text-left rounded-l-lg">Month</th>
              <th className="px-4 py-3 text-right">Last Year ($)</th>
              <th className="px-4 py-3 text-right">Current Year ($)</th>
              <th className="px-4 py-3 text-right rounded-r-lg">Var (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {data.map((row, idx) => (
              <tr key={idx} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition">
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.month}</td>
                <td className="px-4 py-3 text-right">{row.last}</td>
                <td className="px-4 py-3 text-right">{row.current}</td>
                <td className={`px-4 py-3 text-right font-medium ${row.var.includes("-") ? "text-red-500" : "text-green-500"}`}>
                  {row.var}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesForecastTable;