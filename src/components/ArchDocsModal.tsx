import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Database, 
  MapPin, 
  Lock, 
  FileCode,
  Terminal,
  CheckCircle2
} from 'lucide-react';

interface ArchDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchDocsModal: React.FC<ArchDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai' | 'schema' | 'privacy'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">HACKATHON ARCHITECTURE & DOCS</span>
              <h2 className="text-xl font-black text-white">LostLink AI System Blueprints</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-slate-800 my-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'border-indigo-500 text-indigo-300' : 'border-transparent text-slate-400'
            }`}
          >
            System Topology
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-2 px-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'ai' ? 'border-cyan-500 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            Gemini AI Multi-Factor Engine
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-2 px-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'schema' ? 'border-emerald-500 text-emerald-300' : 'border-transparent text-slate-400'
            }`}
          >
            Database Schema & API
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2 px-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'privacy' ? 'border-rose-500 text-rose-300' : 'border-transparent text-slate-400'
            }`}
          >
            Privacy & Anti-Fraud Engine
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 text-xs leading-relaxed text-slate-300">
          
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-2">High-Level Full-Stack System Flow</h4>
                <div className="font-mono text-[11px] bg-slate-900 p-3 rounded-xl border border-slate-800/80 text-cyan-300 space-y-1">
                  <div>[ React Client ] ──(HTTP JSON / FormData)──► [ Express Server ]</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;├──► OpenStreetMap Leaflet View&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──► [ Gemini 3.6 Multimodal Vision ]</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──► [ Haversine Geospatial Formula ]</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;└──► Fraud Ownership Claim Modal ────────┴──► [ Anti-Fraud Risk Engine ]</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="font-bold text-indigo-300 block mb-1">Client Frontend</span>
                  <p>React 18, TypeScript, Tailwind CSS, Leaflet JS, Lucide Icons. Fully responsive single page application.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="font-bold text-cyan-300 block mb-1">Backend Server</span>
                  <p>Node.js Express REST API server running on port 3000 with server-side proxying for Gemini AI SDK keys.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-300 text-sm">Weighted Multi-Factor Formula</h4>
                <div className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-emerald-300">
                  MatchScore = (VisionScore × 0.35) + (SemanticTextScore × 0.20) + (LocationScore × 0.20) + (TimeScore × 0.10) + (CategoryBonus × 0.15)
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs">AI Explainability Reasoning Generation</h4>
                <p>Gemini vision analyzes item attributes (color, brand, serial text, stickers, physical damage) and formats human-understandable justification bullets explaining why two items match.</p>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] space-y-2">
                <span className="text-emerald-400 font-bold">Data Models:</span>
                <div>• <strong className="text-white">Report</strong>: id, type (lost|found), title, category, brand, model, color, description, imageUrl, location (lat, lng, address, landmark), date, time, status, privateSerialNo, privateUniqueMarks</div>
                <div>• <strong className="text-white">Match</strong>: id, lostReportId, foundReportId, matchScore, breakdown, explanation, distanceKm, timeDiffHours</div>
                <div>• <strong className="text-white">Claim</strong>: id, lostReportId, foundReportId, claimantId, serialNumberProvided, uniqueMarksProvided, verificationStatement, status, riskAssessment</div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-rose-300 text-sm">Security & Obfuscation Measures</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong className="text-white">Location Obfuscation:</strong> Public maps render 1km radius zone circles around reported items, hiding exact house/building numbers.</li>
                  <li><strong className="text-white">Private Verification Details:</strong> Serial numbers and hidden stickers are never exposed in public feed APIs. They are evaluated exclusively on server-side claim verification.</li>
                  <li><strong className="text-white">Fraud Risk Scoring:</strong> Evaluates claim submission patterns and flags contradictory ownership statements before allowing item release.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Close Blueprint Docs
          </button>
        </div>

      </div>
    </div>
  );
};
