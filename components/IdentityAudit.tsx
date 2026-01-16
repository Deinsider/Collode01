
import React, { useState, useEffect } from 'react';
import { Mail, Phone, ShieldAlert, CheckCircle2, AlertCircle, RefreshCw, EyeOff, Lock, Fingerprint, Database, Globe, UserCheck, ShieldCheck } from 'lucide-react';

interface AuditResult {
  id: number;
  label: string;
  finding: string;
  risk: 'High' | 'Medium' | 'Low';
  recommendation: string;
  category: 'Privacy' | 'Security' | 'Network';
}

const IdentityAudit: React.FC = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState<'email' | 'phone'>('email');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [results, setResults] = useState<AuditResult[]>([]);
  const [currentScanStep, setCurrentScanStep] = useState('');

  const phoneScanSteps = [
    "Querying Home Location Register (HLR) metadata...",
    "Checking carrier port-out protection status...",
    "Scanning SS7 network exposure indices...",
    "Analyzing proximity sniffing vulnerability (NFC/BT)...",
    "Cross-referencing known 'SIM-Swap' target databases..."
  ];

  const emailScanSteps = [
    "Searching HaveIBeenPwned API for credential leaks...",
    "Analyzing dark web dump records for domain matches...",
    "Checking associated social media metadata...",
    "Verifying DMARC/SPF sender reputation status...",
    "Scanning for linked identity-theft attack vectors..."
  ];

  const startAudit = () => {
    if (!input.trim()) return;
    setStatus('scanning');
    setResults([]);
    
    let stepIndex = 0;
    const steps = type === 'phone' ? phoneScanSteps : emailScanSteps;
    
    const stepInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentScanStep(steps[stepIndex]);
        stepIndex++;
      } else {
        clearInterval(stepInterval);
        generateResults();
      }
    }, 800);
  };

  const generateResults = () => {
    const mockResults: AuditResult[] = type === 'phone' 
      ? [
          { 
            id: 1, 
            label: "Carrier Vulnerability", 
            finding: "Carrier 'SIM-Port' API Exposure Detected", 
            risk: "High", 
            category: "Network",
            recommendation: "Request your carrier to add a 'Port Freeze' and a verbal password requirement for all account changes." 
          },
          { 
            id: 2, 
            label: "SS7 Network Risk", 
            finding: "Legacy Roaming Protocol Active", 
            risk: "Medium", 
            category: "Security",
            recommendation: "Disable legacy 2G/3G connectivity in phone settings to prevent IMSI catching and SS7 intercept attacks." 
          },
          { 
            id: 3, 
            label: "Proximity Awareness", 
            finding: "NFC Handshake History Exposed", 
            risk: "Low", 
            category: "Privacy",
            recommendation: "Turn off NFC when in high-density public areas to avoid unauthorized wallet token sniffing." 
          }
        ]
      : [
          { 
            id: 1, 
            label: "Credential Exposure", 
            finding: "Leaked in 'Canva' and 'Dropbox' Breaches", 
            risk: "High", 
            category: "Security",
            recommendation: "Immediately rotate your email password and use a unique, complex key. Enable TOTP-based 2FA." 
          },
          { 
            id: 2, 
            label: "Digital Footprint", 
            finding: "4 Associated Social Media Profiles Found", 
            risk: "Medium", 
            category: "Privacy",
            recommendation: "Update privacy settings on LinkedIn and Instagram to hide your email address from public search engines." 
          },
          { 
            id: 3, 
            label: "Phishing Sensitivity", 
            finding: "Target of Recent Financial Malspam", 
            risk: "Medium", 
            category: "Security",
            recommendation: "Be cautious of 'Password Reset' emails. Never click links directly; always navigate to the official site." 
          }
        ];

    setResults(mockResults);
    setStatus('results');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Digital Identity Audit</h1>
        <p className="text-slate-400">Perform a security stress-test on your personal identifiers to identify attack vectors.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass p-6 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Fingerprint size={18} className="text-blue-500" />
              Target Identifier
            </h3>
            
            <div className="flex p-1 bg-slate-900/50 rounded-lg mb-4 border border-slate-800">
              <button 
                onClick={() => { setType('email'); setStatus('idle'); setResults([]); }}
                className={`flex-1 py-2 text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors ${type === 'email' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Mail size={14} /> Email
              </button>
              <button 
                onClick={() => { setType('phone'); setStatus('idle'); setResults([]); }}
                className={`flex-1 py-2 text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors ${type === 'phone' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Phone size={14} /> Phone
              </button>
            </div>

            <div className="relative mb-4">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={type === 'email' ? "email@domain.com" : "+1 000 000 0000"}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-100"
              />
              <div className="absolute right-3 top-3 text-slate-500">
                {type === 'email' ? <Mail size={18} /> : <Phone size={18} />}
              </div>
            </div>

            <button 
              onClick={startAudit}
              disabled={status === 'scanning' || !input.trim()}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              {status === 'scanning' ? <RefreshCw className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              {status === 'scanning' ? 'Scanning...' : 'Start Audit'}
            </button>
          </div>

          <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Audit Scope</h4>
            <ul className="space-y-2">
              <ScopeItem icon={<Database size={12} />} label="Dark Web Monitoring" />
              <ScopeItem icon={<Globe size={12} />} label="OSINT Profile Mapping" />
              <ScopeItem icon={<ShieldAlert size={12} />} label="Carrier Risk Evaluation" />
            </ul>
          </div>
        </div>

        {/* Results/Audit View */}
        <div className="lg:col-span-2">
          {status === 'idle' && (
            <div className="glass rounded-2xl h-full flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-slate-800">
              <div className="w-16 h-16 bg-slate-900/50 rounded-3xl flex items-center justify-center mb-6 border border-slate-800">
                <Lock className="text-slate-700" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-300">Identity Guard Standby</h3>
              <p className="text-slate-500 text-sm max-w-sm mt-3 leading-relaxed">
                Provide an identifier to begin a non-intrusive security audit. We will simulate how an attacker gathers intelligence using your {type}.
              </p>
            </div>
          )}

          {status === 'scanning' && (
            <div className="glass rounded-2xl h-full p-8 flex flex-col items-center justify-center space-y-8">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Database className="text-blue-500" size={32} />
                </div>
              </div>
              <div className="text-center space-y-3">
                <p className="text-xl font-bold text-slate-100">{currentScanStep}</p>
                <div className="flex justify-center gap-1.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}

          {status === 'results' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-700">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <UserCheck className="text-emerald-500" size={24} />
                  Report for {input}
                </h3>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-300 flex items-center gap-1"
                >
                  <RefreshCw size={12} /> New Scan
                </button>
              </div>
              
              <div className="grid gap-4">
                {results.map(r => (
                  <div key={r.id} className="glass group p-5 rounded-2xl border border-slate-800 hover:border-blue-500/20 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          r.category === 'Security' ? 'bg-rose-500/10 text-rose-500' : 
                          r.category === 'Network' ? 'bg-blue-500/10 text-blue-500' : 
                          'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {r.category === 'Security' ? <ShieldAlert size={18} /> : 
                           r.category === 'Network' ? <Globe size={18} /> : 
                           <UserCheck size={18} />}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{r.label}</p>
                          <h4 className="font-bold text-slate-200">{r.finding}</h4>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-widest ${
                        r.risk === 'High' ? 'bg-rose-500/20 text-rose-500 border border-rose-500/20' : 
                        'bg-amber-500/20 text-amber-500 border border-amber-500/20'
                      }`}>
                        {r.risk} RISK
                      </span>
                    </div>
                    
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/50">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-blue-500">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Defense Recommendation</p>
                          <p className="text-sm text-slate-400 leading-relaxed">{r.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl flex gap-4 items-start">
                <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 mb-2 underline decoration-blue-500/50">Why this matters?</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Attackers don't always "hack" accounts directly; they "exploit" identities. By knowing your {type}, 
                    a threat actor can use OSINT to craft social engineering scripts or perform SIM swap fraud. 
                    Fixing these vulnerabilities now hardens your digital perimeter.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScopeItem: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <li className="flex items-center gap-3 text-xs text-slate-400">
    <span className="text-blue-500">{icon}</span>
    {label}
  </li>
);

export default IdentityAudit;
