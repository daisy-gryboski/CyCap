import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../hooks/useNavigate';
import { 
  Users, ChevronDown, LayoutDashboard, 
  DollarSign, Bell, Settings, LogOut, Plus,
  TrendingUp, MessageSquare, Signal, Store,
  Menu
} from 'lucide-react';
import { SellerInfoWidget } from '../components/SellerInfoWidget';
import { LeaderboardPlacement } from '../components/LeaderboardPlacement';

interface SellerDashboardScreenProps {
  onBack: () => void;
}

export function SellerDashboardScreen({ onBack }: SellerDashboardScreenProps) {
  const { username, sellerInfo, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  // Use seller info from context instead of mock data
  const displayInfo = {
    username: sellerInfo?.username || username || 'Community Leader',
    description: sellerInfo?.description || "Welcome to our trading community!",
    socialLinks: sellerInfo?.socialLinks || [],
    images: sellerInfo?.images || [],
    videos: sellerInfo?.videos || []
  };

  const handleEdit = () => {
    navigate('seller-registration');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-zinc-900 border-b border-zinc-800 z-50">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and nav items */}
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

            {/* Right side - Actions and profile */}
            <div className="flex items-center gap-4">
              <button className="hidden lg:flex bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-100 transition-colors items-center gap-2">
                <Plus className="w-4 h-4" />
                New Signal
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
                      <div className="text-sm text-zinc-400">New member joined your community</div>
                      <div className="text-sm text-zinc-400">Signal AAPL hit take profit</div>
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
                      onClick={() => {
                        logout();
                        onBack();
                      }}
                      className="w-full text-left px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-700"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
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
                  Members
                </button>
                <button className="w-full flex items-center gap-3 text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  <MessageSquare className="w-5 h-5" />
                  Messages
                </button>
                <button className="w-full flex items-center gap-3 text-black bg-white px-3 py-2 rounded-lg hover:bg-zinc-100">
                  <Plus className="w-5 h-5" />
                  New Signal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Section with Info and Leaderboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SellerInfoWidget {...displayInfo} onEdit={handleEdit} />
            <LeaderboardPlacement 
              rank={42}
              totalTraders={10000}
              winRate={92.5}
              profitFactor={3.2}
            />
          </div>

          {/* Additional Content Below */}
          <div className="grid grid-cols-1 gap-6">
            {/* Add other widgets and content here */}
          </div>
        </div>
      </div>
    </div>
  );
}