import React from 'react';

interface PlaceholderViewProps {
  title: string;
  description: string;
  icon: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, description, icon }) => {
  return (
    <div className="p-12 max-w-full min-h-full flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-400 text-5xl">{icon}</span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
          <p className="text-slate-400 text-sm font-medium">{description}</p>
        </div>
        <div className="pt-4">
          <button className="bg-[#FF7043] text-white px-8 py-3 rounded-xl shadow-[0_8px_20px_rgba(255,112,67,0.2)] font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};
