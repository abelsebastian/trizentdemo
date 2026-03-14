import React, { useState } from 'react';
import { login, getStatistics, getMediaPowderList, getLotDetails, getProductDefinitions } from '../services/api';

interface ApiLog {
  id: number;
  timestamp: string;
  endpoint: string;
  method: string;
  request: any;
  response: any;
  status: 'success' | 'error';
  duration: number;
}

export const Debug: React.FC = () => {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);
  const [loading, setLoading] = useState(false);

  const addLog = (log: Omit<ApiLog, 'id' | 'timestamp'>) => {
    const newLog: ApiLog = {
      ...log,
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs(prev => [newLog, ...prev]);
    setSelectedLog(newLog);
  };

  const testLogin = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const response = await login('Abel234', 'Test@1234');
      addLog({
        endpoint: '/empats/login',
        method: 'POST',
        request: { user_id: 'Abel234', password: '***', device_token: '', device_id: '', transferSession: true },
        response,
        status: response.status ? 'success' : 'error',
        duration: Date.now() - startTime,
      });
      
      if (response.status) {
        alert('✅ Login Successful! Tokens stored. You can now test other endpoints.');
        // Force re-render to update auth info
        setLogs(prev => [...prev]);
      } else {
        alert('❌ Login Failed: ' + (response.message || 'Unknown error'));
      }
    } catch (error: any) {
      addLog({
        endpoint: '/empats/login',
        method: 'POST',
        request: { user_id: 'Abel234', password: '***' },
        response: { error: error.message },
        status: 'error',
        duration: Date.now() - startTime,
      });
      alert('❌ Login Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testStatistics = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const response = await getStatistics();
      addLog({
        endpoint: '/media_powder/statistics',
        method: 'GET',
        request: null,
        response,
        status: response.status ? 'success' : 'error',
        duration: Date.now() - startTime,
      });
      
      // Check for session timeout
      if (response.statusCode === 408) {
        alert('Session Timeout! Please login first using the "Test Login" button.');
      }
    } catch (error: any) {
      addLog({
        endpoint: '/media_powder/statistics',
        method: 'GET',
        request: null,
        response: { error: error.message },
        status: 'error',
        duration: Date.now() - startTime,
      });
    } finally {
      setLoading(false);
    }
  };

  const testMediaPowderList = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const response = await getMediaPowderList({ sort: 'id', order: 'desc' });
      
      // Log stock status breakdown
      if (response.status && response.data) {
        const statusCounts = response.data.reduce((acc: any, item: any) => {
          acc[item.stock_status] = (acc[item.stock_status] || 0) + 1;
          return acc;
        }, {});
        console.log('Stock Status Breakdown:', statusCounts);
        console.log('Sample items:', response.data.slice(0, 3));
      }
      
      addLog({
        endpoint: '/media_powder/list?sort=id&order=desc',
        method: 'GET',
        request: { sort: 'id', order: 'desc' },
        response,
        status: response.status ? 'success' : 'error',
        duration: Date.now() - startTime,
      });
      
      // Check for session timeout
      if (response.statusCode === 408) {
        alert('Session Timeout! Please login first using the "Test Login" button.');
      }
    } catch (error: any) {
      addLog({
        endpoint: '/media_powder/list',
        method: 'GET',
        request: { sort: 'id', order: 'desc' },
        response: { error: error.message },
        status: 'error',
        duration: Date.now() - startTime,
      });
    } finally {
      setLoading(false);
    }
  };

  const testLotDetails = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const response = await getLotDetails({ page: 1, size: 50, sort: 'id' });
      addLog({
        endpoint: '/media_powder/list_powder_batch_lot_details',
        method: 'GET',
        request: { page: 1, size: 50, sort: 'id' },
        response,
        status: response.status ? 'success' : 'error',
        duration: Date.now() - startTime,
      });
    } catch (error: any) {
      addLog({
        endpoint: '/media_powder/list_powder_batch_lot_details',
        method: 'GET',
        request: { page: 1, size: 50, sort: 'id' },
        response: { error: error.message },
        status: 'error',
        duration: Date.now() - startTime,
      });
    } finally {
      setLoading(false);
    }
  };

  const testProductDefinitions = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const response = await getProductDefinitions({ sort: 'id', order: 'desc' });
      addLog({
        endpoint: '/media/list_media_product_definitions',
        method: 'GET',
        request: { sort: 'id', order: 'desc' },
        response,
        status: response.status ? 'success' : 'error',
        duration: Date.now() - startTime,
      });
    } catch (error: any) {
      addLog({
        endpoint: '/media/list_media_product_definitions',
        method: 'GET',
        request: { sort: 'id', order: 'desc' },
        response: { error: error.message },
        status: 'error',
        duration: Date.now() - startTime,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setSelectedLog(null);
  };

  const getAuthInfo = () => {
    return {
      'x-auth-token': localStorage.getItem('x-auth-token') || 'Not set',
      'x-userid': localStorage.getItem('x-userid') || 'Not set',
      'user_id': localStorage.getItem('user_id') || 'Not set',
      'login_time': localStorage.getItem('login_time') || 'Not set',
      'auto_logout_minutes': localStorage.getItem('auto_logout_minutes') || 'Not set',
    };
  };

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-full min-h-full overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-[#374355] tracking-tight mb-2">API Debug Console</h2>
        <p className="text-[#69727F] text-sm font-medium mb-4">Test API endpoints and monitor requests/responses</p>
        
        {/* Quick Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 text-xl">info</span>
            <div>
              <p className="text-sm font-bold text-blue-800 mb-2">Quick Start Guide:</p>
              <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                <li>Click <strong>"Test Login"</strong> first to authenticate (credentials: Abel234 / Test@1234)</li>
                <li>Wait for success message and check Auth Info panel updates</li>
                <li>Then test other endpoints like Statistics or Powder List</li>
                <li>Click any log entry to view full request/response details</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-[#374355] uppercase tracking-widest">Authentication Info</h3>
          {(!localStorage.getItem('x-auth-token') || !localStorage.getItem('x-userid')) && (
            <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full">
              Not Authenticated
            </span>
          )}
        </div>
        
        {(!localStorage.getItem('x-auth-token') || !localStorage.getItem('x-userid')) && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 text-xl">warning</span>
              <div>
                <p className="text-sm font-bold text-amber-800 mb-1">Authentication Required</p>
                <p className="text-xs text-amber-700">
                  You need to login first to test protected endpoints. Click "Test Login" below to authenticate.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(getAuthInfo()).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#69727F] uppercase">{key}:</span>
              <span className="text-xs font-mono text-[#374355] truncate">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Test Buttons */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h3 className="text-sm font-black text-[#374355] uppercase tracking-widest mb-4">Test Endpoints</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={testLogin}
            disabled={loading}
            className="bg-[#FF7344] text-white px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            Test Login
          </button>
          <button
            onClick={testStatistics}
            disabled={loading}
            className="bg-[#36405D] text-white px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            Test Statistics
          </button>
          <button
            onClick={testMediaPowderList}
            disabled={loading}
            className="bg-[#36405D] text-white px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            Test Powder List
          </button>
          <button
            onClick={testLotDetails}
            disabled={loading}
            className="bg-[#36405D] text-white px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            Test Lot Details
          </button>
          <button
            onClick={testProductDefinitions}
            disabled={loading}
            className="bg-[#36405D] text-white px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            Test Products
          </button>
          <button
            onClick={clearLogs}
            className="bg-white text-[#374355] border border-slate-200 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Clear Logs
          </button>
        </div>
      </div>

      {/* Logs Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Log List */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-black text-[#374355] uppercase tracking-widest">
              Request Log ({logs.length})
            </h3>
          </div>
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
            {logs.length === 0 ? (
              <div className="p-8 text-center text-[#69727F] text-sm">
                No requests yet. Click a test button to start.
              </div>
            ) : (
              logs.map((log) => (
                <button
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`w-full text-left px-6 py-4 border-b border-gray-100 hover:bg-slate-50 transition-colors ${
                    selectedLog?.id === log.id ? 'bg-orange-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#374355]">{log.endpoint}</span>
                    <span
                      className={`px-2 py-1 rounded text-[8px] font-black uppercase ${
                        log.status === 'success'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-[#69727F]">
                    <span className="font-mono">{log.method}</span>
                    <span>{log.timestamp}</span>
                    <span>{log.duration}ms</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Log Detail */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-black text-[#374355] uppercase tracking-widest">Request Details</h3>
          </div>
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar p-6">
            {selectedLog ? (
              <div className="space-y-6">
                {/* Request */}
                <div>
                  <h4 className="text-xs font-black text-[#374355] uppercase tracking-widest mb-2">Request</h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-mono text-[#374355] mb-2">
                      <span className="font-bold">{selectedLog.method}</span> {selectedLog.endpoint}
                    </div>
                    {selectedLog.request && (
                      <pre className="text-xs font-mono text-[#69727F] overflow-x-auto">
                        {JSON.stringify(selectedLog.request, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

                {/* Response */}
                <div>
                  <h4 className="text-xs font-black text-[#374355] uppercase tracking-widest mb-2">Response</h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <pre className="text-xs font-mono text-[#374355] overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(selectedLog.response, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Metadata */}
                <div>
                  <h4 className="text-xs font-black text-[#374355] uppercase tracking-widest mb-2">Metadata</h4>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-[#69727F]">Status:</span>
                      <span className={`font-bold ${selectedLog.status === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {selectedLog.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-[#69727F]">Duration:</span>
                      <span className="font-mono text-[#374355]">{selectedLog.duration}ms</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-[#69727F]">Timestamp:</span>
                      <span className="font-mono text-[#374355]">{selectedLog.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-[#69727F] text-sm py-12">
                Select a request from the log to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
