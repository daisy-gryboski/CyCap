import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../hooks/useNavigate';
import { 
  Users, ChevronDown, LayoutDashboard, 
  Bell, Settings, LogOut, Plus,
  TrendingUp, MessageSquare, Signal, Store,
  Menu
} from 'lucide-react';
import { OpenPositionsWidget } from '../components/OpenPositionsWidget';
import { CommunitiesWidget } from '../components/CommunitiesWidget';
import { LeaderboardPlacement } from '../components/LeaderboardPlacement';
import { PerformanceOverview } from '../components/PerformanceOverview';
import { MonthlyStats } from '../components/MonthlyStats';
import { RiskMetrics } from '../components/RiskMetrics';
import { BankConnection } from '../components/BankConnection';

interface MemberDashboardScreenProps {
  onBack: () => void;
}

export function MemberDashboardScreen({ onBack }: MemberDashboardScreenProps) {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('home');
  };

  const subscribedCommunities = [
    {
      id: 'alpha-traders',
      name: 'Alpha Traders',
      type: 'crypto',
      memberCount: 15234,
      winRate: 92.5,
      monthlyReturn: 28.4,
      isSubscribed: true,
      lastSignal: '2m ago'
    },
    {
      id: 'options-elite',
      name: 'Options Elite',
      type: 'options',
      memberCount: 12453,
      winRate: 89.3,
      monthlyReturn: 32.1,
      isSubscribed: true,
      lastSignal: '15m ago'
    }
  ];

  const mockPositions = [
    {
      symbol: 'AAPL',
      type: 'long' as const,
      entryPrice: 175.25,
      currentPrice: 178.85,
      quantity: 100,
      pnl: 360.00,
      pnlPercentage: 2.05,
      stopLoss: 172.50,
      takeProfit: 185.00,
      openTime: '2h 15m ago'
    },
    {
      symbol: 'TSLA',
      type: 'short' as const,
      entryPrice: 245.80,
      currentPrice: 242.30,
      quantity: 50,
      pnl: 175.00,
      pnlPercentage: 1.43,
      stopLoss: 248.00,
      takeProfit: 235.00,
      openTime: '45m ago'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-zinc-900 border-b border-zinc-800 z-50">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden p-2 hover:bg-zinc-800 rounded-lg"
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Store className="w-4 h-4 text-black" />
                </div>
                <span className="text-white font-bold">CyCap</span>
              </div>

              <div className="hidden lg:flex items-center gap-4">
                <button className="text-white px-3 py-2 rounded-lg hover:bg-zinc-800">
                  <LayoutDashboard className="w-5 h-5" />
                </button>
                <button className="text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  <Signal className="w-5 h-5" />
                </button>
                <button className="text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  <Users className="w-5 h-5" />
                </button>
                <button className="text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button className="hidden lg:flex bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-100 transition-colors items-center gap-2">
                <Plus className="w-4 h-4" />
                New Trade
              </button>

              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white"
                >
                  <Bell className="w-5 h-5" />
                </button>
                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-zinc-800 rounded-lg shadow-lg p-4">
                    <h3 className="text-white font-medium mb-2">Notifications</h3>
                    <div className="space-y-2">
                      <div className="text-sm text-zinc-400">New signal from Alpha Traders</div>
                      <div className="text-sm text-zinc-400">AAPL position reached take profit</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-white hover:text-zinc-300"
                >
                  <span>{username}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg py-2">
                    <button className="w-full text-left px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-700">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </div>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-700"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="bg-zinc-900 w-64 h-full">
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <span className="text-white font-bold">Menu</span>
                <button 
                  onClick={() => setShowMobileMenu(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 text-white px-3 py-2 rounded-lg hover:bg-zinc-800">
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </button>
                <button className="w-full flex items-center gap-3 text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  <Signal className="w-5 h-5" />
                  Signals
                </button>
                <button className="w-full flex items-center gap-3 text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  <Users className="w-5 h-5" />
                  Communities
                </button>
                <button className="w-full flex items-center gap-3 text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  <MessageSquare className="w-5 h-5" />
                  Messages
                </button>
                <button className="w-full flex items-center gap-3 text-black bg-white px-3 py-2 rounded-lg hover:bg-zinc-100">
                  <Plus className="w-5 h-5" />
                  New Trade
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 text-red-400 px-3 py-2 rounded-lg hover:bg-zinc-800"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Bank Connection Widget */}
          <div className="mb-8">
            <BankConnection />
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Communities Widget */}
            <div>
              <CommunitiesWidget 
                communities={subscribedCommunities}
                onViewAll={() => navigate('communities')}
              />
            </div>

            {/* Performance Overview */}
            <div className="lg:col-span-2">
              <PerformanceOverview />
            </div>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <OpenPositionsWidget positions={mockPositions} />
            </div>
            <div>
              <LeaderboardPlacement 
                rank={42}
                totalTraders={10000}
                winRate={92.5}
                profitFactor={3.2}
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-zinc-900 rounded-xl p-6">
              <MonthlyStats 
                winRate={78.5}
                profitFactor={2.4}
                totalTrades={342}
              />
            </div>
            <div className="bg-zinc-900 rounded-xl p-6">
              <RiskMetrics 
                maxDrawdown={12.3}
                sharpeRatio={2.8}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}