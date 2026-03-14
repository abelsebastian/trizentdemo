const BASE_URL = 'https://api.empats-dev.alpha-03.trizentinc.com';

// Get auth headers from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('x-auth-token');
  const userId = localStorage.getItem('x-userid');
  
  return {
    'Content-Type': 'application/json',
    'x-auth-token': token || '',
    'x-userid': userId || '',
  };
};

// Login API
export const login = async (userId: string, password: string) => {
  const response = await fetch(`${BASE_URL}/empats/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      password: password,
      device_token: '',
      device_id: '',
      transferSession: true,
    }),
  });
  
  const data = await response.json();
  
  if (data.status) {
    localStorage.setItem('x-auth-token', data['x-auth-token']);
    localStorage.setItem('x-userid', data['x-userid']);
    localStorage.setItem('auto_logout_minutes', data['auto_logout_minutes'] || '20');
    localStorage.setItem('user_id', userId); // Store the login user_id
    localStorage.setItem('login_time', Date.now().toString()); // Store login timestamp
  }
  
  return data;
};

// Get Statistics
export const getStatistics = async () => {
  const response = await fetch(`${BASE_URL}/media_powder/statistics`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  
  return response.json();
};

// Get Media Powder List
export const getMediaPowderList = async (params?: {
  sort?: string;
  order?: string;
  page?: number;
  size?: number;
  keyword?: string;
}) => {
  const queryParams = new URLSearchParams();
  
  if (params?.sort) queryParams.append('sort', params.sort);
  if (params?.order) queryParams.append('order', params.order);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.size) queryParams.append('size', params.size.toString());
  if (params?.keyword) queryParams.append('keyword', params.keyword);
  
  const response = await fetch(
    `${BASE_URL}/media_powder/list?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: getAuthHeaders(),
    }
  );
  
  return response.json();
};

// Get Lot Details
export const getLotDetails = async (params?: {
  page?: number;
  size?: number;
  sort?: string;
  batch_id?: string;
}) => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.size) queryParams.append('size', params.size.toString());
  if (params?.sort) queryParams.append('sort', params.sort);
  if (params?.batch_id) queryParams.append('batch_id', params.batch_id);
  
  const response = await fetch(
    `${BASE_URL}/media_powder/list_powder_batch_lot_details?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: getAuthHeaders(),
    }
  );
  
  return response.json();
};

// Get Product Definitions
export const getProductDefinitions = async (params?: {
  sort?: string;
  order?: string;
}) => {
  const queryParams = new URLSearchParams();
  
  if (params?.sort) queryParams.append('sort', params.sort);
  if (params?.order) queryParams.append('order', params.order);
  
  const response = await fetch(
    `${BASE_URL}/media/list_media_product_definitions?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: getAuthHeaders(),
    }
  );
  
  return response.json();
};

// Create Shipment
export const createShipment = async (data: {
  media_product_name_id: number;
  manufacturer_lot_number: string;
  total_quantity_received: number;
  manufacturing_date: string;
  expiry_date: string;
  no_of_container: number;
  quantity_per_container: number;
}) => {
  const response = await fetch(`${BASE_URL}/media_powder/save`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  return response.json();
};


// Get User Profile
export const getUserProfile = async () => {
  const response = await fetch(`${BASE_URL}/empats/user/profile`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  
  return response.json();
};
