import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Tag, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  User, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Report } from '../types/index.js';

interface ReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
  currentUserId: string;
  isModerator: boolean;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  isOpen,
  onClose,
  report,
  currentUserId,
  isModerator
}) => {
  if (!isOpen || !report) return null;

  const isOwner = report.userId === currentUserId;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              report.type === 'lost' 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {report.type === 'lost' ? '● Lost Report' : '● Found Report'}
            </span>

            <span className={`text-xs font-mono px-2.5 py-1 rounded ${
              report.status === 'reunited'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-300'
            }`}>
              {report.status.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 mt-6">
          
          {/* Image */}
          {report.imageUrl && (
            <div className="relative h-64 w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
              <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-mono text-cyan-300 flex items-center space-x-1.5 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>MULTIMODAL AI SCANNED</span>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-black text-white">{report.title}</h2>
            <p className="text-slate-300 text-xs mt-2 leading-relaxed">{report.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block mb-0.5">Category:</span>
              <span className="text-white capitalize font-medium">{report.category.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block mb-0.5">Primary Color:</span>
              <span className="text-white font-medium">{report.color}</span>
            </div>
            {report.brand && (
              <div>
                <span className="text-slate-500 font-semibold block mb-0.5">Brand / Manufacturer:</span>
                <span className="text-white font-medium">{report.brand}</span>
              </div>
            )}
            {report.model && (
              <div>
                <span className="text-slate-500 font-semibold block mb-0.5">Model / Series:</span>
                <span className="text-white font-medium">{report.model}</span>
              </div>
            )}
          </div>

          {/* Location & Time */}
          <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center space-x-2 text-indigo-300">
              <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="font-bold">Location & Proximity Zone:</span>
            </div>
            <p className="text-slate-300 pl-6">{report.location.address || report.location.landmark}, {report.location.city}</p>

            <div className="flex items-center space-x-2 text-slate-400 pt-2 border-t border-slate-900">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Reported Date: {report.date} at {report.time}</span>
            </div>
          </div>

          {/* Private Verification Info (Only visible if Owner or Admin) */}
          {(isOwner || isModerator) && (report.privateSerialNo || report.privateUniqueMarks) && (
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl text-xs space-y-2">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>PRIVATE IDENTIFYING PROOF (Server Protected)</span>
              </div>
              {report.privateSerialNo && (
                <div>
                  <span className="text-slate-400 text-[11px] block">Serial Number:</span>
                  <span className="font-mono text-cyan-300">{report.privateSerialNo}</span>
                </div>
              )}
              {report.privateUniqueMarks && (
                <div>
                  <span className="text-slate-400 text-[11px] block">Hidden Markings:</span>
                  <span className="text-slate-200">{report.privateUniqueMarks}</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
