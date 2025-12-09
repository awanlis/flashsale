"use client";

import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Info } from "lucide-react";
import SalesChart from "@/components/SalesChart";
import SalesForecastTable from "@/components/SalesForecastTable";
import TopProductsChart from "@/components/TopProductsChart";
import HistoryMetricsTable from "@/components/HistoryMetricsTable";

// Styles for React Grid Layout (we added custom ones in globals.css, 
// but we still need the structure)
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardGrid({ kpiCards, bigCard }: { kpiCards: React.ReactNode[], bigCard: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Initial Layout Definition
  // 12 Column Grid System
  const defaultLayouts = {
    lg: [
      { i: "big-card", x: 0, y: 0, w: 6, h: 2 },
      { i: "kpi-0", x: 6, y: 0, w: 3, h: 1 },
      { i: "kpi-1", x: 9, y: 0, w: 3, h: 1 },
      { i: "kpi-2", x: 6, y: 1, w: 3, h: 1 },
      { i: "kpi-3", x: 9, y: 1, w: 3, h: 1 },
      { i: "sales-overview", x: 0, y: 2, w: 12, h: 4 }, // Increased height for chart
      { i: "sales-forecast", x: 0, y: 6, w: 5, h: 4 },
      { i: "top-products", x: 5, y: 6, w: 7, h: 4 },
      { i: "history", x: 0, y: 10, w: 12, h: 3 },
    ],
    // Fallback for smaller screens (stacking mostly)
    md: [
      { i: "big-card", x: 0, y: 0, w: 12, h: 2 },
      { i: "kpi-0", x: 0, y: 2, w: 6, h: 1 },
      { i: "kpi-1", x: 6, y: 2, w: 6, h: 1 },
      { i: "kpi-2", x: 0, y: 3, w: 6, h: 1 },
      { i: "kpi-3", x: 6, y: 3, w: 6, h: 1 },
      { i: "sales-overview", x: 0, y: 4, w: 12, h: 4 },
      { i: "sales-forecast", x: 0, y: 8, w: 6, h: 4 },
      { i: "top-products", x: 6, y: 8, w: 6, h: 4 },
      { i: "history", x: 0, y: 12, w: 12, h: 3 },
    ],
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-10">Loading Dashboard...</div>;

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={defaultLayouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={150} // Base height unit
      margin={[24, 24]} // Gap between items
      isDraggable={true}
      isResizable={true}
      draggableHandle=".drag-handle" // Only drag from specific area to prevent accidental drags
    >
      {/* 1. BIG MAIN CARD */}
      <div key="big-card" className="bg-white dark:bg-dashboard-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
        <div className="drag-handle h-6 w-full cursor-move bg-gray-50 dark:bg-white/5 hover:bg-gray-100 flex justify-center items-center">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex-1 p-4 relative">
            {bigCard}
        </div>
      </div>

      {/* 2. KPI CARDS */}
      {kpiCards.map((card, index) => (
        <div key={`kpi-${index}`} className="bg-white dark:bg-dashboard-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
           <div className="drag-handle h-6 w-full cursor-move bg-gray-50 dark:bg-white/5 hover:bg-gray-100 flex justify-center items-center">
                <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
           </div>
           <div className="flex-1 p-4 flex flex-col justify-center">
             {card}
           </div>
        </div>
      ))}

      {/* 3. SALES OVERVIEW CHART */}
      <div key="sales-overview" className="bg-white dark:bg-dashboard-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
        <div className="drag-handle p-4 cursor-move flex justify-between items-center border-b border-gray-100 dark:border-white/5">
            <h2 className="text-xl font-semibold">Sales Overview</h2>
            <div className="flex items-center gap-4 w-full sm:w-auto">
               <Info className="text-gray-400" size={20} />
            </div>
        </div>
        
        <div className="flex-1 p-6 flex flex-col">
             {/* Legend */}
             <div className="flex justify-center gap-6 mb-4 text-xs">
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Current Sales
                </div>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-blue-500"></span> Target Sales
                </div>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-purple-500"></span> Forecast Sales
                </div>
             </div>
             {/* D3 Chart Component - it will fill the flex-1 height */}
             <div className="flex-1 min-h-0">
                <SalesChart />
             </div>
        </div>
      </div>

      {/* 4. SALES FORECAST TABLE */}
      <div key="sales-forecast" className="overflow-hidden">
         {/* We wrap the existing component but add the handle class to it via a wrapper if needed, 
             or just rely on the wrapper div here. */}
         <div className="bg-white dark:bg-dashboard-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm h-full flex flex-col">
            <div className="drag-handle h-6 w-full cursor-move bg-gray-50 dark:bg-white/5 hover:bg-gray-100 flex justify-center items-center">
                <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex-1 overflow-auto">
                <SalesForecastTable />
            </div>
         </div>
      </div>

      {/* 5. TOP PRODUCTS CHART */}
      <div key="top-products" className="bg-white dark:bg-dashboard-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
         <div className="drag-handle p-4 cursor-move flex justify-between items-center">
            <h3 className="text-xl font-semibold">Top Products</h3>
            <Info className="text-gray-400" size={20} />
         </div>
         <div className="flex-1 p-4 min-h-0">
            <TopProductsChart />
         </div>
      </div>

      {/* 6. HISTORY METRICS */}
      <div key="history" className="overflow-hidden">
        <div className="bg-white dark:bg-dashboard-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm h-full flex flex-col">
            <div className="drag-handle h-6 w-full cursor-move bg-gray-50 dark:bg-white/5 hover:bg-gray-100 flex justify-center items-center">
                <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex-1 overflow-auto">
                <HistoryMetricsTable />
            </div>
        </div>
      </div>

    </ResponsiveGridLayout>
  );
}