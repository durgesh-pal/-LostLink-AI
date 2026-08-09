import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  MapPin, 
  Clock, 
  FileCheck, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  PlayCircle,
  Eye,
  Zap,
  Check
} from 'lucide-react';

interface LandingHeroProps {
  onOpenReportLost: () => void;
  onOpenReportFound: () => void;
  onNavigateToMatches: () => void;
  onNavigateToReports: () => void;
  onOpenDemoStoryline: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onOpenReportLost,
  onOpenReportFound,
  onNavigateToMatches,
  onNavigateToReports,
  onOpenDemoStoryline
}) => {
  // Interactive Live AI Match Calculator Playground
  const [sampleLostText, setSampleLostText] = useState("Black HP laptop lost near railway station around 6 PM. Silver sticker on top lid.");
  const [sampleFoundText, setSampleFoundText] = useState("Found black HP laptop notebook in canvas bag at station waiting hall.");
  const [simulatedScore, setSimulatedScore] = useState(92);
  const [isCalculating, setIsCalculating] = useState(false);

  const runSampleCalculation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setSimulatedScore(92);
      setIsCalculating(false);
    }, 600);
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      
      {/* Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-900/30 via-indigo-950/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-900/40 border border-indigo-500/30 rounded-full px-4 py-1.5 text-xs text-indigo-300 shadow-inner">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-semibold text-slate-200">AI-Powered Lost & Found System</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 font-mono font-medium">Gemini 3.6 Multimodal</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
            Lost Something? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Let AI Help You Find It.
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            LostLink AI connects lost and found items using intelligent image analysis, semantic text matching, location proximity, and fraud-proof verification.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenReportLost}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm shadow-xl shadow-rose-600/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <AlertTriangle className="w-5 h-5 text-rose-200" />
              <span>Report Lost Item</span>
            </button>

            <button
              onClick={onOpenReportFound}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-200" />
              <span>Report Found Item</span>
            </button>

            <button
              onClick={onNavigateToReports}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Find an Item</span>
            </button>
          </div>

          {/* Hackathon Demo Quick Banner */}
          <div className="pt-2">
            <button
              onClick={onOpenDemoStoryline}
              className="inline-flex items-center space-x-2 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-amber-400" />
              <span className="font-semibold">Judges: Run 1-Click Live Demonstration Storyline</span>
            </button>
          </div>
        </div>

        {/* AI Multimodal Match Visualization Playground Box */}
        <div className="mt-16 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">INTERACTIVE AI ENGINE PREVIEW</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Multi-Factor Weighted Confidence Calculation</h3>
            </div>
            <button
              onClick={runSampleCalculation}
              disabled={isCalculating}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer self-start md:self-auto"
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>{isCalculating ? 'Running Gemini AI...' : 'Recalculate AI Score'}</span>
            </button>
          </div>

          {/* Playground Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1 flex items-center justify-between">
                  <span>🔴 Lost Item Description</span>
                  <span className="text-[10px] text-rose-400 font-mono">Report #101</span>
                </label>
                <textarea
                  rows={2}
                  value={sampleLostText}
                  onChange={(e) => setSampleLostText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1 flex items-center justify-between">
                  <span>🟢 Found Item Description</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Report #201</span>
                </label>
                <textarea
                  rows={2}
                  value={sampleFoundText}
                  onChange={(e) => setSampleFoundText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Explainable AI bullets */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1.5 text-[11px]">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block mb-1">AI Explainability Reasoning:</span>
                <div className="text-emerald-400 flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Category match: Laptops (100% Weight)</span>
                </div>
                <div className="text-emerald-400 flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Visual similarity: HP Pavilion Black with silver sticker (93%)</span>
                </div>
                <div className="text-emerald-400 flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Geospatial proximity: 2.4 km near Prayagraj Railway Station</span>
                </div>
                <div className="text-emerald-400 flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Temporal correlation: Found within 35 minutes of loss report</span>
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 bg-slate-950 border border-indigo-500/30 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-500/10 text-cyan-300 text-[10px] font-mono px-3 py-1 rounded-bl-xl border-b border-l border-indigo-500/20">
                LIVE SCORE
              </div>

              <div>
                <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider">AI Match Confidence</span>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">
                    {simulatedScore}%
                  </span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">HIGH CONFIDENCE</span>
                </div>
              </div>

              {/* Formula Breakdown Progress Bars */}
              <div className="space-y-2 text-xs my-4">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Image Vision (35%)</span>
                    <span className="text-white font-mono">93%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: '93%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Text Semantic (20%)</span>
                    <span className="text-white font-mono">88%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Location Proximity (20%)</span>
                    <span className="text-white font-mono">95%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Time Correlation (10%)</span>
                    <span className="text-white font-mono">90%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>

              <button
                onClick={onNavigateToMatches}
                className="w-full py-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-cyan-300 font-semibold text-xs rounded-xl border border-indigo-500/40 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>View Full AI Match Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Platform Key Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-2xl sm:text-3xl font-black text-white">92%</span>
            <p className="text-xs text-slate-400 mt-1">Avg Match Precision</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">35 min</span>
            <p className="text-xs text-slate-400 mt-1">Avg Time to Match</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">100%</span>
            <p className="text-xs text-slate-400 mt-1">Fraud Verification</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-2xl sm:text-3xl font-black text-indigo-400">Zero</span>
            <p className="text-xs text-slate-400 mt-1">Public Location Leaks</p>
          </div>
        </div>

      </div>
    </div>
  );
};
