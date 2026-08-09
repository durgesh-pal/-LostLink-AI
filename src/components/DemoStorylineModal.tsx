import React from 'react';
import { 
  X, 
  PlayCircle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  RotateCcw,
  Zap,
  MapPin,
  Clock
} from 'lucide-react';

interface DemoStorylineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDemoScenario: () => Promise<void>;
  onNavigateToMatches: () => void;
  onNavigateToDashboard: () => void;
}

export const DemoStorylineModal: React.FC<DemoStorylineModalProps> = ({
  isOpen,
  onClose,
  onRunDemoScenario,
  onNavigateToMatches,
  onNavigateToDashboard
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  JUDGES DEMO SCENARIO
                </span>
              </div>
              <h2 className="text-xl font-black text-white mt-0.5">LostLink AI Live Reunion Walkthrough</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Trigger */}
        <div className="my-6 p-4 bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-white block">Reset & Seed Live Demo Environment</span>
            <p className="text-[11px] text-slate-400">Loads the exact HP Laptop Lost & Found scenario into database instantly.</p>
          </div>
          <button
            onClick={async () => {
              await onRunDemoScenario();
              alert("Live Demo Scenario loaded successfully! Open AI Match Hub to inspect.");
            }}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/25 flex items-center space-x-1.5 transition-all cursor-pointer shrink-0"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>1-Click Load Scenario</span>
          </button>
        </div>

        {/* Step-by-Step Story Sequence */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          
          <div className="flex items-start space-x-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
            <div>
              <h4 className="text-xs font-bold text-white">Citizen Reports Lost Item</h4>
              <p className="text-[11px] text-slate-300">Aarav reports: <em>"Black HP laptop lost near Prayagraj Railway Station around 6 PM. Silver sticker on top lid."</em> Enters private serial <code className="text-cyan-300">CND2390X88</code>.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
            <div>
              <h4 className="text-xs font-bold text-white">Good Samaritan Reports Found Item</h4>
              <p className="text-[11px] text-slate-300">Priya reports: <em>"Found black HP laptop notebook computer in waiting hall near station."</em></p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-slate-950 border border-indigo-500/30 bg-indigo-950/20 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold flex items-center justify-center shrink-0">3</span>
            <div>
              <h4 className="text-xs font-bold text-cyan-300 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Gemini Multimodal AI Correlation Engine (92% Match)</span>
              </h4>
              <p className="text-[11px] text-slate-300">
                Calculates weighted score: Vision (93%) + Text (88%) + Distance 2.4km (95%) + Time 35min (90%). Generates explainable reasoning.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center shrink-0">4</span>
            <div>
              <h4 className="text-xs font-bold text-white">Fraud-Proof Ownership Verification</h4>
              <p className="text-[11px] text-slate-300">Aarav submits private serial number and hidden sticker details to verify genuine ownership.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-slate-950 border border-emerald-500/30 bg-emerald-950/20 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold flex items-center justify-center shrink-0">5</span>
            <div>
              <h4 className="text-xs font-bold text-emerald-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Reunion Completed & Analytics Updated</span>
              </h4>
              <p className="text-[11px] text-slate-300">Claim approved automatically (Low Fraud Risk Score: 10/100). Status updates to <strong>REUNITED</strong>.</p>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateToMatches();
            }}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-lg shadow-indigo-600/25 cursor-pointer"
          >
            <span>Open AI Match Hub Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
