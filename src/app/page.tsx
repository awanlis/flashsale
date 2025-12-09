"use client";

import { 
  Zap, BarChart3, Settings, 
  Bell, Filter, Moon, Sun, Eye 
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import DashboardGrid from "@/components/DashboardGrid"; // Import the grid

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define the content for the small KPI cards
  const kpiData = [
    { label: "Targeted Sales", value: "$55,000" },
    { label: "Last Year Sales", value: "$2,10,000" },
    { label: "Forecast Sales", value: "$52,000" },
    { label: "Sales / Hour", value: "$2,300" }
  ];

  const kpiCards = kpiData.map((kpi, idx) => (
    <div key={idx} className="flex flex-col justify-center h-full">
       <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">{kpi.label}</div>
       <div className="text-3xl font-bold">{kpi.value}</div>
    </div>
  ));

  // Define content for the Big Card
  const bigCardContent = (
    <div className="text-center mt-2 h-full flex flex-col justify-center">
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span> Current Sales
        </div>
        <div className="text-5xl font-bold mb-6">$49,500</div>
        
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
                <div className="text-dashboard-success font-bold text-lg">+65%</div>
                <div className="text-gray-500 dark:text-gray-400">vs last year</div>
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
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-dashboard-dark text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      
      {/* SIDEBAR (Fixed) */}
      <aside className="w-64 border-r border-gray-200 dark:border-white/5 bg-white dark:bg-dashboard-dark flex-shrink-0 hidden md:flex flex-col fixed h-full top-0 left-0 z-20">
        <div className="p-6 flex items-center gap-2">
          <img className="w-[132px] cursor-pointer" src="/logo.svg" alt="Flash Sale" />
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<Zap size={20} />} label="Flash Sales" active />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 overflow-hidden border-2 border-indigo-500">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover"/>
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
        
        {/* HEADER (Sticky) */}
        <header className="px-8 py-6 border-b border-gray-200 dark:border-white/5 flex justify-between items-start bg-gray-100 dark:bg-dashboard-dark z-30 sticky top-0">
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
        <div className="flex-1 p-8 space-y-6">
          
          {/* TOP CONTROLS */}
          <div className="flex justify-between items-center mb-4">
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

          {/* DRAGGABLE GRID */}
          <DashboardGrid 
            kpiCards={kpiCards} 
            bigCard={bigCardContent} 
          />

        </div>
      </main>
    </div>
  );
}

// Sub-components
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
    setFormatted(`${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}, ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`);
  }, []);
  return <>{formatted}</>;
}