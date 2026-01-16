
import React from 'react';
import { Book, ShieldAlert, Smartphone, Wifi, Globe, Key } from 'lucide-react';

const EducationCenter: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Security Knowledge Hub</h1>
        <p className="text-slate-400">Master the techniques to defend against sophisticated mobile attacks.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LearnCard 
          icon={<Smartphone className="text-blue-400" />}
          title="SIM Swapping"
          desc="Learn how attackers hijack your phone number by tricking carriers, and how to set up a 'Port Freeze'."
          difficulty="Advanced"
          time="5 min read"
        />
        <LearnCard 
          icon={<Wifi className="text-amber-400" />}
          title="NFC Sniffing"
          desc="Proximity attacks use NFC to steal contact data or payment tokens. Use a signal-blocking wallet."
          difficulty="Intermediate"
          time="3 min read"
        />
        <LearnCard 
          icon={<Key className="text-emerald-400" />}
          title="Zero-Knowledge MFA"
          desc="Why SMS 2FA is vulnerable and how to move to hardware security keys or authenticator apps."
          difficulty="Essential"
          time="4 min read"
        />
        <LearnCard 
          icon={<Globe className="text-purple-400" />}
          title="OSINT & Privacy"
          desc="How much of your life is public? Limit social media footprints that lead to identity theft."
          difficulty="Beginner"
          time="6 min read"
        />
        <LearnCard 
          icon={<ShieldAlert className="text-rose-400" />}
          title="Bluebugging Explained"
          desc="Bluetooth-based proximity exploits that can take control of older device firmware."
          difficulty="Expert"
          time="7 min read"
        />
        <LearnCard 
          icon={<Book className="text-indigo-400" />}
          title="Encryption 101"
          desc="The difference between E2EE and 'Encryption at Rest' for your messages and files."
          difficulty="Essential"
          time="5 min read"
        />
      </div>

      <div className="glass p-8 rounded-3xl border-l-4 border-l-blue-600">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ShieldAlert className="text-blue-500" />
          The "One Meter" Risk
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6">
          Most modern "proximity attacks" rely on physical closeness (NFC, Bluetooth, or Rogue Wi-Fi). 
          To protect yourself from someone placing their phone near yours to "hack" it, ensure 
          that <strong>NFC is disabled when not in use</strong>, and always use 
          <strong> Bluetooth 'Hidden' mode</strong>.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold text-slate-300">#ProximityDefense</span>
          <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold text-slate-300">#PrivacyFirst</span>
          <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold text-slate-300">#MobileHardening</span>
        </div>
      </div>
    </div>
  );
};

const LearnCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, difficulty: string, time: string }> = ({ icon, title, desc, difficulty, time }) => (
  <div className="glass group p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-slate-800/50 rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
        difficulty === 'Advanced' || difficulty === 'Expert' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-400'
      }`}>
        {difficulty}
      </span>
    </div>
    <h3 className="font-bold text-lg text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed mb-4">{desc}</p>
    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
      <span>{time}</span>
      <span className="group-hover:translate-x-1 transition-transform">Read Module →</span>
    </div>
  </div>
);

export default EducationCenter;
