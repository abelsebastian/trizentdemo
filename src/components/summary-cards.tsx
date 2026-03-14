import React from 'react';
import { SummaryCard } from '../types';

interface SummaryCardsProps {
  cards: SummaryCard[];
  activeFilter: string | null;
  onFilterClick: (status: string | null) => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ cards, activeFilter, onFilterClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
      {cards.map((card, i) => (
        <button
          key={i}
          onClick={() => card.status && onFilterClick(activeFilter === card.status ? null : card.status)}
          className={`bg-white p-6 sm:p-8 rounded-2xl border-t-[5px] ${card.color} shadow-sm flex flex-col text-left gap-1 hover:shadow-md transition-all group ${
            activeFilter === card.status ? 'ring-2 ring-offset-2 ring-slate-200' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <p className="text-[10px] sm:text-[11px] font-black text-[#898583] uppercase tracking-[0.2em]">{card.label}</p>
            <span
              className={`material-symbols-outlined text-xl sm:text-2xl transition-colors ${
                activeFilter === card.status ? 'text-[#374355]' : 'text-[#D8DADD] group-hover:text-[#69727F]'
              }`}
            >
              {card.icon}
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-[#374355] mt-2">{card.value}</p>
          <p className="text-[9px] sm:text-[10px] font-black text-[#898583] uppercase mt-3 sm:mt-4 italic tracking-[0.1em]">{card.trend}</p>
        </button>
      ))}
    </div>
  );
};
