import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentView: string;
  onMenuClick: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onMenuClick, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('User');
  const [userRole, setUserRole] = useState('Admin');
  const [sessionTime, setSessionTime] = useState('--:--');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch user info and calculate session time
  useEffect(() => {
    // Get user info from localStorage
    const userId = localStorage.getItem('user_id');
    if (userId) {
      setUserName(userId);
      // You can fetch full user profile here if API is available
      // getUserProfile().then(data => setUserName(data.name));
    }

    // Calculate remaining session time
    const autoLogoutMinutes = localStorage.getItem('auto_logout_minutes');
    const loginTime = localStorage.getItem('login_time');
    
    if (autoLogoutMinutes && loginTime) {
      const updateSessionTime = () => {
        const now = Date.now();
        const elapsed = Math.floor((now - parseInt(loginTime)) / 1000 / 60);
        const remaining = parseInt(autoLogoutMinutes) - elapsed;
        
        if (remaining > 0) {
          const mins = Math.floor(remaining);
          const secs = Math.floor((remaining - mins) * 60);
          setSessionTime(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
        } else {
          setSessionTime('00:00');
        }
      };

      updateSessionTime();
      const interval = setInterval(updateSessionTime, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Compliance Overview Dashboard';
      case 'inventory-powder':
        return 'Media Powder Inventory';
      case 'inventory-solutions':
        return 'Solution & Reagent Inventory';
      case 'inventory-containers':
        return 'Container Inventory';
      case 'batch-management':
        return 'Media Batch Management';
      case 'gpt-test':
        return 'GPT Test Management';
      case 'debug':
        return 'API Debug Console';
      default:
        return 'Compliance Overview Dashboard';
    }
  };

  return (
    <div className="flex flex-col shrink-0 z-50">
      {/* Top Bar - Dark Slate */}
      <header className="bg-[#36405D] text-white h-11 flex items-center justify-between px-4 md:px-6 shrink-0">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden material-symbols-outlined text-[20px] cursor-pointer hover:text-orange-400 transition-colors"
            aria-label="Toggle menu"
          >
            menu
          </button>
          <h2 className="text-[9px] md:text-[11px] font-bold tracking-widest uppercase opacity-90 truncate">
            <span className="hidden sm:inline">Microbial Media Plates Tracking & Management System</span>
            <span className="sm:hidden">MPATS</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 md:gap-8 text-[10px] md:text-[11px] font-bold">
          <button className="hidden md:flex items-center gap-1.5 hover:text-orange-400 transition-colors">
            <span className="material-symbols-outlined text-sm">help</span>
            Help
          </button>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden sm:inline opacity-80 font-medium">{formatDate(currentTime)}</span>
            <span className="tracking-widest text-[10px] md:text-[11px] font-bold">{formatTime(currentTime)}</span>
          </div>
        </div>
      </header>

      {/* Sub Header - White */}
      <div className="bg-white border-b border-gray-100 h-12 md:h-14 flex items-center justify-between px-4 md:px-8">
        <h1 className="text-[10px] md:text-[12px] font-black text-[#374355] uppercase tracking-widest truncate">
          {getViewTitle()}
        </h1>

        <div className="flex items-center gap-4 md:gap-10">
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[10px] font-black text-[#69727F] uppercase tracking-widest">Session Logout In</span>
            <span className="text-sm font-black text-[#FF7344]">{sessionTime}</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <p className="hidden sm:block text-[10px] md:text-[12px] font-bold text-[#374355] truncate max-w-[150px] md:max-w-none">
              {userName} [ {userRole} ]
            </p>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative cursor-pointer">
                <span className="material-symbols-outlined text-[#FF7344] text-[22px] md:text-[26px]">notifications</span>
                <span className="absolute -top-1 -right-1.5 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-[7px] md:text-[8px] font-black text-white rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </div>
              <button 
                onClick={onLogout}
                className="material-symbols-outlined text-[#FF7344] transition-colors hover:text-orange-600 text-[22px] md:text-[26px]"
                title="Logout"
              >
                power_settings_new
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
