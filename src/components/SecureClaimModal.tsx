import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  AlertTriangle, 
  FileCheck2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Match, Claim, FraudRiskAssessment } from '../types/index.js';
import { submitClaim } from '../services/api.js';

interface SecureClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  currentUserId: string;
  currentUserName: string;
  currentUserEmail: string;
  onClaimSubmitted: () => void;
}

export const SecureClaimModal: React.FC<SecureClaimModalProps> = ({
  isOpen,
  onClose,
  match,
  currentUserId,
  currentUserName,
  currentUserEmail,
  onClaimSubmitted
}) => {
  const [serialNumberProvided, setSerialNumberProvided] = useState('CND2390X88');
  const [uniqueMarksProvided, setUniqueMarksProvided] = useState('Small sticker of GitHub Octocat on left palm rest, scratch near left hinge');
  const [verificationStatement, setVerificationStatement] = useState('This is my HP Pavilion laptop lost at Prayagraj Railway Station. Contains manuscript research notes and my student project files.');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [riskAssessment, setRiskAssessment] = useState<FraudRiskAssessment | null>(null);

  if (!isOpen || !match) return null;

  const lost = match.lostReport;
  const found = match.foundReport;

  const handleSubmit = async () => {
    if (!lost || !found) return;
    setIsSubmitting(true);
    try {
      const claim = await submitClaim({
        lostReportId: lost.id,
        foundReportId: found.id,
        claimantId: currentUserId,
        claimantName: currentUserName,
        claimantEmail: currentUserEmail,
        serialNumberProvided,
        uniqueMarksProvided,
        verificationStatement
      });

      setRiskAssessment(claim.riskAssessment);
      setIsSubmitting(false);
      setTimeout(() => {
        onClaimSubmitted();
        onClose();
      }, 1200);
    } catch (err) {
      setIsSubmitting(false);
      alert("Error submitting claim.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Ownership Verification Claim</h2>
              <p className="text-xs text-slate-400">Secure Fraud-Proof Verification System</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="mt-4 p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl text-xs text-slate-300 space-y-1">
          <div className="flex items-center space-x-2 font-bold text-white">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Private Proof Requirement</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            To prevent fraudulent claims, our AI cross-references your answers with private details registered in the original lost report.
          </p>
        </div>

        {/* Claim Input Form */}
        <div className="space-y-4 mt-6">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Serial Number / IMEI / MAC Address
            </label>
            <input
              type="text"
              placeholder="e.g. CND2390X88"
              value={serialNumberProvided}
              onChange={(e) => setSerialNumberProvided(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hidden Markings, Scratches or Stickers
            </label>
            <input
              type="text"
              placeholder="e.g. Octocat sticker on left palm rest"
              value={uniqueMarksProvided}
              onChange={(e) => setUniqueMarksProvided(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Detailed Verification Statement *
            </label>
            <textarea
              rows={3}
              placeholder="State contents, specific folder names, lockscreen wallpaper, or purchase details..."
              value={verificationStatement}
              onChange={(e) => setVerificationStatement(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* AI Risk Result if computed */}
          {riskAssessment && (
            <div className={`p-4 rounded-2xl text-xs space-y-2 border ${
              riskAssessment.riskLevel === 'LOW'
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/50 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span>AI RISK ASSESSMENT RESULT:</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-950">
                  {riskAssessment.riskLevel} RISK (Score: {riskAssessment.riskScore}/100)
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                {riskAssessment.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !verificationStatement}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-xl shadow-emerald-600/30 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
              <span>{isSubmitting ? 'AI Risk Checking...' : '🔒 Submit Verified Claim'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
