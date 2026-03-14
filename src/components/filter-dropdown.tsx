import React, { useState, useRef, useEffect } from 'react';

interface FilterDropdownProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  options: string[];
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ activeFilter, onFilterChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className={`p-2.5 bg-white border rounded-xl transition-colors shadow-sm flex items-center gap-2 ${
          open ? 'border-[#FF7344] text-[#FF7344]' : 'border-slate-100 text-[#69727F] hover:bg-slate-50'
        }`}
      >
        <span className="material-symbols-outlined">filter_list</span>
        <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 p-2 animate-in zoom-in duration-200">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onFilterChange(activeFilter === option ? null : option);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-between ${
                activeFilter === option
                  ? 'bg-orange-50 text-[#FF7344]'
                  : 'hover:bg-slate-50 text-[#374355]'
              }`}
            >
              {option}
              {activeFilter === option && (
                <span className="material-symbols-outlined text-sm">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
