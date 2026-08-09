import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  Bell, 
  ShieldCheck, 
  User as UserIcon, 
  MapPin, 
  LayoutDashboard, 
  Layers, 
  FileText,
  PlayCircle,
  HelpCircle,
  CheckCircle2,
  X,
  Menu
} from 'lucide-react';
import { User, NotificationItem } from '../types/index.js';

interface HeaderProps {
  currentUser?: User;
  onSwitchUserRole?: (role: 'citizen' | 'admin') => void;
  currentUserRole?: 'citizen' | 'moderator' | 'admin';
  setCurrentUserRole?: (role: 'citizen' | 'moderator') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReportLost: () => void;
  onOpenReportFound: () => void;
  notifications?: NotificationItem[];
  onMarkNotificationRead?: (id: string) => void;
  onOpenDemoStoryline: () => void;
  onOpenArchDocs: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  highMatchCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSwitchUserRole,
  currentUserRole = 'citizen',
  setCurrentUserRole,
  activeTab,
  setActiveTab,
  onOpenReportLost,
  onOpenReportFound,
  notifications = [],
  onMarkNotificationRead = (_id: string) => {},
  onOpenDemoStoryline,
  onOpenArchDocs,
  searchQuery = '',
  setSearchQuery = (_q: string) => {},
  highMatchCount = 0
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const safeUser: User = currentUser || {
    id: currentUserRole === 'citizen' ? 'user-101' : 'user-admin',
    name: currentUserRole === 'citizen' ? 'Aarav Sharma' : 'Moderator Portal',
    email: currentUserRole === 'citizen' ? 'aarav.sharma@example.com' : 'admin@lostlink.ai',
    role: currentUserRole === 'citizen' ? 'citizen' : 'admin'
  };

  const handleRoleToggle = () => {
    const nextRole = safeUser.role === 'citizen' ? 'admin' : 'citizen';
    if (onSwitchUserRole) {
      onSwitchUserRole(nextRole);
    }
    if (setCurrentUserRole) {
      setCurrentUserRole(nextRole === 'admin' ? 'moderator' : 'citizen');
    }
  };

  const safeNotifications = notifications || [];
  const unreadCount = safeNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Hackathon Highlight Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 border-b border-indigo-500/20 px-4 py-1.5 text-xs text-indigo-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
            HACKATHON MVP
          </span>
          <span className="hidden sm:inline">LostLink AI • Multimodal Image, Text, Spatial & Temporal Item Reunion Engine</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenDemoStoryline}
            className="flex items-center space-x-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-md font-medium border border-amber-500/40 transition-colors cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Live Demo Walkthrough</span>
          </button>
          <button
            onClick={onOpenArchDocs}
            className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Architecture Docs</span>
          </button>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-white">LostLink</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500 text-white rounded">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">INTELLIGENT REUNION PLATFORM</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Reports</span>
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'matches'
                  ? 'bg-indigo-600/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Match Hub</span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-1.5 py-0.2 rounded font-mono">92%</span>
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Map View</span>
            </button>
            {safeUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-emerald-400 hover:bg-emerald-900/30'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Moderation</span>
              </button>
            )}
          </nav>

          {/* Quick Actions & Role Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Search Input */}
            <div className="relative hidden md:block w-48 lg:w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search lost items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setActiveTab('reports');
                }}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Report Action Buttons */}
            <button
              onClick={onOpenReportLost}
              className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Report Lost</span>
              <span className="sm:hidden">Lost</span>
            </button>

            <button
              onClick={onOpenReportFound}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Report Found</span>
              <span className="sm:hidden">Found</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-white">Notifications</span>
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono">
                        {safeNotifications.length}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                    {safeNotifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No notifications yet
                      </div>
                    ) : (
                      safeNotifications.map(n => (
                        <div
                          key={n.id}
                          className={`p-3 text-xs transition-colors ${
                            n.read ? 'bg-slate-900 text-slate-400' : 'bg-indigo-950/30 text-slate-200 border-l-2 border-indigo-500'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-semibold text-white">{n.title}</span>
                            {!n.read && (
                              <button
                                onClick={() => onMarkNotificationRead(n.id)}
                                className="text-[10px] text-indigo-400 hover:underline"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                          <p className="mt-1 text-slate-300 leading-relaxed">{n.message}</p>
                          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                            <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            {n.linkReportId && (
                              <button
                                onClick={() => {
                                  setShowNotifications(false);
                                  setActiveTab('matches');
                                }}
                                className="text-cyan-400 font-semibold hover:underline"
                              >
                                View Match →
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Pill */}
            <div className="pl-2 border-l border-slate-800 flex items-center space-x-2">
              <div className="hidden sm:flex flex-col text-right text-xs">
                <span className="font-semibold text-slate-200">{safeUser.name}</span>
                <span className="text-[10px] text-indigo-400 capitalize">{safeUser.role} mode</span>
              </div>
              <button
                onClick={handleRoleToggle}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-1.5 rounded-xl border border-slate-700/60 text-xs flex items-center space-x-1 cursor-pointer"
                title="Switch between Citizen and Moderator/Admin role"
              >
                <UserIcon className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-mono font-semibold px-1 py-0.5 rounded bg-slate-900 text-indigo-300">
                  {safeUser.role === 'citizen' ? 'CITIZEN' : 'ADMIN'}
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-indigo-400" /> : <Menu className="w-6 h-6 text-indigo-400" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 border-b border-slate-800 px-4 py-4 space-y-3 shadow-2xl animate-fadeIn">
          
          {/* Mobile Search Input */}
          <div className="relative w-full mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search lost or found items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setActiveTab('dashboard');
                  setIsMobileMenuOpen(false);
                }
              }}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl flex items-center space-x-2 transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Home</span>
            </button>

            <button
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl flex items-center space-x-2 transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => { setActiveTab('matches'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl flex items-center space-x-2 transition-colors cursor-pointer ${
                activeTab === 'matches'
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Match Hub</span>
            </button>

            <button
              onClick={() => { setActiveTab('map'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl flex items-center space-x-2 transition-colors cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Map View</span>
            </button>

            {safeUser.role === 'admin' && (
              <button
                onClick={() => { setActiveTab('admin'); setIsMobileMenuOpen(false); }}
                className={`col-span-2 p-2.5 rounded-xl flex items-center space-x-2 transition-colors cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-950/60 text-emerald-400 hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin Moderation Portal</span>
              </button>
            )}
          </div>

          {/* Quick Actions in Drawer */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <button
              onClick={() => { onOpenDemoStoryline(); setIsMobileMenuOpen(false); }}
              className="flex items-center space-x-1.5 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Demo Walkthrough</span>
            </button>

            <button
              onClick={() => { onOpenArchDocs(); setIsMobileMenuOpen(false); }}
              className="flex items-center space-x-1.5 text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Architecture Docs</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
