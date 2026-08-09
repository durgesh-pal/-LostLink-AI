import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { LandingHero } from './components/LandingHero.js';
import { UserDashboard } from './components/UserDashboard.js';
import { ReportLostModal } from './components/ReportLostModal.js';
import { ReportFoundModal } from './components/ReportFoundModal.js';
import { AIMatchResults } from './components/AIMatchResults.js';
import { SecureClaimModal } from './components/SecureClaimModal.js';
import { MapView } from './components/MapView.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { DemoStorylineModal } from './components/DemoStorylineModal.js';
import { ArchDocsModal } from './components/ArchDocsModal.js';
import { ReportDetailModal } from './components/ReportDetailModal.js';

import { 
  fetchReports, 
  fetchMatches, 
  fetchClaims, 
  fetchAnalytics, 
  createLostReport, 
  createFoundReport, 
  updateClaimStatus, 
  seedDemoScenario, 
  resetDatabase 
} from './services/api.js';

import { Report, Match, Claim, PlatformAnalytics } from './types/index.js';
import { Sparkles, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function App() {
  // Application Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'matches' | 'map' | 'admin'>('home');
  const [currentUserRole, setCurrentUserRole] = useState<'citizen' | 'moderator'>('citizen');

  // User Profile
  const currentUserId = currentUserRole === 'citizen' ? 'user-101' : 'user-admin';
  const currentUserName = currentUserRole === 'citizen' ? 'Aarav Sharma' : 'Moderator Portal';
  const currentUserEmail = currentUserRole === 'citizen' ? 'aarav.sharma@example.com' : 'admin@lostlink.ai';

  // State
  const [reports, setReports] = useState<Report[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [analytics, setAnalytics] = useState<PlatformAnalytics>({
    totalLostReports: 0,
    totalFoundReports: 0,
    totalMatchesFound: 0,
    successfulReunions: 0,
    fraudAlertsCount: 0,
    categoryDistribution: {},
    totalUsers: 142
  });

  // Modal Controls
  const [isReportLostOpen, setIsReportLostOpen] = useState(false);
  const [isReportFoundOpen, setIsReportFoundOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedMatchForClaim, setSelectedMatchForClaim] = useState<Match | null>(null);
  
  const [isArchDocsOpen, setIsArchDocsOpen] = useState(false);
  const [isDemoStorylineOpen, setIsDemoStorylineOpen] = useState(false);
  const [selectedReportModal, setSelectedReportModal] = useState<Report | null>(null);

  // Search & Toast
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Initial Data Fetching
  const loadAllData = async () => {
    try {
      const [reps, mtchs, clms, stats] = await Promise.all([
        fetchReports(),
        fetchMatches(),
        fetchClaims(),
        fetchAnalytics()
      ]);
      setReports(Array.isArray(reps) ? reps : []);
      setMatches(Array.isArray(mtchs) ? mtchs : []);
      setClaims(Array.isArray(clms) ? clms : []);
      if (stats) setAnalytics(stats);
    } catch (err) {
      console.error("Error loading application state:", err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handlers
  const handleCreateLostReport = async (formData: any) => {
    const newReport = await createLostReport(formData);
    showNotification(`Lost Report #${newReport.id} registered! Gemini AI scanning for matches...`, 'success');
    await loadAllData();
  };

  const handleCreateFoundReport = async (formData: any) => {
    const newReport = await createFoundReport(formData);
    showNotification(`Found Report #${newReport.id} registered! Match engine updated.`, 'success');
    await loadAllData();
  };

  const handleClaimSubmitted = async () => {
    showNotification(`Ownership claim submitted! AI risk check completed.`, 'success');
    await loadAllData();
  };

  const handleUpdateClaimStatus = async (claimId: string, status: Claim['status'], notes?: string) => {
    await updateClaimStatus(claimId, status, notes);
    showNotification(`Claim #${claimId} status updated to ${status.toUpperCase()}`, 'info');
    await loadAllData();
  };

  const handleRunDemoScenario = async () => {
    await seedDemoScenario();
    showNotification(`Judges Demo Storyline loaded into live database!`, 'success');
    await loadAllData();
  };

  const handleResetData = async () => {
    await resetDatabase();
    showNotification(`Database reset to default seed state.`, 'info');
    await loadAllData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-bounce transition-all">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-center space-x-3 text-xs max-w-md ${
            notification.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200'
              : notification.type === 'warning'
              ? 'bg-amber-950/95 border-amber-500/50 text-amber-200'
              : 'bg-indigo-950/95 border-indigo-500/50 text-indigo-200'
          }`}>
            <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
            <span className="font-medium">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-auto text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenReportLost={() => setIsReportLostOpen(true)}
        onOpenReportFound={() => setIsReportFoundOpen(true)}
        onOpenArchDocs={() => setIsArchDocsOpen(true)}
        onOpenDemoStoryline={() => setIsDemoStorylineOpen(true)}
        highMatchCount={(matches || []).filter(m => m && m.matchScore >= 75).length}
      />

      {/* Main Page Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <LandingHero
              onOpenReportLost={() => setIsReportLostOpen(true)}
              onOpenReportFound={() => setIsReportFoundOpen(true)}
              onNavigateToMatches={() => setActiveTab('matches')}
              onNavigateToReports={() => setActiveTab('dashboard')}
              onOpenDemoStoryline={() => setIsDemoStorylineOpen(true)}
            />
            
            {/* Quick Teaser Feed */}
            <UserDashboard
              reports={reports}
              matches={matches}
              claims={claims}
              onOpenReportLost={() => setIsReportLostOpen(true)}
              onOpenReportFound={() => setIsReportFoundOpen(true)}
              onSelectReport={(report) => setSelectedReportModal(report)}
              onOpenClaimModal={(match) => {
                setSelectedMatchForClaim(match);
                setIsClaimModalOpen(true);
              }}
              onNavigateToMatches={() => setActiveTab('matches')}
              onRefreshData={loadAllData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <UserDashboard
            reports={reports}
            matches={matches}
            claims={claims}
            onOpenReportLost={() => setIsReportLostOpen(true)}
            onOpenReportFound={() => setIsReportFoundOpen(true)}
            onSelectReport={(report) => setSelectedReportModal(report)}
            onOpenClaimModal={(match) => {
              setSelectedMatchForClaim(match);
              setIsClaimModalOpen(true);
            }}
            onNavigateToMatches={() => setActiveTab('matches')}
            onRefreshData={loadAllData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'matches' && (
          <AIMatchResults
            matches={matches}
            onOpenClaimModal={(match) => {
              setSelectedMatchForClaim(match);
              setIsClaimModalOpen(true);
            }}
            onSelectReport={(report) => setSelectedReportModal(report)}
          />
        )}

        {activeTab === 'map' && (
          <MapView
            reports={reports}
            matches={matches}
            onSelectReport={(report) => setSelectedReportModal(report)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            analytics={analytics}
            claims={claims}
            reports={reports}
            onUpdateClaimStatus={handleUpdateClaimStatus}
            onResetSeedData={handleResetData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenArchDocs={() => setIsArchDocsOpen(true)}
        onOpenDemoStoryline={() => setIsDemoStorylineOpen(true)}
      />

      {/* Modals */}
      <ReportLostModal
        isOpen={isReportLostOpen}
        onClose={() => setIsReportLostOpen(false)}
        onSubmit={handleCreateLostReport}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        currentUserEmail={currentUserEmail}
      />

      <ReportFoundModal
        isOpen={isReportFoundOpen}
        onClose={() => setIsReportFoundOpen(false)}
        onSubmit={handleCreateFoundReport}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        currentUserEmail={currentUserEmail}
      />

      <SecureClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        match={selectedMatchForClaim}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        currentUserEmail={currentUserEmail}
        onClaimSubmitted={handleClaimSubmitted}
      />

      <DemoStorylineModal
        isOpen={isDemoStorylineOpen}
        onClose={() => setIsDemoStorylineOpen(false)}
        onRunDemoScenario={handleRunDemoScenario}
        onNavigateToMatches={() => setActiveTab('matches')}
        onNavigateToDashboard={() => setActiveTab('dashboard')}
      />

      <ArchDocsModal
        isOpen={isArchDocsOpen}
        onClose={() => setIsArchDocsOpen(false)}
      />

      <ReportDetailModal
        isOpen={!!selectedReportModal}
        onClose={() => setSelectedReportModal(null)}
        report={selectedReportModal}
        currentUserId={currentUserId}
        isModerator={currentUserRole === 'moderator'}
      />

    </div>
  );
}
