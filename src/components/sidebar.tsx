import React, { useState } from 'react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [inventoryExpanded, setInventoryExpanded] = useState(true);

  const isActive = (view: string) => currentView === view;



  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar shadow-sm h-screen">
      <div className="px-10 py-12">
        <h1 className="text-4xl font-black text-[#2D3E50] tracking-tighter">MPATS</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {/* Dashboard - Disabled */}
        <div className="w-full flex items-center gap-4 px-4 py-3 text-sm rounded-xl mb-1 text-slate-300 cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined text-[24px] text-slate-300">dashboard</span>
          Dashboard
          <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2 py-0.5 rounded">
            Demo
          </span>
        </div>

        {/* GPT Test - Disabled */}
        <div className="w-full flex items-center gap-4 px-4 py-3 text-sm rounded-xl mb-1 text-slate-300 cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined text-[24px] text-slate-300">science</span>
          GPT Test
          <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2 py-0.5 rounded">
            Demo
          </span>
        </div>

        {/* Inventory Section - Only Media Powder is Active */}
        <div>
          <button
            onClick={() => setInventoryExpanded(!inventoryExpanded)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all rounded-xl mb-1 ${
              currentView === 'inventory-powder' ? 'text-[#FF7043] font-bold' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <span
                className={`material-symbols-outlined text-[24px] ${
                  currentView === 'inventory-powder' ? 'text-[#FF7043]' : 'text-slate-400'
                }`}
              >
                assignment_turned_in
              </span>
              Inventory
            </div>
            <span className={`material-symbols-outlined text-lg transition-transform ${inventoryExpanded ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          {inventoryExpanded && (
            <div className="ml-12 space-y-1 mb-2">
              {/* Media Powder - Active and Clickable */}
              <button
                onClick={() => onViewChange('inventory-powder')}
                className={`w-full text-left px-4 py-2 text-xs font-bold transition-all rounded-lg ${
                  isActive('inventory-powder') ? 'text-[#FF7043] bg-orange-50/50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                Media Powder
              </button>
              
              {/* Solutions - Disabled */}
              <div className="w-full text-left px-4 py-2 text-xs font-bold rounded-lg text-slate-300 cursor-not-allowed opacity-50 flex items-center justify-between">
                Solutions
                <span className="text-[7px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">
                  Soon
                </span>
              </div>
              
              {/* Containers - Disabled */}
              <div className="w-full text-left px-4 py-2 text-xs font-bold rounded-lg text-slate-300 cursor-not-allowed opacity-50 flex items-center justify-between">
                Containers
                <span className="text-[7px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">
                  Soon
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Media Prep Batch - Disabled */}
        <div className="w-full flex items-center gap-4 px-4 py-3 text-sm rounded-xl mb-1 text-slate-300 cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined text-[24px] text-slate-300">layers</span>
          Media Prep Batch
          <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2 py-0.5 rounded">
            Demo
          </span>
        </div>

        {/* Post Autoclave Process - Disabled */}
        <div className="w-full flex items-center gap-4 px-4 py-3 text-sm rounded-xl mb-1 text-slate-300 cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined text-[24px] text-slate-300">autostop</span>
          Post Autoclave Process
          <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2 py-0.5 rounded">
            Demo
          </span>
        </div>

        {/* Reconciliation - Disabled */}
        <div className="w-full flex items-center gap-4 px-4 py-3 text-sm rounded-xl mb-1 text-slate-300 cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined text-[24px] text-slate-300">balance</span>
          Reconciliation
          <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2 py-0.5 rounded">
            Demo
          </span>
        </div>

        {/* Reports - Disabled */}
        <div className="w-full flex items-center gap-4 px-4 py-3 text-sm rounded-xl mb-1 text-slate-300 cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined text-[24px] text-slate-300">bar_chart</span>
          Reports
          <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2 py-0.5 rounded">
            Demo
          </span>
        </div>

        {/* Product Master - Disabled */}
        <div className="w-full flex items-center gap-4 px-4 py-3 text-sm rounded-xl mb-1 text-slate-300 cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined text-[24px] text-slate-300">fact_check</span>
          Product Master
          <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2 py-0.5 rounded">
            Demo
          </span>
        </div>
      </nav>
    </aside>
  );
};
