
import React, { useState } from 'react';
import { Shield, Search, MessageSquare, BookOpen, Activity, UserSearch } from 'lucide-react';
import Dashboard from './components/Dashboard';
import VulnerabilityScanner from './components/VulnerabilityScanner';
import IdentityAudit from './components/IdentityAudit';
import SecurityConsultant from './components/SecurityConsultant';
import EducationCenter from './components/EducationCenter';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard onStartScan={() => setActiveTab(AppTab.SCANNER)} />;
      case AppTab.SCANNER:
        return <VulnerabilityScanner />;
      case AppTab.IDENTITY:
        return <IdentityAudit />;
      case AppTab.ADVISOR:
        return <SecurityConsultant />;
      case AppTab.LEARN:
        return <EducationCenter />;
      default:
        return <Dashboard onStartScan={() => setActiveTab(AppTab.SCANNER)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 overflow-hidden">
      <nav className="w-full md:w-20 lg:w-64 glass border-r border-slate-800 flex flex-col z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg glow-blue">
            <Shield className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl hidden lg:block tracking-tight">ShieldGuard <span className="text-blue-500 italic">PRO</span></span>
        </div>

        <div className="flex-1 flex flex-row md:flex-col justify-around md:justify-start gap-2 p-4">
          <NavButton 
            active={activeTab === AppTab.DASHBOARD} 
            onClick={() => setActiveTab(AppTab.DASHBOARD)} 
            icon={<Activity size={20} />} 
            label="Overview" 
          />
          <NavButton 
            active={activeTab === AppTab.SCANNER} 
            onClick={() => setActiveTab(AppTab.SCANNER)} 
            icon={<Search size={20} />} 
            label="Device Audit" 
          />
          <NavButton 
            active={activeTab === AppTab.IDENTITY} 
            onClick={() => setActiveTab(AppTab.IDENTITY)} 
            icon={<UserSearch size={20} />} 
            label="Identity Audit" 
          />
          <NavButton 
            active={activeTab === AppTab.ADVISOR} 
            onClick={() => setActiveTab(AppTab.ADVISOR)} 
            icon={<MessageSquare size={20} />} 
            label="AI Advisor" 
          />
          <NavButton 
            active={activeTab === AppTab.LEARN} 
            onClick={() => setActiveTab(AppTab.LEARN)} 
            icon={<BookOpen size={20} />} 
            label="Knowledge" 
          />
        </div>

        <div className="hidden lg:block p-4 mt-auto">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Defense Mode</p>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-blue-500 rounded-full animate-pulse"></div>)}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto relative p-4 md:p-8 lg:p-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
    }`}
  >
    {icon}
    <span className="hidden lg:block font-medium">{label}</span>
  </button>
);

export default App;
