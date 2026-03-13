import React from 'react';

interface FilterDropdownProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  options: string[];
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ activeFilter, onFilterChange, options }) => {
  return (
    <div className="relative group">
      <button className="p-2.5 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors text-slate-400 shadow-sm flex items-center gap-2">
        <span className="material-symbols-outlined">filter_list</span>
        <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 p-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(activeFilter === option ? null : option)}
            className={`w-full text-left px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeFilter === option ? 'bg-orange-50 text-orange-600' : 'hover:bg-slate-50 text-slate-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
