import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Clock, 
  Tag, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  ShieldAlert, 
  Filter, 
  Layers, 
  Calendar,
  Eye,
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { Report, Match, Claim, ItemCategory } from '../types/index.js';

interface UserDashboardProps {
  reports?: Report[];
  matches?: Match[];
  claims?: Claim[];
  onOpenReportLost: () => void;
  onOpenReportFound: () => void;
  onSelectReport: (report: Report) => void;
  onOpenClaimModal: (match: Match) => void;
  onNavigateToMatches: () => void;
  onRefreshData: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  reports = [],
  matches = [],
  claims = [],
  onOpenReportLost,
  onOpenReportFound,
  onSelectReport,
  onOpenClaimModal,
  onNavigateToMatches,
  onRefreshData,
  searchQuery = '',
  setSearchQuery = (_q: string) => {}
}) => {
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found' | 'reunited'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const activeLostCount = reports.filter(r => r.type === 'lost' && r.status === 'active').length;
  const activeFoundCount = reports.filter(r => r.type === 'found' && r.status === 'active').length;
  const reunitedCount = reports.filter(r => r.status === 'reunited').length;
  const highMatchCount = matches.filter(m => m.matchScore >= 75).length;

  // Filtered reports
  const filteredReports = reports.filter(r => {
    if (filterType === 'lost' && r.type !== 'lost') return false;
    if (filterType === 'found' && r.type !== 'found') return false;
    if (filterType === 'reunited' && r.status !== 'reunited') return false;
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.brand && r.brand.toLowerCase().includes(q)) ||
        r.location.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const topMatch = matches[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Top Banner & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">CITIZEN DASHBOARD</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Real-time LostLink AI Sync</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Item Tracking & Active Reports</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefreshData}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={onOpenReportLost}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/20 flex items-center space-x-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Lost</span>
          </button>
          <button
            onClick={onOpenReportFound}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center space-x-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Found</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Lost</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{activeLostCount}</span>
            <span className="text-[10px] text-rose-400 font-medium">Pending items</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Found</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{activeFoundCount}</span>
            <span className="text-[10px] text-emerald-400 font-medium">Ready to return</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-br from-indigo-950/40 to-slate-900">
          <div className="flex items-center justify-between text-cyan-300 text-xs font-semibold">
            <span>AI Matches</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-cyan-300">{highMatchCount}</span>
            <span className="text-[10px] text-cyan-400 font-mono">≥75% score</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Pending Claims</span>
            <FileCheck2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{claims.filter(c => c.status === 'pending').length}</span>
            <span className="text-[10px] text-amber-400 font-medium">Under review</span>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-300 text-xs font-semibold">
            <span>Reunited</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-400">{reunitedCount}</span>
            <span className="text-[10px] text-emerald-400 font-medium">Success stories</span>
          </div>
        </div>
      </div>

      {/* Top AI Match Highlight Card */}
      {topMatch && (
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-3 py-1 text-xs text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-bold">TOP AI MATCH DETECTED</span>
                <span className="text-cyan-400 font-mono">({topMatch.matchScore}% Match Confidence)</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Potential Match: <span className="text-rose-300">{topMatch.lostReport?.title}</span> ↔ <span className="text-emerald-300">{topMatch.foundReport?.title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Found {topMatch.distanceKm} km away at {topMatch.foundReport?.location.landmark || topMatch.foundReport?.location.city}. Both reports match brand ({topMatch.lostReport?.brand}), category, and visual metadata.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={onNavigateToMatches}
                className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all cursor-pointer"
              >
                <span>Review AI Match Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reports Feed Header & Controls */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          
          {/* Status Tabs */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Reports ({reports.length})
            </button>
            <button
              onClick={() => setFilterType('lost')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'lost' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lost Items ({reports.filter(r => r.type === 'lost').length})
            </button>
            <button
              onClick={() => setFilterType('found')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'found' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Found Items ({reports.filter(r => r.type === 'found').length})
            </button>
            <button
              onClick={() => setFilterType('reunited')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'reunited' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Reunited ({reports.filter(r => r.status === 'reunited').length})
            </button>
          </div>

          {/* Category Selector */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="laptops">Laptops</option>
              <option value="phones">Phones & Tablets</option>
              <option value="wallets">Wallets & Cards</option>
              <option value="documents_ids">ID Cards & Passports</option>
              <option value="keys">Keys & Lockers</option>
              <option value="jewelry_watches">Jewelry & Watches</option>
              <option value="bags_luggage">Bags & Luggage</option>
            </select>
          </div>

        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by keywords, location, or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredReports.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-slate-900/50 border border-slate-800/80 rounded-3xl">
              <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">No reports match your filters</p>
              <p className="text-xs text-slate-500 mt-1">Try clearing search keywords or category filters</p>
            </div>
          ) : (
            filteredReports.map(report => (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 shadow-xl transition-all transform hover:-translate-y-1 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      report.type === 'lost' 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {report.type === 'lost' ? '● Lost Item' : '● Found Item'}
                    </span>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      report.status === 'reunited'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : report.status === 'pending_claim'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {report.status.toUpperCase().replace('_', ' ')}
                    </span>
                  </div>

                  {/* Image Preview */}
                  {report.imageUrl && (
                    <div className="relative h-44 w-full mb-3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                      <img
                        src={report.imageUrl}
                        alt={report.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-cyan-300 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>AI SCANNED</span>
                      </div>
                    </div>
                  )}

                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {report.title}
                  </h3>

                  <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {report.description}
                  </p>

                  {/* Tags & Brand */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {report.brand && (
                      <span className="bg-slate-800 text-indigo-300 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-700/80">
                        Brand: {report.brand}
                      </span>
                    )}
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-700/80">
                      Color: {report.color}
                    </span>
                  </div>

                </div>

                {/* Footer Info */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center space-x-1 truncate max-w-[180px]">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{report.location.landmark || report.location.city}</span>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{report.date}</span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};
