import React, { useState } from 'react';
import { Users, Search, Filter, TrendingUp, CandlestickChart as Candlestick, LineChart, DollarSign, Bell, Settings, LogOut, Menu } from 'lucide-react';
import { CommunitiesWidget } from '../components/CommunitiesWidget';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../hooks/useNavigate';

interface CommunityHomePageProps {
  onBack: () => void;
}

export function CommunityHomePage({ onBack }: CommunityHomePageProps) {
  const { username, logout, allSellers } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [subscribedCommunities, setSubscribedCommunities] = useState<any[]>([]);

  const handleLogout = () => {
    logout();
    navigate('home');
  };

  const handleJoinCommunity = (seller: any) => {
    const newCommunity = {
      id: seller.username,
      name: seller.username,
      type: seller.type,
      memberCount: seller.memberCount,
      winRate: seller.winRate,
      monthlyReturn: seller.monthlyReturn,
      isSubscribed: true,
      lastSignal: 'Just joined'
    };
    setSubscribedCommunities([...subscribedCommunities, newCommunity]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'crypto':
        return <Candlestick className="w-4 h-4" />;
      case 'options':
        return <TrendingUp className="w-4 h-4" />;
      case 'futures':
        return <LineChart className="w-4 h-4" />;
      case 'stocks':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const filteredSellers = allSellers.filter(seller => {
    const matchesSearch = seller.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || seller.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
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
                <span className="text-white font-bold">CyCap</span>
              </div>

              <div className="hidden lg:flex items-center gap-4">
                <button className="text-white px-3 py-2 rounded-lg hover:bg-zinc-800">
                  Dashboard
                </button>
                <button className="text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  Communities
                </button>
                <button className="text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  Signals
                </button>
                <button className="text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  Learn
                </button>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
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
                      <div className="text-sm text-zinc-400">No new notifications</div>
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
                  <Filter className="w-4 h-4" />
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
                  Dashboard
                </button>
                <button className="w-full flex items-center gap-3 text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  Communities
                </button>
                <button className="w-full flex items-center gap-3 text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  Signals
                </button>
                <button className="w-full flex items-center gap-3 text-zinc-400 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:text-white">
                  Learn
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

      {/* Rest of the content */}
      <div className="pt-16">
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h1>
            <p className="text-gray-400">Monitor your subscribed communities and trading performance</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Communities Widget */}
            <div className="lg:col-span-1">
              <CommunitiesWidget 
                communities={subscribedCommunities}
                onViewAll={() => {}}
              />
            </div>

            {/* Right Column - Other Widgets */}
            <div className="lg:col-span-2">
              {/* Add other widgets here */}
            </div>
          </div>
        </div>

        {/* Communities Grid Section */}
        <div className="max-w-7xl mx-auto px-6 py-8 border-t border-zinc-800">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Discover Communities</h2>
            <p className="text-gray-400">Find and join new trading communities</p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              {['crypto', 'options', 'futures', 'stocks'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors
                            ${selectedType === type 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'}`}
                >
                  {getTypeIcon(type)}
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSellers.map((seller) => (
              <div 
                key={seller.username}
                className="bg-zinc-900 rounded-xl p-6 hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(seller.type)}
                      <h3 className="font-medium text-white">{seller.username}</h3>
                    </div>
                    {seller.isVerified && (
                      <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-green-400">+{seller.monthlyReturn}%</div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{seller.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Members</p>
                    <p className="text-white font-medium">{seller.memberCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Win Rate</p>
                    <p className="text-white font-medium">{seller.winRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Type</p>
                    <p className="text-white font-medium capitalize">{seller.type}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleJoinCommunity(seller)}
                  className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-400 transition-colors"
                  disabled={subscribedCommunities.some(c => c.id === seller.username)}
                >
                  {subscribedCommunities.some(c => c.id === seller.username) ? 'Joined' : 'Join Community'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}