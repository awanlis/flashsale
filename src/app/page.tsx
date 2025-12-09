"use client";

import { 
  Zap, LayoutDashboard, BarChart3, Settings, 
  Bell, Filter, Moon, Sun, Eye, Info 
} from "lucide-react";
import { useTheme } from "next-themes";
import SalesChart from "@/components/SalesChart";
import SalesForecastTable from "@/components/SalesForecastTable";
import TopProductsChart from "@/components/TopProductsChart";
import HistoryMetricsTable from "@/components/HistoryMetricsTable";
import { useState, useEffect } from "react";
import Image from "next/image";


export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch for theme icon
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-dashboard-dark text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-gray-200 dark:border-white/5 bg-white dark:bg-dashboard-dark flex-shrink-0 hidden md:flex flex-col fixed h-full top-0 left-0 z-10">
        <div className="p-6 flex items-center gap-2">
          {/* Logo */}
          <img className="w-[132px] cursor-pointer" src="./logo.svg" alt="" />
          {/* <img className="w-[180px] cursor-pointer" src="./flash-sale.svg" alt="" /> */}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<Zap size={20} />} label="Flash Sales" active />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 overflow-hidden border-2 border-indigo-500">
                {/* Placeholder Image - replace src with your actual image path */}
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                  alt="Admin" 
                  className="w-full h-full object-cover"
                />
             </div>
             <div>
                <div className="font-semibold text-sm">Admin</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">admin@makro.co.th</div>
             </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-300">
        
        {/* HEADER */}
        <header className="px-8 py-6 border-b border-gray-200 dark:border-white/5 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">Flash Sales Report</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Dashboard</p>
          </div>
          <div className="flex flex-col items-end gap-1">
             <div className="text-xs text-gray-500 dark:text-gray-400">Current Time</div>
             <div className="text-sm font-medium"><CurrentTime /></div>
             <div className="absolute top-9 right-62 p-2 bg-gray-200 dark:bg-dashboard-card rounded-full cursor-pointer hover:opacity-80">
                <Bell size={18} />
                <span className="absolute top-1 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-dashboard-dark"></span>
             </div>
          </div>
        </header>

        {/* CONTENT SCROLLABLE AREA */}
        <div className="flex-1 overflow-auto p-8 space-y-6">
          
          {/* TOP CONTROLS */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-red-400 font-medium">
              <Eye size={16} />
              <div className="text-sm text-gray-500 dark:text-gray-400">1.6k live viewers</div>
            </div>
            
            <div className="flex gap-3">
              {mounted && (
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 cursor-pointer rounded bg-gray-200 dark:bg-dashboard-card hover:bg-gray-300 dark:hover:bg-white/10 transition"
                >
                  {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              )}
              <button className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-dashboard-card hover:bg-gray-300 dark:hover:bg-white/10 transition text-sm font-medium">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>

          {/* KPI GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* BIG MAIN CARD */}
            <div className="lg:col-span-2 bg-white dark:bg-dashboard-card rounded-xl p-6 border border-gray-200 dark:border-white/5 shadow-sm relative overflow-hidden">
               <div className="text-center mt-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 mb-2">
                     <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span> Current Sales
                  </div>
                  <div className="text-5xl font-bold mb-8">$49,500</div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                     <div>
                        <div className="text-dashboard-success font-bold text-lg">+65%</div>
                        <div className="text-gray-500 dark:text-gray-400">vs last year (same time)</div>
                     </div>
                     <div>
                        <div className="text-dashboard-danger font-bold text-lg">-10%</div>
                        <div className="text-gray-500 dark:text-gray-400">Target change</div>
                     </div>
                     <div>
                        <div className="text-dashboard-success font-bold text-lg">+5%</div>
                        <div className="text-gray-500 dark:text-gray-400">Forecast change</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* SMALLER CARDS GRID */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
               <KpiCard label="Targeted Sales" value="$55,000" />
               <KpiCard label="Last Year Sales" value="$2,10,000" />
               <KpiCard label="Forecast Sales" value="$52,000" />
               <KpiCard label="Sales / Hour" value="$2,300" />
            </div>
          </div>

          {/* CHART SECTION */}
          <div className="bg-white dark:bg-dashboard-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm p-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                   <h2 className="text-xl font-semibold">Sales Overview</h2>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                   {/* Dropdown Mock */}
                   <div className="relative">
                      <select className="cursor-pointer appearance-none bg-gray-100 dark:bg-[#1f2942] text-sm px-4 py-2 pr-8 rounded border border-gray-200 dark:border-white/10 outline-none focus:ring-2 ring-blue-500">
                         <option>15 Minutes</option>
                         <option>1 Hour</option>
                         <option>1 Day</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                         <svg className="w-3 h-3 fill-current opacity-70" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                   </div>
                   <Info className="text-gray-400" size={20} />
                </div>
             </div>
             
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

             {/* D3 Chart Component */}
             <div className="w-full">
                <SalesChart />
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <SalesForecastTable />
            </div>
            <div className="lg:col-span-3 bg-white dark:bg-dashboard-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm p-6">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Top Products</h3>
                  <Info className="text-gray-400" size={20} />
               </div>
               <TopProductsChart />
            </div>
          </div>

          {/* --- NEW SECTION: History Metrics --- */}
          <div>
            <HistoryMetricsTable />
          </div>

        </div>
      </main>
    </div>
  );
}

// Sub-components for cleanliness
function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
      active 
        ? "bg-indigo-600/10 text-indigo-600 dark:bg-[#202840] dark:text-white" 
        : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
    }`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

function CurrentTime() {
  const [formatted, setFormatted] = useState('');

  useEffect(() => {
    const d = new Date();

    const datePart = d.toLocaleDateString('en-GB', {
      day: '2-digit',      // 27
      month: 'long',       // November
      year: 'numeric',     // 2025
    });

    const timePart = d.toLocaleTimeString('en-US', {
      hour: '2-digit',     // 08
      minute: '2-digit',   // 03
      second: '2-digit',   // 34
      hour12: true,        // AM/PM
    });

    setFormatted(`${datePart}, ${timePart}`);
  }, []);

  return (
    <div className="text-sm font-medium">
      {formatted}
    </div>
  );
}

function KpiCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white dark:bg-dashboard-card p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm flex flex-col justify-center">
       <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">{label}</div>
       <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}