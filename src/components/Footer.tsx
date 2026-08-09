import React from 'react';
import { Sparkles, Shield, Cpu, Lock, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onOpenArchDocs: () => void;
  onOpenDemoStoryline: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenArchDocs, onOpenDemoStoryline }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="text-base font-black text-white tracking-tight">LostLink AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Open Innovation Hackathon entry. Harnessing Gemini multimodal vision, semantic vector search, Haversine geospatial proximity, and fraud-proof ownership claims to reunite lost items.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ● AI ENGINE ACTIVE
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                GEMINI 3.6 FLASH
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">Core Features</h4>
            <ul className="space-y-2">
              <li className="hover:text-slate-200 transition-colors cursor-pointer">Multimodal Visual Analysis</li>
              <li className="hover:text-slate-200 transition-colors cursor-pointer">Semantic NLP Description Matching</li>
              <li className="hover:text-slate-200 transition-colors cursor-pointer">OpenStreetMap Proximity Search</li>
              <li className="hover:text-slate-200 transition-colors cursor-pointer">Explainable Confidence Scoring</li>
              <li className="hover:text-slate-200 transition-colors cursor-pointer">Fraud Risk Verification Engine</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">Hackathon Judging</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenDemoStoryline} className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1 cursor-pointer">
                  <span>▶ Run Live Demo Scenario</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenArchDocs} className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1 cursor-pointer">
                  <span>📐 View System Architecture</span>
                </button>
              </li>
              <li className="text-slate-500">Duplicate Report Detection</li>
              <li className="text-slate-500">Moderator Audit Logs</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">Privacy & Trust</h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start space-x-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>Exact user locations are obfuscated into approximate 1km zone circles.</p>
              </div>
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <p>Private serial numbers and marks are encrypted and verified server-side only.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© 2026 LostLink AI Platform. Engineered for Open Innovation Hackathon.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span>Built with React + TypeScript + Express + Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
