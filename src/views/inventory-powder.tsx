import React, { useState, useMemo, useEffect } from 'react';
import { SummaryCards } from '../components/summary-cards';
import { SearchBar } from '../components/search-bar';
import { FilterDropdown } from '../components/filter-dropdown';
import { InventoryTable } from '../components/inventory-table';
import { getStatistics, getMediaPowderList } from '../services/api';
import { SummaryCard, PowderItem, MediaPowderAPIItem } from '../types';

export const InventoryPowder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [inventory, setInventory] = useState<PowderItem[]>([]);
  const [statistics, setStatistics] = useState({
    available_grams: 0,
    near_expiry: 0,
    expired: 0,
    quarantine: 0,
    blocked: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch statistics and inventory list
      const [statsResponse, listResponse] = await Promise.all([
        getStatistics(),
        getMediaPowderList({ sort: 'id', order: 'desc' }),
      ]);

      if (statsResponse.status) {
        setStatistics(statsResponse.data);
      }

      if (listResponse.status && listResponse.data) {
        // Transform API data to match PowderItem interface
        const transformedData: PowderItem[] = listResponse.data.map((item: MediaPowderAPIItem) => {
          // Normalize status to match UI expectations
          let status: 'Optimal' | 'Near Expiry' | 'Critical' | 'QC Pending' = 'Optimal';
          
          const rawStatus = item.stock_status || '';
          const apiStatus = rawStatus.toUpperCase().replace(/[\s_-]/g, '');
          
          if (apiStatus === 'OPTIMAL') {
            status = 'Optimal';
          } else if (apiStatus === 'NEAREXPIRY') {
            status = 'Near Expiry';
          } else if (apiStatus === 'CRITICAL' || apiStatus === 'OUTOFSTOCK' || apiStatus === 'LOW') {
            status = 'Critical';
          } else {
            // Fallback: treat anything with low/out/critical keywords as Critical
            const lower = rawStatus.toLowerCase();
            if (lower.includes('low') || lower.includes('out') || lower.includes('critical')) {
              status = 'Critical';
            } else if (lower.includes('near') || lower.includes('expir')) {
              status = 'Near Expiry';
            } else {
              status = 'Optimal';
            }
          }
          
          return {
            id: item.id.toString(),
            name: item.media_name,
            sku: '',
            batch: item.batch_name,
            stock: item.available_stock,
            unit: 'gms',
            manufacturer: item.manufacturer_name,
            expiry: item.expiry_date,
            storage: item.storage_temperature,
            status,
            qcStatus: item.qa_release_status === 'RELEASED' ? 'Released' : 
                      item.qa_release_status === 'REJECTED' ? 'Rejected' : 'Pending',
            receivedDate: '',
            lastUpdated: '',
          };
        });
        
        setInventory(transformedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const criticalCount = inventory.filter(i => i.status === 'Critical').length;
  const nearExpiryCount = inventory.filter(i => i.status === 'Near Expiry').length;

  const summaryCards: SummaryCard[] = [
    { 
      label: 'AVAILABLE (GMS)', 
      value: statistics.available_grams.toLocaleString(), 
      color: 'border-emerald-500', 
      icon: 'check_circle', 
      trend: 'QC APPROVED', 
      status: 'Optimal' 
    },
    { 
      label: 'NEAR EXPIRY', 
      value: nearExpiryCount.toString().padStart(2, '0'), 
      color: 'border-amber-500', 
      icon: 'schedule', 
      trend: '< 30 DAYS', 
      status: 'Near Expiry' 
    },
    { 
      label: 'CRITICAL STOCK', 
      value: criticalCount.toString().padStart(2, '0'), 
      color: 'border-red-500', 
      icon: 'report', 
      trend: 'REPLENISH NOW', 
      status: 'Critical' 
    },
    { 
      label: 'QUARANTINE', 
      value: statistics.quarantine.toString().padStart(2, '0'), 
      color: 'border-blue-500', 
      icon: 'science', 
      trend: 'IN TESTING', 
      status: null 
    },
  ];

  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [inventory, searchTerm, statusFilter]);

  const handleViewDetails = (id: string) => {
    console.log('View details for item:', id);
  };

  const handleLogShipment = () => {
    console.log('Log new shipment');
  };

  const handleReconcile = () => {
    console.log('Reconcile stock');
  };

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-full animate-in fade-in duration-500 min-h-full overflow-y-auto custom-scrollbar">
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7344]"></div>
            <p className="mt-4 text-[#69727F] font-medium">Loading inventory...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6 sm:mb-10">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-[#374355] tracking-tight">Media Powder Inventory</h2>
          <p className="text-[#69727F] text-sm sm:text-base font-medium">
            Centralized tracking of dehydrated media substrates and active lot management.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={handleReconcile}
            className="bg-white text-[#374355] border border-slate-200 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">rebase_edit</span> 
            <span className="hidden sm:inline">Reconcile Stock</span>
            <span className="sm:hidden">Reconcile</span>
          </button>
          <button
            onClick={handleLogShipment}
            className="bg-[#FF7344] text-white flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-[0_8px_20px_rgba(255,115,68,0.2)] font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">add_box</span> 
            <span className="hidden sm:inline">Log New Shipment</span>
            <span className="sm:hidden">New Shipment</span>
          </button>
        </div>
      </div>

      <SummaryCards cards={summaryCards} activeFilter={statusFilter} onFilterClick={setStatusFilter} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 bg-slate-50/30 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="flex gap-3 sm:gap-4 items-center justify-end">
            {statusFilter && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg border border-orange-100 animate-in zoom-in duration-200">
                <span className="text-[10px] font-black uppercase tracking-widest truncate">Filter: {statusFilter}</span>
                <button onClick={() => setStatusFilter(null)} className="material-symbols-outlined text-sm hover:text-orange-800 flex-shrink-0">
                  close
                </button>
              </div>
            )}
            <FilterDropdown
              activeFilter={statusFilter}
              onFilterChange={setStatusFilter}
              options={['Optimal', 'Near Expiry', 'Critical']}
            />
          </div>
        </div>

        <InventoryTable items={filteredItems} onViewDetails={handleViewDetails} />
      </div>
        </>
      )}
    </div>
  );
};
