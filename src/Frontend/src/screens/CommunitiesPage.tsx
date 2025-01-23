import React, { useState } from 'react';
import { Search, Filter, TrendingUp, CandlestickChart as Candlestick, LineChart, DollarSign, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CommunitiesPageProps {
  onBack: () => void;
}

export function CommunitiesPage({ onBack }: CommunitiesPageProps) {
  const { allSellers } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'members' | 'winRate' | 'monthlyReturn'>('members');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'crypto':
        return <Candlestick className="w-5 h-5" />;
      case 'options':
        return <TrendingUp className="w-5 h-5" />;
      case 'futures':
        return <LineChart className="w-5 h-5" />;
      case 'stocks':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const filteredAndSortedSellers = allSellers
    .filter(seller => {
      const matchesSearch = seller.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          seller.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || seller.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'members':
          return (a.memberCount - b.memberCount) * order;
        case 'winRate':
          return (a.winRate - b.winRate) * order;
        case 'monthlyReturn':
          return (a.monthlyReturn - b.monthlyReturn) * order;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Trading Communities</h1>
          <p className="text-gray-400">
            Discover and join verified trading communities across different markets
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search communities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              {['crypto', 'options', 'futures', 'stocks'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors
                            ${selectedType === type 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'}`}
                >
                  {getTypeIcon(type)}
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="members">Members</option>
                <option value="winRate">Win Rate</option>
                <option value="monthlyReturn">Monthly Return</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 bg-zinc-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedSellers.map((seller) => (
            <div 
              key={seller.username}
              className="bg-zinc-900 rounded-xl p-6 hover:bg-zinc-800 transition-colors"
            >
              {/* Community Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center">
                    {getTypeIcon(seller.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{seller.username}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 capitalize">{seller.type}</span>
                      {seller.isVerified && (
                        <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Description */}
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">{seller.description}</p>

              {/* Stats Grid */}
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
                  <p className="text-gray-400 text-xs mb-1">Monthly</p>
                  <p className="text-green-400 font-medium">+{seller.monthlyReturn}%</p>
                </div>
              </div>

              {/* Join Button */}
              <button 
                className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-400 transition-colors"
              >
                View Community
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedSellers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No communities found</h3>
            <p className="text-gray-400">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}