import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  FileText, 
  BarChart3, 
  Lock, 
  Check, 
  X, 
  Sparkles,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { Claim, PlatformAnalytics, Report } from '../types/index.js';

interface AdminDashboardProps {
  analytics?: PlatformAnalytics;
  claims?: Claim[];
  reports?: Report[];
  onUpdateClaimStatus: (claimId: string, status: Claim['status'], notes?: string) => Promise<void>;
  onResetSeedData: () => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  analytics,
  claims = [],
  reports = [],
  onUpdateClaimStatus,
  onResetSeedData
}) => {
  const [selectedClaimTab, setSelectedClaimTab] = useState<'all' | 'high_risk' | 'pending'>('all');
  const [moderatorNote, setModeratorNote] = useState<string>('');

  const safeClaims = claims || [];
  const safeAnalytics = analytics || {
    totalLostReports: 0,
    totalFoundReports: 0,
    totalMatchesFound: 0,
    successfulReunions: 0,
    fraudAlertsCount: 0,
    categoryDistribution: {},
    totalUsers: 0
  };

  const filteredClaims = safeClaims.filter(c => {
    if (selectedClaimTab === 'high_risk') return c.riskAssessment?.riskLevel === 'HIGH';
    if (selectedClaimTab === 'pending') return c.status === 'pending' || c.status === 'under_review';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 text-xs text-emerald-300 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">MODERATOR & ADMIN CONTROL PANEL</span>
          </div>
          <h1 className="text-3xl font-black text-white">Platform Oversight & Fraud Security</h1>
          <p className="text-xs text-slate-300 mt-1">Review suspicious ownership claims, monitor AI match activity, and resolve disputes.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onResetSeedData}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-2 border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-indigo-400" />
            <span>Reset Demo Seed State</span>
          </button>
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Users</div>
          <div className="text-3xl font-black text-white mt-1">{safeAnalytics.totalUsers || 0}</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Registered Citizens</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-semibold uppercase">Active Reports</div>
          <div className="text-3xl font-black text-indigo-400 mt-1">{(safeAnalytics.totalLostReports || 0) + (safeAnalytics.totalFoundReports || 0)}</div>
          <span className="text-[10px] text-indigo-300 mt-1 block">{safeAnalytics.totalLostReports || 0} Lost / {safeAnalytics.totalFoundReports || 0} Found</span>
        </div>

        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4">
          <div className="text-xs text-emerald-400 font-semibold uppercase">Successful Reunions</div>
          <div className="text-3xl font-black text-emerald-400 mt-1">{safeAnalytics.successfulReunions || 0}</div>
          <span className="text-[10px] text-emerald-300 mt-1 block">Verified & Returned</span>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4">
          <div className="text-xs text-amber-400 font-semibold uppercase">Fraud Risk Flags</div>
          <div className="text-3xl font-black text-amber-400 mt-1">{safeAnalytics.fraudAlertsCount || 0}</div>
          <span className="text-[10px] text-amber-300 mt-1 block">Escalated claims</span>
        </div>
      </div>

      {/* Category Breakdown & Fraud Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Category Analytics Bar */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Category Distribution</h3>
          </div>

          <div className="space-y-3 text-xs">
            {Object.entries(safeAnalytics.categoryDistribution || {}).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-slate-300 mb-1 capitalize">
                  <span>{cat.replace('_', ' ')}</span>
                  <span className="font-mono text-indigo-300">{count} items</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (count as number) * 30)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Claims Moderation Queue */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Ownership Claim Verification Queue</h3>
              <p className="text-xs text-slate-400">Claims with private verification submissions and AI Risk Scores</p>
            </div>

            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedClaimTab('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedClaimTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                All Claims ({claims.length})
              </button>
              <button
                onClick={() => setSelectedClaimTab('high_risk')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedClaimTab === 'high_risk' ? 'bg-rose-600 text-white' : 'text-slate-400'
                }`}
              >
                High Risk ({claims.filter(c => c.riskAssessment.riskLevel === 'HIGH').length})
              </button>
            </div>
          </div>

          {/* Claims List */}
          <div className="space-y-4">
            {filteredClaims.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No claims pending review in this view.
              </div>
            ) : (
              filteredClaims.map(claim => (
                <div
                  key={claim.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        claim.riskAssessment.riskLevel === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {claim.riskAssessment.riskLevel} RISK (Score: {claim.riskAssessment.riskScore})
                      </span>
                      <span className="text-xs font-bold text-white">Claimant: {claim.claimantName}</span>
                    </div>

                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-800 rounded text-slate-300">
                      STATUS: {claim.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800 italic">
                    "{claim.verificationStatement}"
                  </p>

                  {/* AI Risk Reasons */}
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <strong className="text-slate-200">AI Risk Analysis Findings:</strong>
                    <ul className="list-disc list-inside space-y-0.5">
                      {claim.riskAssessment.reasons.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Moderator Action Buttons */}
                  {claim.status === 'pending' || claim.status === 'under_review' ? (
                    <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-800/80">
                      <button
                        onClick={() => onUpdateClaimStatus(claim.id, 'rejected', 'Moderator rejected due to contradictory verification details.')}
                        className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-lg text-xs font-semibold border border-rose-800 flex items-center space-x-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject Claim</span>
                      </button>

                      <button
                        onClick={() => onUpdateClaimStatus(claim.id, 'approved', 'Verified and approved by Moderator.')}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1 shadow-md shadow-emerald-600/20 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Mark Reunited</span>
                      </button>
                    </div>
                  ) : null}

                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
