export interface PowderItem {
  id: string;
  name: string;
  sku: string;
  batch: string;
  stock: number;
  unit: string;
  manufacturer: string;
  expiry: string;
  storage: string;
  status: 'Optimal' | 'Near Expiry' | 'Critical' | 'QC Pending';
  qcStatus: 'Released' | 'Pending' | 'Rejected';
  receivedDate: string;
  lastUpdated: string;
}

export interface SummaryCard {
  label: string;
  value: string;
  color: string;
  icon: string;
  trend: string;
  status: string | null;
}
