import React, { useState } from 'react';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
import { InventoryPowder } from './views/inventory-powder';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('inventory-powder');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Only inventory-powder is functional, all others are disabled
  const renderView = () => {
    if (currentView === 'inventory-powder') {
      return <InventoryPowder />;
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
        <Header currentView={currentView} onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div key={currentView} className="animate-in fade-in duration-300 h-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};
