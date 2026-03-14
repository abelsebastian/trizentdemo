import React, { useState } from 'react';
import { login } from '../services/api';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState('Abel234');
  const [password, setPassword] = useState('Test@1234');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(userId, password);
      
      if (response.status) {
        onLoginSuccess();
      } else {
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please check your connection.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-[#36405D] tracking-tighter mb-2">MPATS</h1>
            <p className="text-sm text-[#69727F] font-medium">Media Powder Inventory System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* User ID Field */}
            <div>
              <label htmlFor="userId" className="block text-xs font-black text-[#374355] uppercase tracking-widest mb-2">
                User ID
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-[#374355] focus:ring-4 focus:ring-orange-500/10 focus:border-[#FF7344] transition-all outline-none"
                placeholder="Enter your user ID"
                required
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-black text-[#374355] uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-[#374355] focus:ring-4 focus:ring-orange-500/10 focus:border-[#FF7344] transition-all outline-none"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF7344] text-white py-3.5 rounded-xl shadow-[0_8px_20px_rgba(255,115,68,0.2)] font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-[#69727F] text-center font-medium">
              Demo Credentials: Abel234 / Test@1234
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#69727F] font-medium">
            Microbial Media Plates Tracking & Management System
          </p>
        </div>
      </div>
    </div>
  );
};
