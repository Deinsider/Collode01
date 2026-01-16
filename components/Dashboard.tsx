
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldAlert, Fingerprint, Lock, Radio, Cpu, Bell } from 'lucide-react';

const securityData = [
  { name: 'Secured', value: 75, color: '#3b82f6' },
  { name: 'Vulnerable', value: 25, color: '#f43f5e' },
];

const Dashboard: React.FC<{ onStartScan: () => void }> = ({ onStartScan }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Security Command Center</h1>
          <p className="text-slate-400">Monitoring mobile integrity and proximity threats.</p>
        </div>
        <button 
          onClick={onStartScan}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
        >
          <ShieldAlert size={20} />
          Execute Audit Scan
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={securityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {securityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-[-40px]">
            <p className="text-4xl font-black text-blue-500">75%</p>
            <p className="text-sm text-slate-400 font-medium">Privacy Score</p>
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatusCard 
            icon={<Fingerprint className="text-emerald-400" />}
            title="Biometric Integrity"
            status="Verified"
            desc="FaceID & TouchID configurations are optimal."
          />
          <StatusCard 
            icon={<Lock className="text-blue-400" />}
            title="Encryption Level"
            status="AES-256 Active"
            desc="Device storage and backup data are fully encrypted."
          />
          <StatusCard 
            icon={<Radio className="text-amber-400" />}
            title="Proximity Guard"
            status="Exposed"
            desc="Unrecognized NFC attempts detected in last 24h."
            alert
          />
          <StatusCard 
            icon={<Cpu className="text-purple-400" />}
            title="Kernel Security"
            status="Hardened"
            desc="System integrity protection (SIP) is enabled."
          />
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Bell size={20} className="text-blue-500" />
          Recent Security Events
        </h2>
        <div className="space-y-3">
          <EventRow 
            time="2 minutes ago" 
            event="Unauthorized NFC Connection Attempt" 
            severity="Medium"
            location="Nearby Proximity"
          />
          <EventRow 
            time="1 hour ago" 
            event="App 'TrackerX' requested Location" 
            severity="Low"
            location="Internal"
          />
          <EventRow 
            time="3 hours ago" 
            event="SIM Card Status Change Detected" 
            severity="High"
            location="Network Level"
          />
        </div>
      </section>
    </div>
  );
};

const StatusCard: React.FC<{ icon: React.ReactNode, title: string, status: string, desc: string, alert?: boolean }> = ({ icon, title, status, desc, alert }) => (
  <div className={`glass p-5 rounded-2xl border ${alert ? 'border-amber-500/30 bg-amber-500/5' : 'border-slate-800'}`}>
    <div className="flex items-start justify-between mb-3">
      <div className="p-2 rounded-lg bg-slate-800/50">{icon}</div>
      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${alert ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-400'}`}>
        {status}
      </span>
    </div>
    <h3 className="font-bold text-slate-200 mb-1">{title}</h3>
    <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const EventRow: React.FC<{ time: string, event: string, severity: string, location: string }> = ({ time, event, severity, location }) => (
  <div className="glass px-6 py-4 rounded-xl flex items-center justify-between border border-slate-800/50 hover:bg-slate-900/30 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`w-2 h-2 rounded-full ${
        severity === 'High' ? 'bg-rose-500' : severity === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
      }`}></div>
      <div>
        <p className="text-sm font-semibold text-slate-200">{event}</p>
        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{location}</p>
      </div>
    </div>
    <span className="text-xs text-slate-500 font-medium">{time}</span>
  </div>
);

export default Dashboard;
