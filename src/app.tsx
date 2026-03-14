import React, { useState, useEffect } from 'react';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
import { InventoryPowder } from './views/inventory-powder';
import { Login } from './views/login';
import { Debug } from './views/debug';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('inventory-powder');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');
    const userId = localStorage.getItem('x-userid');
    
    if (token && userId) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    
    // Get auto-logout minutes from localStorage (set during login)
    const autoLogoutMinutes = localStorage.getItem('auto_logout_minutes');
    if (autoLogoutMinutes) {
      const minutes = parseInt(autoLogoutMinutes);
      // Set timer to auto-logout
      setTimeout(() => {
        handleLogout();
        alert('Session expired. Please login again.');
      }, minutes * 60 * 1000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('x-userid');
    localStorage.removeItem('auto_logout_minutes');
    localStorage.removeItem('user_id');
    localStorage.removeItem('login_time');
    setIsAuthenticated(false);
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Only inventory-powder and debug are functional
  const renderView = () => {
    if (currentView === 'inventory-powder') {
      return <InventoryPowder />;
    }
    if (currentView === 'debug') {
      return <Debug />;
    }
    // Default to inventory powder for any other view
    return <InventoryPowder />;
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile: Slide in from left, Desktop: Always visible */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      </div>

      <div className="flex flex-col flex-1 min-w-0 h-full">
        <Header 
          currentView={currentView} 
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div key={currentView} className="animate-in fade-in duration-300 h-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};
