import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search by lot number, media name, or manufacturer...' 
}) => {
  return (
    <div className="relative flex-1 w-full sm:max-w-md">
      <span className="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg sm:text-xl">
        search
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white border border-slate-100 rounded-xl text-xs sm:text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
