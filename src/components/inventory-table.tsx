import React from 'react';
import { PowderItem } from '../types';

interface InventoryTableProps {
  items: PowderItem[];
  onViewDetails: (id: string) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ items, onViewDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-[#36405D] text-white">
          <tr className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
            <th className="px-4 sm:px-8 py-4 sm:py-5">Media & Lot Detail</th>
            <th className="px-4 sm:px-8 py-4 sm:py-5">Storage</th>
            <th className="px-4 sm:px-8 py-4 sm:py-5">Stock Level</th>
            <th className="px-4 sm:px-8 py-4 sm:py-5">Status</th>
            <th className="px-4 sm:px-8 py-4 sm:py-5">Expiry</th>
            <th className="px-4 sm:px-8 py-4 sm:py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <div className="flex flex-col">
                    <span className="font-black text-[#374355] text-xs sm:text-sm tracking-tight">{item.name}</span>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1.5">
                      <span className="text-[9px] sm:text-[10px] text-[#69727F] font-bold uppercase tracking-wider">
                        Lot: {item.batch}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                      <span className="text-[9px] sm:text-[10px] text-[#69727F] font-black uppercase tracking-widest">
                        {item.manufacturer}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${
                      item.storage === '2-8°C' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-[#374355]'
                    }`}
                  >
                    {item.storage}
                  </span>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="font-black text-[#374355] text-sm sm:text-base tracking-tight">
                        {item.stock.toLocaleString()} {item.unit}
                      </span>
                    </div>
                    <div className="w-24 sm:w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          item.status === 'Critical' ? 'bg-red-500 w-[15%]' : 'bg-emerald-500 w-[80%]'
                        }`}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest border ${
                      item.status === 'Optimal'
                        ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                        : item.status === 'Critical'
                        ? 'text-red-700 bg-red-50 border-red-100'
                        : 'text-amber-700 bg-amber-50 border-amber-100'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-black text-[#374355] tracking-tight">{item.expiry}</span>
                    <span className="text-[8px] sm:text-[9px] text-[#898583] font-black uppercase tracking-widest mt-0.5">
                      Auto-lock on date
                    </span>
                  </div>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                  <div className="flex justify-end items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => onViewDetails(item.id)}
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 bg-[#36405D] text-white rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm sm:text-base">visibility</span>
                      <span className="hidden sm:inline">View</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 sm:px-8 py-12 sm:py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-[#69727F]">
                  <span className="material-symbols-outlined text-4xl sm:text-5xl">inventory_2</span>
                  <p className="text-xs sm:text-sm font-bold tracking-tight">No inventory items match your current filters</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
