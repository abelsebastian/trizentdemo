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

// API Response Types
export interface MediaPowderAPIItem {
  id: number;
  batch_name: string;
  media_name: string;
  manufacturer_name: string;
  storage_temperature: string;
  quantity: number;
  available_stock: number;
  stock_percentage: number;
  stock_status: 'OPTIMAL' | 'CRITICAL' | 'NEAR_EXPIRY';
  qa_release_status: string;
  expiry_date: string;
}

export interface StatisticsAPIResponse {
  statusCode: number;
  status: boolean;
  data: {
    available_grams: number;
    near_expiry: number;
    expired: number;
    quarantine: number;
    blocked: number;
  };
}

export interface MediaPowderListAPIResponse {
  statusCode: number;
  status: boolean;
  data: MediaPowderAPIItem[];
}
