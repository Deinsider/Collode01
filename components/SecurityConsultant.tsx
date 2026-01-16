
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ShieldAlert, Info } from 'lucide-react';
import { getSecurityAdvice } from '../services/geminiService';
import { Message } from '../types';

const SecurityConsultant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello, I am ShieldGuard AI. Ask me anything about protecting your mobile privacy, securing your phone number, or mitigating proximity attacks.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getSecurityAdvice(input);
    const modelMessage: Message = { role: 'model', text: aiResponse || "I encountered an error." };
    
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col space-y-4 animate-in fade-in zoom-in-95 duration-500">
      <header className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl">
          <Bot className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Security Advisor</h1>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Expert-Mode Active
          </p>
        </div>
      </header>

      <div className="flex-1 glass rounded-3xl flex flex-col overflow-hidden">
        <div className="bg-slate-900/50 p-3 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-amber-500/10 p-2 rounded text-amber-500">
            <ShieldAlert size={16} />
          </div>
          <p className="text-xs text-amber-500/80 font-medium">
            This AI will not provide instructions for illegal activities or hacking others.
          </p>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === 'user' ? 'bg-slate-700' : 'bg-blue-600'
                }`}>
                  {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-slate-800 text-slate-200 rounded-tr-none' 
                  : 'bg-slate-900/50 border border-slate-800 text-slate-300 rounded-tl-none prose prose-invert max-w-none'
                }`}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-900/30 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about SIM protection, NFC security, encrypted chat..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:text-slate-600 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
            <button className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors">
              <Info size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityConsultant;
