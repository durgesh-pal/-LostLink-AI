import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeftRight, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { Match, Report } from '../types/index.js';

interface AIMatchResultsProps {
  matches?: Match[];
  onOpenClaimModal: (match: Match) => void;
  onSelectReport: (report: Report) => void;
}

export const AIMatchResults: React.FC<AIMatchResultsProps> = ({
  matches = [],
  onOpenClaimModal,
  onSelectReport
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 py-1 text-xs text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '5s' }} />
            <span className="font-bold">MULTIMODAL AI MATCH HUB</span>
            <span className="text-slate-500">•</span>
            <span className="font-mono text-cyan-400">Gemini 3.6 Vision & Semantics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">🎯 Potential Matches Found</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Our AI continuously correlates lost and found reports using visual similarity, semantic text embeddings, Haversine geospatial proximity, and temporal proximity.
          </p>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="space-y-8">
        {matches.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-3xl">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No active AI matches found yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Our AI background scanner is constantly analyzing incoming lost and found reports. As soon as a match passes the threshold, it will appear here.
            </p>
          </div>
        ) : (
          matches.map((match, idx) => {
            const lost = match.lostReport;
            const found = match.foundReport;
            if (!lost || !found) return null;

            return (
              <div
                key={match.id}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 transition-all"
              >
                
                {/* Match Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center border border-indigo-400/40">
                      #{idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">MATCH CANDIDATE</span>
                      <h3 className="text-lg font-bold text-white">{lost.title} ↔ {found.title}</h3>
                    </div>
                  </div>

                  {/* Confidence Badge */}
                  <div className="flex items-center space-x-3 self-start sm:self-auto">
                    <div className="text-right">
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                        {match.matchScore}%
                      </span>
                      <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-wider">MATCH CONFIDENCE</span>
                    </div>

                    <button
                      onClick={() => onOpenClaimModal(match)}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-xl shadow-emerald-600/25 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-200" />
                      <span>Claim Ownership</span>
                    </button>
                  </div>
                </div>

                {/* Side-by-side Visual Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Lost Item Card */}
                  <div 
                    onClick={() => onSelectReport(lost)}
                    className="bg-slate-950 border border-rose-500/30 rounded-2xl p-5 hover:border-rose-500 transition-colors cursor-pointer space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        🔴 LOST REPORT
                      </span>
                      <span className="text-xs text-slate-400">By {lost.userName}</span>
                    </div>

                    {lost.imageUrl && (
                      <div className="h-44 w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <img src={lost.imageUrl} alt={lost.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}

                    <h4 className="font-bold text-white text-base">{lost.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{lost.description}</p>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{lost.location.landmark || lost.location.city}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lost.date} at {lost.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Found Item Card */}
                  <div 
                    onClick={() => onSelectReport(found)}
                    className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 hover:border-emerald-500 transition-colors cursor-pointer space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        🟢 FOUND REPORT
                      </span>
                      <span className="text-xs text-slate-400">By {found.userName}</span>
                    </div>

                    {found.imageUrl && (
                      <div className="h-44 w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <img src={found.imageUrl} alt={found.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}

                    <h4 className="font-bold text-white text-base">{found.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{found.description}</p>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{found.location.landmark || found.location.city}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{found.date} at {found.time}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Score Breakdown & Explainable AI */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5">
                  
                  {/* Left Breakdown Progress Bars */}
                  <div className="lg:col-span-6 space-y-3">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">WEIGHTED SCORE FORMULA BREAKDOWN</span>
                    
                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Image Vision Similarity (35%)</span>
                          <span className="text-cyan-400 font-mono font-bold">{match.breakdown.imageScore}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${match.breakdown.imageScore}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Semantic Text Similarity (20%)</span>
                          <span className="text-indigo-400 font-mono font-bold">{match.breakdown.textScore}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: `${match.breakdown.textScore}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Geospatial Location Proximity (20%)</span>
                          <span className="text-emerald-400 font-mono font-bold">{match.breakdown.locationScore}% ({match.distanceKm} km)</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${match.breakdown.locationScore}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Temporal Time Correlation (10%)</span>
                          <span className="text-amber-400 font-mono font-bold">{match.breakdown.timeScore}% ({match.timeDiffHours} hrs)</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${match.breakdown.timeScore}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Explainable AI Bullets */}
                  <div className="lg:col-span-6 space-y-2 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-4 lg:pt-0 lg:pl-6">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">WHY THIS MAY BE YOUR ITEM (EXPLAINABLE AI)</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {match.explanation.map((reason, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
