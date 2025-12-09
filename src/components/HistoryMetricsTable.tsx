import React from "react";
import { Info } from "lucide-react";

const HistoryMetricsTable = () => {
  return (
    <div className="bg-white dark:bg-dashboard-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">History Metrics</h3>
        <Info className="text-gray-400" size={20} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-gray-100 dark:bg-[#1f2942] text-gray-900 dark:text-white font-semibold">
            <tr>
              <th className="px-6 py-4 text-left rounded-l-lg">Category</th>
              <th className="px-6 py-4 text-left">Sub-Category</th>
              <th className="px-6 py-4 text-left">Last Year ($)</th>
              <th className="px-6 py-4 text-left">Budgeted ($)</th>
              <th className="px-6 py-4 text-left">Current Year ($)</th>
              <th className="px-6 py-4 text-left">Variance</th>
              <th className="px-6 py-4 text-left rounded-r-lg">YoY %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            <tr>
              <td className="px-6 py-4">Totals</td>
              <td className="px-6 py-4">Overall Sales</td>
              <td className="px-6 py-4">1,10,000</td>
              <td className="px-6 py-4">1,00,000</td>
              <td className="px-6 py-4">3,10,000</td>
              <td className="px-6 py-4">+0</td>
              <td className="px-6 py-4 text-green-500 font-medium">+10%</td>
            </tr>
            <tr>
              <td className="px-6 py-4">Top Performers</td>
              <td className="px-6 py-4">Electronics</td>
              <td className="px-6 py-4">4,000</td>
              <td className="px-6 py-4">6,000</td>
              <td className="px-6 py-4">6,000</td>
              <td className="px-6 py-4">-400</td>
              <td className="px-6 py-4 text-red-500 font-medium">-4%</td>
            </tr>
            <tr>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Grocery</td>
              <td className="px-6 py-4">3,000</td>
              <td className="px-6 py-4">4,000</td>
              <td className="px-6 py-4">4600</td>
              <td className="px-6 py-4">+3000</td>
              <td className="px-6 py-4 text-green-500 font-medium">+14%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryMetricsTable;