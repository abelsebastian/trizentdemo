import React from 'react';

export const Dashboard: React.FC = () => {
  const kpis = [
    { label: 'AVAILABLE MEDIA', value: '42,500', unit: 'gms', color: 'border-[#10B981]', sub: 'QC APPROVED' },
    { label: 'IN PREPARATION', value: '12', unit: 'Batches', color: 'border-[#3B82F6]', sub: 'ACTIVE PROCESSES' },
    { label: 'NEAR EXPIRY', value: '08', unit: 'Lots', color: 'border-[#F59E0B]', sub: '< 30 DAYS' },
    { label: 'LAB REJECTIONS', value: '03', unit: 'Events', color: 'border-[#EF4444]', sub: 'CRITICAL DISPOSAL' },
  ];

  return (
    <div className="p-12 max-w-full min-h-full">
      <div className="flex justify-between items-start mb-10">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Compliance Overview</h2>
          <p className="text-slate-400 text-base font-medium">
            Real-time monitoring of microbial media lifecycle and quality metrics.
          </p>
        </div>
        <button className="bg-[#FF7043] text-white px-8 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(255,112,67,0.2)] font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
          New Prep Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className={`bg-white p-10 rounded-2xl border-t-[6px] ${kpi.color} shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex flex-col gap-2`}
          >
            <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">{kpi.label}</p>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-5xl font-black text-slate-800 tracking-tighter">{kpi.value}</span>
              <span className="text-base font-bold text-slate-400 uppercase tracking-widest">{kpi.unit}</span>
            </div>
            <p className="text-[11px] font-black text-slate-300 uppercase mt-8 italic tracking-[0.1em]">{kpi.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
